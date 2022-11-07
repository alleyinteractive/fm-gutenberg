import React from 'react';
import { Button, PanelRow } from '@wordpress/components';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc'; // TODO: replace with https://github.com/clauderic/dnd-kit
import { arrayMoveImmutable } from 'array-move';
import { __ } from '@wordpress/i18n';

import FMObject from '@/interfaces/fm-object';
import Field from '@/interfaces/field';
import FieldRouter from './fieldRouter';
import AddMoreButton from '../../components/add-more-button';

import './repeatable.scss';

interface ChildProps {
  children?: React.ReactNode | React.ReactNode[];
}

const SortableItem = SortableElement(({ children }: ChildProps) => (
  <li>
    {children}
  </li>
));

const SortableList = SortableContainer(({ children }: ChildProps) => (
  <ul className="fm-gutenberg-sortable-list">{children}</ul>
));

const DragHandle = SortableHandle(() => <span className="fm-gutenberg-move-handle" aria-label={__('Move', 'fm-gutenberg')}>::</span>);

interface RepeatableProps {
  field: Field;
  valueHook: (key: number | string) =>
  [number[] | string[] | FMObject[], Function];
}

export default function Repeatable({
  field,
  field: {
    add_more_label: addMoreLabel = '',
    add_more_position: addMorePosition = 'bottom',
    limit = null,
    minimumCount = null,
    name,
  },
  valueHook,
}: RepeatableProps) {
  const [value, setValue] = valueHook(name);

  const useIndexedValue = (key: number): [any, Function] => {
    const indexValue = value[key];
    const setIndexValue = (newValue: string) => {
      const newValueArray = [...value];
      newValueArray[key] = newValue;
      setValue(newValueArray);
    };
    return [indexValue, setIndexValue];
  };

  const addNew = () => {
    const newValueArray = [...value, {}];
    setValue(newValueArray);
  };

  const removeElement = (index: number) => {
    const newValueArray = [...value];
    newValueArray.splice(index, 1);
    setValue(newValueArray);
  };

  const onSortEnd = ({ oldIndex, newIndex }: { oldIndex: number, newIndex: number }) => {
    const newValue = arrayMoveImmutable([...value], oldIndex, newIndex);
    setValue(newValue);
  };

  return (
    <>
      {addMorePosition === 'top' ? (
        <AddMoreButton
          addMoreLabel={addMoreLabel}
          addNew={addNew}
          limit={limit}
          minimumCount={minimumCount}
        />
      ) : null}
      <PanelRow>
        <SortableList
          onSortEnd={onSortEnd}
          useDragHandle
        >
          {value ? value.map((childValue: number | string | FMObject, index: number) => {
            const key = `repeatable-${index}`;
            return (
              <SortableItem
                key={key}
                index={index}
              >
                <PanelRow>
                  <div className="fm-gutenberg-panel-container">
                    <div className="fm-gutenberg-controls">
                      <DragHandle />
                      <Button
                        onClick={() => removeElement(index)}
                        className="fm-gutenberg-remove"
                      >
                        <span className="screen-reader-text">{__('Remove', 'fm-gutenberg')}</span>
                      </Button>
                    </div>
                    <div>
                      <FieldRouter
                        field={field}
                        index={index}
                        valueHook={useIndexedValue}
                      />
                    </div>
                  </div>
                </PanelRow>
              </SortableItem>
            );
          }) : null}
        </SortableList>
      </PanelRow>
      {addMorePosition === 'bottom' ? (
        <AddMoreButton
          addMoreLabel={addMoreLabel}
          addNew={addNew}
          limit={limit}
          minimumCount={minimumCount}
        />
      ) : null}
    </>
  );
}
