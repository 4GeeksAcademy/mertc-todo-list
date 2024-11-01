import React from "react";
import Todo from "./Todo";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

const Home = () => {
	return (
		<div className="Home-body text-center min-vh-100 w-100 d-flex flex-column align-items-center">
			<Todo/>
		</div>
	);
};

export default Home;
