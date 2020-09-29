/**
 * @typedef Image
 * @property {String} url
 * @property {String} alt
 * @property {String} id
 * @property {Object} img
 */

/**
 * Object Image
 * @param {String} url
 * @param {String} alt
 * @param {String} id
 * @param {Object} img
 */
export default function Image(url = null, alt = null, id = null, img = null) {
  this.url = url;
  this.alt = alt;
  this.id = id;
  this.img = img;
}
