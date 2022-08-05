import React, { useState,useContext} from "react";
import { useParams, Link } from "react-router-dom";
import { Context } from "../../../store/appContext.js";

import { pokemon } from "../../../apiStarWars.js";
import Card from "react-bootstrap/Card";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


import {ListGroup} from "react-bootstrap";
import Button from "react-bootstrap/Button";

const Pokemon= () => {
	const params = useParams();
	const [poke_info, setPoke_info] = useState({});
	const myStore = useContext(Context);
	const {store}= useContext(Context)

	pokemon.getById(params.id).then((res) => setPoke_info(res));
	
	function getAbilities() {
		if (!poke_info.abilities) return;
		return poke_info.abilities.map((ability) => {
			return (
			<ListGroup.Item  className="d-flex justify-content-center" key={poke_info.abilities.indexOf(ability)+1}>
				
				<Card border="light"   style={{ width: "11rem" }}>
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
				<Card  border="info" style={{ width: "11rem" }}>
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
				<Card  border="primary" style={{ width: "11rem" }}>
					<h6>Categoría: {stat.stat.name}</h6>
					<h6>valor: {stat.base_stat}</h6>
				</Card>
			</ListGroup.Item>);
		});
	}

	function agregarFavoritos(pokemon){
		//verifico que no se haya seleccionado antes el mismo pokemon
		for (let i=0; i<store.stared.length; i++) {
			if (pokemon.id==store.stared[i].id){
				
				return 0
			}
			

		}
	
		//agrego los parametros que voy a necesitar al store
		const favorito ={
			url:pokemon.url,
			name:pokemon.name,
			img: pokemon.img,
			id: pokemon.id
		}
		myStore.actions.agregarFavorito(favorito)
		
	}

	function eliminarFavorito (id){
		myStore.actions.eliminarFavoritos(id)
		
	}

	function cargarFavoritos(){
		if (store.stared == 0){
			return (
				<h4 className="text-center"  ><i>lista vacia, no hay ningún pokemón listo</i></h4>
			);
		} 
		return store.stared.map(item =>
		<div>
			
				<Card style={{ width: "10rem" }}>									
					<Card.Img
						className="img-fluid"
						variant="top"
						height="50"
						src={item.img}
					/>
					<Card.Body>
						<Card.Title># {item.id} {item.name}</Card.Title>	
					</Card.Body>
					<Button variant="primary" onClick={()=>eliminarFavorito(item.id)}><h4><strong> - </strong></h4></Button>
				</Card>
			
					
		</div>);
	}

	function boton(pokemon){
		//verifico que no se haya seleccionado antes el mismo pokemon
		//determino que boton asignar segun si se encuentra o no en la lista de favoritos
		
		for (let i=0; i<store.stared.length; i++) {
			if (pokemon.id==store.stared[i].id){
				return (<Button variant="primary" onClick={()=>eliminarFavorito(poke_info.id)}><h4><strong> - </strong></h4></Button>)
			}			
		}
		return (<Button variant="warning" onClick={()=>agregarFavoritos(poke_info)}><h4><strong> + </strong></h4></Button>)

	}




	function getPoke_info() {
		return (
			<div className="d-flex align-content-center">
				<Container>
					<Row >
						<Col  lg={9}>
						<Row className="d-flex justify-content-center" >
							<Card  border="info" style={{ width: "35rem" }}>
								<h2  className="d-flex justify-content-center" >{poke_info.name}</h2>
								
								<Card.Img
									className="img-fluid"
									src={poke_info.img}
									variant="top"
									width="180"
									height="100"
								/>
								
								{boton(poke_info)}
								<Card.Body>
									
									
									<div className="d-flex justify-content-evenly">
									<h6>NUMERO : {poke_info.id} </h6>
									<h6>ALTURA : {poke_info.height} dm </h6>
									<h6>PESO : {poke_info.weight} Kg </h6>
									</div>
									
									
									
									{/*
									
									<h5>{getTypes()}</h5>*/}
									
								</Card.Body>
								</Card>
								<Card style={{ width: "45rem" }} border="info">
									<Row className="d-flex justify-content-evenly">
										<Col>
											<Card.Title>HABILIDADES</Card.Title>
											<div>{getAbilities()}</div>
										</Col>
										<Col>
											<Card.Title>TIPO</Card.Title>
											<div>{getTypes()}</div>
										</Col>
										<Col>
											<Card.Title>ESTADISTICAS</Card.Title>
											<div>{getStats()}</div>
										</Col>
									</Row>
								</Card>
						</Row>
						</Col>
						<Col >
							<h4 className="text-center" ><strong><i>LISTOS PARA EL COMBATE</i></strong></h4>
							<Row className="d-flex justify-content-evenly" xs={2} md={2} lg={2} >
							{cargarFavoritos()}
							</Row>			
						</Col>
						</Row>
				</Container>
			
			</div>
		);
	}

	return <div>{getPoke_info()}</div>;
};

export default Pokemon ;