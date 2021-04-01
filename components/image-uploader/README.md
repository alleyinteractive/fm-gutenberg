# ImageUploader
Allows for a simple media upload/replace/remove feature for blocks. Does not replace the `imagePicker` component which handles image picking via post meta.

## Usage
``` js
<ImageUploader
  className="image-selector"
  id={1234}
  imageSize="thumbnail"
  isSelected={true}
  onReset={() => setAttributes({ imageId: 0 })}
  onSelect={({ id: next }) => setAttributes({ imageId: next })}
  type="native"
/>
```

## Props
| Prop       | Default | Required | Type     | Description                                                            |
|------------|---------|----------|----------|------------------------------------------------------------------------|
| className  |         | No       | string   | Class name.                                                            |
| id         |         | Yes      | integer  | Image id or 0                                                          |
| imageSize  | 'full'  | No       | string   | Image size to fetch url for.                                           |
| isSelected | true    | No       | boolean  | Whether or not the block is selected. If true shows optional controls. |
| onSelect   |         | Yes      | function | Function to set imageId value on image selection/upload.               |
| onReset    |         | Yes      | function | Function to reset imageId to 0.                                        |
| type       | 'ratio' | No       | string   | 'native' meaning image natural size or 'ratio' which retains a 16x9.   |