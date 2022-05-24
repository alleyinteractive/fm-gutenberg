import React from 'react';
import PropTypes from 'prop-types';
import { PluginDocumentSettingPanel } from '@wordpress/edit-post';
import { PanelBody } from '@wordpress/components';
import usePostMetaValue from '@/hooks/use-post-meta-value';

import FieldRouter from './fieldRouter';
import Group from './group';

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
        {context.field_class === 'group' ? (
          <Group
            field={context}
            valueHook={usePostMetaValue}
          />
        ) : null}
        <FieldRouter
          field={context}
          valueHook={usePostMetaValue}
        />
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
