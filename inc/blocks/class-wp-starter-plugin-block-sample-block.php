<?php
/**
 * Block definition for Sample Block
 *
 * @package Wp_Starter_Plugin
 */

namespace WP_Starter_Plugin;

/**
 * Class for the sample-block block.
 */
class Wp_Starter_Plugin_Block_Sample_Block extends Wp_Starter_Plugin_Block {

	/**
	 * Namespace of the custom block.
	 *
	 * @var string
	 */
	public $namespace = 'wp-starter-plugin';

	/**
	 * Name of the custom block.
	 *
	 * @var string
	 */
	public $name = 'sample-block';
}
$wp_starter_plugin_block_sample_block = new Wp_Starter_Plugin_Block_Sample_Block();
