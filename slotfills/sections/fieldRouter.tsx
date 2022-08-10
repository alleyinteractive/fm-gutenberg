import React from 'react';

import Field from '@/interfaces/field';
import Checkbox from './checkbox';
import ColorPickerField from './color-picker-field';
import MediaField from './media-field';
import Radio from './radio';
import Select from './select';
import TextField from './text-field';
import TextareaField from './textarea-field';
import RichtextField from './richtext-field';

interface FieldRouterProps {
  field: Field;
  index?: number;
  valueHook: (key: number | string) => [any | any[], Function];
}

export default function FieldRouter({
  field,
  field: {
    attributes: {
      rows = null,
    } = {},
    checked_value: checkedValue,
    field_class: fieldClass,
    label = '',
  },
  index,
  valueHook,
}: FieldRouterProps) {
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
  if (fieldClass === 'colorpicker') {
    return (
      <ColorPickerField
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
