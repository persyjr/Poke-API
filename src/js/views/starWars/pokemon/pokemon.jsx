import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { pokemon } from "../../../apiStarWars.js";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const Pokemon= () => {
	const params = useParams();
	const [poke_info, setPoke_info] = useState({});
	pokemon.getById(params.id).then((res) => setPoke_info(res));
	// useEffect(() => {}, [planet]);
	function getPoke_info() {
		return (
			<Card style={{ width: "18rem" }}>
				<Card.Img
					className="img-fluid"
					src={poke_info.img}
					variant="top"
					width="180"
					height="100"
				/>
				<Card.Body>
					<Card.Title>NOMBRE : {poke_info.name}</Card.Title>
					<h5>NUMERO : {poke_info.id}</h5>
					<h5>ALTURA : {poke_info.height} cm</h5>
					<h5>PESO : {poke_info.weight} Kg</h5>
					{/*<h5>{poke_info.types}</h5>
					<h5>{poke_info.abilities}</h5>*/}
					
				</Card.Body>
			</Card>
		);
	}

	return <div>{getPoke_info()}</div>;
};

export default Pokemon;