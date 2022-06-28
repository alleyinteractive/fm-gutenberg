import React from 'react';
import PropTypes from 'prop-types';
import { Button, PanelRow, PanelBody } from '@wordpress/components';
import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc';
import { arrayMoveImmutable } from 'array-move';
import { v4 as uuidv4 } from 'uuid';
import { __ } from '@wordpress/i18n';

import FieldRouter from './fieldRouter';

import './group.scss';

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

  const DragHandle = sortableHandle(() => <span className="fm-gutenberg-move-handle" aria-label={__('Move', 'fm-gutenberg')}>::</span>);

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
      <SortableContainer
        onSortEnd={onSortEnd}
        useDragHandle
      >
        {value.map((childValue, index) => {
          const key = uuidv4();
          return (
            <SortableItem
              key={key}
              index={index}
            >
              <PanelBody>
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
                      {Object.keys(children).map((itemKey) => {
                        const child = children[itemKey];
                        return (
                          <FieldRouter
                            field={child}
                            index={index}
                            valueHook={useIndexedValue}
                            key={itemKey}
                          />
                        );
                      })}
                    </div>
                  </div>
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
