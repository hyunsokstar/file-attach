import React, { createContext } from 'react'

export const ImageContext = createContext()

export const ImageProvider = (prop) => {
  return (
    <ImageContext.Provider value={'hello Context!'}>
      {prop.children}
    </ImageContext.Provider>
  )
}

