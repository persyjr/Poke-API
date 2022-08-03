import React, { useState, useEffect,useContext} from "react";
import {
	ListGroup,
	Pagination,
	Button,
} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { pokemon } from "../../../apiStarWars.js";
import { Link } from "react-router-dom";
import { Context } from "../../../store/appContext.js";

const ListPokemon = () => {
	var [data, setData] = useState([]);
	var [page, setPage] = useState(1);
	var [pages, setPages] = useState(1);
    const myStore = useContext(Context);

	function irAPagina(id) {
		//esta funcion me permite usar el boton de cada paginacion
		//primero traigo la informacion desde mi funcion en la apiPokemon.js
		pokemon.getQuery(id).then((data) => {
			console.log("Cargando pagina ... ", id);
			// Se actualizan los valores del estado
			console.log(data)
			setData(data.results);
			setPage(id);
			// Esta actualizacion tiene un hook
			setPages(1);//numero de paginas por vista data.total_pages
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
		return () => {
			console.log("Componente desmontado");
		};
	}, []);

	useEffect(() => {
		console.log("Actualizando paginas");
		//actualizarPaginacion();
		return () => {
			console.log("Finalizada la actualizacion de paginas");
		};
	}, [pages, pages]);

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
				<ListGroup.Item key={data.indexOf(pokemon)+1}>
					<Card style={{ width: "18rem" }}>
						<Card.Img
							className="img-fluid"
							variant="top"
							height="50"
							src={pokemon.img}
						/>
						<Card.Body>
							<Card.Title>{pokemon.name}</Card.Title>
							{/*<Link
								className="btn btn-primary"
								to={`/vehicles/${vehicle.uid}`}>
								Leer Mas
							</Link>*/}
                            <Button variant="warning" onClick={()=>agregarFavoritos(pokemon)}>ADD Star</Button>
							{/* <Button variant="primary">Leer más</Button> */}
						</Card.Body>
					</Card>
				</ListGroup.Item>
			);
		});
	}

	function paginationItems() {
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
export default ListPokemon;