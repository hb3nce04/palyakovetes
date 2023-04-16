import React, { createContext, useState } from "react";

export const StudentRowContext = createContext();

export const StudentsRow = ({ children }) => {
  const [studentRow, setStudentRow] = useState({});

  const handleSet = (students) => {
    setStudentRow(students);
  };

  return (
    <StudentRowContext.Provider value={{ studentRow, handleSet }}>
      {children}
    </StudentRowContext.Provider>
  );
};
