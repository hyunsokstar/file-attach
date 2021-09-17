import React, { useEffect, useState } from 'react'
import axios from 'axios'

function ImageList() {
  const [images, setImages] = useState([])

  useEffect(() => {
    axios
      .get('./images')
    //   .then((result) => console.log({ result }))
      .then((result) => setImages(result.data))
      .catch((err) => console.error(err))
  }, [])

  const imgList = images.map((image) => (
    <img src={`http://localhost:5000/uploads/${image.key}`} style={{ maxWidth: '100%' }} />
  ))

  return (
    <div>
      <h3>ImageList</h3>
      <div>{imgList}</div>
    </div>
  )
}

export default ImageList

