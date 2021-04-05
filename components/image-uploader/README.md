# ImageUploader
Allows for a simple media upload/replace/remove feature for blocks. Does not replace the `imagePicker` component which handles image picking via post meta.

## Usage
``` js
<ImageUploader
  allowedTypes={['image']}
  className="image-selector"
  imageSize="thumbnail"
  onReset={() => setAttributes({ imageId: 0 })}
  onSelect={({ id: next }) => setAttributes({ imageId: next })}
  value={1234}
/>
```

## Props
| Prop         | Default | Required | Type     | Description                                                                |
|--------------|---------|----------|----------|----------------------------------------------------------------------------|
| allowedTypes | []      | No       | array    | Array with the types of the media to upload/select from the media library. |
| className    |         | No       | string   | Class name.                                                                |
| value        |         | Yes      | integer  | Image id or 0                                                              |
| imageSize    | 'full'  | No       | string   | Image size to fetch url for.                                               |
| onSelect     |         | Yes      | function | Function to set imageId value on image selection/upload.                   |
| onReset      |         | Yes      | function | Function to reset imageId to 0.                                            |