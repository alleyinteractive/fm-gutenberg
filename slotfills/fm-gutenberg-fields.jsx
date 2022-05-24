import React from 'react';
import { withSelect } from '@wordpress/data';
import { compose } from '@wordpress/compose';

import MetaBox from './sections/meta-box';

const FmGutenbergFields = (post) => {
  const { post: { fm_gutenberg_fields: fmFields = [] } } = post;
  return (
    fmFields.map((field) => (
      <MetaBox field={field} />
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
