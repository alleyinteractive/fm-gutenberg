<?php
/**
 * Block base class file
 *
 * @package WP_Starter_Plugin
 */

/**
 * Abstract class for blocks.
 */
abstract class WP_Starter_Plugin_Block {

	/**
	 * Name of the block.
	 *
	 * @var string
	 */
	public $name = null;

	/**
	 * Post types that support this block. Defaults to [ 'all' ], which is all post types.
	 *
	 * @var array
	 */
	public $post_types = [ 'all' ];

	/**
	 * Constructor.
	 */
	public function __construct() {
		// Register the block.
		add_action( 'init', [ $this, 'register_block' ] );
	}

	/**
	 * Create the block.
	 */
	abstract public function register_block();

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
}