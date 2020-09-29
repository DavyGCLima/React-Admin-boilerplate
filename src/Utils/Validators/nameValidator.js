/**
 * Validate Name fields
 * @param {String} nameString The field value
 */
export default function validate(nameString) {
  if (typeof nameString !== 'string') return false;
  if (nameString === '') return true;
  return nameString.match(/[a-z]+/);
}

/**
 * Return a custom message when error occurs
 * @param {String} nameString the field value
 * @param {String} defaultText Default helper text
 * @param {String} errorText Helper text error
 */
export function handleMsgError(nameString, defaultText, errorText) {
  if (!validate(nameString)) {
    return errorText ? errorText : defaultText;
  } else {
    return defaultText;
  }
}
