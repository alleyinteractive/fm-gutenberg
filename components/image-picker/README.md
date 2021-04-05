# ImagePicker
Allows a user to select or remove an image using the media modal. This component
is a thin wrapper around `MediaPicker` and simply sets the allowed types for the
`MediaPicker` to `image`.

For more information on how to use this component, see
[MediaPicker](../media-picker/README.md).


## Usage
Render an image picker, complete with image preview and remove button:

``` js
<ImagePicker
  allowedTypes={['image']}
  className="image-picker"
  imageSize="full"
  onReset={(image) => setAttributes({ imageId: 0 })},
  onUpdate={(image) => setAttributes({ imageId: image.id })}
  value={imageId}
/>
```

## Props
| Prop         | Default | Required | Type     | Description                                                                |
|--------------|---------|----------|----------|----------------------------------------------------------------------------|
| allowedTypes | []      | No       | array    | Array with the types of the media to upload/select from the media library. |
| className    |         | No       | string   | Class name.                                                                |
| imageSize    | 'full'  | No       | string   | Image size to fetch url for.                                               |
| onReset      |         | Yes      | function | Function to reset imageId to 0.                                            |
| onUpdate     |         | Yes      | function | Function to set imageId value on image selection/upload.                   |
| value        |         | Yes      | integer  | Image id or 0                                                              |
