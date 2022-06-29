import React from 'react';
import { PluginDocumentSettingPanel } from '@wordpress/edit-post';
import usePostMetaValue from '@/hooks/use-post-meta-value';

// Components.
import FieldRouter from './fieldRouter';
import Group from './group';

type Props = {
  field: {
    title: string,
    fm: {
      add_more_label: string,
      add_more_position: 'bottom' | 'top',
      attributes: {
        rows: Number | null,
      },
      children: Array<object>,
      field_class: string,
      label: string,
      name: string,
    }
  }
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
