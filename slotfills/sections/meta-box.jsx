import React from 'react';
import PropTypes from 'prop-types';
import { PluginDocumentSettingPanel } from '@wordpress/edit-post';

// Components.
import TextField from './text-field';

const MetaBox = ({
  field: {
    title,
    fm: context,
  },
}) => {
  let { children } = context;

  if ('array' !== typeof children) {
    children = [ children ];
  }

  // const [description, setDescription] = usePostMetaValue('fm_gutenberg_open_graph_description');
  // const [image, setImage] = usePostMetaValue('fm_gutenberg_open_graph_image');
  // const [title, setTitle] = usePostMetaValue('fm_gutenberg_open_graph_title');

  return (
    <PluginDocumentSettingPanel
      icon=""
      name="text-field"
      title={title}
    >
      {context.field_class === 'text' ? (
        <TextField field={context} />
      ) : null}
    </PluginDocumentSettingPanel>
  );
};

MetaBox.propTypes = {
  field: PropTypes.shape({
    title: PropTypes.string.isRequired,
    fm: PropTypes.shape({
      children: PropTypes.arrayOf(PropTypes.shape({})),
    }),
  }).isRequired,
};

export default MetaBox;
