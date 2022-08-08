import React, { useState,useContext} from "react";
import { useParams} from "react-router-dom";
import { Context } from "../../../store/appContext.js";

import { pokemon } from "../../../apiPokemon.js";
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
			<ListGroup.Item  className="d-flex justify-content-center d-flex bg-primary p-2 text-white bg-opacity-25" key={poke_info.abilities.indexOf(ability)+1}>
				<figure className="text-center">
					<blockquote className="blockquote text-capitalize">{ability.ability.name} </blockquote>									
				</figure>				
			</ListGroup.Item>);
		});
	}

	function getTypes() {
		if (!poke_info.types) return;
		return poke_info.types.map((type) => {
			return (
			<ListGroup.Item className="d-flex justify-content-center bg-primary p-2 text-white bg-opacity-25" key={poke_info.types.indexOf(type)+1}>
				<figure className="text-center">
					<blockquote className="blockquote text-capitalize">{type.type.name}</blockquote>													
				</figure>				
			</ListGroup.Item>);
		});
	}

	function getStats() {
		if (!poke_info.stats) return;
		return poke_info.stats.map((stat) => {
			return (
				<ListGroup.Item className="bg-primary p-2 text-white bg-opacity-25">
					<figure className="text-center text-capitalize">
						<blockquote className="blockquote"> valor: <strong>{stat.base_stat} </strong></blockquote> 	
						<figcaption className="blockquote-footer text-white fs-5">				
						<cite title="Source Title">{stat.stat.name} </cite>
						</figcaption>									
					</figure>			
				</ListGroup.Item>);
			}
		);
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
		//verifico que hayan elementos en el store
		if (store.stared == 0){
			return (
				<h4 className="text-center"  ><i>lista vacia, no hay ningún pokemón listo</i></h4>
			);
		}
		//vacion los objetos en un componenete card 
		return store.stared.map(item =>
		<div>			
			<Card style={{ width: "10rem" }}>									
				<Card.Img
					className="img-fluid"
					variant="top"
					height="50"
					src={item.img}
				/>
				<Card.Body className="text-center" >
					<Card.Title># {item.id} </Card.Title>	
					<strong className="text-capitalize">{item.name}</strong>
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



	//funcion principal de ensamble de componente
	function getPoke_info() {
		return (
			<div className=" d-flex align-content-center p-2 text-dark ">
				<Container>
					<Row >
						<Col  lg={8}>
							<Row className="d-flex justify-content-center" >
								<Card className="BgDetalle p-2 text-white bg-opacity-75" border="warning" style={{ width: "35rem" }}>
									<h2  className="d-flex text-capitalize justify-content-center">{poke_info.name}</h2>
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
										<h6 className="h4" >Numero: {poke_info.id} </h6>
										<h6 className="h4" >Altura : {poke_info.height} dm </h6>
										<h6 className="h4" >Peso : {poke_info.weight} Kg </h6>
										</div>									
									</Card.Body>
								</Card>
								<Card className="BgDetalle p-2 text-white bg-opacity-10" style={{ width: "45rem" }} border="info">
									<Row className="d-flex justify-content-evenly">
										<Col className="text-center">
											<p className="h4" >Habilidades</p>
											<div>{getAbilities()}</div>
										</Col>
										<Col className="text-center">
											<p className="h4" >Tipo</p>
											<div>{getTypes()}</div>
										</Col>
										<Col className="text-center">
											<p className="h4" >Estadisticas</p>
											<div>{getStats()}</div>
										</Col>
									</Row>
								</Card>
							</Row>
						</Col>
						<Col >
						<div className=" sticky-top">
							<h4 className="text-center" ><strong><i>LISTOS PARA EL COMBATE</i></strong></h4>
							<Row className="d-flex justify-content-evenly" xs={2} md={2} lg={2} >
								{cargarFavoritos()}
							</Row>
						</div>			
						</Col>
						</Row>
				</Container>			
			</div>
		);
	}

	return <div>{getPoke_info()}</div>;
};

export default Pokemon ;