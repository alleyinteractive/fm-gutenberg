import React from 'react';
import { PanelRow, SelectControl } from '@wordpress/components';
import Field from '@/interfaces/field';

// Services.
import convertDataToOptionsWithLabels from '@/services/data/convert-data-to-options-with-labels';

interface SelectProps {
  field: Field;
  index?: number;
  label?: string;
  valueHook: (key: number | string) => [any | any[], Function];
}

export default function Select({
  field: {
    attributes: {
      multiple = '',
    },
    data,
    first_empty: firstEmpty,
    name,
  },
  valueHook,
  index = null,
  label = '',
}: SelectProps) {
  const [value, setValue] = index !== null ? valueHook(index) : valueHook(name);
  const initialvalue = value !== null && typeof value === 'object' ? value[name] : value;

  const updateValue = (newValue: string) => {
    setValue(typeof value === 'object' ? { [name]: newValue } : newValue);
  };

  let optionsWithLabels = convertDataToOptionsWithLabels(data);

  if (firstEmpty || index !== null) {
    optionsWithLabels = [
      { label: '', value: '' },
      ...optionsWithLabels,
    ];
  }

  return (
    <PanelRow>
      <SelectControl
        multiple={multiple !== ''}
        label={label}
        onChange={updateValue}
        value={initialvalue}
        options={optionsWithLabels}
      />
    </PanelRow>
  );
}
