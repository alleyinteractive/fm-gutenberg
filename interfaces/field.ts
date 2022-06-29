export default interface Field {
  field_class?: string;
  attributes?: {
    rows?: Number | null;
  };
  label?: string;
  name: string;
  title?: string;
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
  }
}
