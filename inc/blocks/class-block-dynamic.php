<?php
/**
 * Custom dynamic block.
 *
 * @package WP_Starter_Plugin
 */

namespace WP_Starter_Plugin;

/**
 * Class for the dynamic block.
 */
class Block_Dynamic extends Block {

	/**
	 * Name of the custom block.
	 *
	 * @var string
	 */
	public $name = 'dynamic-block';

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
			get_versioned_asset_path( "{$this->name}.js" ),
			[ 'wp-blocks', 'wp-i18n' ],
			'1.0.0',
			true
		);
		// Hook up the i18n functionality.
		inline_locale_data( $this->editor_script_handle );

		// Register the block.
		$this->register_block_type();
	}
}
$wp_starter_plugin_block_dynamic = new Block_Dynamic();
