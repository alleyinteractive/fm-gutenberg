# Custom Hooks: usePost

A custom React hook to retrieve post data given a post ID and post type.

## Usage

```jsx
const MyBlock = ({
	postID,
}) => {
  const { hasResolved, post } = usePost(postID, postType);

  if (hasResolved && post) {
    ...
  }
};
```
