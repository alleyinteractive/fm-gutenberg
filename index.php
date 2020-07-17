<?php
/**
 * Reusable extensions for the WP Starter Plugin site.
 *
 * Plugin Name: WP Starter Plugin Extensions
 * Plugin URI: https://github.com/alleyinteractive/wp-starter-plugin
 * Description: Extensions to the WP Starter Plugin site.
 * Version: 1.0.0
 * Author: Alley
 *
 * @package WP_Starter_Plugin
 */

namespace WP_Starter_Plugin;

// Include functions for working with assets (primarily JavaScript).
require_once __DIR__ . '/inc/assets.php';
require_once __DIR__ . '/inc/asset-loader-bridge.php';

// Include functions for working with meta.
require_once __DIR__ . '/inc/meta.php';

// Include functions.php for registering custom post types, etc.
require_once __DIR__ . '/functions.php';
