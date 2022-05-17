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
	public $meta_boxes = [];

	/**
	 * Set everything up.
	 */
	protected function __construct() {
		add_action( 'rest_api_init', [ $this, 'register_field' ] );
		add_action( 'init', [ $this, 'register_meta_fields' ], 100 );
		add_action( 'fm_context_construct', [ $this, 'on_fm_context_construct' ], 10, 5 );
		add_filter( 'fm_calculated_context', [ $this, 'modify_fm_calculated_context' ] );
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
				'schema'       => [
					'title' => [
						'description' => esc_html__( 'The metabox title.', 'fm-gutenberg' ),
						'type'        => 'string',
						'required'    => true,
					],
					'fm'    => [
						'description' => esc_html__( 'The array describing the Fieldmanager field.', 'fm-gutenberg' ),
						'type'        => 'array',
						'required'    => true,
					],
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
		if ( ! current_user_can( 'edit_post', $post['id'] ) ) {
			return [];
		}
		$post_type     = get_post_type( $post['id'] );
		$output        = [];
		$fm_meta_boxes = $this->load_meta_boxes( $post_type );

		foreach ( $fm_meta_boxes as $fm_meta_box ) {
			$output[] = [
				'title' => $fm_meta_box['title'],
				'fm'    => $fm_meta_box['fm'],
			];
			if ( function_exists( 'remove_meta_box' ) ) {
				remove_meta_box( 'fm_meta_box_' . $fm_meta_box['fm']->name, $post_type, 'side' );
			}
		}
		return $output;
	}

	/**
	 * Register any meta fields used by Fieldmanager.
	 *
	 * @param array $fm_meta_boxes The array of metaboxes.
	 * @return void
	 */
	public function register_meta_fields( $fm_meta_boxes ) {
		if ( ! current_user_can( 'edit_posts' ) ) { // TODO: Can we check this specific post?
			return;
		}
		$post_types = array_keys( get_post_types() );
		foreach ( $post_types as $post_type ) {
			$fm_meta_boxes = $this->load_meta_boxes( $post_type );
			foreach ( $fm_meta_boxes as $fm_meta_box ) {
				$fm = $fm_meta_box['fm'];

				if ( empty( $fm->children ) ) {
					\FM_Gutenberg\register_meta_helper(
						'post',
						[ $post_type ],
						$fm->name,
						[
							'default'  => '',
							'sanitize' => $fm->sanitize,
						]
					);
				} else {
					\FM_Gutenberg\register_meta_helper(
						'post',
						[ $post_type ],
						$fm->name,
						[
							'default'      => [],
							'type'         => 'array',
							'show_in_rest' => [
								'schema' => $this->get_schema( $fm->children ),
							],
						]
					);
				}
			}
		}
	}

	/**
	 * Get all the "side" Fieldmanager Meta boxes.
	 *
	 * @param string $post_type The post type to get meta boxes for.
	 * @return array
	 */
	protected function load_meta_boxes( $post_type ) {
		$posttype_meta_boxes = isset( $this->meta_boxes[ $post_type ] ) ? $this->meta_boxes[ $post_type ] : [];
		if ( empty( $posttype_meta_boxes ) ) {
			return [];
		}

		$side_meta_boxes = isset( $posttype_meta_boxes['side'] ) ? $posttype_meta_boxes['side'] : [];

		if ( empty( $side_meta_boxes ) ) {
			return [];
		}

		$meta_boxes = [];
		foreach ( $side_meta_boxes as $context ) {
			$meta_boxes = array_merge( $meta_boxes, $context );
		}

		return $meta_boxes;
	}

	/**
	 * Function to run on the `fm_context_construct` action. This stores the
	 * Fieldmanager Meta boxes in the meta_boxes variable.
	 *
	 * @param object $instance The Fieldmanager field instance.
	 * @return void
	 */
	public function on_fm_context_construct( $instance ) {
		$box      = [
			'title' => $instance->title,
			'fm'    => $instance->fm,
		];
		$context  = $instance->context;
		$priority = $instance->priority;
		foreach ( $instance->post_types as $post_type ) {
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

	/**
	 * Filters the `fm_calculated_context` value so that our meta boxes get
	 * loaded during REST requests.
	 *
	 * @param array $context The existing array of context.
	 * @return array
	 */
	public function modify_fm_calculated_context( $context ) {
		if ( $this->is_rest() ) {
			$rest_url    = trailingslashit( rest_url() );
			$current_url = add_query_arg( [] );
			$rest_path   = str_replace( $rest_url, '', $current_url );

			preg_match( '/wp\/v2\/([a-z0-9-_]*)\/(\d*)/', $rest_path, $matches );

			if ( ! empty( $matches ) && post_type_exists( $matches[1] ) && current_user_can( 'edit_post', $matches[2] ) ) {
				$context[] = 'post'; // TODO: Find root post type.
				$context[] = $matches[1];
			}
			$context = array_values( array_filter( array_unique( $context ) ) );
		}
		return $context;
	}

	/**
	 * Checks if the current request is a WP REST API request.
	 *
	 * @return boolean
	 */
	private function is_rest() {
		if ( defined( 'REST_REQUEST' ) && REST_REQUEST
			|| isset( $_GET['rest_route'] ) // phpcs:ignore WordPress.Security.NonceVerification.Recommended
			&& str_starts_with( sanitize_text_field( $_GET['rest_route'] ), '/' ) ) { // phpcs:ignore WordPress.Security.NonceVerification.Recommended
				return true;
		}

		$rest_url    = wp_parse_url( trailingslashit( rest_url() ) );
		$current_url = wp_parse_url( add_query_arg( [] ) );
		return str_starts_with( $current_url['path'], $rest_url['path'] );
	}

	/**
	 * Formats the schema for the provided array of config data.
	 *
	 * @param [type] $children The array of FieldManager config data.
	 * @return array
	 */
	private function get_schema( $children ) {
		$output = [];
		foreach ( $children as $child ) {
			$output[] = [
				'type'       => 'object',
				'properties' => [
					$child->name => [
						'type' => 'string',
					],
				],
			];
		}
		return [
			'items' => $output,
		];
	}
}
