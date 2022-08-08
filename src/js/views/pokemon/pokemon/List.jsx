import React, { useState, useEffect,useContext} from "react";
import {
	ListGroup,
	Button,
} from "react-bootstrap";

import Card from "react-bootstrap/Card";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import { pokemon } from "../../../apiPokemon.js";
import { Link } from "react-router-dom";
import { Context } from "../../../store/appContext.js";


const ListPokemon = () => {
	var [data, setData] = useState([]);
	var [busqueda, setBusqueda]= useState("");
	var [tablaUsuarios, setTablaUsuarios]= useState([]);
	var [usuarios, setUsuarios]= useState([]);

    const myStore = useContext(Context);
	const {store}= useContext(Context)

	function iniciarQuery() {
		//me permite hacer el query con la api y traerme la informacion
		pokemon.getQuery().then((data) => {
			console.log("Cargando pagina ... ");
			// Se actualizan los valores del estado			
			setData(data.results);
			setUsuarios(data.results);
			setTablaUsuarios(data.results);
			// Esta actualizacion tiene un hook			
			console.log("Cargada pagina ");
		});
	}
	
	useEffect(() => {
		console.log("Componente montado");
		iniciarQuery();
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
		if (!usuarios) return;
		return usuarios.map((pokemon) => {
			return (
				<ListGroup.Item className="d-flex justify-content-center" key={usuarios.indexOf(pokemon)+1}>
					<Card style={{ width: "10rem" }}>
							<Link
								className="btn btn-primary"
								to={`/pokemon/${pokemon.numero}`}>
								<div>									
									<Card.Img
										className="img-fluid"
										variant="top"
										height="50"
										src={pokemon.img}
									/>
									<Card.Body>
										<Card.Title ># {pokemon.id} </Card.Title>
										<strong className="text-capitalize">{pokemon.name}</strong>	
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

	const handleChange  =(e)=>{
		setBusqueda(e.target.value);
		filtrar(e.target.value);
	}

	const filtrar  =(terminoBusqueda)=>{
		var resultadosBusqueda = data.filter((pokemon) => { 
			if (pokemon.name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())){
				return pokemon;
			}						
		});	
		setUsuarios(resultadosBusqueda) 
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
				<Card.Body className="text-center text-capitalize" >
						<Card.Title># {item.id} </Card.Title>	
						<strong>{item.name}</strong>
				</Card.Body>
				<Button variant="primary" onClick={()=>eliminarFavorito(item.id)}><h4><strong> - </strong></h4></Button>
			</Card>
			
					
		</div>);
	}
	

	return (
		<div >
			
			<Container >
			<Row>
				<Col lg={8}  >
					<h2 className="text-center" >¿Quien es ese pokemon?</h2>
					<Row xs={2} md={3} lg={4} >
					<InputGroup size="lg">
						<InputGroup.Text id="inputGroup-sizing-lg">Nombre</InputGroup.Text>
							<Form.Control
							aria-label="Large"
							aria-describedby="inputGroup-sizing-sm"
							placeholder="Busqueda por nombre"
							onChange={handleChange}
							/>
					</InputGroup>
						{getItems()}
					</Row>										
				</Col>
				<Col >
				<div className="sticky-top">
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
};
export default ListPokemon;