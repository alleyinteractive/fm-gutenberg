# MediaPicker

Allows a user to select or remove a media element using the media modal.

## Development Guidelines

### Usage

Render a media picker, complete with URL preview and remove button:

    <MediaPicker
      onUpdate={(id) => setAttributes({ mediaId: id })}
      value={mediaId}
    />

The value of `mediaId` is the ID of the media element, and is destructured from
`props.attributes`.
