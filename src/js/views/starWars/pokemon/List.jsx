import React, { useState, useEffect,useContext} from "react";
import {
	ListGroup,
	Button,
} from "react-bootstrap";

import Card from "react-bootstrap/Card";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { pokemon } from "../../../apiStarWars.js";
import { Link } from "react-router-dom";
import { Context } from "../../../store/appContext.js";


const ListPokemon = () => {
	var [data, setData] = useState([]);
    const myStore = useContext(Context);
	const {store}= useContext(Context)

	function irAPagina(id) {
		//esta funcion me permite usar el boton de cada paginacion
		//primero traigo la informacion desde mi funcion en la apiPokemon.js
		pokemon.getQuery(id).then((data) => {
			console.log("Cargando pagina ... ", id);
			// Se actualizan los valores del estado
			
			setData(data.results);
			// Esta actualizacion tiene un hook
			
			console.log("Cargada pagina ", id);
		});
	}

	

	useEffect(() => {
		console.log("Componente montado");
		irAPagina(0);
		return () => {
			console.log("Componente desmontado");
		};
	}, []);

	
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

	function getItems() {
		//esta es la funcion que me muestra la vista de items con la imagen en un stilo card
		//lo hago mediante un map a la variable data
		if (!data) return;
		return data.map((pokemon) => {
			return (
				<ListGroup.Item className="d-flex justify-content-center" key={data.indexOf(pokemon)+1}>
					<Card style={{ width: "10rem" }}>
							<Link
								className="btn btn-primary"
								to={`/pokemon/${pokemon.id}`}>
								<div>									
									<Card.Img
										className="img-fluid"
										variant="top"
										height="50"
										src={pokemon.img}
									/>
									<Card.Body>
										<Card.Title># {pokemon.id} {pokemon.name}</Card.Title>	
									</Card.Body>
								</div>
							</Link>
						
							<Button variant="warning" onClick={()=>agregarFavoritos(pokemon)}><h4><strong> + </strong></h4></Button>
						{/* <Button variant="primary">Leer más</Button> */}
					</Card>
				</ListGroup.Item>
			);
		});
	}

	

	function cargarFavoritos(){
		if (store.stared == 0){
			return (
				<h4><i>lista vacia, no hay ningún pokemón listo</i></h4>
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
	

	return (
		<div >
			
			<Container >
			<Row>
				<Col  lg={8}  >
					<h2 >¿Quien es ese pokemon?</h2>
					<Row xs={2} md={3} lg={4} >
						{getItems()}
					</Row>										
				</Col>
				<Col >
					<h4><strong><i>LISTOS PARA EL COMBATE</i></strong></h4>
					<Row className="d-flex justify-content-evenly" xs={2} md={2} lg={2} >
						{cargarFavoritos()}
					</Row>			
				</Col>
			</Row>	
			</Container>
			
		</div>
	);
};
export default ListPokemon;