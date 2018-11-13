/* global wp, React */

import attributes from './attributes';
import SampleBlock from './save';
import SampleBlockEdit from './edit';

const {
  blocks: {
    registerBlockType,
  },
  i18n: {
    __,
  },
} = wp;

registerBlockType(
  'wp-starter-plugin/sample-block',
  {
    attributes,
    category: 'widgets',
    description: __(
      'A sample block to demonstrate block structure and inclusion patterns.',
      'wp-starter-plugin'
    ),
    edit: SampleBlockEdit,
    icon: 'editor-insertmore',
    keywords: [
      __('sample', 'wp-starter-plugin'),
      __('block', 'wp-starter-plugin'),
    ],
    save: ({ attributes: blockAttributes }) => (
      <SampleBlock {...blockAttributes} />
    ),
    supports: {
      html: false,
    },
    title: __('Sample Block', 'wp-starter-plugin'),
  }
);
