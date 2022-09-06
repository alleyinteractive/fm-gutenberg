import React from 'react';
import { withSelect } from '@wordpress/data';
import { compose } from '@wordpress/compose';

import SideMetaBox from './sections/side-meta-box';

const FmGutenbergFields = (post) => {
  const {
    post: {
      fm_gutenberg_fields: {
        side: sideFields = [],
      } = [],
    },
  } = post;
  console.log('running FmGutenbergFields');
  return (
    sideFields.map((field) => (
      <SideMetaBox field={field} />
    ))
  );
};

export default compose([
  withSelect((select) => {
    const editor = select('core/editor');

    return {
      post: editor.getCurrentPost(),
    };
  }),
])(FmGutenbergFields);
