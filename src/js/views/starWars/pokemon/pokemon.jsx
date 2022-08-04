import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { pokemon } from "../../../apiStarWars.js";
import Card from "react-bootstrap/Card";
import {ListGroup} from "react-bootstrap";
import Button from "react-bootstrap/Button";

const Pokemon= () => {
	const params = useParams();
	const [poke_info, setPoke_info] = useState({});
	pokemon.getById(params.id).then((res) => setPoke_info(res));
	// useEffect(() => {}, [planet]);
	function getAbilities() {
		if (!poke_info.abilities) return;
		return poke_info.abilities.map((ability) => {
			return (
			<ListGroup.Item  className="d-flex justify-content-center" key={poke_info.abilities.indexOf(ability)+1}>
				<Card border="light"   style={{ width: "18rem" }}>
					<h6>Habilidad: {ability.ability.name}</h6>
				</Card>
			</ListGroup.Item>);
		});
	}

	function getTypes() {
		if (!poke_info.types) return;
		return poke_info.types.map((type) => {
			return (
			<ListGroup.Item className="d-flex justify-content-center text-secondary" key={poke_info.types.indexOf(type)+1}>
				<Card  border="info" style={{ width: "18rem" }}>
					<h6>Tipo: {type.type.name}</h6>
				</Card>
			</ListGroup.Item>);
		});
	}
	function getStats() {
		if (!poke_info.stats) return;
		return poke_info.stats.map((stat) => {
			return (
			<ListGroup.Item className="d-flex justify-content-center text-primary" key={poke_info.stats.indexOf(stat)+1}>
				<Card  border="primary" style={{ width: "18rem" }}>
					<h6>Categoría: {stat.stat.name}</h6>
					<h6>valor: {stat.base_stat}</h6>
				</Card>
			</ListGroup.Item>);
		});
	}

	function getPoke_info() {
		return (
			<div className="d-flex justify-content-evenly">
			<Card  border="info" style={{ width: "35rem" }}>
			<h2  className="d-flex justify-content-center" >{poke_info.name}</h2>
				<Card.Img
					className="img-fluid"
					src={poke_info.img}
					variant="top"
					width="180"
					height="100"
				/>
				<Card.Body>
					
					
					<div className="d-flex justify-content-evenly">
					<h6>NUMERO : {poke_info.id} </h6>
					<h6>ALTURA : {poke_info.height} dm </h6>
					<h6>PESO : {poke_info.weight} Kg </h6>
					</div>
					<Card.Title>HABILIDADES</Card.Title>
					<div>{getAbilities()}</div>
					
					
					{/*
					
					<h5>{getTypes()}</h5>*/}
					
				</Card.Body>
			</Card>
			<Card border="info">
				<Card.Title>TIPO</Card.Title>
					<div>{getTypes()}</div>
				<Card.Title>ESTADISTICAS</Card.Title>
					<div>{getStats()}</div>
			</Card>
			</div>
		);
	}

	return <div>{getPoke_info()}</div>;
};

export default Pokemon;