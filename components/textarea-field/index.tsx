import React, { useState } from 'react';
import { PanelRow, TextareaControl } from '@wordpress/components';
import Field from '@/interfaces/field';
import FMObject from '@/interfaces/fm-object';

interface TextareaFieldProps {
  field: Field,
  index?: number,
  label?: string,
  valueHook: (key: number | string) => [string | FMObject | string[] | FMObject[], Function];
}

export default function TextareaField({
  field: {
    name,
    attributes: {
      rows = 5,
    },
  },
  valueHook,
  index = null,
  label = '',
}: TextareaFieldProps) {
  const [value, setValue] = index !== null ? valueHook(index) : valueHook(name);
  let initialvalue = typeof value === 'object' && !Array.isArray(value) ? value[name] : value;
  initialvalue = initialvalue ? String(initialvalue) : '';

  const [stateValue, setStateValue] = useState(initialvalue);

  const updateValue = () => {
    const newValue = typeof value === 'object' ? { [name]: stateValue } : stateValue;
    setValue(newValue);
  };
  return (
    /* @ts-ignore */
    <PanelRow>
      {/* @ts-ignore */}
      <TextareaControl
        label={label}
        onChange={setStateValue}
        onBlur={updateValue}
        value={stateValue}
        rows={rows}
      />
    </PanelRow>
  );
}
