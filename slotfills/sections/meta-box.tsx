import React from 'react';
import Field from '@/interfaces/field';
import usePostMetaValue from './use-post-meta-value';

// Components.
import FieldRouter from './fieldRouter';
import Group from './group';

interface MetaBoxProps {
  field: Field;
}

export default function MetaBox({
  field: {
    fm: context,
  },
}: MetaBoxProps) {
  return (
    context.limit !== 1 ? (
      <Group
        field={context}
        valueHook={usePostMetaValue}
      />
    ) : (
      <FieldRouter
        field={context}
        valueHook={usePostMetaValue}
      />
    )
  );
}
