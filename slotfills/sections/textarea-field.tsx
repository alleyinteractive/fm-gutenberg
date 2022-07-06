import React, { useState } from 'react';
import { PanelRow, TextareaControl } from '@wordpress/components';
import Field from '@/interfaces/field';

interface TextareaFieldProps {
  field: Field,
  index?: number,
  label?: string,
  valueHook: (key: number | string) => [any | any[], Function];
}

export default function TextareaField({
  field: {
    name,
  },
  valueHook,
  index = null,
  label = '',
}: TextareaFieldProps) {
  const [value, setValue] = index !== null ? valueHook(index) : valueHook(name);
  const initialvalue = typeof value === 'object' ? value[name] : value;
  const [stateValue, setStateValue] = useState(initialvalue);

  const updateValue = () => {
    const newValue = typeof value === 'object' ? { [name]: stateValue } : stateValue;
    setValue(newValue);
  };
  return (
    <PanelRow>
      <TextareaControl
        label={label}
        onChange={setStateValue}
        onBlur={updateValue}
        value={stateValue}
      />
    </PanelRow>
  );
}
