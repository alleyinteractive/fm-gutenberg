import React from 'react';
import { Portal } from 'react-portal';
import { withSelect } from '@wordpress/data';
import { compose } from '@wordpress/compose';

import MetaBox from './sections/meta-box';
import SideMetaBox from './sections/side-meta-box';

const FmGutenbergFields = (post) => {
  const {
    post: {
      fm_gutenberg_fields: {
        side: sideFields = [],
        normal: normalFields = [],
      } = [],
    },
  } = post;
  return (
    sideFields.map((field) => (
      <SideMetaBox field={field} />
    )),
    normalFields.map((field) => {
      const metaBoxContainer = document.querySelector(`#${field.meta_box} .inside`);
      console.log('metaBoxContainer', metaBoxContainer);
      metaBoxContainer.innerHTML = '';
      return (
        <Portal node={document && document.querySelector(`#${field.meta_box} .inside`)}>
          <MetaBox field={field} />
        </Portal>
      );
    })
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
