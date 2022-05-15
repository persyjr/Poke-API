import React, { Component, useContext } from "react";
import { Context } from "../store/appContext";

export const Footer = () => {
	const {store}= useContext(Context)
	function cargarFavoritos(){
		return store.stared.map(item =><li>{item.name}</li>)
	}
	return(
	
	<footer className="footer mt-auto py-3 text-center">
		<p>
			Made with <i className="fa fa-heart text-danger" /> by{" "}
			<a href="https://github.com/persyjr/Starwars-Blog.git">persyjr EXERCISE</a>
		</p>
		<h3>FAVORITOS</h3>
		<ul>{cargarFavoritos()}</ul>
	</footer>
	)	
	
}
