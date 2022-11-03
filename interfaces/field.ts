export default interface Field {
  attributes?: {
    rows?: number | null;
  };
  checked_value?: string;
  field_class?: string;
  first_empty?: boolean;
  fm?: {
    add_more_label: string;
    add_more_position: 'bottom' | 'top';
    attributes: {
      rows: number | null;
    };
    children: Array<Field>;
    field_class: string;
    label: string;
    limit: number,
    name: string;
  };
  label?: string;
  name: string;
  options?: string[],
  title?: string;
  unchecked_value?: string;
}
