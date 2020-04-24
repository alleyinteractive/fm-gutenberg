/* global React */
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

import attributes from './attributes';
import SampleBlock from './save';
import SampleBlockEdit from './edit';

registerBlockType(
  'wp-starter-plugin/sample-block',
  {
    attributes,
    category: 'widgets',
    description: __(
      'A sample block to demonstrate block structure and inclusion patterns.',
      'wp-starter-plugin',
    ),
    edit: SampleBlockEdit,
    icon: 'editor-insertmore',
    keywords: [
      __('sample', 'wp-starter-plugin'),
      __('block', 'wp-starter-plugin'),
    ],
    save: ({ attributes: blockAttributes }) => ( // eslint-disable-line react/prop-types
      <SampleBlock {...blockAttributes} /> // eslint-disable-line react/jsx-props-no-spreading
    ),
    supports: {
      html: false,
    },
    title: __('Sample Block', 'wp-starter-plugin'),
  },
);
