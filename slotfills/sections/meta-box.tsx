import React from 'react';
import { PluginDocumentSettingPanel } from '@wordpress/edit-post';
import usePostMetaValue from '@/hooks/use-post-meta-value';
import Field from '@/interfaces/field';

// Components.
import FieldRouter from './fieldRouter';
import Group from './group';

interface MetaBoxProps {
  field: Field;
}

export default function MetaBox({
  field: {
    title,
    fm: context,
  },
}: MetaBoxProps) {
  return (
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
}
