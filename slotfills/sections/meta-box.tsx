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
      {/* if ( ( 0 == $this->limit ||
        ( $this->limit > 1 && $this->limit > $this->minimum_count ) )
        && 'top' == $this->add_more_position ) { */ }
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
