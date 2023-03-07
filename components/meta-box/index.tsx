import React from 'react';
import Field from '@/interfaces/field';
import useWindowPostMeta from '../../hooks/use-window-post-meta-value';

// Components.
import FieldRouter from '../fieldRouter';
import Repeatable from '../repeatable';

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
          valueHook={useWindowPostMeta}
        />
      ) : (
        <FieldRouter
          field={fm}
          valueHook={useWindowPostMeta}
        />
      )}
    </div>
  );
}
