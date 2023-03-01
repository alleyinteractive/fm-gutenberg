import React from 'react';
import { PanelRow, CheckboxControl } from '@wordpress/components';
import Field from '@/interfaces/field';
import FMObject from '@/interfaces/fm-object';
import { v4 as uuidv4 } from 'uuid';

import convertDataToOptionsWithLabels from '@/services/data/convert-data-to-options-with-labels';

interface CheckboxesProps {
  field: Field;
  index?: number;
  label?: string;
  valueHook: (key: number | string) => [string | FMObject | string[] | FMObject[], Function];
}

export default function Checkboxes({
  field: {
    data,
    name,
  },
  valueHook,
  index = null,
  label = '',
}: CheckboxesProps) {
  const [value, setValue] = index !== null ? valueHook(index) : valueHook(name);
  const initialvalue: String[] = typeof value === 'object' && Array.isArray(value) ? (value as any[]).filter((item) => (typeof item === 'string')) : [value];

  const updateValue = (key: string, checked: boolean) => {
    const newValue = data.filter((option): boolean => {
      const { value: dataValue } = option;
      if (dataValue === key) {
        return checked;
      }
      return initialvalue.includes(dataValue);
    }).map((option) => (
      option.value
    ));
    setValue(newValue);
  };

  const optionsWithLabels = convertDataToOptionsWithLabels(data);

  const uniqueId = uuidv4();
  return (
    <PanelRow>
      <div style={{ flexDirection: 'column' }}>
        <label htmlFor={`checkboxes-${uniqueId}`}>
          {label}
        </label>
        <div id={`checkboxes-${uniqueId}`}>
          {optionsWithLabels.map((option) => {
            const {
              label: optionLabel,
              value: optionValue,
            } = option;
            return (
              <CheckboxControl
                label={optionLabel}
                value={optionValue}
                onChange={(checked: boolean) => updateValue(optionValue, checked)}
                checked={initialvalue.includes(optionValue)}
              />
            );
          })}
        </div>
      </div>
    </PanelRow>
  );
}
