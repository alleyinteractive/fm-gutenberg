<?php
/**
 * A bridge between the namespaced function for getting assets and the
 * scaffolded block files. Can be removed once namespacing is fully
 * supported by the scaffolder in a way that won't break integrations
 * with existing sites.
 *
 * This file MUST NOT have a namespace defined in order to work!
 *
 * @package WP_Starter_Plugin
 */

/* phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedFunctionFound */

/**
 * A helper function to bridge the gap between the non-namespaced scaffolded
 * block files and the namespaced block loader in the plugin.
 *
 * @param string  $asset_path Entry point and asset type separated by a '.'.
 * @param boolean $dir_path   Whether to return the directory path or the plugin URL path.
 *
 * @return string The asset version.
 */
function get_versioned_asset_path( $asset_path, $dir_path = false ) {
	return WP_Starter_Plugin\get_versioned_asset_path( $asset_path, $dir_path );
}

/**
 * A helper function to bridge the gap between the non-namespaced scaffolded
 * block files and the namespaced inline locale function in the plugin.
 *
 * @param string $to_handle The script handle to attach the inline script to.
 */
function inline_locale_data( $to_handle ) {
	WP_Starter_Plugin\inline_locale_data( $to_handle );
}
