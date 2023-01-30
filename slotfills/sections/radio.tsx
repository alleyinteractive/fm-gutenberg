import React from 'react';
import { PanelRow, RadioControl } from '@wordpress/components';
import Field from '@/interfaces/field';
import FMObject from '@/interfaces/fm-object';

import convertToOptionsWithLabels from '@/services/data/convert-to-options-with-labels';

interface RadioProps {
  field: Field;
  index?: number;
  label?: string;
  valueHook: (key: number | string) => [string | FMObject | string[] | FMObject[], Function];
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
  const initialvalue = typeof value === 'object' && !Array.isArray(value) ? value[name] : value;

  const updateValue = (newValue: string) => {
    setValue(typeof value === 'object' ? { [name]: newValue } : newValue);
  };

  const optionsWithLabels = convertToOptionsWithLabels(options);

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
