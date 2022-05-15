import React from "react";
import { Link } from "react-router-dom";


export const Navbar = () => {
	
	
	
	return (
		<nav className="navbar navbar-light bg-light mb-3">
			<Link to="/">
				<span className="navbar-brand mb-0 h1"><img className="logoStarWars" src="https://logodownload.org/wp-content/uploads/2015/12/star-wars-logo-1-1.png" ></img></span>
				
			</Link>
			<Link to="/planets">
					<button className="btn btn-primary">planets</button>
			</Link>
			<Link to="/people">
					<button className="btn btn-primary">people</button>
			</Link>
			<Link to="/species">
					<button className="btn btn-primary">species</button>
			</Link>
			<Link to="/starships">
					<button className="btn btn-primary">starships</button>
			</Link>
			<Link to="/vehicles">
					<button className="btn btn-primary">vehicles</button>
			</Link>
					
				
		</nav>
	);
};
