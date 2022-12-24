import React from "react";

import Title from "../../../../Title/Title";

// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default function Description({
  description,
  descriptionChange,
  errors,
}) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Title title="توضیحات" />
      {Boolean(errors?.description) && (
        <sub style={{ color: "red" }}>{errors?.description?.[0]}</sub>
      )}
      {/* <CKEditor
        editor={ClassicEditor}
        data={description}
        config={{
          extraPlugins: [MyCustomUploadAdapterPlugin],
        }}
        onReady={(editor) => {}}
        onChange={(event, editor) => {
          const data = editor.getData();
          descriptionChange(data);
        }}
        onBlur={(event, editor) => {}}
        onFocus={(event, editor) => {}}
        style={{
          height: "400px",
        }}
      /> */}
    </div>
  );
}

class MyUploadAdapter {
  constructor(loader) {
    // CKEditor 5's FileLoader instance.
    this.loader = loader;

    // URL where to send files.
    this.url = "https://api.lariran.com/api/v1/product/image/desc/create";
    this.token = localStorage.getItem("token");
  }

  // Starts the upload process.
  upload() {
    return this.loader.file.then(
      (file) =>
        new Promise((resolve, reject) => {
          this._initRequest();
          this._initListeners(resolve, reject, file);
          this._sendRequest(file);
        })
    );
  }

  // Aborts the upload process.
  abort() {
    if (this.xhr) {
      this.xhr.abort();
    }
  }

  // Example implementation using XMLHttpRequest.
  _initRequest() {
    const xhr = (this.xhr = new XMLHttpRequest());

    xhr.open("POST", this.url, true);
    xhr.responseType = "json";
    xhr.setRequestHeader("Authorization", `Bearer ${this.token}`);
  }

  // Initializes XMLHttpRequest listeners.
  _initListeners(resolve, reject) {
    const xhr = this.xhr;
    const loader = this.loader;
    const genericErrorText = "Couldn't upload file:" + ` ${loader.file.name}.`;

    xhr.addEventListener("error", () => reject(genericErrorText));
    xhr.addEventListener("abort", () => reject());
    xhr.addEventListener("load", () => {
      const response = xhr.response;

      if (!response || response.error) {
        return reject(
          response && response.error ? response.error.message : genericErrorText
        );
      }

      // If the upload is successful, resolve the upload promise with an object containing
      // at least the "default" URL, pointing to the image on the server.
      console.log(response);
      resolve({
        default: response.data.image,
      });
    });

    if (xhr.upload) {
      xhr.upload.addEventListener("progress", (evt) => {
        if (evt.lengthComputable) {
          loader.uploadTotal = evt.total;
          loader.uploaded = evt.loaded;
        }
      });
    }
  }

  // Prepares the data and sends the request.
  _sendRequest(file) {
    const data = new FormData();

    data.append("image", file);

    this.xhr.send(data);
  }
}

function MyCustomUploadAdapterPlugin(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    console.log(loader);
    return new MyUploadAdapter(loader);
  };
}
