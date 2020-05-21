// Import WordPress block dependencies.
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

import attributes from './attributes.json';
import edit from './edit';

registerBlockType(
  'wp-starter-plugin/sample-block',
  {
    attributes,
    category: 'widgets',
    description: __(
      'A dynamic block to demonstrate block structure and inclusion patterns.',
      'wp-starter-plugin',
    ),
    edit,
    icon: 'layout',
    keywords: [
      __('dynamic', 'wp-starter-plugin'),
      __('block', 'wp-starter-plugin'),
    ],
    title: __('Sample Block', 'wp-starter-plugin'),
  },
);
