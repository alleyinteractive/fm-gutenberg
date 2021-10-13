# Custom Hooks: useInnerBlocksAttributes

A custom React hook that returns the current block's inner block's attributes.

## Usage

```jsx
const MyBlock = ({
	clientId
}) => {
  const innerBlockAttributes = useInnerBlocksAttributes(clientId);

  ...
};
```
