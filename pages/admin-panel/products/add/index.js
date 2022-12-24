// import { useEffect, useState, useContext } from "react";
// import axios from "axios";
// import { AuthContext } from "../../../../store/auth-context";
// import dynamic from "next/dynamic";

// import Brands from "../../../../components/AdminPanel/Pages/Products/AddProduct/Brands/Brands";
// import Categories from "../../../../components/AdminPanel/Pages/Products/AddProduct/Categories/Categories";
// import Inputs from "../../../../components/AdminPanel/Pages/Products/AddProduct/Inputs/Inputs";
// import Options from "../../../../components/AdminPanel/Pages/Products/AddProduct/Options/Options";
// import Title from "../../../../components/AdminPanel/Title/Title";
// // import Description from "../../../../components/AdminPanel/Pages/Products/AddProduct/Description/Description";

// import classes from "../../../../styles/AdminPanel/Products/Products.module.scss";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import { LoadingButton } from "@mui/lab";

// export default function AddProduct() {
//   const authCtx = useContext(AuthContext);

//   const [title, setTitle] = useState("");
//   const [persianTitle, setPersianTitle] = useState("");
//   const [weight, setWeight] = useState("");
//   const [showWeight, setShowWeight] = useState("");
//   const [slug, setSlug] = useState("");
//   const [description, setDescription] = useState("");
//   const [categoryId, setCategoryId] = useState(null);
//   const [category, setCategory] = useState(null);
//   const [brandId, setBrandId] = useState(null);
//   const [brand, setBrand] = useState(null);
//   const [optionId, setOptionId] = useState(null);
//   const [option, setOption] = useState(null);

//   const [postLoading, setPostLoading] = useState(false);
//   const [postError, setPostError] = useState(null);

//   function handleTitleChange(e) {
//     setTitle(e.target.value);
//   }
//   function handlePersianTitleChange(e) {
//     setPersianTitle(e.target.value);
//   }
//   function handleWeightChange(e) {
//     setWeight(e.target.value);
//   }
//   function handleShowWeightChange(e) {
//     setShowWeight(e.target.value);
//   }
//   function handleSlugChange(e) {
//     setSlug(e.target.value);
//   }

//   function handleSelectCategory(c) {
//     setCategoryId(c.id);
//     setCategory(c);
//   }

//   function handleSelectBrand(b) {
//     setBrandId(b.id);
//     setBrand(b);
//   }

//   function handleSelectOption(o) {
//     setOptionId(o.id);
//     setOption(o);
//   }

//   function handleDescriptionChange(data) {
//     setDescription(data);
//   }

//   function handlePostProduct() {
//     const fd = new FormData();
//     fd.append("title", title);
//     fd.append("persian_title", persianTitle);
//     fd.append("weight", weight);
//     fd.append("show_weight", showWeight);
//     fd.append("slug", slug);
//     fd.append("description", description);
//     fd.append("category_id", categoryId);
//     fd.append("brand_id", brandId);
//     fd.append("option_id", optionId);
//     setPostLoading(true);
//     setPostError(null);
//     axios
//       .post(`https://api.lariran.com/api/v1/product/create`, fd, {
//         headers: {
//           Authorization: `Bearer ${authCtx.token}`,
//           "Content-Type": "multipart/form-data",
//         },
//       })
//       .then((response) => {
//         if (response.data.status === "error") {
//           setPostError(response.data.data);
//         } else {
//         }
//       })
//       .catch((error) => {
//         setPostError({ server: [error.message] });
//       })
//       .finally(() => {
//         setPostLoading(false);
//       });
//   }

//   const Description = dynamic(
//     () =>
//       import(
//         "../../../../components/AdminPanel/Pages/Products/AddProduct/Description/Description"
//       ),
//     { ssr: false }
//   );

//   return (
//     <div className={classes.holder}>
//       <Inputs
//         title={title}
//         titleChange={handleTitleChange}
//         persianTitle={persianTitle}
//         persianTitleChange={handlePersianTitleChange}
//         weight={weight}
//         weightChange={handleWeightChange}
//         showWeight={showWeight}
//         showWeightChange={handleShowWeightChange}
//         slug={slug}
//         slugChange={handleSlugChange}
//         errors={postError}
//       />
//       <Categories
//         selectCategory={handleSelectCategory}
//         selectedCategory={category}
//         errors={postError}
//       />
//       <Brands
//         selectBrand={handleSelectBrand}
//         selectedBrand={brand}
//         errors={postError}
//       />
//       <Options
//         selectOption={handleSelectOption}
//         selectedOption={option}
//         token={authCtx.token}
//         errors={postError}
//       />
//       <Description
//         description={description}
//         descriptionChange={handleDescriptionChange}
//         errors={postError}
//       />
//       <LoadingButton
//         loading={postLoading}
//         size="large"
//         onClick={handlePostProduct}
//         variant="contained"
//         sx={{
//           width: "100%",
//           mt: 1,
//         }}
//       >
//         ثبت
//       </LoadingButton>
//     </div>
//   );
// }

// class MyUploadAdapter {
//   constructor(loader) {
//     // CKEditor 5's FileLoader instance.
//     this.loader = loader;

//     // URL where to send files.
//     this.url = "https://api.lariran.com/api/v1/product/image/desc/create";
//     this.token = localStorage.getItem("token");
//   }

//   // Starts the upload process.
//   upload() {
//     return this.loader.file.then(
//       (file) =>
//         new Promise((resolve, reject) => {
//           this._initRequest();
//           this._initListeners(resolve, reject, file);
//           this._sendRequest(file);
//         })
//     );
//   }

//   // Aborts the upload process.
//   abort() {
//     if (this.xhr) {
//       this.xhr.abort();
//     }
//   }

//   // Example implementation using XMLHttpRequest.
//   _initRequest() {
//     const xhr = (this.xhr = new XMLHttpRequest());

//     xhr.open("POST", this.url, true);
//     xhr.responseType = "json";
//     xhr.setRequestHeader("Authorization", `Bearer ${this.token}`);
//   }

//   // Initializes XMLHttpRequest listeners.
//   _initListeners(resolve, reject) {
//     const xhr = this.xhr;
//     const loader = this.loader;
//     const genericErrorText = "Couldn't upload file:" + ` ${loader.file.name}.`;

//     xhr.addEventListener("error", () => reject(genericErrorText));
//     xhr.addEventListener("abort", () => reject());
//     xhr.addEventListener("load", () => {
//       const response = xhr.response;

//       if (!response || response.error) {
//         return reject(
//           response && response.error ? response.error.message : genericErrorText
//         );
//       }

//       // If the upload is successful, resolve the upload promise with an object containing
//       // at least the "default" URL, pointing to the image on the server.
//       console.log(response);
//       resolve({
//         default: response.data.image,
//       });
//     });

//     if (xhr.upload) {
//       xhr.upload.addEventListener("progress", (evt) => {
//         if (evt.lengthComputable) {
//           loader.uploadTotal = evt.total;
//           loader.uploaded = evt.loaded;
//         }
//       });
//     }
//   }

//   // Prepares the data and sends the request.
//   _sendRequest(file) {
//     const data = new FormData();

//     data.append("image", file);

//     this.xhr.send(data);
//   }
// }

// function MyCustomUploadAdapterPlugin(editor) {
//   editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
//     console.log(loader);
//     return new MyUploadAdapter(loader);
//   };
// }
