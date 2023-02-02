import React from 'react';

import FMObject from '@/interfaces/fm-object';
import Field from '@/interfaces/field';
import Checkbox from './checkbox';
import DateField from './date-field';
import MediaField from './media-field';
import Radio from './radio';
import Select from './select';
import TextField from './text-field';
import TextareaField from './textarea-field';
import RichtextField from './richtext-field';
import Autocomplete from './autocomplete';

import './fieldRouter.scss';

interface FieldRouterProps {
  field: Field;
  index?: number;
  valueHook: (key: number | string) => [null | string | FMObject | string[] | FMObject[], Function];
}

export default function FieldRouter({
  field,
  field: {
    children,
    display_if: {
      src: displayIfSrc = '',
      value: displayIfValue = '',
    } = {},
    field_class: fieldClass,
    fm_class: fmClass,
    label = '',
    name = '',
  },
  index,
  valueHook,
}: FieldRouterProps) {
  const [triggerValue] = valueHook(displayIfSrc);
  let simpleValue = triggerValue && typeof triggerValue === 'object' && !Array.isArray(triggerValue) ? triggerValue[displayIfSrc] : triggerValue;
  simpleValue = simpleValue ? String(simpleValue) : '';

  if (displayIfSrc !== '' && displayIfValue !== String(simpleValue)) {
    return null;
  }
  if (children && fieldClass === 'group') {
    const [value, setValue] = valueHook(index ?? name);
    const useChildValue = (key: string): [any, Function] => {
      const valueObject = value !== null && typeof value === 'object' && !Array.isArray(value) ? value : { [key]: value };
      const childValue = valueObject ? valueObject[key] : null;
      const setChildValue = (newValue: string) => {
        const newValueObject = {
          ...valueObject,
          [key]: newValue,
        };
        setValue(newValueObject);
      };
      return [childValue, setChildValue];
    };

    return (
      <div className="fm-gutenberg__group" key={`${name}-group`}>
        {label ? (
          <h4>{label}</h4>
        ) : null}
        {Object.keys(children).map((key) => (
          <FieldRouter
            field={children[key]}
            valueHook={useChildValue}
            key={key}
          />
        ))}
      </div>
    );
  }
  switch (fmClass) {
    case 'Fieldmanager_Autocomplete':
      return (
        <Autocomplete
          field={field}
          valueHook={valueHook}
          index={index}
          label={label}
        />
      );
      break;
    case 'Fieldmanager_Checkbox':
      return (
        <Checkbox
          field={field}
          valueHook={valueHook}
          index={index}
          label={label}
        />
      );
      break;
    case 'Fieldmanager_Checkboxes':
      return (
        <p>
          Fieldmanager_Checkboxes
        </p>
      );
      break;
    case 'Fieldmanager_Colorpicker':
      return (
        <p>
          Fieldmanager_Colorpicker
        </p>
      );
      break;
    case 'Fieldmanager_Datepicker':
      return (
        <DateField
          field={field}
          valueHook={valueHook}
          index={index}
          label={label}
        />
      );
      break;
    case 'Fieldmanager_DraggablePost':
      return (
        <p>
          Fieldmanager_DraggablePost
        </p>
      );
      break;
    case 'Fieldmanager_Grid':
      return (
        <p>
          Fieldmanager_Grid
        </p>
      );
      break;
    case 'Fieldmanager_Hidden':
      return (
        <TextField
          field={field}
          valueHook={valueHook}
          index={index}
          label={label}
          type="hidden"
        />
      );
      break;
    case 'Fieldmanager_Link':
      return (
        <p>
          Fieldmanager_Link
        </p>
      );
      break;
    case 'Fieldmanager_Media':
      if (fieldClass === 'media') {
        return (
          <MediaField
            field={field}
            valueHook={valueHook}
            index={index}
            label={label}
          />
        );
      }
      break;
    case 'Fieldmanager_Password':
      return (
        <TextField
          field={field}
          valueHook={valueHook}
          index={index}
          label={label}
          type="password"
        />
      );
      break;
    case 'Fieldmanager_Radios':
      return (
        <Radio
          field={field}
          valueHook={valueHook}
          index={index}
          label={label}
        />
      );
      break;
    case 'Fieldmanager_RichTextArea':
      return (
        <RichtextField
          field={field}
          valueHook={valueHook}
          index={index}
          label={label}
        />
      );
      break;
    case 'Fieldmanager_Select':
      return (
        <Select
          field={field}
          valueHook={valueHook}
          index={index}
          label={label}
        />
      );
      break;
    case 'Fieldmanager_TextArea':
      return (
        <TextareaField
          field={field}
          valueHook={valueHook}
          index={index}
          label={label}
        />
      );
      break;
    case 'Fieldmanager_TextField':
      return (
        <TextField
          field={field}
          valueHook={valueHook}
          index={index}
          label={label}
        />
      );
      break;
    default:
      return null;
  }
}
