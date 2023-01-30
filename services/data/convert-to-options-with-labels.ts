interface Option {
  label: string;
  value: string;
}

/**
 *
 * @param array|object options The options set in the FM Field.
 * @returns
 */
export default function convertToOptionsWithLabels(
  options: string[] | { [key: string]: string },
): Option[] {
  let optionsWithLabels = [];
  if (typeof options === 'object' && !Array.isArray(options)) {
    for (const [optionValue, optionLabel] of Object.entries(options)) {
      optionsWithLabels.push({ label: optionLabel, value: optionValue });
    }
  } else {
    optionsWithLabels = options.map((option) => (
      { label: option, value: option }
    ));
  }
  return optionsWithLabels;
}
