import React, { createContext, useState } from "react";

export const StudentsRowContext = createContext();

export const StudentsRow = ({ children }) => {
  const [studentsData, setStudentsData] = useState([]);

  const handleSet = (students) => {
    setStudentsData(studentsData);
  };

  return (
    <StudentsRowContext.Provider value={{ studentsData, handleSet }}>
      {children}
    </StudentsRowContext.Provider>
  );
};
