# ImagePicker

Allows a user to select or remove an image using the media modal. This component
is a thin wrapper around `MediaPicker` and simply sets the allowed types for the
`MediaPicker` to `image`.

## Development Guidelines

### Usage

Render an image picker, complete with image preview and remove button:

    <ImagePicker
      onUpdate={(image) => setAttributes({ imageId: image.id })}
      value={imageId}
    />

For more information on how to use this component, see
[MediaPicker](../media-picker/README.md).
