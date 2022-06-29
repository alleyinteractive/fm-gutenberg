import React from 'react';

import TextField from './text-field';
import TextareaField from './textarea-field';
import RichtextField from './richtext-field';
import Field from '@/interfaces/field';

type Props = {
  field: Field,
  index?: Number,
  valueHook: Function,
};

export default function FieldRouter({
  field,
  field: {
    field_class: fieldClass,
    attributes: {
      rows = null,
    } = {},
    label = '',
  },
  index,
  valueHook,
}: Props) {
  if (fieldClass === 'text') {
    if (rows) {
      return (
        <TextareaField
          field={field}
          valueHook={valueHook}
          index={index}
          label={label}
        />
      );
    }
    return (
      <TextField
        field={field}
        valueHook={valueHook}
        index={index}
        label={label}
      />
    );
  }
  if (fieldClass === 'richtext') {
    return (
      <RichtextField
        field={field}
        valueHook={valueHook}
        index={index}
        label={label}
      />
    );
  }
  return null;
}
