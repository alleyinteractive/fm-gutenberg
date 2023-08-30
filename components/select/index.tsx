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
    datasource = {},
    first_empty: firstEmpty,
    name,
  },
  valueHook,
  index = null,
  label = '',
}: SelectProps) {
  const [value, setValue] = index !== null ? valueHook(index) : valueHook(name);
  const initialvalue = value !== null && typeof value === 'object' ? value[name] : value;
  let options = {};
  if (datasource !== null) {
    options = datasource.options;
  }

  const updateValue = (newValue: string) => {
    const parsedValue = !Number.isNaN(parseInt(newValue, 10)) ? parseInt(newValue, 10) : newValue;
    setValue(typeof value === 'object' ? { [name]: parsedValue } : parsedValue);
  };

  let optionsWithLabels = convertDataToOptionsWithLabels(data);
  if (optionsWithLabels.length === 0 && Object.entries(options).length > 0) {
    optionsWithLabels = Object.entries(options).map((option) => (
      { label: option[1].toString() ?? option[0].toString(), value: option[0] }
    ));
  }

  if (firstEmpty || index !== null) {
    optionsWithLabels = [
      { label: '', value: '' },
      ...optionsWithLabels,
    ];
  }

  return (
    /* @ts-ignore */
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
