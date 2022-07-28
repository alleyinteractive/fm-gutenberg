/**
 * A flexible object that can be used in repeating fields to represent a
 * Fieldmanager object with customizable keys and values. Keys can be any
 * valid string, and values are always either a number or a string.
 */
export default interface FMObject {
  [key: string]: number | string;
}
