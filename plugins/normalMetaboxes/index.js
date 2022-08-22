import React from 'react';
import ReactDOM from 'react-dom';
import { select, subscribe } from '@wordpress/data';

import MetaBox from '@/slotfills/sections/meta-box';

const normalMetaboxes = (normalFields) => (
  normalFields.forEach((field) => {
    const metaBoxContainer = document.querySelector(`#${field.meta_box} .inside`);
    metaBoxContainer.innerHTML = '';
    ReactDOM.render(
      <MetaBox field={field} />, // eslint-disable-line react/jsx-filename-extension
      metaBoxContainer,
    );
  })
);

let initialized = false;

/**
 * Subscribe to changes so we can set up the autosave.
 */
subscribe(() => {
  if (initialized) {
    return;
  }

  const post = select('core/editor').getCurrentPost();
  if (!post || Object.keys(post).length === 0) {
    return;
  }

  const {
    fm_gutenberg_fields: {
      normal: normalFields = [],
    } = {},
  } = post;

  if (normalFields.length) {
    normalMetaboxes(normalFields);
    initialized = true;
  }
});
