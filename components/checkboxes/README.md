# Checkboxes

Provides a UI component that uses the `Checkbox` component to render the equivalent
of a multi-select without needing to use the `SelectControl` component.

## Usage

``` js
<Checkboxes
  label={__('Setting', 'fm-gutenberg')}
  value={setting}
  onChange={(newValue) => setAttributes({ setting: newValue })}
  options={[
    { value: 'option-1', label: __('Option 1', 'fm-gutenberg') },
    { value: 'option-2', label: __('Option 2', 'fm-gutenberg') },
  ]}
/>
```

## Props

| Prop        | Default     | Required | Type     | Description                                                                                              |
|-------------|-------------|----------|----------|----------------------------------------------------------------------------------------------------------|
| label       |             | Yes      | string   | The label for the component.                                                                             |
| value       |             | Yes      | array    | The current value as an array of strings.                                                                |
| options     |             | Yes      | array    | Available options to choose from with a structure of `{ value: '', label: '' }`.                         |
| onChange    |             | Yes      | function | Function called with the selected options after the user makes an update.                                |
