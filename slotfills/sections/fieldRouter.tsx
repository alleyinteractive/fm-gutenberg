import React from 'react';

import Field from '@/interfaces/field';
import TextField from './text-field';
import TextareaField from './textarea-field';
import RichtextField from './richtext-field';

interface FieldRouterProps {
  field: Field;
  index?: number;
  valueHook: (key: number | string) => [string, Function];
}

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
}: FieldRouterProps) {
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
