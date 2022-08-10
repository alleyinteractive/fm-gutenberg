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
			$this->get_block_editor_post_types(),
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

		register_rest_field(
			'attachment',
			'fm_media_preview',
			[
				'get_callback' => [ $this, 'get_media_preview' ],
			]
		);
	}

	/**
	 * Get the value.
	 *
	 * @param WP_Post $post The requested post.
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
			$fm = $this->remove_recursion( $fm_meta_box['fm'] );
			if ( ! empty( $fm->checked_value ) ) {
				$fm->checked_value = (string) $fm->checked_value;
			}
			if ( ! empty( $fm->unchecked_value ) ) {
				$fm->unchecked_value = (string) $fm->unchecked_value;
			}
			$output[] = [
				'title' => $fm_meta_box['title'],
				'fm'    => $fm,
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
		$post_types = $this->get_block_editor_post_types();
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
							'default'  => 'media' === $fm->field_class ? '0' : '',
							'sanitize' => $fm->sanitize,
							'type'     => 'media' === $fm->field_class ? 'integer' : 'string',
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
						'type' => 'media' === $child->field_class ? 'integer' : 'string',
					],
				],
			];
		}
		return [
			'items' => $output,
		];
	}

	/**
	 * Gets all post types that use the block editor.
	 *
	 * This duplicates `use_block_editor_for_post_type` because that function
	 * is only available in the wp-admin context, and this code can be run outside
	 * of that context (REST, etc.)
	 *
	 * @return array
	 */
	private function get_block_editor_post_types() {
		return array_filter(
			\get_post_types(),
			function( $post_type ) {
				if ( ! post_type_exists( $post_type ) ) {
					return false;
				}

				if ( ! post_type_supports( $post_type, 'editor' ) ) {
					return false;
				}

				$post_type_object = get_post_type_object( $post_type );
				if ( $post_type_object && ! $post_type_object->show_in_rest ) {
					return false;
				}
				return true;
			}
		);
	}

	/**
	 * Sets the sanitize property to null, which prevents recursion in the FM tree.
	 *
	 * @param object $fm The field manager object.
	 * @return object
	 */
	private function remove_recursion( $fm ) {
		if ( in_array( $fm->field_class, [ 'radio', 'richtext', 'select' ], true ) ) {
			$fm->sanitize[0] = null;
		}
		foreach ( $fm->children as $index => $child ) {
			$fm->children[ $index ] = $this->remove_recursion( $child );
		}
		return $fm;
	}

	/**
	 * Get the preview image url.
	 *
	 * @param WP_Post $post The requested post.
	 * @return string
	 */
	public function get_media_preview( $post ) {
		return wp_get_attachment_image(
			$post['id'],
			'thumbnail',
			true,
			[
				'class' => 'thumbnail',
			]
		);
	}
}
