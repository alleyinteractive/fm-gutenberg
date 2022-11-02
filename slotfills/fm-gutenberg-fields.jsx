import React from 'react';
import { uid } from 'react-uid';

import { useSelect } from '@wordpress/data';

import SideMetaBox from './sections/side-meta-box';

const FmGutenbergFields = () => {
  const post = useSelect((select) => (
    select('core/editor').getCurrentPost()
  ));
  const {
    fm_gutenberg_fields: {
      side: sideFields = [],
    } = [],
  } = post;
  return (
    sideFields.map((field) => (
      <SideMetaBox field={field} key={uid(field)} />
    ))
  );
};

export default FmGutenbergFields;
