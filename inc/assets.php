<?php
/**
 * Contains functions for working with assets (primarily JavaScript).
 *
 * @package WP_Starter_Plugin
 */

namespace WP_Starter_Plugin;

// Register action and filter hooks.
add_action(
	'admin_enqueue_scripts',
	__NAMESPACE__ . '\action_admin_enqueue_scripts'
);
add_action(
	'enqueue_block_editor_assets',
	__NAMESPACE__ . '\action_enqueue_block_editor_assets'
);

/**
 * Enqueue general-purpose scripts in the admin.
 */
function action_admin_enqueue_scripts() {
	wp_enqueue_script(
		'wp-starter-plugin-plugin-sidebar',
		plugins_url( 'build/pluginSidebar.js', __DIR__ ),
		[ 'wp-i18n', 'wp-edit-post' ],
		'1.0.0',
		true
	);
	inline_locale_data( 'wp-starter-plugin-plugin-sidebar' );
}

/**
 * A callback for the enqueue_block_editor_assets action hook.
 */
function action_enqueue_block_editor_assets() {
	global $post_type;

	// Only enqueue the script to register the Sample Block if supported.
	if ( 'post' === $post_type ) {
		wp_enqueue_script(
			'wp-starter-plugin-block-sample-block',
			plugins_url( 'build/blockSampleBlock.js', __DIR__ ),
			[ 'wp-blocks', 'wp-i18n' ],
			'1.0.0',
			true
		);
		inline_locale_data( 'wp-starter-plugin-block-sample-block' );
	}
}

/**
 * Creates a new Jed instance with specified locale data configuration.
 *
 * @param string $to_handle The script handle to attach the inline script to.
 */
function inline_locale_data( string $to_handle ) {
	// Define locale data for Jed.
	$locale_data = [
		'' => [
			'domain' => 'wp-starter-plugin',
			'lang'   => is_admin() ? get_user_locale() : get_locale(),
		],
	];

	// Pass the Jed configuration to the admin to properly register i18n.
	wp_add_inline_script(
		$to_handle,
		'wp.i18n.setLocaleData( ' . wp_json_encode( $locale_data ) . ", 'wp-starter-plugin' );"
	);
}
