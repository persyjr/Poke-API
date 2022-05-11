import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { planets } from "../../../apiStarWars.js";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const Planet = () => {
	const params = useParams();
	const [planet, setPlanet] = useState({});
	planets.getById(params.id).then((res) => setPlanet(res));
	// useEffect(() => {}, [planet]);
	function getPlanet() {
		return (
			<Card style={{ width: "18rem" }}>
				<Card.Img
					className="img-fluid"
					src={planet.img}
					variant="top"
					width="180"
					height="100"
				/>
				<Card.Body>
					<Card.Title>{planet.name}</Card.Title>
					<h5>{planet.description}</h5>
					<h5>diameter: {planet.diameter}</h5>
					<h5>rotation_period: {planet.rotation_period}</h5>
					<h5>gravity: {planet.gravity}</h5>
					<h5>clima: {planet.climate}</h5>
					<h5>Terreno: {planet.terrain}</h5>
					<Link
						className="btn btn-primary"
						to={`/planets/${planet.uid}`}>
						Leer Mas
					</Link>
					<Button variant="warning" onClick={()=>agregarFavoritos(planet)}>Star</Button>
				</Card.Body>
			</Card>
		);
	}

	return <div>{getPlanet()}</div>;
};

export default Planet;
