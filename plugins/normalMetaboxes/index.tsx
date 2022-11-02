import React from 'react';
import { render } from '@wordpress/element';

import FmGutenbergMetaBoxes from './fm-gutenberg-meta-boxes';

window.addEventListener('load', () => {
  const metaboxes = document.querySelector('.edit-post-layout__metaboxes');

  if (metaboxes) {
    const container = document.createElement('div');
    container.className = 'fm-gutenberg-normal-metabox-container';
    const parent = metaboxes.parentElement;
    parent.insertBefore(container, metaboxes);

    render(
      <FmGutenbergMetaBoxes />, // eslint-disable-line react/jsx-filename-extension
      container,
    );
  }
});
