import React from 'react';
// import { render } from 'react-dom';
import { select } from '@wordpress/data';

import CollapsibleMetabox from '../../components/collapsible-metabox';
import './style.scss';

const FmGutenbergMetaBoxes = () => {
  const post = select('core/editor').getCurrentPost();
  console.log('post', post);
  const {
    fm_gutenberg_fields: {
      normal: normalFields = [],
    } = [],
  } = post;
  return (
    normalFields.map((field) => (
      <CollapsibleMetabox field={field} />
    ))
  );
};

export default FmGutenbergMetaBoxes;
