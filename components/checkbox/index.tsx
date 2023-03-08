import React from 'react';
import { PanelRow, CheckboxControl } from '@wordpress/components';
import FMObject from '@/interfaces/fm-object';
import Field from '@/interfaces/field';

interface CheckboxProps {
  field: Field;
  index?: number;
  label?: string;
  valueHook: (key: number | string) =>
  [boolean | string | FMObject | boolean[] | string[] | FMObject[], Function];
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
  let initialvalue = typeof value === 'object' && !Array.isArray(value) ? value[name] : value;
  if (typeof initialvalue !== 'boolean') {
    initialvalue = initialvalue === '1';
  }

  const updateValue = (checked: boolean) => {
    if (checked) {
      setValue(typeof value === 'object' ? { [name]: checkedValue.toString() } : checkedValue.toString());
    } else {
      setValue(typeof value === 'object' ? { [name]: '' } : '');
    }
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
