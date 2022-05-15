import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { starships } from "../../../apiStarWars.js";
import Card from "react-bootstrap/Card";

const Starship = () => {
	const params = useParams();
	const [starship, setStarship] = useState({});
	starships.getById(params.id).then((res) => setStarship(res));
	// useEffect(() => {}, [planet]);
	function getStarship() {
		return (
			<Card style={{ width: "18rem" }}>
				<Card.Img
					className="img-fluid"
					src={starship.img}
					variant="top"
					width="180"
					height="100"
				/>
				<Card.Body>
					<Card.Title>{starship.name}</Card.Title>
					<h5>{starship.description}</h5>
					<h5>Modelo : {starship.model}</h5>
					<h5>Clase : {starship.starship_class}</h5>
					<h5>Fabricante : {starship.manufacturer}</h5>
					<h5>Longitud (ft): {starship.length}</h5>
					<h5>No pasajeros: {starship.passengers}</h5>
					<h5>
						Velocidad (mi/hr): {starship.max_atmosphering_speed}
					</h5>
					<h5>Tasa hyperdriver: {starship.hyperdrive_rating}</h5>
					<h5>Capacidad (Tons): {starship.cargo_capacity}</h5>
					{/*<Link
						className="btn btn-primary"
						to={`/starships/${starship.uid}`}>
						Leer Mas
					</Link>
					 <Button variant="primary">Leer más</Button> */}
				</Card.Body>
			</Card>
		);
	}

	return <div>{getStarship()}</div>;
};

export default Starship;
