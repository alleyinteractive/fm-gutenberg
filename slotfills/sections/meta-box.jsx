import React from 'react';
import PropTypes from 'prop-types';
import { PluginDocumentSettingPanel } from '@wordpress/edit-post';
import { PanelRow } from '@wordpress/components';
import usePostMetaValue from '@/hooks/use-post-meta-value';

// Components.
import FieldRouter from './fieldRouter';
import Group from './group';

const MetaBox = ({
  field: {
    title,
    fm: context,
  },
}) => (
  <PluginDocumentSettingPanel
    name={context.name}
    title={title}
  >
    {context.field_class === 'group' ? (
      <Group
        field={context}
        valueHook={usePostMetaValue}
      />
    ) : (
      <FieldRouter
        field={context}
        valueHook={usePostMetaValue}
      />
    )}
  </PluginDocumentSettingPanel>
);

MetaBox.propTypes = {
  field: PropTypes.shape({
    title: PropTypes.string.isRequired,
    fm: PropTypes.shape({
      children: PropTypes.arrayOf(PropTypes.shape({})),
      name: PropTypes.string.isRequired,
      field_class: PropTypes.string.isRequired,
      attributes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
      label: PropTypes.string,
    }),
  }).isRequired,
};

export default MetaBox;
