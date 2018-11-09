<?php

// Load Core's test suite.
$_tests_dir = getenv( 'WP_TESTS_DIR' );
if ( ! $_tests_dir ) {
	$_tests_dir = '/tmp/wordpress-tests-lib';
}

require_once $_tests_dir . '/includes/functions.php';

/**
 * Setup our environment.
 */
function _manually_load_environment() {
	/*
	 * Tests won't start until the uploads directory is scanned, so use the
	 * lightweight directory from the test install.
	 *
	 * @see https://core.trac.wordpress.org/changeset/29120.
	 */
	add_filter( 'pre_option_upload_path', function () {
		return ABSPATH . 'wp-content/uploads';
	} );

	// Load this plugin.
	require_once dirname( __DIR__ ) . '/index.php';
}
tests_add_filter( 'muplugins_loaded', '_manually_load_environment' );

// Include core's bootstrap.
require $_tests_dir . '/includes/bootstrap.php';
