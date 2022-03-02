<?php
/**
 * Gutenberg Support for Fieldmanager.
 *
 * Plugin Name: Fieldmanager Gutenberg Suport
 * Plugin URI: https://github.com/alleyinteractive/fm-gutenberg
 * Description: Translates Fieldmanager code to React Gutenberg slotfills.
 * Version: 1.0.0
 * Author: Alley
 *
 * @package FM_Gutenberg
 */

namespace FM_Gutenberg;

// Include functions for working with assets (primarily JavaScript).
require_once __DIR__ . '/inc/assets.php';
require_once __DIR__ . '/inc/asset-loader-bridge.php';

// Include functions for working with meta.
require_once __DIR__ . '/inc/meta.php';

// Include functions.php for registering custom post types, etc.
require_once __DIR__ . '/functions.php';
