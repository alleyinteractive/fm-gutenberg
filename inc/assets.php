<?php
/**
 * Contains functions for working with assets (primarily JavaScript).
 *
 * @package WP_Starter_Plugin
 */

namespace WP_Starter_Plugin;

// Register action and filter hooks.
add_action(
	'enqueue_block_editor_assets',
	__NAMESPACE__ . '\action_enqueue_block_editor_assets'
);

/**
 * Set allowed post types.
 *
 * @return array array of post types allowed for Gutenberg.
 */
function allowed_post_types() {
	return [
		'post',
	];
}

/**
 * A callback for the enqueue_block_editor_assets action hook.
 */
function action_enqueue_block_editor_assets() {
	global $post_type;

	// Only enqueue the script to register the scripts if supported.
	if ( ! in_array( $post_type, allowed_post_types(), true ) ) {
		return;
	}

	wp_enqueue_script(
		'wp-starter-plugin-plugin-sidebar',
		get_versioned_asset_path( 'pluginSidebar.js' ),
		[ 'wp-i18n', 'wp-edit-post' ],
		'1.0.0',
		true
	);
	inline_locale_data( 'wp-starter-plugin-plugin-sidebar' );
}

/**
 * Get the contentHash for a given asset.
 *
 * @param string $asset Entry point and asset type separated by a '.'.
 *
 * @return string The asset's hash.
 */
function get_asset_hash( $asset ) {
	return get_asset_property( $asset, 'hash' ) ?? '1.0.0';
}

/**
 * Get the asset map.
 *
 * @return array The asset map.
 */
function get_asset_map() {
	static $asset_map;

	if ( ! isset( $asset_map ) ) {
		$asset_map      = [];
		$asset_map_file = dirname( __DIR__ ) . '/build/assetMap.json';
		if ( file_exists( $asset_map_file ) && 0 === validate_file( $asset_map_file ) ) {
			// Ignore the warning on file_get_contents since we are fetching a local file that we know exists.
			// phpcs:ignore WordPressVIPMinimum.Performance.FetchingRemoteData.FileGetContentsUnknown
			$asset_map_data = file_get_contents( $asset_map_file );
			if ( ! empty( $asset_map_data ) ) {
				$asset_map_decoded = json_decode( $asset_map_data, true );
				if ( ! empty( $asset_map_decoded ) ) {
					$asset_map = $asset_map_decoded;
				}
			}
		}
	}

	return $asset_map;
}

/**
 * Get the URL for a given asset.
 *
 * @param string $asset Entry point and asset type separated by a '.'.
 *
 * @return string The asset URL.
 */
function get_asset_path( $asset ) {
	$relative_path = get_asset_property( $asset, 'path' );
	return ! empty( $relative_path )
		? plugins_url( 'build/' . $relative_path, __DIR__ )
		: '';
}

/**
 * Get a property for a given asset.
 *
 * @param string $asset Entry point and asset type separated by a '.'.
 * @param string $prop The property to get from the entry object.
 *
 * @return string The asset property based on entry and type.
 */
function get_asset_property( $asset, $prop ) {
	$asset_map = get_asset_map();

	/*
	 * Appending a '.' ensures the explode() doesn't generate a notice while
	 * allowing the variable names to be more readable via list().
	 */
	list( $entrypoint, $type ) = explode( '.', "$asset." );

	return $asset_map[ $entrypoint ][ $type ][ $prop ] ?? null;
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
