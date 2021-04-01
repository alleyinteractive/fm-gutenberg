# ImageUploader
Allows for a simple media upload/replace/remove feature for blocks. Does not replace the `imagePicker` component which handles image picking via post meta.

## Usage
``` js
<ImageUploader
  id={1234}
  isSelected={true}
  onReset={() => setAttributes({ imageId: 0 })}
  onSelect={({ id: next }) => setAttributes({ imageId: next })}
/>
```

## Props
| Prop       | Default | Required | Type     | Description                                                            |
|------------|---------|----------|----------|------------------------------------------------------------------------|
| id         |         | Yes      | integer  | Image id or 0                                                          |
| imageSize  |         | 'full'   | string   | Image size to fetch url for.                                           |
| isSelected | true    | No       | boolean  | Whether or not the block is selected. If true shows optional controls. |
| onSelect   |         | Yes      | function | Function to set imageId value on image selection/upload.               |
| onReset    |         | Yes      | function | Function to reset imageId to 0.                                        |
