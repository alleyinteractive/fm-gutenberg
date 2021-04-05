# MediaPicker
Allows a user to select or remove a media element using the media modal.

## Usage
Render a media picker, complete with URL preview and remove button:

``` js
<MediaPicker
  allowedTypes={['image']}
  className="media-picker"
  imageSize="full"
  onReset={(image) => setAttributes({ imageId: 0 })},
  onUpdate={(image) => setAttributes({ imageId: image.id })}
  value={imageId}
/>
```

The value of `mediaId` is the ID of the media element, and is destructured from
`props.attributes`.

## Props
| Prop         | Default | Required | Type     | Description                                                                |
|--------------|---------|----------|----------|----------------------------------------------------------------------------|
| allowedTypes | []      | No       | array    | Array with the types of the media to upload/select from the media library. |
| className    |         | No       | string   | Class name.                                                                |
| imageSize    | 'full'  | No       | string   | Image size to fetch url for.                                               |
| onReset      |         | Yes      | function | Function to reset imageId to 0.                                            |
| onUpdate     |         | Yes      | function | Function to set imageId value on image selection/upload.                   |
| value        |         | Yes      | integer  | Image id or 0                                                              |

### `allowedTypes {Array}`
Accepts the same arguments as
[MediaPlaceholder](https://github.com/WordPress/gutenberg/blob/trunk/packages/block-editor/src/components/media-placeholder/README.md). Can be used to restrict which media types are selectable.

### `onUpdate {function}
Callback function to be invoked when the selection changes. If media is selected,
the callback will be invoked with the media object that was selected. If media is
deselected, the callback will be invoked with an empty object.
