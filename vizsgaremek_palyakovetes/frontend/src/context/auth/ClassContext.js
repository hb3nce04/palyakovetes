import React, { createContext, useState } from 'react'

export const ClassContext = createContext();

export const Classes = ({children}) => {
    const [classData,setClassData] = useState([]);

    const handleSet = (classes) => {
        setClassData(classes)
    }

  return (
    <ClassContext.Provider value={{classData,handleSet}}>
        {children}
    </ClassContext.Provider>
  )
}
