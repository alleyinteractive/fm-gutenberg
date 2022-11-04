import FMObject from '@/interfaces/fm-object';
import FieldRouter from './fieldRouter';

interface GroupProps {
  field: {
    add_more_label: string;
    add_more_position: 'bottom' | 'top';
    children: Object;
    limit?: number,
    minimumCount?: number,
    name: string;
  };
  valueHook: (key: number | string) =>
  [number[] | string[] | FMObject[], Function];
}

export default function Group({
  field: {
    name,
    children = [],
  },
  valueHook,
}: GroupProps) {
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

  return (
    <div>
      {Object.keys(children).map((itemKey: keyof typeof children) => {
        const child = children[itemKey];
        return (
          <FieldRouter
            field={child}
            // index={index}
            valueHook={useIndexedValue}
            key={itemKey}
          />
        );
      })}
    </div>
  );
}
