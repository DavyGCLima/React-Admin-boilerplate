import { gql } from 'apollo-boost';
import Product from '../models/Product';
import { ApolloClient } from 'apollo-client';

export const uploadCVSGql = gql`
  mutation( $file: Upload ){
     massImport(  file: $file ) {
      id,
      name,
      sku,
      price,
      longDescription,
      shortDescription,
      linkBrochure,
      websitelink,
      samplelink,
      ytLink,
      status,
    }
  }
`;

export const revertCVSGql = gql`
  mutation deleteManyProduct( $ids: [ID!] ) {
    deleteManyProduct( ids: $ids )
  }
`;


/**
 * Bind Functions to apollo client
 * @param {ApolloClient} client apollo client
 */
export default function setProductTransactions(client) {
  /**
   * Queries
   */

  /**
   * @param {String} id
   * @return {Product} product
  */
  client.findProduct = async (id) => {
    // console.tron.log('FIND_PRODUCT_REQUEST: ', id);
    return client.query({
      query: gql`
      query {
        product(id: "${id}") {
          id,
          name,
          sku,
          category,
          subcategory,
          thumbnail { alt, url },
          images { alt, url },
          price,
          longDescription,
          shortDescription,
          linkBrochure,
          websitelink,
          images { alt, url },
          manufacturer { id, name },
          samplelink,
          qrUrl,
          ytLink,
          customLinks { icon, url, text },
          status,
          magazine {
            id,
            name,
            publication_date,
          },
        }
      }
    `
    });
  }

  client.listProducts = async () => {
    return client.query({
      query: gql`
        query {
          products {
            id,
            name,
            thumbnail { alt, url },
            sku,
            manufacturer {
              id,
            }
            qrUrl,
          }
        }
      `,
      fetchPolicy: 'no-cache',
    });
  }

  /**
   * Mutations
   */


  client.deleteProduct = async (id) => {
    // console.tron.log('DELETE_PRODUCT_REQUEST: ', id);
    return client.mutate({
      mutation: gql`
      mutation productMutation {
        deleteProduct ( id: "${id}" )
      }
    `,
    });
  }

  /**
   * @param {Product} product
   * @return {String} id
   */
  client.updateProduct = async (product) => {
    return client.mutate({
      mutation: gql`
    mutation productMutation (
      $id: ID!,
      $name: String,
      $sku: String,
      $thumbnail: ImageInput,
      $images: [ImageInput],
      $longDescription: String,
      $shortDescription: String,
      $price: Int,
      $linkBrochure: String,
      $websitelink: String,
      $manufacturer: String,
      $samplelink: String,
      $qrUrl: String,
      $ytLink: String,
      $customLinks: [CustomLinkInput],
      $status: Boolean,
      $magazine: String,
    ) {
      updateProduct (
        id: $id,
        payload: {
          name: $name,
          sku: $sku,
          thumbnail: $thumbnail,
          images: $images,
          longDescription: $longDescription,
          shortDescription: $shortDescription,
          price: $price,
          linkBrochure: $linkBrochure,
          websitelink: $websitelink,
          manufacturer: $manufacturer,
          samplelink: $samplelink,
          qrUrl: $qrUrl,
          ytLink: $ytLink,
          customLinks: $customLinks,
          status: $status,
          magazine: $magazine,
        }
      ) {
        id,
      }
    }
  `,
      variables: {
        id: product.id,
        name: product.name,
        sku: product.sku,
        thumbnail: { alt: product.thumbnail.alt, url: product.thumbnail.url },
        images: product.images.map(thumbnail => ({ alt: thumbnail.alt, url: thumbnail.url })),
        longDescription: product.longDescription,
        shortDescription: product.shortDescription,
        price: product.price,
        linkBrochure: product.linkBrochure,
        websitelink: product.websitelink,
        manufacturer: product.manufacturer,
        samplelink: product.samplelink,
        qrUrl: product.qrUrl,
        ytLink: product.ytLink,
        customLinks: product.customLinks,
        status: product.status,
        magazine: product.magazine,
      }
    });
  }

  /**
   * @param {Product} product
   * @return {String} id
   */
  client.saveProduct = async (product) => {
    // console.tron.log('SAVE_PRODUCT_REQUEST: ', product);
    return client.mutate({
      mutation: gql`
      mutation productMutation (
        $name: String,
        $sku: String,
        $thumbnail: ImageInput,
        $images: [ImageInput],
        $longDescription: String,
        $shortDescription: String,
        $price: Int,
        $linkBrochure: String,
        $websitelink: String,
        $manufacturer: String,
        $samplelink: String,
        $qrUrl: String,
        $ytLink: String,
        $customLinks: [CustomLinkInput],
        $status: Boolean,
        $magazine: String,
      ) {
          addProduct (
            payload: {
              name: $name,
              sku: $sku,
              thumbnail: $thumbnail,
              images: $images,
              longDescription: $longDescription,
              shortDescription: $shortDescription,
              price: $price,
              linkBrochure: $linkBrochure,
              websitelink: $websitelink,
              manufacturer: $manufacturer,
              samplelink: $samplelink,
              qrUrl: $qrUrl,
              ytLink: $ytLink,
              customLinks: $customLinks,
              status: $status,
              magazine: $magazine,
            }
          ) {
            id,
          }
        }
  `,
      variables: {
        name: product.name,
        sku: product.sku,
        thumbnail: { alt: product.thumbnail.alt, url: product.thumbnail.url },
        images: product.images.map(thumbnail => ({ alt: thumbnail.alt, url: thumbnail.url })),
        longDescription: product.longDescription,
        shortDescription: product.shortDescription,
        price: product.price,
        linkBrochure: product.linkBrochure,
        websitelink: product.websitelink,
        manufacturer: product.manufacturer,
        samplelink: product.samplelink,
        qrUrl: product.qrUrl,
        ytLink: product.ytLink,
        customLinks: product.customLinks,
        status: product.status,
        magazine: product.magazine,
      }
    });
  }

  /**
   * Upload products csv
   */

  client.uploadCSV = async (file) => {
    return client.mutate({
      mutation: uploadCVSGql,
      variables: {
        file: file,
      },
      fetchPolicy: 'no-cache',
      context: { useMultipart: true },
    });
  }

};
