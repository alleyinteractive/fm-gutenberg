import React from 'react';
import PropTypes from 'prop-types';
import { PluginDocumentSettingPanel } from '@wordpress/edit-post';
import usePostMetaValue from '@/hooks/use-post-meta-value';

// Components.
import Group from './group';
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

  return (
    <PluginDocumentSettingPanel
      name={context.name}
      title={title}
    >
      {context.field_class === 'text' ? (
        <TextField
          field={context}
          valueHook={usePostMetaValue}
        />
      ) : null}
      {context.field_class === 'group' ? (
        <Group
          field={context}
          valueHook={usePostMetaValue}
        />
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
