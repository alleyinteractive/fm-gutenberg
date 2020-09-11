<?php
/**
 * WP Starter Plugin Tests: Test_Meta Class
 *
 * @package WP_Starter_Plugin
 * @subpackage Tests
 */

/**
 * Tests the functionality of the meta helpers.
 */
class Test_Meta extends WP_UnitTestCase {

	/**
	 * Tests the functionality of register_meta_helper.
	 */
	public function test_register_meta_helper() {

		// Register post meta to test.
		\WP_Starter_Plugin\register_meta_helper(
			'post',
			[ 'post' ],
			'test_post_meta_key'
		);

		// Register term meta to test.
		\WP_Starter_Plugin\register_meta_helper(
			'term',
			[ 'category' ],
			'test_term_meta_key'
		);

		// Ensure meta is registered for the post type specified.
		$registered = get_registered_meta_keys( 'post', 'post' );
		$this->assertNotEmpty( $registered['test_post_meta_key'] );

		// Ensure defaults were applied properly.
		$this->assertArraySubset(
			[
				'show_in_rest' => true,
				'single'       => true,
				'type'         => 'string',
			],
			$registered['test_post_meta_key']
		);

		// Ensure meta is not registered for a different post type.
		$registered = get_registered_meta_keys( 'post', 'page' );
		$this->assertFalse( isset( $registered['test_post_meta_key'] ) );

		// Ensure meta is registered for the term type specified.
		$registered = get_registered_meta_keys( 'term', 'category' );
		$this->assertNotEmpty( $registered['test_term_meta_key'] );

		// Ensure defaults were applied properly.
		$this->assertArraySubset(
			[
				'show_in_rest' => true,
				'single'       => true,
				'type'         => 'string',
			],
			$registered['test_term_meta_key']
		);

		// Ensure meta is not registered for a different term type.
		$registered = get_registered_meta_keys( 'term', 'post_tag' );
		$this->assertFalse( isset( $registered['test_term_meta_key'] ) );

		// Ensure custom options are supported.
		\WP_Starter_Plugin\register_meta_helper(
			'post',
			[ 'post' ],
			'test_custom_meta_key',
			[
				'sanitize_callback' => 'absint',
				'show_in_rest'      => false,
				'single'            => false,
				'type'              => 'integer',
			]
		);
		$registered = get_registered_meta_keys( 'post', 'post' );
		$this->assertNotEmpty( $registered['test_custom_meta_key'] );
		$this->assertArraySubset(
			[
				'sanitize_callback' => 'absint',
				'show_in_rest'      => false,
				'single'            => false,
				'type'              => 'integer',
			],
			$registered['test_custom_meta_key']
		);
	}
}
