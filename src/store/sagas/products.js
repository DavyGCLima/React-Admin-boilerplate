import { call, put } from 'redux-saga/effects';
import client from '../../services';

import {
  saveProductSuccess,
  saveProductFailure,
  updateProductSuccess,
  updateProductFailure,
  uploadCVSSuccess,
  uploadCVSFailure,
  listProductsFailure,
  listProductsSuccess,
  deleteProductFailure,
  deleteProductSuccess
} from '../ducks/products';

import { setError } from '../ducks/error';

import uploadApi from '../../services/upload';

import Product from '../../models/Product';

import HandleError from '../Errors/Product';

/**
 * Single upload file/image to S3 Bucket and retrive the url from file uploaded.
 * @param {Object} file Image or file to be uploaded
 * @returns {String} URL location to the file
 */
function* uploadFileImage(file) {
  const form = new FormData();
  form.append('file', file);
  const {
    error,
    data: { Location },
  } = yield call(uploadApi.post, '/upload', form, { timeout: 30000 });
  if (error) {
    throw error;
  }

  return Location;
}

/**
 *
 * @param {Object} payload
 * @param {Product} payload.product
 */
export function* saveProduct({ payload: { product } }) {
  let cpy = { ...product };

  try {
    //Upload Image
    if (cpy.thumbnail && cpy.thumbnail.file) {
      cpy = {
        ...cpy,
        thumbnail: {
          alt: cpy.thumbnail.alt,
          url: yield* uploadFileImage(cpy.thumbnail.file),
        },
      };
    }

    if (cpy.images.length) {
      const images = [];
      for (const image of cpy.images) {
        if (image.file) {
          const url = yield* uploadFileImage(image.file);
          images.push({ alt: image.alt, url });
        }
      }

      if (images.length) {
        cpy = {
          ...cpy,
          images,
        };
      }
    }

    //Upload linkBrochure
    if (cpy.linkBrochure && cpy.linkBrochure.fileRef) {
      cpy = {
        ...cpy,
        linkBrochure: yield* uploadFileImage(cpy.linkBrochure.fileRef),
      };
    }

    if (typeof cpy.linkBrochure != 'string') {
      cpy = { ...cpy, linkBrochure: '' };
    }

    const { data } = yield call(client.saveProduct, cpy);

    yield put(saveProductSuccess({ ...cpy, id: data.addProduct.id }));
  } catch (err) {
    // console.tron.error(error);
    yield put(
      saveProductFailure({
        error: `Fail to request, ${err}`,
        originalError: err,
      })
    );
    yield put(setError({ error: `Fail to save Product`, originalError: err }));
  }
}

/**
 * An existing product persists by updating it
 * @param {Object} payload The payload  Product content
 * @param {Product} payload.product The product to be persisted
 */
export function* updateProduct({ payload: { product } }) {
  let cpy = { ...product };

  try {
    //Upload Image
    if (cpy.thumbnail && cpy.thumbnail.file) {
      cpy = {
        ...cpy,
        thumbnail: {
          alt: cpy.thumbnail.alt,
          url: yield* uploadFileImage(cpy.thumbnail.file),
        },
      };
    }

    if (cpy.images.length) {
      const images = [];
      for (const image of cpy.images) {
        if (image.file) {
          const url = yield* uploadFileImage(image.file);
          images.push({ alt: image.alt, url });
        } else {
          images.push(image);
        }
      }

      if (images.length) {
        cpy = {
          ...cpy,
          images,
        };
      }
    }

    //Upload linkBrochure
    if (cpy.linkBrochure && cpy.linkBrochure.fileRef) {
      cpy = {
        ...cpy,
        linkBrochure: yield* uploadFileImage(cpy.linkBrochure.fileRef),
      };
    }

    if (cpy?.linkBrochure?.link === '') {
      cpy.linkBrochure = '';
    } else {
      if (typeof cpy.linkBrochure != 'string') {
        delete cpy.linkBrochure;
      }
    }

    const { data } = yield call(client.updateProduct, cpy);

    yield put(updateProductSuccess({ ...cpy, id: data.updateProduct.id }));
  } catch (err) {
    const { message, originalError } = HandleError(err);
    yield put(
      updateProductFailure({
        error: `Update product failed, ${message}`,
        originalError,
      })
    );
    yield put(
      setError({ error: `Update product failed, ${message}`, originalError })
    );
  }
}

export function* uploadCSV({ payload }) {
  try {
    const { data, errors } = yield call(client.uploadCSV, payload.file.fileRef);

    if (errors) {
      yield put(
        uploadCVSFailure({
          error: `Upload products failed`,
          originalError: errors,
        })
      );
      yield put(
        setError({ error: `Upload products failed`, originalError: errors })
      );
    } else {
      yield put(uploadCVSSuccess(data.uploadCVS));
    }
  } catch (err) {
    yield put(
      uploadCVSFailure({
        error: `Failed to request Upload products`,
        originalError: err,
      })
    );
    yield put(
      setError({
        error: `Failed to request Upload products`,
        originalError: err,
      })
    );
  }
}

export function* listProduct() {
  try {
    const { data } = yield call(client.listProducts);

    yield put(listProductsSuccess(data.products));
  } catch (err) {
    // console.tron.error(error);
    yield put(
      listProductsFailure({
        error: `Fail to request list, ${err ? err : ''}`,
        originalError: err,
      })
    );
    yield put(
      setError({
        error: `Fail to request list of products`,
        originalError: err,
      })
    );
  }
}

export function* deleteProduct({ payload: { id } }) {
  try {
    const { errors } = yield call(client.deleteProduct, id);

    if (errors) {
      yield put(
        deleteProductFailure({
          error: 'Failed to delete product',
          originalError: errors,
        })
      );
      yield put(
        setError({
          error: `Fail to request to delete product`,
          originalError: errors,
        })
      );
    } else {
      yield put(deleteProductSuccess(id));
    }
  } catch (err) {
    yield put(
      deleteProductFailure({
        error: `Fail to request to delete productt, ${err ? err : ''}`,
        originalError: err,
      })
    );
    yield put(
      setError({
        error: `Fail to request to delete product`,
        originalError: err,
      })
    );
  }
}
