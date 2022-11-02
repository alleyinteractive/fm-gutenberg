import React from 'react';
import { PanelRow, TextControl } from '@wordpress/components';
import Field from '@/interfaces/field';
import FMObject from '@/interfaces/fm-object';

interface TextFieldProps {
  field: Field,
  index?: number,
  label?: string,
  valueHook: (key: number | string) => [string | FMObject | string[] | FMObject[], Function];
}

export default function TextField({
  field: {
    name,
  },
  valueHook,
  index = null,
  label = '',
}: TextFieldProps) {
  // Switching the next two lines will prevent the rerender that causes the fields to disappear.
  const [value, setValue] = index !== null ? valueHook(index) : valueHook(name);
  // const [value, setValue] = index !== null ? valueHook(index) : useState(null);
  let initialvalue = value && typeof value === 'object' && !Array.isArray(value) ? value[name] : value;
  initialvalue = initialvalue ? String(initialvalue) : '';

  const onChange = (newValue:string) => {
    setValue(newValue);
  };
  return (
    <PanelRow>
      {label}
      <TextControl
        label={label}
        onChange={onChange}
        value={initialvalue}
        key={`text-control-${name}`}
      />
    </PanelRow>
  );
}
