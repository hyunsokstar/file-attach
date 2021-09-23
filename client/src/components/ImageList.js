import React, { useContext } from 'react'
import { ImageContext } from '../context/ImageContext.js'


function ImageList({ images }) {
  const value = useContext(ImageContext)
  console.log(value)

  const imgList = images.map((image) => (
    <img
      key={image.key}
      src={`http://localhost:5000/uploads/${image.key}`}
      style={{ maxWidth: '100%' }}
    />
  ))

  return (
    <div>
      <h3>ImageList</h3>
      <div>{imgList}</div>
    </div>
  )
}

export default ImageList
