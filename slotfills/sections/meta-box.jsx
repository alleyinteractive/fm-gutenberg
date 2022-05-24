import React from 'react';
import PropTypes from 'prop-types';
import { PluginDocumentSettingPanel } from '@wordpress/edit-post';
import { PanelBody } from '@wordpress/components';
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

  if (Array.isArray(children)) {
    children = [children];
  }

  return (
    <PluginDocumentSettingPanel
      name={context.name}
      title={title}
    >
      <PanelBody>
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
      </PanelBody>
    </PluginDocumentSettingPanel>
  );
};

MetaBox.propTypes = {
  field: PropTypes.shape({
    title: PropTypes.string.isRequired,
    fm: PropTypes.shape({
      children: PropTypes.arrayOf(PropTypes.shape({})),
      name: PropTypes.string.isRequired,
      field_class: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default MetaBox;
