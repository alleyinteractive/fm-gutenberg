import React from 'react';
import { PanelRow, RadioControl } from '@wordpress/components';
import Field from '@/interfaces/field';
import FMObject from '@/interfaces/fm-object';

import convertDataToOptionsWithLabels from '@/services/data/convert-data-to-options-with-labels';

interface RadioProps {
  field: Field;
  index?: number;
  label?: string;
  valueHook: (key: number | string) => [string | FMObject | string[] | FMObject[], Function];
}

export default function Radio({
  field: {
    data,
    datasource = {},
    name,
  },
  valueHook,
  index = null,
  label = '',
}: RadioProps) {
  const [value, setValue] = index !== null ? valueHook(index) : valueHook(name);
  const initialvalue = value !== null && typeof value === 'object' && !Array.isArray(value) ? value[name] : value;
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

  return (
    /* @ts-ignore */
    <PanelRow>
      <RadioControl
        label={label}
        onChange={updateValue}
        selected={initialvalue?.toString()}
        options={optionsWithLabels}
      />
    </PanelRow>
  );
}
