import React from 'react';
import { PluginDocumentSettingPanel } from '@wordpress/edit-post';
import usePostMetaValue from '@/hooks/use-post-meta-value';
import Field from '@/interfaces/field';

// Components.
import FieldRouter from './fieldRouter';
import Repeatable from './repeatable';

interface SideMetaBoxProps {
  field: {
    title: string;
    fm: Field;
  }
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
        <Repeatable
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
