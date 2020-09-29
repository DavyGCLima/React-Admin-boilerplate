import Image from "./Image";
import { uniqueId } from "lodash";
import { generateDashName } from "../Utils/stringUtils";

/**
 * @typedef Product
 * @property {String} id
 * @property {String} name
 * @property {String} sku
 * @property {Object} thumbnail
 * @property {Image[]} images
 * @property {String} price
 * @property {String} linkBrochure
 * @property {String} websitelink
 * @property {String} longDescription
 * @property {String} shortDescription
 * @property {String} qrUrl
 * @property {String} samplelink
 * @property {String} ytLink
 * @property {Boolean} status
 * @property {CustomLink[]} customLinks
 * @param {Product} attributes
 */
export default function Product(attributes = {}) {
  const setImage = (thumbnail) => {
    const url = !!thumbnail && !!thumbnail.url ? thumbnail.url : null;
    const alt = !!thumbnail && !!thumbnail.alt ? thumbnail.alt : null;
    const id = !!thumbnail && !!thumbnail.id ? thumbnail.id : url;
    const img = !!thumbnail && thumbnail.img ? thumbnail.img : url;
    return new Image(url, alt, id, img);
  };

  const setImages = (imagesArray) =>
    imagesArray.map((thumbnail) => setImage(thumbnail));

  const product = {};
  product.id = attributes?.id || "";
  product.name = attributes?.name || "";
  product.sku = attributes?.sku || "";
  product.thumbnail = setImage(attributes.thumbnail);
  product.images = setImages(attributes.images || []);
  product.price = attributes?.price || "";
  product.linkBrochure = attributes?.linkBrochure || { link: null, name: "" };
  product.websitelink = attributes?.websitelink || "";
  product.longDescription = attributes?.longDescription || "";
  product.shortDescription = attributes?.shortDescription || "";
  product.phone = attributes?.phone || "";
  product.qrUrl = attributes?.qrUrl || "";
  product.samplelink = attributes?.samplelink || "";
  product.ytLink = attributes?.ytLink || "";
  product.status = attributes?.status || false;
  return product;
}

/**
 * Prepare the product to be persisted
 * @param {Product} product
 * @returns {Product} prepared to be persisted
 */
export function toJson(product) {
  return {
    id: product.id,
    name: product.name,
    sku: product.sku,
    thumbnail: product.thumbnail,
    images: product.images,
    longDescription: product.longDescription,
    shortDescription: product.shortDescription,
    price: product.price || null,
    linkBrochure: product.linkBrochure,
    websitelink: product.websitelink,
    samplelink: product.samplelink,
    qrUrl: product.qrUrl,
    ytLink: splitYTId(product),
    status: product.status,
  };
}

/**
 * Transform a product from API to an version that can be used in componentes
 * @param {Product} product
 * @return {Product}
 */
export function fromJson(product) {
  return {
    ...product,
    qrUrl: product.qrUrl,
    thumbnail: {
      alt: product?.thumbnail?.alt,
      img: product?.thumbnail?.url,
      id: product?.thumbnail?.url,
      url: product?.thumbnail?.url,
    },
    linkBrochure: { link: product.linkBrochure, name: product.linkBrochure },
    images: product.images,
    ytLink: product?.ytLink || '',
    status: product.status,
  };
}

/**
 * Build the URL for the product, it used on QR Code
 * @param {Product} product
 */
export function generateQRCode(product) {
  if (!product?.manufacturer?.name) {
    return "";
  }
  return `${
    process.env.REACT_APP_FRONT_URL || "http://localhost:3000"
  }/product/${generateDashName(product.manufacturer.name)}-${generateDashName(
    product.name
  )}-${generateDashName(product.sku)}`;
}

/**
 * Split the YouTube id from URL registered on the Product.ytLink
 * @param {Product} product Product witch contains the YouTube Url
 * @param {string} product.ytLink
 * @returns The YouTube ID or null if it is not possible.
 */
export function splitYTId(product) {
  if (!product.ytLink) {
    return '';
  }
  let ID = "";
  const url = product.ytLink
    .replace(/(>|<)/gi, "")
    .split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  if (url[2] !== undefined) {
    ID = url[2].split(/[^0-9a-z_\-]/i);
    ID = ID[0];
  } else {
    ID = url;
  }
  return Array.isArray(ID) ? ID[0] : ID;
}

/**
 * Refactor the product url with source url site and remove any character can broken the url
 * @param {String} url product url
 */
export function concatUrl(url) {
  const baseUrl = `${
    process.env.REACT_APP_FRONT_URL || "http://localhost:3000"
  }/product/`;
  let value = url
    .substring(baseUrl.length)
    .replace("/", "")
    .replace("..", "")
    .trim()
    .replace(/\s+/g, " ")
    .replace(/--+/, "-")
    .replace(/[^a-zA-Z0-9- ]/g, "")
    .replace(" ", "-");
  return `${baseUrl}${value}`;
}

/**
 * Validate a product
 * @param {Product} product product to be valdiate
 */
export function validate(product) {
  const baseUrl = `${
    process.env.REACT_APP_FRONT_URL || "http://localhost:3000"
  }/product/`;
  if (
    product.qrUrl?.length === baseUrl.length
  ) {
    return false;
  }
  return true;
}
