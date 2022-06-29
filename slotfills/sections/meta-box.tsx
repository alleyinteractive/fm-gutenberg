import React from 'react';
import { PluginDocumentSettingPanel } from '@wordpress/edit-post';
import usePostMetaValue from '@/hooks/use-post-meta-value';
import Field from '@/interfaces/field';

// Components.
import FieldRouter from './fieldRouter';
import Group from './group';

type Props = {
  field: Field,
};

export default function MetaBox({
  field: {
    title,
    fm: context,
  },
}: Props) {
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
