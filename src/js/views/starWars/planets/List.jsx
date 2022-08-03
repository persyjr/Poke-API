import React, { useState, useEffect ,useContext } from "react";
import {
	ListGroup,
	Pagination,
	Button,
} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { planets } from "../../../apiStarWars.js";//importo mi funcion donde tengo la url de la api y hago mi peticion
import { Link } from "react-router-dom";
import { Context } from "../../../store/appContext.js";


const ListPlanets = () => {
	
	var [data, setData] = useState([]);
	var [page, setPage] = useState(1);
	var [pages, setPages] = useState(1);
	const myStore = useContext(Context);

	function irAPagina(id) {
		//esta funcion me permite usar el boton de cada paginacion
		//primero traigo la informacion desde mi funcion en la apiPokemon.js
		planets.getQuery(id).then((data) => {
			console.log("Cargando pagina ... ", id);
			// Se actualizan los valores del estado
			setData(data.results);
			setPage(id);
			// Esta actualizacion tiene un hook
			setPages(data.total_pages);
			console.log("Cargada pagina ", id);
		});
	}

	function siguientePagina() {
		//esta funcion me permite usar el boton de la paginacion para ir a la siguiente pagina
		if (page < pages) {
			irAPagina(page + 1);
		}
	}

	function previaPagina() {
		//esta funcion me permite usar el boton de la paginacion e ir a la pagina previa
		if (1 < page) {
			irAPagina(page - 1);
		}
	}

	useEffect(() => {
		console.log("Componente montado");
		irAPagina(1);
	}, []);
 
	useEffect(() => {
		console.log("Actualizando paginas");
		// actualizarPaginacion();
		return () => {
			console.log("Finalizada la actualizacion de paginas");
		};
	}, [pages, pages]); 

	function agregarFavoritos(planet){
		const favorito ={
			uid:`planets/${planet.uid}`,
			name:planet.name
		}
		myStore.actions.agregarFavorito(favorito)
	}

	function getItems() {
		//esta es la funcion que me muestra la vista de items con la imagen en un stilo card
		//lo hago mediante un map a la variable data
		if (!data) return;
		return data.map((planet) => {
			return (
				<ListGroup.Item key={planet.uid}>
					<Card style={{ width: "18rem" }}>
						<Card.Img
							className="img-fluid"
							variant="top"
							height="50"
							src={planet.img}
						/>
						<Card.Body>
							<Card.Title>{planet.name}</Card.Title>
							<Link
							className="btn btn-primary"
							to={`/planets/${planet.uid}`}>
							Leer Mas
							</Link>
                            <Button variant="warning" onClick={()=>agregarFavoritos(planet)}>ADD Star</Button>							
						</Card.Body>
					</Card>
				</ListGroup.Item>
			);
		});
	}

	function paginationItems() {
		//Esta funcion me permite hacer la paginación llenado los items en mi arreglo items[] con la funcion ir a pagina
		//similar a get items, pero con una variable local y sin devolver una imagen usando un for
		var items = [];
		for (let i = 1; i <= pages; i++) {
			items.push(
				<Pagination.Item
					onClick={() => irAPagina(i)}
					key={i}
					active={i === page}>
					{i}
				</Pagination.Item>
			);
		}
		return items;
	}

	return (
		<div>
			<ListGroup horizontal style={{ overflowX: "scroll" }}>
				{getItems()}
			</ListGroup>
			<Pagination>
				<Pagination.Prev onClick={previaPagina} />
				{paginationItems()}
				<Pagination.Next onClick={siguientePagina} />
			</Pagination>
		</div>
	);
};
export default ListPlanets;
