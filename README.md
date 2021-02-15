# wp-starter-plugin
A companion plugin to wp-starter-theme, which is used to create custom blocks, sidebar plugins, and register custom post types and meta fields.

## Getting Started

Do a case sensitive global search and replace for the following strings:

* wp-starter-plugin (Localization domain)
* wp_starter_plugin (Prefix for functions)
* WP_STARTER_PLUGIN (Prefix for constants)
* WP_Starter_Plugin (Prefix for class names)
* WP Starter Plugin (Commented text)

## Running builds

Run `npm run build` to build all production assets. Run `npm run dev` for a development build of assets, which also watches files for changes and automatically recompiles.

## Scaffolder

Run `npm run scaffold` to run the Alley scaffolder against the plugin. All normally-supported options are supported here.

## Plugin Sidebar

This plugin is built to use a single PluginSidebar for all site-specific features. The sidebar configuration can be found in `plugins/sidebar`. The main sidebar component is in `plugins/sidebar/components/sidebar/index.js`.

There is data available in `plugins/sidebar/components/sidebar/index.js` to allow for customizing which components are loaded based on post type and URL, and this logic can be extended to query other parts of the post object.

## Saving to Post and Term Meta

In order to save data back to post or term meta, you need to register the meta first. See the examples in `index.php` using the meta registration helper on how to do this.

## Reusable Components

A collection of reusable components is located in `./components`. These components can be included in a variety of contexts, such as the `PluginSidebar` or in blocks.

## Services

Complex JavaScript logic should be broken out into separate functions, one function per file, in the `services` directory, grouped into subfolders by type. See `services/media/getImageThumbnail.js` for an example of this. All services functions should have associated tests.

## Pathing

This project does not use aliases by default, since aliases can confuse IDEs and make it harder to navigate through the code to find where something is defined. You can add them yourself if you prefer.

## Running Tests

Run `npm run test` to run Jest tests against JavaScript files. Run `npm run test:watch` to keep the test runner open and watching for changes.

Run `npm run lint` to run ESLint against all JavaScript files. Linting will also happen when running development or production builds.

Run `phpcs` to run PHP CodeSniffer tests against PHP files.

## Custom Blocks

See the sample block for how to create and configure custom blocks. Each custom block needs its own webpack entry point and needs to be enqueued in `inc/assets.php`. Custom blocks can be conditionally enqueued depending on post type, post type supports, etc.

## Travis Integration

Travis will automatically run `phpcs`, `npm run test`, and `npm run build` (which includes eslint). If any of these checks fail, the build will fail.

## Hot Reloading

Still to come. The closest you can get now is running `npm run dev`, which watches for changes, and reloading the page.

## Built-in Components
- `post-selector`: A component used for searching for and selecting posts via the REST API.
- `csv-uploader`: Allows a user to upload a CSV file, which is parsed in the browser, converted to a JSON structure, passed through a user specified callback function for further transformation, and saved to block attributes.
- `image-picker`: Allows a user to select or remove an image using the media modal. This component is (currently) intended to save to postmeta.
