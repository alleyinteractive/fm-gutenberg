<?php
/**
 * Custom Sample block.
 *
 * @package WP_Starter_Plugin
 */

namespace WP_Starter_Plugin;

/**
 * Class for the Sample block.
 */
class Block_Sample extends Block {

	/**
	 * Name of the custom block.
	 *
	 * @var string
	 */
	public $name = 'sample-block';

	/**
	 * Whether the block is a dynamic block or not.
	 * Default is true.
	 *
	 * @var boolean
	 */
	public $is_dynamic = false;

}
$wp_starter_plugin_block_sample = new Block_Sample();
