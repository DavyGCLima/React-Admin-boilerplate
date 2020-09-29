export default function validate(emailValidation) {
  if (typeof emailValidation !== 'string') return false;
  if (emailValidation === '') return true;
  return emailValidation.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
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
