import React, { useState } from "react";
import axios from "axios";

const UploadFiles = () => {
  const [images, setImages] = useState([]);
  const [imageArrayLength, setImageArrayLength] = useState(0);

  const setImage = (e) => {
    const files = e.target.files;
    const currentImages = [];
    for (let i in files) {
      currentImages.push(files[i]);
    }
    setImages(currentImages);
    setImageArrayLength(currentImages.length);
  };

  const uploadImages = () => {
    setImageArrayLength((prev) => prev - 1);
    console.log(imageArrayLength);
    let newImages = [...images];
    let sendedImage = newImages.shift();
    setImages(newImages);
    const formData = new FormData();
    formData.append("image", sendedImage);
    axios({
      method: "POST",
      url: "http://127.0.0.1:5000/upload",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        if (res.data.msg === "ok" && imageArrayLength > 0) {
          uploadImages();
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <form>
        <div className="form-group">
          <label className="custom-file-label" htmlFor="customFile">
            Agregar imágen tal cual
          </label>
          <input
            type="file"
            name="file"
            className="custom-file-input"
            id="customFile"
            multiple
            onChange={setImage}
          />
          <span className="btn btn-info" onClick={uploadImages}>
            Mándar imágenes tal cual
          </span>
        </div>
      </form>
    </div>
  );
};

export default UploadFiles;
