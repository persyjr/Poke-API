import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { pokemon } from "../../../apiStarWars.js";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const Pokemon= () => {
	const params = useParams();
	const [vehicle, setVehicle] = useState({});
	vehicles.getById(params.id).then((res) => setVehicle(res));
	// useEffect(() => {}, [planet]);
	function getVehicle() {
		return (
			<Card style={{ width: "18rem" }}>
				<Card.Img
					className="img-fluid"
					src={vehicle.img}
					variant="top"
					width="180"
					height="100"
				/>
				<Card.Body>
					<Card.Title>{vehicle.name}</Card.Title>
					<h5>{vehicle.description}</h5>
					<h5>Modelo: {vehicle.model}</h5>
					<h5>Clase: {vehicle.vehicle_class}</h5>
					<h5>No pasajeros: {vehicle.passengers}</h5>
					<h5>Longitud: {vehicle.length}</h5>
					<h5>Velocidad (mi/h): {vehicle.max_atmosphering_speed}</h5>
					<h5>Capacidad (Tons): {vehicle.cargo_capacity}</h5>
					<h5>Tiempo consumible: {vehicle.consumables}</h5>
					<h5>Fabricante: {vehicle.manufacturer}</h5>
					{/*<Link
						className="btn btn-primary"
						to={`/vehicles/${vehicle.uid}`}>
						Leer Mas
					</Link>
                    <Button variant="warning" >Star</Button>
					 <Button variant="primary">Leer más</Button> */}
				</Card.Body>
			</Card>
		);
	}

	return <div>{getVehicle()}</div>;
};

export default Pokemon;