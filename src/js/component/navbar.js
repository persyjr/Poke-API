import React from "react";
import { Link } from "react-router-dom";


export const Navbar = () => {
	
	
	
	return (
		<nav className="navbar navbar-light bg-light mb-3 justify-content-center">
			<Link to="/">
				<span className="navbar-brand mb-0 h1"><img className="logoStarWars" src="https://1000marcas.net/wp-content/uploads/2020/01/Logo-Pokemon.png" ></img></span>
			</Link>			
		</nav>
	);
};
