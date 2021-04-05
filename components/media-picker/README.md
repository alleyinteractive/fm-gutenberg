# MediaPicker

Allows a user to select or remove a media element using the media modal.

## Development Guidelines

### Usage

Render a media picker, complete with URL preview and remove button:

    <MediaPicker
      allowedTypes={['image']}
      onUpdate={(media) => setAttributes({ mediaId: media.id })}
      value={mediaId}
    />

The value of `mediaId` is the ID of the media element, and is destructured from
`props.attributes`.

### Props

#### `allowedTypes {Array}`

Optional. Accepts the same arguments as
[MediaPlaceholder](https://github.com/WordPress/gutenberg/blob/trunk/packages/block-editor/src/components/media-placeholder/README.md).
Can be used to restrict which media types are selectable.

#### `onUpdate {function}`

Callback function to be invoked when the selection changes. If media is selected,
the callback will be invoked with the media object that was selected. If media is
deselected, the callback will be invoked with an empty object.

#### `value {Number}`

The attachment ID of the currently selected media item.
