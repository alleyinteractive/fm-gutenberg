export default interface Field {
  add_more_label: string;
  add_more_position: 'bottom' | 'top';
  attributes?: {
    [key: string]: number | string;
  };
  checked_value?: string;
  children?: {
    [key: string]: Field;
  };
  datasource?: {
    ajax_action?: string,
    options?: {
      [key: string]: string;
    };
  };
  date_format?: string;
  default_value?: string;
  description?: string;
  description_after_element: boolean;
  display_if?: {
    src?: string;
    value?: string;
  };
  field_class?: string;
  fm_class: string;
  first_empty?: boolean;
  label?: string;
  limit: number;
  minimumCount?: number;
  name: string;
  options?: string[] | { [key: string]: string };
  show_edit_link?: boolean;
  sortable: boolean;
  title?: string;
  unchecked_value?: string;
  use_time?: boolean;
}
