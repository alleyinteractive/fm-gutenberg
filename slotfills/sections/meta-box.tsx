import React from 'react';
import Field from '@/interfaces/field';
import usePostMetaValue from './use-post-meta-value';

// Components.
import FieldRouter from './fieldRouter';
import Repeatable from './repeatable';

interface MetaBoxProps {
  field: {
    title: string;
    fm: Field;
  }
}

export default function MetaBox({
  field: {
    fm,
  },
}: MetaBoxProps) {
  return (
    <div>
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
    </div>
  );
}
