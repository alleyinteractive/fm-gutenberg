import React from 'react';
import { select } from '@wordpress/data';

import SideMetaBox from './sections/side-meta-box';

const FmGutenbergFields = () => {
  const post = select('core/editor').getCurrentPost();
  console.log('FmGutenbergFields post', post);
  const {
    fm_gutenberg_fields: {
      side: sideFields = [],
    } = [],
  } = post;
  return (
    sideFields.map((field) => (
      <SideMetaBox field={field} />
    ))
  );
};

export default FmGutenbergFields;
