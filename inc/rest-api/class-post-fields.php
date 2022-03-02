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
	 * Set everything up.
	 */
	protected function __construct() {
		add_action( 'rest_api_init', [ $this, 'register_field' ] );
	}

	/**
	 * Register the rest field.
	 */
	public function register_field() {
		register_rest_field(
			'post',
			'fm_gutenberg_fields',
			[
				'get_callback' => [ $this, 'get_value' ],
				// 'schema' => [], TODO
			]
		);
	}

	/**
	 * Get the value.
	 *
	 * @param Object $post The requested post.
	 * @return array|\WP_Error
	 */
	public function get_value( $post ) {
		return [];
	}
}
