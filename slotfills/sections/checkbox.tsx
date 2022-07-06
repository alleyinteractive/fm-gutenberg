import React from 'react';
import { PanelRow, CheckboxControl } from '@wordpress/components';
import Field from '@/interfaces/field';

interface CheckboxProps {
  field: Field;
  index?: number;
  label?: string;
  valueHook: (key: number | string) => [any | any[], Function];
}

export default function Checkbox({
  field: {
    name,
    checked_value: checkedValue,
  },
  valueHook,
  index = null,
  label = '',
}: CheckboxProps) {
  const [value, setValue] = index !== null ? valueHook(index) : valueHook(name);
  const initialvalue = typeof value === 'object' ? value[name] : value;

  const updateValue = (checked: boolean) => {
    let newValue;
    if (checked) {
      newValue = typeof value === 'object' ? { [name]: checkedValue.toString() } : checkedValue.toString();
    } else {
      newValue = typeof value === 'object' ? { [name]: '' } : '';
    }
    setValue(newValue);
  };

  return (
    <PanelRow>
      <CheckboxControl
        label={label}
        onChange={updateValue}
        checked={initialvalue}
        value={checkedValue}
      />
    </PanelRow>
  );
}
