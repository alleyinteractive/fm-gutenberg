/* eslint-disable import/no-extraneous-dependencies */
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

/**
 * Used to make sure values in the asset JSON don't contain unexpected characters.
 * This should prevent any PHP slipping through, which would be dangerous since
 * we're `include`ing the resulting JSON file.
 *
 * NOTE: This is a negated character set because we're looking for
 *  anything that _isn't_ one of these characters.
 */
const assetRegex = new RegExp('[^\\/\\.\\-_a-zA-Z0-9]', 'g');
const hasInvalidCharacters = (value) => {
  if (assetRegex.test(value)) {
    // eslint-disable-next-line max-len, no-console
    console.log(chalk.red(`Attempted to write invalid value '${value}' to static asset JSON manifest. All JSON values must match ${assetRegex}`));
    return true;
  }

  return false;
};

/**
 * Collect all assets for a specific entry point into an object.
 *
 * @param {array} assetList - array of relative asset paths for a specific entry point.
 */
const getAssets = (assetList) => assetList.reduce((assetAcc, outputPath) => {
  const fileInfo = path.parse(outputPath);
  const ext = fileInfo.ext.replace('.', '');

  // Validate key and value
  if (hasInvalidCharacters(ext) || hasInvalidCharacters(outputPath)) {
    return assetAcc;
  }

  if ('map' !== ext) {
    return { ...assetAcc, [ext]: outputPath };
  }

  return assetAcc;
}, {});

/**
 * Build JSON object containing a map of asset names to the output filename of that asset (including hash).
 * Assets are organized by entry point.
 *
 * @param {string} filename - optional filename override for this build.
 * @return {string} JSON object containg asset name => filename mapping.
 */
module.exports = (mode) => (stats) => {
  const assets = stats.assetsByChunkName;

  // Loop through entries
  const entryMap = Object.keys(assets).reduce((entryAcc, entryName) => {
    // Validate entry name
    if (hasInvalidCharacters(entryName)) {
      return entryAcc;
    }

    // Make sure it's an array
    const assetList = [].concat(assets[entryName]);

    // Loop through assets
    return {
      ...entryAcc,
      [entryName]: getAssets(assetList),
    };
  }, {});

  const manifestJSON = JSON.stringify(entryMap);

  // Write out asset manifest explicitly or else it'll be served from localhost, where wp can't access it
  if ('development' === mode) {
    fs.writeFileSync(
      path.join(__dirname, '../build/assetMap.json'),
      manifestJSON
    );
  }

  return manifestJSON;
};
