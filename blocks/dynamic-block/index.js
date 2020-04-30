// Import WordPress block dependencies.
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

import attributes from './attributes';
import edit from './edit';

registerBlockType(
  'wp-starter-plugin/dynamic-block',
  {
    attributes,
    category: 'widgets',
    description: __(
      'A dynamic block to demonstrate a dynamic block structure and inclusion patterns.',
      'wp-starter-plugin',
    ),
    edit,
    icon: 'layout',
    keywords: [
      __('dynamic', 'wp-starter-plugin'),
      __('block', 'wp-starter-plugin'),
    ],
    save: () => null,
    supports: {
      html: false,
    },
    title: __('Dynamic Block', 'wp-starter-plugin'),
  },
);
