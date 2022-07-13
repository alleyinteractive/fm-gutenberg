import React from 'react';
import { PanelRow, RadioControl } from '@wordpress/components';
import Field from '@/interfaces/field';

interface RadioProps {
  field: Field;
  index?: number;
  label?: string;
  valueHook: (key: number | string) => [any | any[], Function];
}

export default function Radio({
  field: {
    name,
    options,
  },
  valueHook,
  index = null,
  label = '',
}: RadioProps) {
  const [value, setValue] = index !== null ? valueHook(index) : valueHook(name);
  const initialvalue = typeof value === 'object' ? value[name] : value;

  const updateValue = (newValue: string) => {
    setValue(typeof value === 'object' ? { [name]: newValue } : newValue);
  };

  const optionsWithLabels = options.map((option) => (
    { label: option, value: option }
  ));

  return (
    <PanelRow>
      <RadioControl
        label={label}
        onChange={updateValue}
        selected={initialvalue}
        options={optionsWithLabels}
      />
    </PanelRow>
  );
}
