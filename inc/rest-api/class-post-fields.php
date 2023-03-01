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
					'normal' => [
						'description' => esc_html__( 'The array of normal metaboxes.', 'fm-gutenberg' ),
						'type'        => 'array',
						'required'    => true,
						'items'       => $this->get_metabox_schema(),
					],
					'side'   => [
						'description' => esc_html__( 'The array of side metaboxes.', 'fm-gutenberg' ),
						'type'        => 'array',
						'required'    => true,
						'items'       => $this->get_metabox_schema(),
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
		$output        = [
			'normal' => [],
			'side'   => [],
		];
		$fm_meta_boxes = $this->load_meta_boxes( $post_type );

		foreach ( [ 'side', 'normal' ] as $location ) {
			foreach ( $fm_meta_boxes[ $location ] as $fm_meta_box ) {
				if ( empty( $fm_meta_box['title'] ) ) {
					continue;
				}
				$fm = $this->remove_recursion( $fm_meta_box['fm'] );
				if ( ! empty( $fm->checked_value ) ) {
					$fm->checked_value = (string) $fm->checked_value;
				}
				if ( ! empty( $fm->unchecked_value ) ) {
					$fm->unchecked_value = (string) $fm->unchecked_value;
				}
				$output[ $location ][] = [
					'title' => $fm_meta_box['title'],
					'fm'    => $fm,
				];
				if ( function_exists( 'remove_meta_box' ) ) {
					remove_meta_box( 'fm_meta_box_' . $fm_meta_box['fm']->name, $post_type, $location );
				}
			}
		}

		return $output;
	}

	/**
	 * Register any meta fields used by Fieldmanager.
	 *
	 * @return void
	 */
	public function register_meta_fields() {
		if ( ! current_user_can( 'edit_posts' ) ) { // TODO: Can we check this specific post?
			return;
		}
		$post_types = $this->get_block_editor_post_types();
		foreach ( $post_types as $post_type ) {
			$fm_meta_boxes = $this->load_meta_boxes( $post_type );
			foreach ( [ 'side', 'normal' ] as $location ) {
				if ( empty( $fm_meta_boxes[ $location ] ) ) {
					continue;
				}
				foreach ( $fm_meta_boxes[ $location ] as $fm_meta_box ) {
					if ( empty( $fm_meta_box['fm'] ) ) {
						continue;
					}
					$fm = $fm_meta_box['fm'];
					if ( 1 !== $fm->limit && empty( $fm->children ) ) {
						\FM_Gutenberg\register_meta_helper(
							'post',
							[ $post_type ],
							$fm->name,
							[
								'default'      => [],
								'type'         => 'array',
								'show_in_rest' => [
									'schema' => [
										'items' => [
											'type' => 'media' === $fm->field_class ? 'integer' : 'string',
											'sanitize_callback' => $fm->sanitize,
										],
									],
								],
							]
						);
					} elseif ( 1 === $fm->limit && empty( $fm->children ) ) {
						$default = $fm->default_value ?: '';
						if ( isset( $fm->multiple ) && $fm->multiple ) {
							\FM_Gutenberg\register_meta_helper(
								'post',
								[ $post_type ],
								$fm->name,
								[
									'type'         => 'object',
									'show_in_rest' => [
										'schema' => [
											'type'  => 'array',
											'items' => [ 'integer', 'string' ],
											'sanitize_callback' => $fm->sanitize,
										],
									],
								]
							);
						} else {
							\FM_Gutenberg\register_meta_helper(
								'post',
								[ $post_type ],
								$fm->name,
								[
									'default'           => 'media' === $fm->field_class ? '0' : $default,
									'sanitize_callback' => $fm->sanitize,
									'type'              => 'media' === $fm->field_class ? 'integer' : 'string',
								]
							);
						}
					} elseif ( 1 === $fm->limit && ! empty( $fm->children ) ) {
						\FM_Gutenberg\register_meta_helper(
							'post',
							[ $post_type ],
							$fm->name,
							[
								'type'         => 'object',
								'show_in_rest' => [
									'schema' => [
										'type'       => 'object',
										'properties' => $this->get_object_properties( $fm->children ),
										'sanitize_callback' => $fm->sanitize,
									],
								],
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

		if ( empty( $posttype_meta_boxes ) ) {
			return [];
		}

		$meta_boxes = [
			'normal' => [],
			'side'   => [],
		];
		if ( isset( $posttype_meta_boxes['normal'] ) ) {
			foreach ( $posttype_meta_boxes['normal'] as $context ) {
				$meta_boxes['normal'] = array_merge( $meta_boxes, $context );
			}
		}
		if ( isset( $posttype_meta_boxes['side'] ) ) {
			foreach ( $posttype_meta_boxes['side'] as $context ) {
				$meta_boxes['side'] = array_merge( $meta_boxes, $context );
			}
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
		$this->add_ajax_action( $instance );
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
	 * Recursively adds the ajax_action value to a field manager instance.
	 *
	 * @param object $instance The field manager instance.
	 * @return void
	 */
	public function add_ajax_action( &$instance ) {
		if ( isset( $instance->datasource ) && $instance->datasource->use_ajax ) {
			$instance->datasource->ajax_action = $instance->datasource->get_ajax_action();
		}
		if ( isset( $instance->fm->children ) ) {
			foreach ( $instance->fm->children as $child ) {
				$this->add_ajax_action( $child );
			}
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
				$context[] = 'post';
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
	 * @param array $children The array of FieldManager config data.
	 * @return array
	 */
	private function get_schema( $children ) {

		$properties = [];
		foreach ( $children as $child ) {
			$properties[ $child->name ] = [
				'type' => 'media' === $child->field_class ? 'integer' : 'string',
			];
		}
		return [
			'items' => [
				'type'       => 'object',
				'properties' => $properties,
			],
		];
	}

	/**
	 * Gets the object properties for an object, used for registering a meta field.
	 *
	 * @param array $children The array of FieldManager config data.
	 * @return array
	 */
	private function get_object_properties( $children ) {
		$output = [];
		foreach ( $children as $child ) {
			$output[ $child->name ] = [
				'type'              => [ 'integer', 'string' ],
				'sanitize_callback' => $child->sanitize,
			];
		}
		return $output;
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
		if ( in_array( $fm->field_class, [ 'checkboxes', 'radio', 'richtext', 'select' ], true ) ) {
			unset( $fm->sanitize[0] );
		}
		unset( $fm->data_type );
		unset( $fm->data_id );
		unset( $fm->current_context );
		unset( $fm->save_empty );
		unset( $fm->skip_save );
		unset( $fm->index );
		unset( $fm->serialize_data );
		unset( $fm->remove_default_meta_boxes );
		unset( $fm->template );
		unset( $fm->meta_boxes_to_remove );
		unset( $fm->index_filter );
		unset( $fm->escape );
		unset( $fm->is_attachment );

		if ( ! empty( $fm->children ) ) {
			foreach ( $fm->children as $index => $child ) {
				$fm->children[ $index ] = $this->remove_recursion( $child );
			}
		}
		$fm->fm_class = get_class( $fm );

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

	/**
	 * Gets the REST schema for the metaboxes
	 *
	 * @return array
	 */
	private function get_metabox_schema() {
		return [
			'title' => [
				'description' => esc_html__( 'The metabox title.', 'fm-gutenberg' ),
				'type'        => 'string',
				'required'    => true,
			],
			'fm'    => [
				'description' => esc_html__( 'The object describing the Fieldmanager field.', 'fm-gutenberg' ),
				'type'        => 'object',
				'required'    => true,
				'items'       => [
					'field_class'               => [
						'description' => esc_html__( 'The field class.', 'fm-gutenberg' ),
						'type'        => 'string',
						'required'    => true,
					],
					'limit'                     => [
						'description' => esc_html__( 'The limit for repeatable fields.', 'fm-gutenberg' ),
						'type'        => 'number',
						'required'    => false,
					],
					'starting_count'            => [
						'description' => esc_html__( 'The starting count for repeatable fields.', 'fm-gutenberg' ),
						'type'        => 'number',
						'required'    => false,
					],
					'minimum_count'             => [
						'description' => esc_html__( 'The minimum count for repeatable fields.', 'fm-gutenberg' ),
						'type'        => 'number',
						'required'    => false,
					],
					'extra_elements'            => [
						'description' => esc_html__( 'The number of extra elements to display by default.', 'fm-gutenberg' ),
						'type'        => 'number',
						'required'    => false,
					],
					'add_more_label'            => [
						'description' => esc_html__( 'The label for the add more button.', 'fm-gutenberg' ),
						'type'        => 'string',
						'required'    => false,
					],
					'name'                      => [
						'description' => esc_html__( 'The field name.', 'fm-gutenberg' ),
						'type'        => 'string',
						'required'    => true,
					],
					'label'                     => [
						'description' => esc_html__( 'The field label.', 'fm-gutenberg' ),
						'type'        => 'string',
						'required'    => true,
					],
					'inline_label'              => [
						'description' => esc_html__( 'Whether the label should be displayed inline.', 'fm-gutenberg' ),
						'type'        => 'boolean',
						'required'    => false,
					],
					'label_after_element'       => [
						'description' => esc_html__( 'Whether the label should be displayed after the element.', 'fm-gutenberg' ),
						'type'        => 'boolean',
						'required'    => false,
					],
					'description'               => [
						'description' => esc_html__( 'The field description text.', 'fm-gutenberg' ),
						'type'        => 'string',
						'required'    => false,
					],
					'description_after_element' => [
						'description' => esc_html__( 'Whether the description should be displayed after the element.', 'fm-gutenberg' ),
						'type'        => 'boolean',
						'required'    => false,
					],
					'attributes'                => [
						'description' => esc_html__( 'The field attributes.', 'fm-gutenberg' ),
						'type'        => 'object',
						'required'    => false,
						'items'       => [
							'size' => [
								'description' => esc_html__( 'The size of a text field.', 'fm-gutenberg' ),
								'type'        => 'number',
								'required'    => false,
							],
						],
					],
					'one_label_per_item'        => [
						'description' => esc_html__( 'Whether to show one label per item.', 'fm-gutenberg' ),
						'type'        => 'boolean',
						'required'    => false,
					],
					'sortable'                  => [
						'description' => esc_html__( 'Whether the field is sortable.', 'fm-gutenberg' ),
						'type'        => 'boolean',
						'required'    => false,
					],
					'label_element'             => [
						'description' => esc_html__( 'The html element to use for the label.', 'fm-gutenberg' ),
						'type'        => 'string',
						'required'    => false,
					],
					'sanitize'                  => [
						'description' => esc_html__( 'The function called to sanitize input.', 'fm-gutenberg' ),
						'type'        => 'string',
						'required'    => false,
					],
					'validate'                  => [
						'description' => esc_html__( 'An array of functions used to validate the input.', 'fm-gutenberg' ),
						'type'        => 'boolean',
						'required'    => false,
					],
					'validation_rules'          => [
						'description' => esc_html__( 'Validation rules to run on the input.', 'fm-gutenberg' ),
						'type'        => 'array',
						'required'    => false,
						'items'       => 'string',
					],
					'validation_messages'       => [
						'description' => esc_html__( 'Messages to display if validation fails.', 'fm-gutenberg' ),
						'type'        => 'array',
						'required'    => false,
						'items'       => 'string',
					],
					'required'                  => [
						'description' => esc_html__( 'Whether the field is required.', 'fm-gutenberg' ),
						'type'        => 'boolean',
						'required'    => false,
					],
					'data_type'                 => [
						'description' => esc_html__( 'The type of data.', 'fm-gutenberg' ),
						'type'        => 'string',
						'required'    => false,
					],
					'data_id'                   => [
						'description' => esc_html__( 'The data id.', 'fm-gutenberg' ),
						'type'        => 'number',
						'required'    => false,
					],
					'current_context'           => [
						'description' => esc_html__( 'The current context.', 'fm-gutenberg' ),
						'type'        => 'string',
						'required'    => false,
					],
					'save_empty'                => [
						'description' => esc_html__( 'Whether to save empty values.', 'fm-gutenberg' ),
						'type'        => 'boolean',
						'required'    => false,
					],
					'skip_save'                 => [
						'description' => esc_html__( 'Whether to skip saving this value.', 'fm-gutenberg' ),
						'type'        => 'boolean',
						'required'    => false,
					],
					'index'                     => [
						'description' => esc_html__( 'Whether to index this field.', 'fm-gutenberg' ),
						'type'        => 'boolean',
						'required'    => false,
					],
					'serialize_data'            => [
						'description' => esc_html__( 'Whether to serialize the data.', 'fm-gutenberg' ),
						'type'        => 'boolean',
						'required'    => false,
					],
					'datasource'                => [
						'description' => esc_html__( 'The source for data.', 'fm-gutenberg' ),
						'type'        => 'string',
						'required'    => false,
					],
					'display_if'                => [
						'description' => esc_html__( 'Conditional display rules.', 'fm-gutenberg' ),
						'type'        => 'object',
						'properties'  => [
							'src'   => [
								'description' => esc_html__( 'The name of the field to use as a display trigger', 'fm-gutenberg' ),
								'type'        => 'string',
								'required'    => true,
							],
							'value' => [
								'description' => esc_html__( 'The value the display trigger field must be to display', 'fm-gutenberg' ),
								'type'        => 'string',
								'required'    => true,
							],
						],
						'required'    => false,
					],
					'add_more_position'         => [
						'description' => esc_html__( 'Where to display the add more button.', 'fm-gutenberg' ),
						'type'        => 'string',
						'required'    => false,
					],
					'remove_default_meta_boxes' => [
						'description' => esc_html__( 'Whether to remove default meta boxes.', 'fm-gutenberg' ),
						'type'        => 'boolean',
						'required'    => true,
					],
					'template'                  => [
						'description' => esc_html__( 'The field template.', 'fm-gutenberg' ),
						'type'        => 'string',
						'required'    => false,
					],
					'meta_boxes_to_remove'      => [
						'description' => esc_html__( 'Metaboxes to remove.', 'fm-gutenberg' ),
						'type'        => 'array',
						'required'    => false,
						'items'       => 'string',
					],
					'default_value'             => [
						'description' => esc_html__( 'Default value.', 'fm-gutenberg' ),
						'type'        => 'string',
						'required'    => false,
					],
					'index_filter'              => [
						'description' => esc_html__( 'Function that parses an index value and returns an optionally modified value.', 'fm-gutenberg' ),
						'type'        => 'string',
						'required'    => false,
					],
					'input_type'                => [
						'description' => esc_html__( 'The input type.', 'fm-gutenberg' ),
						'type'        => 'string',
						'required'    => false,
					],
					'escape'                    => [
						'description' => esc_html__( 'Custom escaping for labels, descriptions, etc.', 'fm-gutenberg' ),
						'type'        => 'array',
						'required'    => false,
						'items'       => 'string', // Associative array of $field => $callable arguments, for example
					],
					'is_attachment'             => [
						'description' => esc_html__( 'Is this field an attachment.', 'fm-gutenberg' ),
						'type'        => 'boolean',
						'required'    => false,
					],
				],
			],
		];
	}
}
