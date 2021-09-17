import React from "react";
import UploadForm from "./components/UploadForm";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImageList from './components/ImageList'


function App() {
  return (
    <div style={{ maxWidth: 600, marginLeft: 'auto', marginRight: 'auto' }}>
      <ToastContainer />
      <h2>사진첩</h2>
      <UploadForm />

      이미지 출력:
      <ImageList />
    </div>
  );
}

export default App;
