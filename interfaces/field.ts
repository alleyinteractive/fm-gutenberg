export default interface Field {
  attributes?: {
    rows?: Number | null;
  };
  checked_value?: string;
  field_class?: string;
  fm?: {
    add_more_label: string;
    add_more_position: 'bottom' | 'top';
    attributes: {
      rows: Number | null;
    };
    children: Array<Field>;
    field_class: string;
    label: string;
    name: string;
  };
  label?: string;
  name: string;
  options?: string[],
  title?: string;
  unchecked_value?: string;
}
