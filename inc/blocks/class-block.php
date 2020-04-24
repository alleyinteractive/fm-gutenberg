<?php
/**
 * Block base class file.
 *
 * @package WP_Starter_Plugin
 */

namespace WP_Starter_Plugin;

/**
 * Abstract class for blocks.
 */
abstract class Block {

	/**
	 * Namespace of the block.
	 *
	 * @var string
	 */
	public $namespace = null;

	/**
	 * Name of the block without the namespace.
	 *
	 * @var string
	 */
	public $name = null;

	/**
	 * The block name with namespace. e.g. namespace/block-name
	 *
	 * @var string
	 */
	public $block_name = null;

	/**
	 * Post types that support this block. Defaults to [ 'all' ], which is all post types.
	 *
	 * @var array
	 */
	public $post_types = [ 'all' ];

	/**
	 * The editor script handle.
	 *
	 * @var string
	 */
	public $editor_script_handle = null;

	/**
	 * Whether the block is a dynamic block or not.
	 * Default is true.
	 *
	 * @var boolean
	 */
	public $is_dynamic = true;

	/**
	 * Constructor.
	 */
	public function __construct() {
		// Register the block.
		add_action( 'init', [ $this, 'register_block' ] );

		if ( empty( $this->block_name ) ) {
			$this->set_block_name();
		}

		if ( empty( $this->editor_script_handle ) ) {
			$this->set_editor_script_handle();
		}
	}

	/**
	 * Create the block.
	 */
	public function register_block() {

		// Determine if we should register this block for this post type.
		if ( ! $this->should_register() ) {
			return;
		}

		// Register the block scripts.
		$this->register_scripts();

		// Register the block.
		$this->register_block_type();
	}

	/**
	 * Sets the block name with the proper namespace and block name. e.g. namespace/block-name
	 */
	private function set_block_name() {
		$this->block_name = sprintf( '%1$s/%2$s', $this->get_namespace(), $this->name );
	}

	/**
	 * Dynamically set the editor script handle based off of the block namespace and name.
	 */
	private function set_editor_script_handle() {
		$this->editor_script_handle = sprintf( '%1$s-%2$s', $this->get_namespace(), $this->name );
	}

	/**
	 * Get a namespace based off of the plugin namespace or provide a custom namespace.
	 *
	 * @return string
	 */
	protected function get_namespace() {
		// set default namespace.
		$namespace = 'wp-starter-plugin';

		if ( ! empty( $this->namespace ) ) {
			$namespace = $this->namespace;
		}
		// As a fallback, use the WP_Starter_Plugin namespace converted to lowercase and hyphens.
		$plugin_namespace = strtolower( str_replace( '_', '-', __NAMESPACE__ ) );

		if ( ! empty( $plugin_namespace ) ) {
			$namespace = $plugin_namespace;
		}

		return $namespace;
	}

	/**
	 * Helper function to determine if this block should be registered.
	 *
	 * @returns boolean True if this block should be registered for the current post type, false otherwise.
	 */
	protected function should_register() {
		global $post_type;

		return in_array( 'all', $this->post_types, true )
			|| in_array( $post_type, $this->post_types, true );
	}

	/**
	 * Handles the block registration.
	 *
	 * @param array $args (array) (Optional) Array of block type arguments.
	 * Any arguments may be defined, however the ones described below are supported by default.
	 * 
	 * @see https://developer.wordpress.org/reference/functions/register_block_type/
	 *
	 * @return void
	 */
	protected function register_block_type( array $args = [] ) {

		/**
		 * Filter the block editor styles handle.
		 * 
		 * A theme may wish to apply a different presentation for the editor styles.
		 * This is empty by default, no editor styles.
		 * 
		 * @param string The handle of the script to enqueue for block editor styles.
		 */
		$editor_style_handle = apply_filters( "{$this->block_name}_editor_style_handle", '' ); // phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound

		$args = wp_parse_args(
			$args,
			[
				'editor_script'   => $this->editor_script_handle,
				'render_callback' => $this->is_dynamic ? [ $this, 'render_callback' ] : null,
				'editor_style'    => $editor_style_handle,
			]
		);

		// Register the block.
		register_block_type(
			$this->block_name,
			$args
		);
	}

	/**
	 * Register the script that powers the block and hook up the i18n functionality.
	 *
	 * @return void
	 */
	public function register_scripts() {
		// Get the versioned asset directory path to require the file.
		$script_asset_path = get_versioned_asset_path( "{$this->name}.php", true );

		// Provide a fallback for dependencies array.
		$script_asset = ( file_exists( $script_asset_path ) && 0 === validate_file( $script_asset_path ) )
			? require $script_asset_path // phpcs:ignore WordPressVIPMinimum.Files.IncludingFile.IncludingFile
			: [ 'dependencies' => [] ];

		wp_register_script(
			$this->editor_script_handle,
			get_versioned_asset_path( "{$this->name}.js" ),
			$script_asset['dependencies'],
			'1.0.0', // Do not change this value. Asset versions are handled via get_versioned_asset_path above.
			true
		);

		inline_locale_data( $this->editor_script_handle );
	}

	/**
	 * Callback for rendering the block.
	 *
	 * @param array $attributes The attributes for this block.
	 * @return string The content for the block.
	 */
	public function render_callback( array $attributes ) {
		/**
		 * Filter the block attributes before passing them to the template part.
		 *
		 * @param array $attributes the block attributes.
		 */
		$attributes = apply_filters( "{$this->block_name}_attributes", $attributes ); // phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound

		ob_start();
		include dirname( __DIR__, 2 ) . "/template-parts/blocks/{$this->name}.php";
		return ob_get_clean();
	}
}
