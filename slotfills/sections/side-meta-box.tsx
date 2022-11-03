import React from 'react';
import { PluginDocumentSettingPanel } from '@wordpress/edit-post';
import usePostMetaValue from '@/hooks/use-post-meta-value';
import Field from '@/interfaces/field';

// Components.
import FieldRouter from './fieldRouter';
import Group from './group';

interface SideMetaBoxProps {
  field: Field;
}

export default function SideMetaBox({
  field: {
    title,
    fm: context,
  },
}: SideMetaBoxProps) {
  return (
    <PluginDocumentSettingPanel
      name={context.name}
      title={title}
    >
      {context.limit !== 1 ? (
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
