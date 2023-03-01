import React from 'react';
import { Button, PanelRow } from '@wordpress/components';
import SortableList, { SortableItem, SortableKnob } from 'react-easy-sort'; // TODO: replace with https://github.com/clauderic/dnd-kit
import { arrayMoveImmutable } from 'array-move';
import { __ } from '@wordpress/i18n';

import FMObject from '@/interfaces/fm-object';
import Field from '@/interfaces/field';
import FieldRouter from './fieldRouter';
import AddMoreButton from '../../components/add-more-button';

import './repeatable.scss';

const CustomKnob = React.forwardRef<HTMLDivElement, {}>((props, ref) => (
  <span ref={ref} className="fm-gutenberg-move-handle" aria-label={__('Move', 'fm-gutenberg')}>::</span>
));

interface MaybeSortableListProps {
  children?: React.ReactNode;
  onSortEnd: (oldIndex: number, newIndex: number) => void;
  sortable: boolean;
}

function MaybeSortableList({ children, onSortEnd, sortable }: MaybeSortableListProps) {
  return (
    sortable ? (
      <SortableList
        onSortEnd={onSortEnd}
        className="fm-gutenberg-sortable-list"
      >
        {children}
      </SortableList>
    ) : (
      <ul
        className="fm-gutenberg-list"
      >
        {children}
      </ul>
    )
  );
}

interface MaybeSortableItemProps {
  children?: React.ReactNode | React.ReactNode[];
  key: string;
  sortable: boolean;
}

function MaybeSortableItem({ children, key, sortable }: MaybeSortableItemProps) {
  return (
    sortable ? (
      <SortableItem key={key}>
        {children as any}
      </SortableItem>
    ) : (
      <li key={key}>
        {children}
      </li>
    )
  );
}

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
    sortable,
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
    const newValueArray = addMorePosition === 'bottom' ? [...value, {}] : [{}, ...value];
    setValue(newValueArray);
  };

  const removeElement = (index: number) => {
    const newValueArray = [...value];
    newValueArray.splice(index, 1);
    setValue(newValueArray);
  };

  const onSortEnd = (oldIndex: number, newIndex: number) => {
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
        <MaybeSortableList onSortEnd={onSortEnd} sortable={sortable}>
          {value && Array.isArray(value)
            ? value.map((childValue: number | string | FMObject, childindex: number) => {
              const key = `repeatable-${childindex}`;
              return (
                <MaybeSortableItem
                  key={key}
                  sortable={sortable}
                >
                  <PanelRow>
                    <div className="fm-gutenberg-panel-container">
                      <div className="fm-gutenberg-controls">
                        {sortable ? (
                          <SortableKnob>
                            <CustomKnob />
                          </SortableKnob>
                        ) : null}
                        <Button
                          onClick={() => removeElement(childindex)}
                          className="fm-gutenberg-remove"
                        >
                          <span className="screen-reader-text">{__('Remove', 'fm-gutenberg')}</span>
                        </Button>
                      </div>
                      <div>
                        <FieldRouter
                          field={field}
                          index={childindex}
                          valueHook={useIndexedValue}
                        />
                      </div>
                    </div>
                  </PanelRow>
                </MaybeSortableItem>
              );
            }) : null}
        </MaybeSortableList>
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
