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
class WP_Starter_Plugin_Dynamic_Block extends WP_Starter_Plugin_Block {

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
		$this->register_block_scripts();

		// Register the block.
		$this->register_block_type();
	}
}
$wp_starter_plugin_dynamic_block = new WP_Starter_Plugin_Dynamic_Block();