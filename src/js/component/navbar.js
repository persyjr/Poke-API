import React from "react";
import { Link } from "react-router-dom";


export const Navbar = () => {
	
	
	
	return (
		<nav className="navbar bg-primary bg-opacity-100  justify-content-center ">			
			<Link to="/">							
				<span className="navbar-brand mb-0 h1 "><img className="logoPokemon d-flex justify-content-center " src="https://1000marcas.net/wp-content/uploads/2020/01/Logo-Pokemon.png" ></img></span>
				<strong className="d-flex justify-content-center text-warning">Home</strong>	
			</Link>			
		</nav>
	);
};
