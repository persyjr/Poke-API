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
		pokemon.getQuery(id).then((data) => {
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
		if (page < pages) {
			irAPagina(page + 1);
		}
	}

	function previaPagina() {
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
		// actualizarPaginacion();
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
                            <Button variant="warning" onClick={()=>agregarFavoritos(vehicle)}>ADD Star</Button>
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