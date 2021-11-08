# wp-starter-plugin
A companion plugin to wp-starter-theme, which is used to create custom blocks,
slotfills, and register custom post types and meta fields.

## Getting Started

Do a case sensitive global search and replace for the following strings:

* wp-starter-plugin (Localization domain)
* wp_starter_plugin (Prefix for functions)
* WP_STARTER_PLUGIN (Prefix for constants)
* WP_Starter_Plugin (Prefix for class names)
* WP Starter Plugin (Commented text)

## Running builds

Run `npm run build` to build all production assets. Run `npm run dev` for a
development build of assets, which also watches files for changes and
automatically recompiles.

## Scaffolder

Run `npm run scaffold` to run the Alley scaffolder against the plugin. All
normally-supported options are supported here.

## Slotfills

This plugin is built to use slotfills for all site-specific features. The
slotfill configuration can be found in `slotfills/index.js`. Individual slotfill
sections are located in `slotfills/sections`.

## Saving to Post Meta

In order to save data back to post meta, you need to register the meta first.
Meta fields are registered by adding them to the `config/post-meta.json` file.
There are some examples in this file for Open Graph data.

## Reusable Components

A collection of reusable components is located in `./components`. These
components can be included in a variety of contexts, such as slotfills and
blocks.

## Services

Complex JavaScript logic should be broken out into separate functions, one
function per file, in the `services` directory, grouped into subfolders by type.
See `services/media/get-media-url.js` for an example of this. All services
functions should have associated tests.

## Pathing

This project utilizes module aliases to make it easier to handle JavaScript
imports. The project is configured to treat paths starting with `@/` as being
relative to this plugin's root folder. For example:

```javascript
import ImagePicker from '@/components/image-picker';
```

These module aliases are configured to work properly with ESLint, IDEs, Jest,
and Webpack.

## Running Tests

Run `npm run test` to run Jest tests against JavaScript files. Run
`npm run test:watch` to keep the test runner open and watching for changes.

Run `npm run lint` to run ESLint against all JavaScript files. Linting will also
happen when running development or production builds.

Run `composer phpcs` to run PHP CodeSniffer tests against PHP files.

## Custom Blocks

Use the block scaffolder to create custom blocks. Create the block definition in
`scaffold/blocks`. Ensure the name of the JSON file is the same as the
non-namespaced block name (e.g., if your block is `wp-starter-plugin/my-block`,
then the JSON file must be `my-block.json`). After creating or updating the JSON
file, run the scaffold command (`npm run scaffold`) to generate or regenerate
assets. Block registration, script creation, etc is handled for you.

## CI/CD Integration

Buddy will automatically run `composer phpcs`, `npm run test`, and
`npm run build` (which includes eslint). If any of these checks fail, the build
will fail.

## Hot Reloading

Still to come. The closest you can get now is running `npm run dev`, which
watches for changes, and reloading the page.

## Built-in Components
- `AudioPicker`: Allows a user to select or remove audio using the media
  modal or by entering a URL. A wrapper around `MediaPicker` that sets the file
  type to audio and provides an audio player preview.
- `CSVUploader`: Allows a user to upload a CSV file, which is parsed in the
  browser, converted to a JSON structure, passed through a user specified
  callback function for further transformation, and saved to block attributes.
- `ImagePicker`: Allows a user to select or remove an image using the media
  modal or by entering a URL. A wrapper around `MediaPicker` that sets the file
  type to image and provides an image preview.
- `MediaPicker`: Allows a user to select or remove any attachment from the media
  library using the media modal.
- `PostSelector`: A component used for searching for and selecting posts via the
  REST API.
- `VideoPicker`: Allows a user to select or remove a video using the media
  modal or by entering a URL. A wrapper around `MediaPicker` that sets the file
  type to video and provides a video player preview.
