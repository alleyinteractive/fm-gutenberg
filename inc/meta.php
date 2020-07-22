<?php
/**
 * Contains functions for working with meta.
 *
 * @package WP_Starter_Plugin
 */

namespace WP_Starter_Plugin;

// Register custom meta fields.
register_post_meta_from_defs();

/**
 * Reads the post meta definitions from config and registers them.
 */
function register_post_meta_from_defs() {
	// Ensure the config file exists.
	$filepath = dirname( __DIR__ ) . '/config/post-meta.json';
	if ( ! file_exists( $filepath )
		|| 0 !== validate_file( $filepath )
	) {
		return;
	}

	// Try to read the file's contents. We can dismiss the "uncached" warning here because it is a local file.
	// phpcs:ignore WordPressVIPMinimum.Performance.FetchingRemoteData.FileGetContentsUnknown
	$definitions = json_decode( file_get_contents( $filepath ), true );
	if ( empty( $definitions ) ) {
		return;
	}

	// Loop through definitions and register each.
	foreach ( $definitions as $meta_key => $definition ) {
		$args = [];

		// Add type, if specified.
		if ( ! empty( $definition['type'] ) ) {
			$args['type'] = $definition['type'];
		}

		// Add schema, if specified.
		if ( ! empty( $definition['schema'] ) ) {
			$args['show_in_rest']['schema'] = $definition['schema'];
		}

		// Register the meta.
		register_meta_helper(
			'post',
			$definition['post_types'] ?? [],
			$meta_key,
			$args
		);
	}
}

/**
 * Register meta for posts or terms with sensible defaults and sanitization.
 *
 * @throws \InvalidArgumentException For unmet requirements.
 *
 * @see \register_post_meta
 * @see \register_term_meta
 *
 * @param string $object_type  The type of meta to register, which must be one of 'post' or 'term'.
 * @param array  $object_slugs The post type or taxonomy slugs to register with.
 * @param string $meta_key     The meta key to register.
 * @param array  $args         Optional. Additional arguments for register_post_meta or register_term_meta. Defaults to an empty array.
 * @return bool True if the meta key was successfully registered in the global array, false if not.
 */
function register_meta_helper(
	string $object_type,
	array $object_slugs,
	string $meta_key,
	array $args = []
) : bool {

	// Object type must be either post or term.
	if ( ! in_array( $object_type, [ 'post', 'term' ], true ) ) {
		throw new \InvalidArgumentException(
			__(
				'Object type must be one of "post", "term".',
				'wp-starter-plugin'
			)
		);
	}

	// Merge provided arguments with defaults.
	$args = wp_parse_args(
		$args,
		[
			'show_in_rest' => true,
			'single'       => true,
			'type'         => 'string',
		]
	);

	// Fork for object type.
	switch ( $object_type ) {
		case 'post':
			foreach ( $object_slugs as $object_slug ) {
				if ( ! register_post_meta( $object_slug, $meta_key, $args ) ) {
					return false;
				}
			}
			break;
		case 'term':
			foreach ( $object_slugs as $object_slug ) {
				if ( ! register_term_meta( $object_slug, $meta_key, $args ) ) {
					return false;
				}
			}
			break;
		default:
			return false;
	}

	return true;
}
