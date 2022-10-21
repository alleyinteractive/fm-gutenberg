import React from 'react';

import FMObject from '@/interfaces/fm-object';
import Field from '@/interfaces/field';
import Checkbox from './checkbox';
import MediaField from './media-field';
import Radio from './radio';
import Select from './select';
import TextField from './text-field';
import TextareaField from './textarea-field';
import RichtextField from './richtext-field';

interface FieldRouterProps {
  field: Field;
  index?: number;
  valueHook: (key: number | string) => [null | string | FMObject | string[] | FMObject[], Function];
}

export default function FieldRouter({
  field,
  field: {
    attributes: {
      rows = null,
    } = {},
    field_class: fieldClass,
    label = '',
  },
  index,
  valueHook,
}: FieldRouterProps) {
  console.log('field:', field);
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
  if (fieldClass === 'radio') {
    return (
      <Radio
        field={field}
        valueHook={valueHook}
        index={index}
        label={label}
      />
    );
  }
  if (fieldClass === 'select') {
    return (
      <Select
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
  if (fieldClass === 'media') {
    return (
      <MediaField
        field={field}
        valueHook={valueHook}
        index={index}
        label={label}
      />
    );
  }
  return null;
}
