import React from 'react';
import PropTypes from 'prop-types';
import { Button, PanelRow, PanelBody } from '@wordpress/components';
import { sortableContainer, sortableElement } from 'react-sortable-hoc';
import { arrayMoveImmutable } from 'array-move';
import { v4 as uuidv4 } from 'uuid';

import TextField from './text-field';

const SortableItem = sortableElement(({ children }) => (
  <li>
    {children}
  </li>
));

const SortableContainer = sortableContainer(({ children }) => (
  <ul>{children}</ul>
));

const Group = ({
  field: {
    add_more_label: addMoreLabel = '',
    add_more_position: addMorePosition = 'bottom',
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

  const addNew = () => {
    const newValueArray = [...value, {}];
    setValue(newValueArray);
  };

  const removeElement = (index) => {
    const newValueArray = [...value];
    newValueArray.splice(index, 1);
    setValue(newValueArray);
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    const newValue = arrayMoveImmutable(value, oldIndex, newIndex);
    setValue(newValue);
  };

  return (
    <>
      {addMorePosition === 'top' ? (
        <Button
          isSecondary
          onClick={addNew}
        >
          {addMoreLabel}
        </Button>
      ) : null}
      <SortableContainer onSortEnd={onSortEnd}>
        {value.map((childValue, index) => {
          const key = uuidv4();
          return (
            <SortableItem
              key={key}
              index={index}
            >
              <PanelBody>
                <PanelRow>
                  <Button
                    onClick={() => removeElement(index)}
                  >
                    x
                  </Button>
                  {Object.keys(children).map((itemKey) => {
                    const child = children[itemKey];
                    const fieldKey = uuidv4();
                    return (
                      child.field_class === 'text' ? (
                        <>
                          <TextField
                            key={fieldKey}
                            field={child}
                            valueHook={useIndexedValue}
                            index={index}
                          />
                        </>
                      ) : null
                    );
                  })}
                </PanelRow>
              </PanelBody>
            </SortableItem>
          );
        })}
      </SortableContainer>
      {addMorePosition === 'bottom' ? (
        <Button
          isSecondary
          onClick={addNew}
        >
          {addMoreLabel}
        </Button>
      ) : null}
    </>
  );
};

Group.propTypes = {
  field: PropTypes.shape({
    add_more_label: PropTypes.string,
    add_more_position: PropTypes.string,
    name: PropTypes.string,
    children: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
  valueHook: PropTypes.func.isRequired,
};

export default Group;
