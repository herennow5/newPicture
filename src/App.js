import React from "react";
import axios from "axios";
import "./styles.css";

//const body = {};
// axios.post("some_url",body, {
//   onUploadProgress: ProgressEvent =>{
//     let progress = Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100)
//     console.log()
//   }
// } )
export default function App() {
  const [loading, setLoading] = React.useState(false);
  const [image, setImage] = React.useState(null);

  const uploadImage = async (e) => {
    const files = e.target.files;
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("upload_preset", "enuym4kv");
    setLoading(true);

    const { data } = await axios.post(
      "https://api.cloudinary.com/v1_1/dj4i8zoqp/image/upload",
      formData,
      {
        onUploadProgress: (ProgressEvent) => {
          let progress = Math.round(
            (ProgressEvent.loaded / ProgressEvent.total) * 100
          );
          console.log("progress", progress);
        }
      }
    );

    setImage(data.secure_url);

    console.log("data", data);
  };
  return (
    <div className="App">
      <h1>Cloudinary image upload</h1>
      <input
        type="file"
        name="file"
        placeholder="upload image"
        onChange={uploadImage}
      />
      <img src={image} alt="upload" />
    </div>
  );
}
