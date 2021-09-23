import React, { useEffect, useState } from 'react'
import UploadForm from "./components/UploadForm";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImageList from './components/ImageList'
import axios from 'axios'


function App() {

  const [images, setImages] = useState([])

  useEffect(() => {
    axios
      .get('/images')
      .then((result) => setImages(result.data))
      .catch((err) => console.error(err))
  }, [])

  return (
    <div style={{ maxWidth: 600, marginLeft: 'auto', marginRight: 'auto' }}>
      <ToastContainer />
      <h2>사진첩</h2>
      <UploadForm images={images} setImages={setImages} />
      <ImageList images={images} />
    </div>
  );
}

export default App;
