<?php
/**
 * Post Fields REST class file
 *
 * @package FM_Gutenberg
 */

namespace FM_Gutenberg\REST_API;

use FM_Gutenberg\Singleton;

/**
 * Sets up field with Fieldmanger config for posts.
 */
class Post_Fields {
	use Singleton;

	/**
	 * The array of metaboxes.
	 *
	 * @var array
	 */
	public static $meta_boxes = [];

	/**
	 * Set everything up.
	 */
	protected function __construct() {
		add_action( 'rest_api_init', [ $this, 'register_field' ] );
		add_action( 'fieldmanager_context_post_construct', [ $this, 'on_fieldmanager_context_post_construct' ], 10, 5 );
		add_action( 'init', [ $this, 'register_meta_fields' ], 100 );
	}

	/**
	 * Register the rest field.
	 */
	public function register_field() {
		register_rest_field(
			'demo-text',
			'fm_gutenberg_fields',
			[
				'get_callback' => [ $this, 'get_value' ],
				'schema' => [
					'title' => [
						'description'       => esc_html__( 'The metabox title.', 'fm-gutenberg' ),
						'type'              => 'string',
						'required'          => true,
					],
					'fm' => [
						'description'       => esc_html__( 'The array describing the Fieldmanager field.', 'fm-gutenberg' ),
						'type'              => 'array',
						'required'          => true,
					]
				],
			]
		);
	}

	/**
	 * Get the value.
	 *
	 * @param Object $post The requested post.
	 * @return array|\WP_Error
	 */
	public function get_value( $post ) {
		$post_type = get_post_type( $post['id'] );
		$output = [];
		$fm_meta_boxes = $this->load_meta_boxes( $post_type );

		foreach ( $fm_meta_boxes as $fm_meta_box ) {
			$output[] = [
				'title' => $fm_meta_box['title'],
				'fm'    => $fm_meta_box['fm'],
			];
			remove_meta_box( 'fm_meta_box_' . $fm_meta_box['fm']->name, $post_type, 'side' );
		}
		return $output;
	}

	public function register_meta_fields( $fm_meta_boxes ) {
		$post_types = array_keys( get_post_types() );
		foreach ( $post_types as $post_type ) {
			$fm_meta_boxes = $this->load_meta_boxes( $post_type );
			foreach ( $fm_meta_boxes as $fm_meta_box ) {
				$fm = $fm_meta_box['fm'];

				if ( empty( $context->children ) ) {
					\FM_Gutenberg\register_meta_helper(
						'post',
						[ $post_type ],
						$fm->name,
						[
							'default' => '',
						]
					);
				}
			}
		}
	}

	protected function load_meta_boxes( $post_type ) {
		$posttype_meta_boxes = isset( $this->meta_boxes[ $post_type ] ) ? $this->meta_boxes[ $post_type ] : [];
		if ( empty ( $posttype_meta_boxes ) ) {
			return [];
		}

		$side_meta_boxes = isset( $posttype_meta_boxes['side'] ) ? $posttype_meta_boxes['side'] : [];

		if ( empty ( $side_meta_boxes ) ) {
			return [];
		}

		$meta_boxes = [];
		foreach( $side_meta_boxes as $context ) {
			$meta_boxes = array_merge( $meta_boxes, $context );
		}

		return $meta_boxes;
	}

	public function on_fieldmanager_context_post_construct( $title, $post_types, $context, $priority, $fm ) {
		$box = [
			'title' => $title,
			'fm' => $fm,
		];
		foreach ( $post_types as $post_type ) {
			if ( ! isset( $this->meta_boxes[ $post_type ] ) ) {
				$this->meta_boxes[ $post_type ] = [];
			}
			if ( ! isset( $this->meta_boxes[ $post_type ][ $context ] ) ) {
				$this->meta_boxes[ $post_type ][ $context ] = [];
			}
			if ( ! isset( $this->meta_boxes[ $post_type ][ $context ][ $priority ] ) ) {
				$this->meta_boxes[ $post_type ][ $context ][ $priority ] = [];
			}
			$this->meta_boxes[ $post_type ][ $context ][ $priority ][] = $box;
		}
	}
}
