<?php
/**
 * Custom Sample block.
 *
 * @package WP_Starter_Plugin
 */

use function WP_Starter_Plugin\inline_locale_data;
use function WP_Starter_Plugin\get_versioned_asset_path;

/**
 * Class for the Sample block.
 */
class WP_Starter_Plugin_Sample_Block extends WP_Starter_Plugin_Block {

	/**
	 * Name of the custom block.
	 *
	 * @var string
	 */
	public $name = 'wp-starter-plugin/sample-block';

	public $editor_script = 'wp-starter-plugin-block-sample-block';

	/**
	 * Creates the block.
	 */
	public function register_block() {

		// Determine if we should register this block for this post type.
		if ( ! $this->should_register() ) {
			return;
		}

		// Register the script that powers the block.
		wp_register_script(
			$this->editor_script,
			get_versioned_asset_path( 'blockSampleBlock.js' ),
			[ 'wp-blocks', 'wp-i18n' ],
			'1.0.0',
			true
		);

		// Hook up the i18n functionality.
		inline_locale_data( $this->editor_script );

		// Register the block.
		register_block_type(
			$this->name,
			[
				'editor_script' => $this->editor_script,
			]
		);
	}

	/**
	 * Renders the dynamic block.
	 *
	 * @param array $attributes The attributes for this block.
	 * @return string The content for the block.
	 */
	public function render_dynamic_block( $attributes ) {
		ob_start();
		include dirname( __DIR__, 2 ) . '/template-parts/blocks/dynamic-block.php';
		return ob_get_clean();
	}
}
$wp_starter_plugin_Sample_Block = new WP_Starter_Plugin_Sample_Block();