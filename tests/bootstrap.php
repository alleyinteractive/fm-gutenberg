<?php
/**
 * WP_Starter_Plugin Tests: Bootstrap File
 *
 * @package WP_Starter_Plugin
 * @subpackage Tests
 */

const WP_TESTS_PHPUNIT_POLYFILLS_PATH = __DIR__ . '/../vendor/yoast/phpunit-polyfills';

// Load Core's test suite.
$wp_starter_plugin_tests_dir = getenv( 'WP_TESTS_DIR' );
if ( ! $wp_starter_plugin_tests_dir ) {
	$wp_starter_plugin_tests_dir = '/tmp/wordpress-tests-lib';
}

require_once $wp_starter_plugin_tests_dir . '/includes/functions.php'; // phpcs:ignore WordPressVIPMinimum.Files.IncludingFile.UsingVariable

/**
 * Setup our environment.
 */
function wp_starter_plugin_manually_load_environment() {
	/*
	 * Tests won't start until the uploads directory is scanned, so use the
	 * lightweight directory from the test install.
	 *
	 * @see https://core.trac.wordpress.org/changeset/29120.
	 */
	add_filter(
		'pre_option_upload_path',
		function () {
			return ABSPATH . 'wp-content/uploads';
		}
	);

	// Load this plugin.
	require_once dirname( __DIR__ ) . '/index.php';
}
tests_add_filter( 'muplugins_loaded', 'wp_starter_plugin_manually_load_environment' );

// Disable the emoji detection script, because it throws unnecessary errors.
tests_add_filter(
	'init',
	function () {
		remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
	}
);

// Include core's bootstrap.
require $wp_starter_plugin_tests_dir . '/includes/bootstrap.php'; // phpcs:ignore WordPressVIPMinimum.Files.IncludingFile.UsingVariable
