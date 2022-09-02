import React from 'react';
// import { render } from 'react-dom';
import { withSelect } from '@wordpress/data';
import { compose } from '@wordpress/compose';

import SideMetaBox from './sections/side-meta-box';
// import MetaBox from './sections/meta-box';

const FmGutenbergFields = (post) => {
  const {
    post: {
      fm_gutenberg_fields: {
        side: sideFields = [],
        // normal: normalFields = [],
      } = [],
    },
  } = post;
  // normalFields.forEach((field) => {
  //   const metaBoxContainer = document.querySelector(`#${field.meta_box} .inside`);
  //   metaBoxContainer.innerHTML = '';
  //   ReactDOM.render(
  //     <MetaBox field={field} />, // eslint-disable-line react/jsx-filename-extension
  //     metaBoxContainer,
  //   );
  // })
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
