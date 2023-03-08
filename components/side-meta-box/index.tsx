import React from 'react';
import { PluginDocumentSettingPanel } from '@wordpress/edit-post';
import usePostMetaValue from '@/hooks/use-post-meta-value';
import Field from '@/interfaces/field';

// Components.
import FieldRouter from '../fieldRouter';
import Repeatable from '../repeatable';

interface SideMetaBoxProps {
  field: {
    title: string;
    fm: Field;
  }
}

export default function SideMetaBox({
  field: {
    title,
    fm,
  },
}: SideMetaBoxProps) {
  return (
    <PluginDocumentSettingPanel
      name={fm.name}
      title={title}
    >
      {fm.limit !== 1 ? (
        <Repeatable
          field={fm}
          valueHook={usePostMetaValue}
        />
      ) : (
        <FieldRouter
          field={fm}
          valueHook={usePostMetaValue}
        />
      )}
    </PluginDocumentSettingPanel>
  );
}
