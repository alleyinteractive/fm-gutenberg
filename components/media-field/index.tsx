import React from 'react';
import { PanelRow } from '@wordpress/components';
import Field from '@/interfaces/field';
import MediaPicker from '../media-picker';

interface MediaFieldProps {
  field: Field,
  index?: number,
  label?: string,
  valueHook: (key: number | string) => [any | any[], Function];
}

interface UpdateValueProps {
  id?: number;
}

export default function MediaField({
  field: {
    name,
  },
  valueHook,
  index = null,
  label = '',
}: MediaFieldProps) {
  const [value, setValue] = index !== null ? valueHook(index) : valueHook(name);
  let initialvalue = typeof value === 'object' && value !== null ? value[name] : value;
  if (!initialvalue) {
    initialvalue = 0;
  }

  const updateValue = (item: UpdateValueProps) => {
    const { id } = item;
    const newValue = typeof value === 'object' && value !== null ? { [name]: id } : id;
    setValue(newValue);
  };

  const resetValue = () => {
    updateValue({ id: null });
  };

  return (
    <PanelRow>
      <div style={{ flexDirection: 'column' }}>
        <MediaPicker
          onUpdate={updateValue}
          onReset={resetValue}
          value={initialvalue}
          label={label}
        />
      </div>
    </PanelRow>
  );
}
