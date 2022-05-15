import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom"; //permite usar todos los parametros ingresados en la ruta archivo index.jsx
import { people } from "../../../apiStarWars.js";
import Card from "react-bootstrap/Card";

const People = () => {
	const params = useParams(); //mediante esta funcion puedo usar losparámetros que ingresé desde el index.jsx a mi componente people personas/:id
	const [person, setPerson] = useState({});
	people.getById(params.id).then((res) => setPerson(res));
	/*	useEffect(() => {
		people.getById(params.id).then((res) => setPerson(res));
	}, [person]); */

	function getPerson() {
		return (
			<Card style={{ width: "18rem" }}>
				<Card.Img
					className="img-fluid"
					src={person.img}
					variant="top"
					width="180"
					height="100"
				/>
				<Card.Body>
					<Card.Title>{person.name}</Card.Title>

					<h5>Genero: {person.gender}</h5>
					<h5>Año de nacimiento: {person.birth_year}</h5>
					<h5>Altura: {person.height}</h5>
					<h5>Cabello: {person.hair_color}</h5>
					<h5>Color de Ojos: {person.eye_color}</h5>
					<h5>procedencia: {person.homeworld}</h5>
					<Card.Text>descripción: {person.description}</Card.Text>
					{/*<Button variant="primary">Go somewhere</Button>
					<Link
						className="btn btn-primary"
						to={`/planets/${person.uid}`}>
						Leer Mas
					</Link>*/}
					
				</Card.Body>
			</Card>
		);
	}
	return (
		<div>
			
			{getPerson()}
		</div>
	);
};

export default People;