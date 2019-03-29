# PostSelector

Allows a user to select a post using a search query and the REST API. Optionally, accepts a list of post types to restrict the search to. Utilizes the search endpoint, so posts must have the appropriate visibility within the REST API to appear in the result list.

Importantly, this component does not save the selected post, it just returns it in the `onChange` method. The enclosing block or component is responsible for managing the selected posts in some way, and using this component as a method for picking a new one.

## Development Guidelines

### Usage

Render a post selector with a limited list of post types.

    <PostSelector
      onChange={onChange}
      postTypes={['post', 'page']}
      threshold={2}
    /> 

The `onChange` callback will receive the selected post object, as it is returned from the `search` REST endpoint.

The `postTypes` prop is optional. If not specified, all queryable post types will be included (behind the scenes, this results in `subtype=any` in the REST request). If specified, it must be an array of post type slugs.

The `threshold` prop is optional. If specified, it overrides the default minimum number of characters that must be entered in order for the search to fire (default is 3).
