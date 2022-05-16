import React from 'react';
import PropTypes from 'prop-types';
import { PanelRow, PanelBody } from '@wordpress/components';
import { sortableContainer, sortableElement } from 'react-sortable-hoc';
import { arrayMoveImmutable } from 'array-move';
import { v4 as uuidv4 } from 'uuid';

import TextField from './text-field';

const SortableItem = sortableElement(({ children }) => <li>{children}</li>);

const SortableContainer = sortableContainer(({ children }) => (
  <ul>{children}</ul>
));

const Group = ({
  field: {
    name,
    children = [],
  },
  valueHook,
}) => {
  const [value, setValue] = valueHook(name);

  const useIndexedValue = (index) => {
    const indexValue = value[index];
    const setIndexValue = (newValue) => {
      const newValueArray = [...value];
      newValueArray[index] = newValue;
      setValue(newValueArray);
    };
    return [indexValue, setIndexValue];
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    const newValue = arrayMoveImmutable(value, oldIndex, newIndex);
    setValue(newValue);
  };

  return (
    <SortableContainer onSortEnd={onSortEnd}>
      {value.map((childValue, index) => (
        <SortableItem key={uuidv4()} index={index}>
          <PanelBody>
            <PanelRow>
              {Object.keys(children).map((key) => {
                const child = children[key];
                return (
                  child.field_class === 'text' ? (
                    <TextField
                      field={child}
                      valueHook={useIndexedValue}
                      index={index}
                    />
                  ) : null
                );
              })}
            </PanelRow>
          </PanelBody>
        </SortableItem>
      ))}
    </SortableContainer>
  );
};

Group.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string,
    children: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
  valueHook: PropTypes.func.isRequired,
};

export default Group;
