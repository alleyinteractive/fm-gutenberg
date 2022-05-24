import React from 'react';
import PropTypes from 'prop-types';
import { PluginDocumentSettingPanel } from '@wordpress/edit-post';
import { PanelBody } from '@wordpress/components';
import usePostMetaValue from '@/hooks/use-post-meta-value';

// Components.
import Group from './group';
import TextField from './text-field';
import TextareaField from './textarea-field';

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
  const {
    field_class: fieldClass,
    attributes: {
      rows = null,
    } = {},
    label = '',
  } = context;
  return (
    <PluginDocumentSettingPanel
      name={context.name}
      title={title}
    >
      <PanelBody>
        {fieldClass === 'text' && rows === null ? (
          <TextField
            field={context}
            valueHook={usePostMetaValue}
            label={label}
          />
        ) : null}
        {fieldClass === 'text' && rows !== null ? (
          <TextareaField
            field={context}
            valueHook={usePostMetaValue}
            label={label}
          />
        ) : null}
        {fieldClass === 'group' ? (
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
      attributes: PropTypes.shape({}).isRequired,
      label: PropTypes.string,
    }),
  }).isRequired,
};

export default MetaBox;
