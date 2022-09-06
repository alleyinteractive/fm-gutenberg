<?php
/**
 * FM Gutenberg: Custom post type and taxonomy registration
 *
 * @package FM_Gutenberg
 */

namespace FM_Gutenberg;

// Content types and taxonomies should be included below. In order to scaffold
// them, leave the Begin and End comments in place.
/* Begin Data Structures */

/* End Data Structures */

// Singleton trait.
require_once __DIR__ . '/inc/singleton.php';

// Fieldmanager Post fields API field.
require_once __DIR__ . '/inc/rest-api/class-post-fields.php';

// Add main metabox.
require_once __DIR__ . '/inc/metaboxes.php';

add_action( 'after_setup_theme', __NAMESPACE__ . '\setup_features' );

/**
 * Setup REST API features.
 */
function setup_features() {
	REST_API\Post_Fields::instance();
}
