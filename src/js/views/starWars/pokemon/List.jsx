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
		const favorito ={
			url:pokemon.url,
			name:pokemon.name
		}
		myStore.actions.agregarFavorito(favorito)
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
		return store.stared.map(item =><li>{item.name}</li>)
	}
	

	return (
		<div >
			
			<Container >
			<Row>
				<Col  lg={9}  >
					<h2 className="d-flex justify-content-center">¿Quien es ese pokemon?</h2>
					<Row xs={2} md={3} lg={4} >
						{getItems()}
					</Row>										
				</Col>
				<Col >
					<h4><strong><i>LISTOS PARA EL COMBATE</i></strong></h4>
					<ul><h5>{cargarFavoritos()}</h5></ul>			
				</Col>
			</Row>	
			</Container>
			
		</div>
	);
};
export default ListPokemon;