import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { species } from "../../../apiStarWars.js";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const Specie = () => {
  	const params = useParams();
  	const [specie, setSpecie] = useState({});
  	species.getById(params.id).then((res) => setSpecie(res));
  	// useEffect(() => {}, [planet]);
 	 function getSpecie() {
    return (
      <Card style={{ width: "18rem" }}>
        <Card.Img
          className="img-fluid"
          src={specie.img}
          variant="top"
          width="180"
          height="100"
        />
        <Card.Body>
          <Card.Title>{specie.name}</Card.Title>
          <h5>{specie.description}</h5>
          <h5>clase: {specie.classification}</h5>
          <h5>Designacion: {specie.designation}</h5>
          <h5>Prom Vida (años): {specie.average_lifespan}</h5>
          <h5>Altura prom: {specie.average_height}</h5>
          <h5>Color de piel: {specie.skin_colors}</h5>
          {/*<Link 
		  	className="btn btn-primary" 
			to={`/species/${specie.uid}`}>
            Leer Mas
          </Link>
    <Button variant="warning">ADD Star</Button>*/}
        </Card.Body>
      </Card>
    );
  }

  return <div>{getSpecie()}</div>;
};

export default Specie;
