import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { uniqueId } from "lodash";
import * as moment from "moment";

import { updateProductRequest, saveProductRequest } from "../../../store/ducks/products";
import { setError } from "../../../store/ducks/error";

import {
  Card,
  Grid,
  CardHeader,
  CardContent,
  Divider,
  TextField,
  CardActions,
  Button,
  MenuItem,
  CircularProgress,
} from "@material-ui/core";
import { DropzoneDialog } from "material-ui-dropzone";
import ListImages from "../components/ListImages";
import InputNumber from "../../../components/Inputs/InputNumber";
import InputUploadFile from "../../../components/InputUploadFile";
import ConfirmDialog from "../../../components/Dialogs/ConfirmDialog";

import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import client from "../../../services";

import styles from "./styles";

import Product, {
  generateQRCode,
  fromJson as ProductFromJson,
  toJson,
  validate,
} from "../../../models/Product";

import Roles from "../../../models/Roles";

const ProductForm = () => {
  const history = useHistory();

  const { id } = useParams();

  const dispatch = useDispatch();

  const loading = useSelector((state) => state.products.loading);

  const error = useSelector((state) => state.products.error);

  const [product, setProduct] = useState(Product());

  const [editorLoaded, setEditorLoaded] = useState(true);

  const [storedEditor, setEditor] = useState(null);

  const user = useSelector((state) => state.user.user);

  const [open, setOpen] = useState(false);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const [requestSave, setRequestSave] = useState(false);

  const [canSave, setCanSave] = useState(false);

  const [dialogContent, setDialogContent] = useState({
    title: "",
    body: ``,
    cancelText: "",
    acceptText: "",
    id: "",
  });

  const [imageToDelete, setImageToDelete] = useState();

  /**
   * Enable / disable button submit
   */
  useEffect(() => {
    setCanSave(
      loading ||
        (product.sku && product.name && validate(product) ? false : true)
    );
  }, [product, product.sku, product.name, loading]);

  /**
   * Generate qr code when sku was changed
   */
  useEffect(() => {
    function updateUrl() {
      // const qrUrl = generateQRCode(product);
      // const newProd = { ...product, qrUrl };
      setProduct(product);
    }

    updateUrl();
  }, [product.sku, product.name]);

  function updateQrCode() {
    setProduct({ ...product, qrUrl: generateQRCode(product) });
  }

  /**
   * Redirect when product is created or edited
   */
  useEffect(() => {
    if (requestSave && !error && !loading) {
      history.push("/products");
    }
  }, [loading, error, history, requestSave]);

  /**
   * Search for product
   * @param {String} id
   */
  useEffect(() => {
    async function findProduct(id) {
      try {
        if (user.id) {
          const {
            data: { product },
          } = await client.findProduct(id);
          const editedProduct = ProductFromJson(product);
          setProduct(editedProduct);
        }
      } catch (error) {
        dispatch(
          setError("Some problem to find the product", {
            ...error,
          })
        );
      }
    }

    if (id) {
      findProduct(id);
    }
  }, [id, user]);

  /**
   * Initialize the CK Editor
   */
  useEffect(() => {
    if (storedEditor && product?.longDescription && editorLoaded) {
      storedEditor.setData(product.longDescription);
      setEditorLoaded(false);
    }
  }, [storedEditor, product.longDescription, editorLoaded]);

  /**
   * Build the styles
   */
  const classes = styles();

  const handleChange = (event) => {
    setProduct({
      ...product,
      [event.target.name]: event.target.value,
    });
  };

  const downloadQR = () => {
    const canvas = document.getElementById("qrcode-central");
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = `qr-code-sku-${product.sku.replace(".", "")}`;
    link.click();
  };

  function createImages(files) {
    return files.map((file) => ({
      file,
      id: uniqueId(`${file.name}_${file.size}_`),
      url: URL.createObjectURL(file),
      alt: file.name.substring(0, file.name.indexOf(".")),
    }));
  }

  function handlerSaveImages(files) {
    const images = createImages(files);
    if (!product.thumbnail.url || !product.thumbnail.img) {
      setProduct({
        ...product,
        thumbnail: images[0],
        images: [...product.images, ...images],
      });
    } else {
      setProduct({
        ...product,
        images: [...product.images, ...images],
      });
    }
    closeDialog();
  }

  function setImages(images) {
    setProduct({
      ...product,
      images: [...images],
    });
  }

  function handleSelectThumb(thumbnail) {
    setProduct({ ...product, thumbnail: thumbnail });
  }

  function handleDeleThumb() {
    setProduct({ ...product, thumbnail: "" });
  }

  function handleDeleImage(image) {
    setDialogContent({
      title: "Cofirm Delete Image",
      body: `Are you sure you want to delete the image "${image.alt}"?`,
      cancelText: " CANCEL",
      acceptText: "DELETE",
      id: "delete-image-dialog",
    });
    setImageToDelete(image);
    setIsDeleteDialogOpen(true);
  }

  function deleteImage() {
    const images = product.images;
    if (imageToDelete && imageToDelete.url) {
      images.forEach((prodImg, index) => {
        if (prodImg.url === imageToDelete.url) {
          product.images.splice(index, 1);
        }
      });
    }
    setProduct({ ...product, images: images });
    setIsDeleteDialogOpen(false);
  }

  function cancelDelteImage() {
    setImageToDelete(null);
    setIsDeleteDialogOpen(false);
  }

  function handlerShowDialog() {
    setOpen(!open);
  }

  function closeDialog() {
    setOpen(false);
  }

  async function saveProduct() {
    const productCpy = toJson(product);
    dispatch(
      id
        ? updateProductRequest(productCpy)
        : saveProductRequest(productCpy)
    );
    setRequestSave(true);
  }

  function renderDate(value) {
    return moment(value.publication_date).format("MMMM YYYY");
  }

  return (
    <Grid container spacing={4}>
      <Grid item lg={12} md={12} xl={12} xs={12}>
        <Card>
          <form autoComplete="off" noValidate>
            <fieldset disabled={loading} className={classes.wrapper}>
              <CardHeader title={!id ? "New Product" : product.name} />
              <Divider />
              <CardContent>
                <Grid container spacing={1}>
                  <Grid item md={6} xs={12} className={classes.item}>
                    <TextField
                      fullWidth
                      helperText="Please specify the product name"
                      label="Product Name"
                      margin="dense"
                      name="name"
                      onChange={handleChange}
                      required
                      value={product.name}
                      variant="outlined"
                      InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                      fullWidth
                      helperText="Please specify the product Sku or UPC Code"
                      label="SKU or UPC Code"
                      margin="dense"
                      name="sku"
                      onChange={handleChange}
                      required
                      value={product.sku}
                      variant="outlined"
                      InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                      fullWidth
                      helperText="Please specify the product price"
                      label="Price"
                      margin="dense"
                      name="price"
                      onChange={handleChange}
                      value={product.price}
                      variant="outlined"
                      prefix="$"
                      defaultValue={0}
                      InputProps={{
                        inputComponent: InputNumber,
                      }}
                      inputProps={{
                        prefix: "$",
                        name: "price",
                      }}
                      InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                      fullWidth
                      rows={2}
                      name="shortDescription"
                      label="Short Description"
                      helperText="Briefly describe your product"
                      multiline
                      value={product.shortDescription}
                      onChange={handleChange}
                      margin="dense"
                      variant="outlined"
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid container spacing={1}>
                    <Grid item md={12} xs={12} className={classes.item}>
                      <div className={classes.textEditorContainer}>
                        <span>Description</span>
                        <CKEditor
                          editor={ClassicEditor}
                          onInit={(editor) => {
                            setEditor(editor);
                          }}
                          onChange={(event, editor) => {
                            setProduct({
                              ...product,
                              longDescription: editor.getData(),
                            });
                          }}
                        />
                      </div>
                    </Grid>
                    <Grid item md={10} xs={10} className={classes.item}>
                      <TextField
                        fullWidth
                        disabled={user.role !== Roles.ADMIN}
                        helperText="The URL used in QR Code and the PWA Launcher"
                        label="URL"
                        margin="dense"
                        name="qrUrl"
                        onChange={handleChange}
                        value={product.qrUrl}
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                    <Grid item md={2} xs={2}>
                      <Button
                        className={classes.manageMagazinesButton}
                        onClick={() => updateQrCode()}
                        variant="outlined"
                      >
                        Generate URL
                      </Button>
                    </Grid>
                  </Grid>
                  <Grid container spacing={1}>
                    <Grid item md={6} xs={12} className={classes.item}>
                      <TextField
                        fullWidth
                        helperText="Please inform the product landing page URL"
                        label="Product Landing Page URL"
                        margin="dense"
                        name="websitelink"
                        onChange={handleChange}
                        value={product.websitelink}
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                    <Grid item md={6} xs={12} className={classes.item}>
                      <TextField
                        fullWidth
                        helperText="Please inform the Link to be used on Send Sample feature"
                        label="Sample Link"
                        margin="dense"
                        name="samplelink"
                        onChange={handleChange}
                        value={product.samplelink}
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={1}>
                    <Grid item md={6} xs={12} className={classes.item}>
                      <TextField
                        fullWidth
                        select
                        helperText="Please specify if the product is active"
                        label="Product Status"
                        margin="dense"
                        name="status"
                        onChange={handleChange}
                        value={product.status}
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                      >
                        <MenuItem key="status-inactive" value={false}>
                          Disabled
                        </MenuItem>
                        <MenuItem key="status-active" value={true}>
                          Enable
                        </MenuItem>
                      </TextField>
                    </Grid>
                    <Grid item md={6} xs={12} className={classes.item}>
                      <TextField
                        fullWidth
                        helperText="Please inform the YouTube Link"
                        label="YouTube Link"
                        margin="dense"
                        name="ytLink"
                        onChange={handleChange}
                        value={product.ytLink}
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={1}>
                    <Grid item md={6} xs={6} className={classes.itemOutlined}>
                      <InputUploadFile
                        name="linkBrochure"
                        product={product}
                        handleChange={handleChange}
                        accept="application/pdf"
                        placeholder="Select PDF"
                        value={product.linkBrochure}
                        buttonText="Upload Brochure"
                      />
                    </Grid>
                  </Grid>
                  <Grid container>
                    <div className={classes.row}>
                      <Button
                        color="primary"
                        variant="outlined"
                        onClick={handlerShowDialog}
                      >
                        Upload Image
                      </Button>
                    </div>
                    <div className={classes.imageContainer}>
                      <ListImages
                        onChangeThumb={handleSelectThumb}
                        onDeleteImage={handleDeleImage}
                        onDeleteThumb={handleDeleThumb}
                        thumb={product.thumbnail}
                        images={product.images}
                        setImages={setImages}
                      />
                    </div>
                  </Grid>
                </Grid>
              </CardContent>
              <Divider />
              <CardActions>
                <div className={classes.buttonSaveWrapper}>
                  <Button
                    onClick={saveProduct}
                    color="primary"
                    variant="contained"
                    disabled={canSave}
                  >
                    Save Product
                  </Button>
                  {loading && (
                    <CircularProgress
                      size={24}
                      className={classes.buttonProgress}
                    />
                  )}
                </div>
              </CardActions>
            </fieldset>
          </form>
        </Card>
      </Grid>
      <DropzoneDialog
        open={open}
        onSave={handlerSaveImages}
        acceptedFiles={["image/jpeg", "image/png"]}
        showPreviews={false}
        maxFileSize={5000000}
        onClose={closeDialog}
        showAlerts={false}
        filesLimit={10}
        showPreviewsInDropzone
      />
      <ConfirmDialog
        open={isDeleteDialogOpen}
        content={dialogContent}
        accept={deleteImage}
        cancel={cancelDelteImage}
        handleClose={cancelDelteImage}
      />
    </Grid>
  );
};

export default ProductForm;
