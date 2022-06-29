import React, { useState } from 'react';
import { PanelRow, TextControl } from '@wordpress/components';
import Field from '@/interfaces/field';

type Props = {
  field: Field,
  valueHook: Function,
  index?: Number,
  label?: string,
};

export default function TextField({
  field: {
    name,
  },
  valueHook,
  index = null,
  label = '',
}: Props) {
  const [value, setValue] = index !== null ? valueHook(index) : valueHook(name);
  const initialvalue = typeof value === 'object' ? value[name] : value;
  const [stateValue, setStateValue] = useState(initialvalue);

  const updateValue = () => {
    const newValue = typeof value === 'object' ? { [name]: stateValue } : stateValue;
    setValue(newValue);
  };
  return (
    <PanelRow>
      <TextControl
        label={label}
        onChange={setStateValue}
        onBlur={updateValue}
        value={stateValue}
      />
    </PanelRow>
  );
}