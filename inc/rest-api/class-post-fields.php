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
		$fm_meta_boxes = $this->load_meta_boxes( $post );
		$this->register_meta_fields( $fm_meta_boxes );

		$output = [];

		foreach ( $fm_meta_boxes as $fm_meta_box ) {
			$output[] = [
				'title' => $fm_meta_box['callback'][0]->title,
				'fm'    => $fm_meta_box['callback'][0]->fm,
			];
		}
		return $output;
	}

	protected function register_meta_fields( $fm_meta_boxes ) {
		foreach ( $fm_meta_boxes as $fm_meta_box ) {
			$context = $fm_meta_box['callback'][0]->fm;
			\FM_Gutenberg\register_meta_helper(
				'post',
				[ 'demo-text' ],
				$context->name,
				[]
			);
		}
	}

	protected function load_meta_boxes( $post ) {
		global $wp_meta_boxes;

		$posttype_meta_boxes = isset( $wp_meta_boxes[ $post['type'] ] ) ? $wp_meta_boxes[ $post['type'] ] : [];
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

		$fm_meta_boxes = array_filter(
			$meta_boxes,
			function( $value, $key ) {
				return str_starts_with( $key, 'fm_meta_box_' );
			},
			ARRAY_FILTER_USE_BOTH
		);
		return $fm_meta_boxes;
	}
}
