import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./views/home";
import { Demo } from "./views/demo";
import { Single } from "./views/single";
import injectContext from "./store/appContext";

import ListPlanets,{Planet} from "./views/starWars/planets";
import ListPeople,{People} from "./views/starWars/people";
import ListSpecies,{Specie} from "./views/starWars/species";
import ListStarships,{Starship} from "./views/starWars/starships";
import ListVehicles,{Vehicle} from "./views/starWars/vehicles";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

//create your first component
const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";

	return (
		<div>
			<BrowserRouter basename={basename}>
				<ScrollToTop>
					<Navbar />
					<Switch>
					<Route exact path="/">
							<Home />
							<ListPlanets />
							<ListPeople />
							<ListSpecies />
							<ListStarships />
							<ListVehicles />
						</Route>					
						<Route exact path="/single/:theid">
							<Single />
						</Route>
						<Route exact path="/planets">
							<ListPlanets />
						</Route>
						<Route exact path="/planets/:id">
							<Planet />
						</Route>
						<Route exact path="/people">
							<ListPeople />
						</Route>
						<Route exact path="/people/:id">
							<People />
						</Route>
						<Route exact path="/species">
							<ListSpecies />
						</Route>
						<Route exact path="/species/:id">
							<Specie />
						</Route>
						<Route exact path="/starships">
							<ListStarships />
						</Route>
						<Route exact path="/starships/:id">
							<Starship />
						</Route>
						<Route exact path="/vehicles/">
							<ListVehicles />
						</Route>
						<Route exact path="/vehicles/:id">
							<Vehicle />
						</Route>
						<Route>
							<h1>Not found!</h1>
						</Route>
					
					</Switch>
					<Footer />
				</ScrollToTop>
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);
