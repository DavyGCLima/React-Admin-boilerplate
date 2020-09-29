export default function validate(phoneString) {
  if (typeof phoneString !== 'string') return false;
  if (phoneString === '') return true;
  return phoneString.match(/\+?(\d?\d?\d)\(?(\d{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})/); // /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{9})$/gm
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
