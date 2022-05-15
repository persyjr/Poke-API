import React, { useState, useEffect,useContext } from "react";
import {
	ListGroup,
	ListGroupItem,
	Pagination,
	PaginationItem,
	PaginationNext,
	PaginationPrev,
	Button,
} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { people } from "../../../apiStarWars.js";
import { Link } from "react-router-dom";
import { Context } from "../../../store/appContext.js";

const ListPeople = () => {
	var [data, setData] = useState([]);
	var [page, setPage] = useState(1);
	var [pages, setPages] = useState(1); //me indica el numero de paginas del footer list
	var [paginationItems, setPaginationItems] = useState([]);
    const myStore = useContext(Context);
    

	function irAPagina(id) {
		people.getQuery(id).then((data) => {
			console.log("cargando pagina...", id);
			// Se actualizan los valores del estado
			setData(data.results);
			setPage(id);
			// Esta actualizacion tiene un hook
			setPages(data.total_pages);
			console.log("Cargada pagina ", id);
		});
	}

	function siguientePagina() {
		if (page < pages);
		irAPagina(page + 1);
	}

	function previaPagina() {
		if (1 < page) {
			irAPagina(page - 1);
		}
	}

	//people.getById(1).then((data) => console.log(data));
	//people.getQuery().then((data) => console.log(data));

	useEffect(() => {
		console.log("Componente montado");
		irAPagina(1);
		return () => {
			console.log("Componente desmontado");
		};
	}, []);

	useEffect(() => {
		console.log("Actualizando paginas");
		actualizarPaginacion();
		return () => {
			console.log("Finalizada la actualizacion de paginas");
		};
	}, [page, pages]);

    function agregarFavoritos(person){
		const favorito ={
			id:`people/${person.uid}`,
			name:person.name
		}
		myStore.actions.agregarFavorito(favorito)
	}
	function getItems() {
		if (!data) return;
		return data.map((person) => {
			return (
				<ListGroup.Item key={person.uid}>
					<Card style={{ width: "18rem" }}>
						<Card.Img
							className="img-fluid"
							src={person.img}
							variant="top"
							width="180"
							height="100"
						/>
						<Card.Body>
							<Card.Title>{person.name}</Card.Title>

							<Link
								className="btn btn-primary"
								to={`/people/${person.uid}`}>
								Leer Mas
							</Link>
                            <Button variant="warning" onClick={()=>agregarFavoritos(person)}>ADD Star</Button>
							{/* solo puedo ingresar el nombre en el card porque en este nivel de la api solo me permite ver el nombre y 2 parametros mas <Button variant="primary">Leer más</Button> */}
						</Card.Body>
					</Card>
				</ListGroup.Item>
			);
		});
	}

	function actualizarPaginacion() {
		var tmp = [];
		for (let i = 1; i <= pages; i++) {
			tmp.push(
				<Pagination.Item
					onClick={() => irAPagina(i)}
					key={i}
					active={i === page}>
					{i}
				</Pagination.Item>
			);
		}
		return tmp;
	}

	return (
		<div>
			<ListGroup horizontal style={{ overflowX: "scroll" }}>
				{getItems()}
			</ListGroup>
			<Pagination>
				<Pagination.Prev onClick={previaPagina} />
				{actualizarPaginacion()}
				<Pagination.Next onClick={siguientePagina} />
			</Pagination>
		</div>
	);
};

export default ListPeople;
