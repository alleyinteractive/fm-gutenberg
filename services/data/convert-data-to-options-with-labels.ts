interface Option {
  label: string;
  value: string;
}

/**
 *
 * @param array|object options The options set in the FM Field.
 * @returns
 */
export default function convertDataToOptionsWithLabels(
  options: { [key: string]: string }[],
): Option[] {
  return options.map((option) => {
    const { name, value } = option;
    return (
      { label: name, value }
    );
  });
}
