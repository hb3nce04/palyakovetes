import React from 'react'
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import StudentData from '../components/StudentData';

const Home = () => {
  return (
    <>
    
      <Nav/>
      <StudentData/>
      <Footer
        trademark
        versionNumber
      />
      
    </>
    
  )
}

export default Home;
