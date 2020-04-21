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

// Include functions for working with meta.
require_once __DIR__ . '/inc/meta.php';

// Include functions.php for registering custom post types, etc.
require_once __DIR__ . '/functions.php';

// Include the base block class used to scaffold block registration.
require_once __DIR__ . '/inc/blocks/class-block.php';

// Include each gutenberg block.
require_once __DIR__ . '/inc/blocks/class-block-sample-block.php';
require_once __DIR__ . '/inc/blocks/class-block-dynamic-block.php';

// Register custom meta fields.
register_meta_helper( 'post', [ 'page', 'post' ], 'wp_starter_plugin_open_graph_description' );
register_meta_helper( 'post', [ 'page', 'post' ], 'wp_starter_plugin_open_graph_image', [ 'type' => 'integer' ] );
register_meta_helper( 'post', [ 'page', 'post' ], 'wp_starter_plugin_open_graph_title' );
