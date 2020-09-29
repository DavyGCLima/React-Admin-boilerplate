/**
 * Transforms the @param value into a string in dash pattern
 * @param {String} value
 * @returns {String} the @param value in dash pattern
 */
export function generateDashName(value) {
  return value
    .trim()
    .replace(/\s+/g, " ")
    .replace(/\ /g, "-")
    .replace(/--+/, "-")
    .replace(/[^a-zA-Z0-9- ]/g, "");
}

/**
 * Transforms a masked phone number (@param phoneString) into just digits (String)
 * @param {String} phoneString The Phone Number
 * @returns input numbers only
 */
export function clearPhoneNumber(phoneString) {
  return phoneString.replace(/(\D)/g, "");
}

/**
 * Clean a Apollo Error message. It will remove 'Error: GraphQL error:'
 * @param {String} message original apollo error message
 */
export function cleanApolloErrorsMsg(message) {
  return message
    .replace("Error:", "")
    .replace("error:", "")
    .replace("GraphQL", "");
}
