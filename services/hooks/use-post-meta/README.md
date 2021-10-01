# Custom Hooks: usePostMeta

A custom React hook that wraps `useEntityProp` for working with postmeta. It
returns an array that contains a copy of postmeta as well as a helper
function that sets a meta value for a given key. This hook is intended to
reduce boilerplate code in components that need to read and write postmeta.
By default, it operates on postmeta for the current post, but you can
optionally pass a post type and post ID in order to get and set post meta
for an arbitrary post. Default values for postmeta come from the default value
that was provided when the meta was registered with register_post_meta.

## Usage

### Editing the Current Post's Meta

```jsx
const MyComponent = () => {
  const [{
    my_meta_key: myMetaKey,
  }, setMeta] = usePostMeta();

  return (
    <TextControl
      label={__('My Meta Key', 'wp-starter-plugin')}
      onChange={(next) => setMeta('my_meta_key', next)}
      value={myMetaKey}
    />
  );
};
```

### Editing Another Post's Meta

```jsx
const MyComponent = ({
  postId,
  postType,
}) => {
  const [{
    my_meta_key: myMetaKey,
  }, setMeta] = usePostMeta(postType, postId);

  return (
    <TextControl
      label={__('My Meta Key', 'wp-starter-plugin')}
      onChange={(next) => setMeta('my_meta_key', next)}
      value={myMetaKey}
    />
  );
};
```
