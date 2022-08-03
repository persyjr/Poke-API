import React from "react";
import { Link } from "react-router-dom";


export const Navbar = () => {
	
	
	
	return (
		<nav className="navbar navbar-light bg-light mb-3">
			<Link to="/">
				<span className="navbar-brand mb-0 h1"><img className="logoStarWars" src="https://1000marcas.net/wp-content/uploads/2020/01/Logo-Pokemon.png" ></img></span>
				
			</Link>
			<Link to="/planets">
					<button className="btn btn-primary">planets</button>
			</Link>
								
				
		</nav>
	);
};
