import React from 'react';
import { PanelRow, ColorPicker } from '@wordpress/components';
import Field from '@/interfaces/field';

interface ColorPickerFieldProps {
  field: Field,
  index?: number,
  label?: string,
  valueHook: (key: number | string) => [any | any[], Function];
}

export default function ColorPickerField({
  field: {
    name,
  },
  valueHook,
  index = null,
  label = '',
}: ColorPickerFieldProps) {
  const [value, setValue] = index !== null ? valueHook(index) : valueHook(name);
  const initialvalue = typeof value === 'object' ? value[name] : value;

  const updateValue = (color: string) => {
    const newValue = typeof value === 'object' ? { [name]: color } : color;
    setValue(newValue);
  };

  return (
    <PanelRow>
      <div style={{ flexDirection: 'column' }}>
        <label htmlFor={`${name}_${index}`}>{label}</label>
        <div id={`${name}_${index}`}>
          <ColorPicker
            color={initialvalue}
            onChange={updateValue}
          />
        </div>
      </div>
    </PanelRow>
  );
}
