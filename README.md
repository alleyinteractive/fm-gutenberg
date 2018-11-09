# wp-starter-plugin
A companion plugin to wp-starter-theme, which is used to create custom blocks, sidebar plugins, and register custom post types and meta fields.

## Getting Started

Do a case sensitive global search and replace for the following strings:

wp-starter-plugin (Localization domain)
wp_starter_plugin (Prefix for functions)
WP_STARTER_PLUGIN (Prefix for constants)
WP_Starter_Plugin (Prefix for class names)
WP Starter Plugin (Commented text)

## Running builds

Run `npm run build` to build all production assets. Run `npm run dev` for a development build of assets, which also watches files for changes and automatically recompiles.

## Plugin Sidebar

This plugin is built to use a single PluginSidebar for all site-specific features. The sidebar configuration can be found in `plugins/sidebar`. The main sidebar component is in `plugins/sidebar/components/sidebar/index.js`.

There is data available in `plugins/sidebar/components/sidebar/index.js` to allow for customizing which components are loaded based on post type and URL, and this logic can be extended to query other parts of the post object.

## Saving to Post and Term Meta

In order to save data back to post or term meta, you need to register the meta first. See the examples in `index.php` using the meta registration helper on how to do this.

## Services

Complex JavaScript logic should be broken out into separate functions, one function per file, in the `services` directory, grouped into subfolders by type. See `services/media/getImageThumbnail.js` for an example of this. All services functions should have associated tests. Services functions can be imported using the alias `services/` to prevent the need for relative pathing.

## Running Tests

Run `npm run test` to run Jest tests against JavaScript files. Run `npm run test:watch` to keep the test runner open and watching for changes.

Run `npm run lint` to run ESLint against all JavaScript files. Linting will also happen when running development or production builds.

Run `phpcs` to run PHP CodeSniffer tests against PHP files.

## Custom Blocks

Still to come. There will eventually be a Webpack configuration and paths for custom blocks.

## Travis Integration

Still to come. phpcs, jest, and eslint are already set up, but need to be wired into Travis.

## Hot Reloading

Still to come. The closest you can get now is running `npm run dev`, which watches for changes, and reloading the page.
