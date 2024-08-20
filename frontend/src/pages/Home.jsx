import React from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import StudentDataTable from "../components/StudentDataTable";

const Home = () => {
	return (
		<>
			<Nav />
			<StudentDataTable />
			<Footer />
		</>
	);
};

export default Home;
