import React from 'react';
import { select } from '@wordpress/data';
import { createPortal } from '@wordpress/element';

// import MetaBox from '@/slotfills/sections/meta-box';

export default function NormalMetaboxes() {
  console.log('running NormalMetaboxes');
  const post = select('core/editor').getCurrentPost();
  if (!post || Object.keys(post).length === 0) {
    return null;
  }

  const {
    fm_gutenberg_fields: {
      normal: normalFields = [],
    } = {},
  } = post;
  const field = normalFields[0];

  const metaBoxContainer = document.querySelector(`#${field.meta_box} .inside`);
  metaBoxContainer.innerHTML = '';
  return createPortal(
    // <MetaBox field={field} />, // eslint-disable-line react/jsx-filename-extension
    <p>test</p>,
    metaBoxContainer,
  );
}
