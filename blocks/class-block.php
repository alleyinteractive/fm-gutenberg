<?php
/**
 * Block base class file
 *
 * @package WP_Starter_Plugin
 */

namespace WP_Starter_Plugin;

use function WP_Starter_Plugin\inline_locale_data;
use function WP_Starter_Plugin\get_versioned_asset_path;

/**
 * Abstract class for blocks.
 */
abstract class WP_Starter_Plugin_Block {

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
			$this->block_name = $this->set_block_name();
		}

		if ( empty( $this->editor_script_handle ) ) {
			$this->editor_script_handle = $this->set_editor_script_handle();
		}
	}

	/**
	 * Create the block.
	 */
	abstract public function register_block();

	/**
	 * Set the block name.
	 * 
	 * Sets the block name with the proper namespace and block name. e.g. namespace/block-name
	 *
	 * @return string
	 */
	private function set_block_name() {
		$namespace = $this->get_namespace();
		return "{$namespace}/{$this->name}";
	}

	/**
	 * Get a namespace based off of the plugin namespace or provide a custom namespace.
	 *
	 * @param string $namespace custom namespace
	 * @return string
	 */
	protected function get_namespace() {
		if ( ! empty( $this->namespace ) ) {
			return $this->namespace;
		}
		return strtolower( str_replace( '_', '-', __NAMESPACE__ ) );
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
	 * Registers the block scripts.
	 *
	 * @param array $deps the scripts that this block depends on.
	 * @return void
	 */
	protected function register_block_scripts( array $deps = [] ) {
		$deps = $deps ?? [ 'wp-blocks', 'wp-i18n' ];
		// Register the script that powers the block.
		wp_register_script(
			$this->editor_script_handle,
			get_versioned_asset_path( "{$this->name}.js" ),
			$deps,
			'1.0.0',
			true
		);
		// Hook up the i18n functionality.
		inline_locale_data( $this->editor_script_handle );
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
		$args = wp_parse_args(
			$args,
			[
				'editor_script'   => $this->editor_script_handle,
				'render_callback' => $this->is_dynamic ? [ $this, 'render_callback' ] : null,
			]
		);

		// Register the block.
		register_block_type(
			$this->block_name,
			$args
		);
	}

	/**
	 * Dynamically set the editor script handle based off of the block namespace and name.
	 *
	 * @return string
	 */
	protected function set_editor_script_handle() {
		$name      = $this->name;
		$namespace = $this->get_namespace();
		return "{$namespace}-{$name}";
	}

	/**
	 * Callback for rendering the block.
	 *
	 * @param array $attributes The attributes for this block.
	 * @return string The content for the block.
	 */
	public function render_callback( $attributes ) {
		/**
		 * Filter the block attributes before passing them to the template part.
		 *
		 * @param array $attributes the block attributes.
		 */
		$attributes = apply_filters( "{$this->block_name}_attributes", $attributes );

		ob_start();
		include dirname( __DIR__ ) . "/blocks/{$this->name}/block-render.php";
		return ob_get_clean();
	}
}