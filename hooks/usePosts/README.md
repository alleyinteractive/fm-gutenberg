# Custom Hooks: usePosts

A custom React hook to retrieve multiple post's data given a post ID and post type.

## Usage

```jsx
const MyBlock = ({
	postIDs,
}) => {
  const { hasResolved, posts } = usePosts(postIDs, postType);

  if (hasResolved && posts) {
    ...
  }
};
```
