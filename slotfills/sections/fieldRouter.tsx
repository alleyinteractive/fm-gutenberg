import React from 'react';

import Field from '@/interfaces/field';
import Checkbox from './checkbox';
import TextField from './text-field';
import TextareaField from './textarea-field';
import RichtextField from './richtext-field';

type Props = {
  field: Field,
  index?: Number,
  valueHook: Function,
};

export default function FieldRouter({
  field,
  field: {
    field_class: fieldClass,
    checked_value: checkedValue,
    attributes: {
      rows = null,
    } = {},
    label = '',
  },
  index,
  valueHook,
}: Props) {
  if (fieldClass === 'element') {
    return (
      <Checkbox
        field={field}
        valueHook={valueHook}
        index={index}
        label={label}
      />
    );
  }
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
  if (fieldClass === 'richtext' && typeof checkedValue !== 'undefined') {
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
