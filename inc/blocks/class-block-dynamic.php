<?php
/**
 * Custom dynamic block.
 *
 * @package WP_Starter_Plugin
 */

use function WP_Starter_Plugin\inline_locale_data;
use function WP_Starter_Plugin\get_versioned_asset_path;

/**
 * Class for the dynamic block.
 */
class WP_Starter_Plugin_Dynamic_Block extends WP_Starter_Plugin_Block {

	/**
	 * Name of the custom block.
	 *
	 * @var string
	 */
	public $name = 'wp-starter-plugin/dynamic-block';

	public $editor_script_handle = 'wp-starter-plugin-block-dynamic-block';

	public $deps = [ 'wp-blocks', 'wp-i18n' ];

	/**
	 * Creates the block.
	 */
	public function register_block() {

		// Determine if we should register this block for this post type.
		if ( ! $this->should_register() ) {
			return;
		}

		// Register the script that powers the block.
		wp_register_script(
			$this->editor_script_handle,
			get_versioned_asset_path( 'blockDynamicBlock.js' ),
			[ 'wp-blocks', 'wp-i18n' ],
			'1.0.0',
			true
		);
		// Hook up the i18n functionality.
		inline_locale_data( $this->editor_script_handle );

		// Register the block.
		register_block_type(
			$this->name,
			[
				'editor_script'   => $this->editor_script_handle,
				'render_callback' => [ $this, 'render_callback' ],
			]
		);
	}

	/**
	 * Callback for rendering the block.
	 *
	 * @param array $attributes The attributes for this block.
	 * @return string The content for the block.
	 */
	public function render_callback( $attributes ) {

		$attributes = apply_filters( "{$this->name}_attributes", $attributes );

		ob_start();
		include dirname( __DIR__, 2 ) . '/template-parts/blocks/dynamic-block.php';
		return ob_get_clean();
	}
}
$wp_starter_plugin_dynamic_block = new WP_Starter_Plugin_Dynamic_Block();