import React, { useState } from 'react';
import { PanelRow, TextControl } from '@wordpress/components';
import Field from '@/interfaces/field';

interface TextFieldProps {
  field: Field,
  index?: number,
  label?: string,
  valueHook: (key: number | string) => [string, Function];
}

export default function TextField({
  field: {
    name,
  },
  valueHook,
  index = null,
  label = '',
}: TextFieldProps) {
  const [value, setValue] = index !== null ? valueHook(index) : valueHook(name);
  const initialvalue = typeof value === 'object' ? value[name] : value;
  const [stateValue, setStateValue] = useState(initialvalue);

  const updateValue = () => {
    const newValue = typeof value === 'object' ? { [name]: stateValue } : stateValue;
    setValue(newValue);
  };
  return (
    <PanelRow>
      <TextControl
        label={label}
        onChange={setStateValue}
        onBlur={updateValue}
        value={stateValue}
      />
    </PanelRow>
  );
}
