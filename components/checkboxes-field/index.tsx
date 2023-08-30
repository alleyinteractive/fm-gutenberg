import React from 'react';
import { PanelRow, CheckboxControl } from '@wordpress/components';
import Field from '@/interfaces/field';
import FMObject from '@/interfaces/fm-object';
import { v4 as uuidv4 } from 'uuid';

import convertDataToOptionsWithLabels from '@/services/data/convert-data-to-options-with-labels';

import './index.scss';

interface CheckboxesProps {
  field: Field;
  index?: number;
  label?: string;
  valueHook: (key: number | string) => [string | FMObject | string[] | FMObject[], Function];
}

export default function Checkboxes({
  field: {
    data,
    datasource = {},
    name,
  },
  valueHook,
  index = null,
  label = '',
}: CheckboxesProps) {
  const [value, setValue] = index !== null ? valueHook(index) : valueHook(name);
  const initialvalue: String[] = typeof value === 'object' && Array.isArray(value) ? (value as any[]).map((item) => item.toString()) : [value];
  let options = {};
  if (datasource !== null) {
    options = datasource.options;
  }

  let optionsWithLabels = convertDataToOptionsWithLabels(data);
  if (optionsWithLabels.length === 0 && Object.entries(options).length > 0) {
    optionsWithLabels = Object.entries(options).map((option) => (
      { label: option[1].toString() ?? option[0].toString(), value: option[0] }
    ));
  }

  const updateValue = (key: string, checked: boolean) => {
    const parsedKey = !Number.isNaN(parseInt(key, 10)) ? parseInt(key, 10) : key;
    const newValue = optionsWithLabels.filter((option): boolean => {
      const { value: dataValue } = option;
      if (dataValue.toString() === parsedKey.toString()) {
        return checked;
      }
      return initialvalue.includes(dataValue);
    }).map((option) => (
      !Number.isNaN(parseInt(option.value, 10)) ? parseInt(option.value, 10) : option.value
    ));
    setValue(newValue);
  };

  const uniqueId = uuidv4();
  return (
    /* @ts-ignore */
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
              /* @ts-ignore */
              <CheckboxControl
                label={optionLabel}
                value={optionValue}
                onChange={(checked: boolean) => updateValue(optionValue, checked)}
                checked={initialvalue.includes(optionValue.toString())}
              />
            );
          })}
        </div>
      </div>
    </PanelRow>
  );
}
