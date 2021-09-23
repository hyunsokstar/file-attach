import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ProgressBar from "./ProgressBar";
const defaultFileName = "파일을 업로드 해주세요";

function UploadForm({ images, setImages }) {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(defaultFileName);
  const [percent, setPercent] = useState(0);
  const [imgSrc, setImgSrc] = useState(null);

  const imageSelectHandler = (event) => {
    const imageFile = event.target.files[0];
    console.log("imageFile : ", imageFile);

    setFile(imageFile);
    if (imageFile != undefined) {
      setFileName(imageFile.name);
    }

    const fileReader = new FileReader();
    fileReader.readAsDataURL(imageFile);
    fileReader.onload = (e) => setImgSrc(e.target.result);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("submit 함수 실행 check");
    console.log("file : ", file);

    if (file === null) {
      toast.error("업로드 파일을 선택해 주세요");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      // const res = await axios.post("/upload", formData, {
      const res = await axios.post("/images", formData, {
        headers: { "Content-Type": "multi/form-data" },
        onUploadProgress: (e) => {
          setPercent(Math.round(100 * (e.loaded / e.total)));
        },
      });
      console.log({ res });
      setImages([res.data,...images])
      

      toast.success("success!!");
      setTimeout(() => {
        setPercent(0);
        setFileName(defaultFileName);
        setImgSrc(null);
      }, 2000);
    } catch (err) {
      toast.error("fail!");
      console.log(err);
      setImgSrc(null);
    }
  };

  return (
    <div>
      <div>사진첩</div>
      {/* Percent : {percent} */}

      <img
        src={imgSrc}
        className={`image-preview ${imgSrc && "image-preview-show"}`}
      />

      <ProgressBar percent={percent} />

      <form onSubmit={onSubmit}>
        <label htmlFor="image">{fileName}</label>
        <input id="image" type="file" onChange={imageSelectHandler} />
        <button type="submit">제출</button>
      </form>
    </div>
  );
}

export default UploadForm;
