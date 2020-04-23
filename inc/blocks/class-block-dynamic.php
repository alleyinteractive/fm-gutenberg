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

}
$wp_starter_plugin_block_dynamic = new Block_Dynamic();
