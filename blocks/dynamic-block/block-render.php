<?php
/**
 * WP Starter Plugin Template Part: Dynamic Block
 * 
 * The block attributes are passed into this template part and are available
 * via the '$attributes' variable
 * 
 * @param string $attributes The block attributes.
 *
 * @package WP_Starter_Plugin
 */
?>

<p><?php echo wp_kses_post( $attributes['dynamicAttribute'] ); ?></p>
