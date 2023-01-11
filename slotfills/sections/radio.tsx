import React from 'react';
import { PanelRow, RadioControl } from '@wordpress/components';
import Field from '@/interfaces/field';
import FMObject from '@/interfaces/fm-object';

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

  let optionsWithLabels = [];
  if (typeof options === 'object' && !Array.isArray(options)) {
    for (const [optionValue, optionLabel] of Object.entries(options)) {
      optionsWithLabels.push({ label: optionLabel, value: optionValue });
    }
  } else {
    optionsWithLabels = options.map((option) => (
      { label: option, value: option }
    ));
  }

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
