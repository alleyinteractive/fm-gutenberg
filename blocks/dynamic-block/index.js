import attributes from './attributes';
import edit from './edit';

const {
  blocks: {
    registerBlockType,
  },
  i18n: {
    __,
  },
} = wp;

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
