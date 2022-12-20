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
import Autocomplete from './autocomplete';

import './fieldRouter.scss';

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
    children,
    datasource,
    field_class: fieldClass,
    label = '',
    name = '',
  },
  index,
  valueHook,
}: FieldRouterProps) {
  if (children && fieldClass === 'group') {
    const [value, setValue] = valueHook(index ?? name);
    const useChildValue = (key: string): [any, Function] => {
      const valueObject = value !== null && typeof value === 'object' && !Array.isArray(value) ? value : { [key]: value };
      const childValue = valueObject ? valueObject[key] : null;
      const setChildValue = (newValue: string) => {
        const newValueObject = {
          ...valueObject,
          [key]: newValue,
        };
        setValue(newValueObject);
      };
      return [childValue, setChildValue];
    };

    return (
      <div className="fm-gutenberg__group" key={`${name}-group`}>
        {label ? (
          <h4>{label}</h4>
        ) : null}
        {Object.keys(children).map((key) => (
          <FieldRouter
            field={children[key]}
            valueHook={useChildValue}
            key={key}
          />
        ))}
      </div>
    );
  }
  if (fieldClass === 'element') {
    if (datasource) {
      return (
        <Autocomplete
          field={field}
          valueHook={valueHook}
          index={index}
          label={label}
        />
      );
    }
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
