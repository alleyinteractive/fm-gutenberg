import React from 'react';

import FMObject from '@/interfaces/fm-object';
import Field from '@/interfaces/field';
import {
  Tab,
  Tabs,
  TabList,
  TabPanel,
} from 'react-tabs';

import SafeHTML from '@/components/safe-html';

import Checkbox from '../checkbox';
import Checkboxes from '../checkboxes-field';
import ColorPickerField from '../color-picker-field';
import DateField from '../date-field';
import MediaField from '../media-field';
import Radio from '../radio';
import Select from '../select';
import TextField from '../text-field';
import TextareaField from '../textarea-field';
import RichtextField from '../richtext-field';
import Autocomplete from '../autocomplete';

import './index.scss';

interface FieldRouterProps {
  field: Field;
  index?: number;
  valueHook: (key: number | string) => [null | string | FMObject | string[] | FMObject[], Function];
}

export default function FieldRouter({
  field,
  field: {
    children,
    description,
    display_if: {
      src: displayIfSrc = '',
      value: displayIfValue = '',
    } = {},
    field_class: fieldClass,
    fm_class: fmClass,
    label = '',
    name = '',
    serialize_data: serializeData = true,
    tabbed = '',
  },
  index = null,
  valueHook,
}: FieldRouterProps) {
  if (displayIfSrc !== '') {
    const [triggerValue] = valueHook(displayIfSrc);
    let simpleValue = triggerValue && typeof triggerValue === 'object' && !Array.isArray(triggerValue) ? triggerValue[displayIfSrc] : triggerValue;
    simpleValue = simpleValue ? String(simpleValue) : '';

    if (displayIfValue !== String(simpleValue)) {
      return null;
    }
  }
  if (children && fieldClass === 'group') {
    const [value, setValue] = valueHook(index ?? name);
    let useChildValue: (key: string) => [any, Function];

    if (serializeData) {
      useChildValue = (key: string): [any, Function] => {
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
    } else {
      useChildValue = valueHook;
    }

    return (
      tabbed ? (
        <>
          <h4>{label}</h4>
          <Tabs className={tabbed === 'vertical' ? 'react-tabs react-tabs__vertical' : 'react-tabs'}>
            <TabList>
              {Object.values(children).map((child: Field) => (
                <Tab>{child.label}</Tab>
              ))}
            </TabList>
            {Object.keys(children).map((key) => (
              <TabPanel>
                <FieldRouter
                  field={children[key]}
                  index={index}
                  valueHook={useChildValue}
                  key={key}
                />
              </TabPanel>
            ))}
            {description ? (
              <SafeHTML
                tag="p"
                className="fm-group-description"
                html={description}
              />
            ) : null}
          </Tabs>
        </>
      ) : (
        <div className="fm-gutenberg__group" key={`${name}-group`}>
          {Object.keys(children).map((key) => (
            <FieldRouter
              field={children[key]}
              valueHook={useChildValue}
              key={key}
            />
          ))}
          {description ? (
            <SafeHTML
              tag="p"
              className="fm-group-description"
              html={description}
            />
          ) : null}
        </div>
      )
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
    case 'Fieldmanager_Checkbox':
      return (
        <Checkbox
          field={field}
          valueHook={valueHook}
          index={index}
          label={label}
        />
      );
    case 'Fieldmanager_Checkboxes':
      return (
        <Checkboxes
          field={field}
          valueHook={valueHook}
          index={index}
          label={label}
        />
      );
    case 'Fieldmanager_Colorpicker':
      return (
        <ColorPickerField
          field={field}
          valueHook={valueHook}
          index={index}
          label={label}
        />
      );
    case 'Fieldmanager_Datepicker':
      return (
        <DateField
          field={field}
          valueHook={valueHook}
          index={index}
          label={label}
        />
      );
    case 'Fieldmanager_DraggablePost':
      return (
        <p>
          Fieldmanager_DraggablePost
        </p>
      );
    case 'Fieldmanager_Grid':
      return (
        <p>
          Fieldmanager_Grid
        </p>
      );
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
    case 'Fieldmanager_Link':
      return (
        <TextField
          field={field}
          valueHook={valueHook}
          index={index}
          label={label}
          type="url"
        />
      );
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
    case 'Fieldmanager_Radios':
      return (
        <Radio
          field={field}
          valueHook={valueHook}
          index={index}
          label={label}
        />
      );
    case 'Fieldmanager_RichTextArea':
      return (
        <RichtextField
          field={field}
          valueHook={valueHook}
          index={index}
          label={label}
        />
      );
    case 'Fieldmanager_Select':
      return (
        <Select
          field={field}
          valueHook={valueHook}
          index={index}
          label={label}
        />
      );
    case 'Fieldmanager_TextArea':
      return (
        <TextareaField
          field={field}
          valueHook={valueHook}
          index={index}
          label={label}
        />
      );
    case 'Fieldmanager_TextField':
      return (
        <TextField
          field={field}
          valueHook={valueHook}
          index={index}
          label={label}
        />
      );
    default:
      return null;
  }
}
