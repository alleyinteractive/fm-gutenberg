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

add_action( 'after_setup_theme', __NAMESPACE__ . '\setup_features' );
// add_action( 'init', __NAMESPACE__ . '\register_fm_meta_fields', 100 );

/**
 * Setup REST API features.
 */
function setup_features() {
	REST_API\Post_Fields::instance();
}

function load_meta_boxes( $post_type ) {
	global $wp_meta_boxes;

	$posttype_meta_boxes = isset( $wp_meta_boxes[ $post_type ] ) ? $wp_meta_boxes[ $post_type ] : [];
	if ( empty ( $posttype_meta_boxes ) ) {
		return [];
	}
	$side_meta_boxes = isset( $posttype_meta_boxes['side'] ) ? $posttype_meta_boxes['side'] : [];
	if ( empty ( $side_meta_boxes ) ) {
		return [];
	}

	$meta_boxes = [];
	foreach( $side_meta_boxes as $context ) {
		$meta_boxes = array_merge( $meta_boxes, $context );
	}

	$fm_meta_boxes = array_filter(
		$meta_boxes,
		function( $value, $key ) {
			return str_starts_with( $key, 'fm_meta_box_' );
		},
		ARRAY_FILTER_USE_BOTH
	);
	return $fm_meta_boxes;
}

function register_fm_meta_fields() {
	$post_types = array_keys( get_post_types() );
	foreach ( $post_types as $post_type ) {
		$fm_meta_boxes = load_meta_boxes( $post_type );
		foreach ( $fm_meta_boxes as $fm_meta_box ) {
			$context = $fm_meta_box['callback'][0]->fm;
			if ( empty( $context->children ) ) {
				\FM_Gutenberg\register_meta_helper(
					'post',
					[ 'demo-text' ],
					$context->name,
					[
						'default' => '',
					]
				);
			}
		}
	}
}