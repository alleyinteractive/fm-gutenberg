# Package README Standards

[![Example of a badge pointing to the readme standard spec](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

This plugin is an extension for [Fieldmanager](https://github.com/alleyinteractive/wordpress-fieldmanager) that translates existing Fieldmanager metaboxes into Gutenberg (WordPress Block Editor) slotfills and a React implementation of metaboxes.

## Table of Contents

- [Background](#background)
- [Releases](#Releases)
    - [Install](#install)
    - [Use](#use)
    - [Source](#from-source)
    - [Changelog](#changelog)
- [Development Process](#development-process)
    - [Contributing](#contributing)
- [Project Structure](#project-structure)
- [Third-Party Dependencies](#third-party-dependencies)
- [Related Efforts](#related-efforts)
- [Maintainers](#maintainers)
- [License](#license)

## Background

This plugin was developed to better integrate [Fieldmanager](https://github.com/alleyinteractive/wordpress-fieldmanager) with the WordPress Block Editor (Gutenberg). Fieldmanager works with the Block Editor by itself, but there are several things that could be improved.

## Releases

The current branch is `main`. We will add automatic support for a `built` branch soon.

### Install

Requires a version of Fieldmanager that includes [this action](https://github.com/alleyinteractive/wordpress-fieldmanager/blob/main/php/context/class-fieldmanager-context.php#L42) - should be included after 1.5.

### Use

Install Fieldmanager and define metaboxes as defined in the Fieldmanager docs. Once you enable this plugin, the metaboxes should be generated using React and native Gutenberg code.

### From Source

```sh
$ git clone https://github.com/alleyinteractive/fm-gutenberg
$ cd fm-gutenberg
$ npm ci
$ npm run build
```


### Changelog

Coming soon.

## Development Process

Pull requests are welcome.

### Contributing

If this project is open source, link to the `CONTRIBUTING.md` here and outline whether issues, pull requests, etc. are welcome and how to go about it, eg:

> Feel free to dive in! [Open an issue](https://github.com/alleyinteractive/fm-gutenberg/issues/new/choose) or submit PRs.
> Standard Readme follows the [Contributor Covenant](http://contributor-covenant.org/version/1/3/0/) Code of Conduct.


## Project Structure

Coming Soon


## Third-Party Dependencies

Requires [Fieldmanager](https://github.com/alleyinteractive/wordpress-fieldmanager)


## Related Efforts

- Extends [Fieldmanager]((https://github.com/alleyinteractive/wordpress-fieldmanager))

## Maintainers

- [Alley Interactive](https://github.com/alleyinteractive)
- [@mogmarsh](https://github.com/mogmarsh)

![Alley logo](https://avatars.githubusercontent.com/u/1733454?s=200&v=4)


## License

Released under the GNU GENERAL PUBLIC LICENSE.