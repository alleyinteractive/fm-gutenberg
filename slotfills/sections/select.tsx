import React from 'react';
import { PanelRow, SelectControl } from '@wordpress/components';
import Field from '@/interfaces/field';

interface SelectProps {
  field: Field;
  index?: number;
  label?: string;
  valueHook: (key: number | string) => [any | any[], Function];
}

export default function Select({
  field: {
    first_empty: firstEmtpy,
    name,
    options,
  },
  valueHook,
  index = null,
  label = '',
}: SelectProps) {
  const [value, setValue] = index !== null ? valueHook(index) : valueHook(name);
  const initialvalue = typeof value === 'object' ? value[name] : value;

  const updateValue = (newValue: string) => {
    setValue(typeof value === 'object' ? { [name]: newValue } : newValue);
  };

  let optionsWithLabels = options.map((option) => (
    { label: option, value: option }
  ));

  if (firstEmtpy || index !== null) {
    optionsWithLabels = [
      { label: '', value: '' },
      ...optionsWithLabels,
    ];
  }

  return (
    <PanelRow>
      <SelectControl
        label={label}
        onChange={updateValue}
        value={initialvalue}
        options={optionsWithLabels}
      />
    </PanelRow>
  );
}
