const baseUrl = "https://www.swapi.tech/api/";

const people = {
	//busca un personaje por el id y retorna un personaje con los datos
	//declaro una funcion callback que reciba como parámetro el id y retorne la data del personaje
	getById: async (id) => {
		try {
			// Buscar un personaje por el id y retornar el objeto con los datos
			const resp = await fetch(`${baseUrl}people/${id}`);
			if (resp.ok) {
				let res = await resp.json();
				return {
					img: `https://starwars-visualguide.com/assets/img/characters/${res.result.uid}.jpg`,
					...res.result.properties,
				};
			}
			console.error(resp.status, resp.statusText);
			return [];
		} catch (error) {
			console.error("Error en la api", error); //en la api de arnaldo esta console.error
			return [];
		}
	},
	getQuery: async (page = 1, limit = 10) => {
		//Declaro una función call back para ingresar parametros numero de pagina y limite de elementos
		// Ejemplo de peticion https://www.swapi.tech/api/people?limit=20&page=2
		//ingreso imagenes de toda la pgina.
		try {
			const resp = await fetch(
				`${baseUrl}people/?limit=${limit}&page=${page}`
			);
			if (resp.ok) {
				let res = await resp.json();
				res.results = res.results.map((person) => {
					return {
						img: `https://starwars-visualguide.com/assets/img/characters/${person.uid}.jpg`,
						...person,
					};
				});
				return res;
			}
			console.error(resp.status, resp.statusText);
			return [];
		} catch (error) {
			console.error("Error en la api", error);
			return [];
		}
	},
};

const planets = {
	getById: async (id) => {
		try {
			const resp = await fetch(`${baseUrl}planets/${id}`);
			if (resp.ok) {
				let res = await resp.json();
				return {
					img: `https://starwars-visualguide.com/assets/img/planets/${res.result.uid}.jpg`,
					...res.result.properties,
				};
			}
			console.error(resp.status, resp.statusText);
			return [];
		} catch (error) {
			console.error("Error en la api", error);
			return [];
		}
	},
	getQuery: async (page = 1, limit = 10) => {
		try {
			const resp = await fetch(
				`${baseUrl}planets/?limit=${limit}&page=${page}`
			);
			if (resp.ok) {
				let data = await resp.json();
				data.results = data.results.map((planet) => {
					return {
						img: `https://starwars-visualguide.com/assets/img/planets/${planet.uid}.jpg`,
						...planet,
					};
				});
				return data;
			}
			console.error(resp.status, resp.statusText);
		} catch (error) {
			console.error(resp.status, resp.statusText);
			return [];
		}
	},
};

const vehicles = {
	getById: async (id) => {
		try {
			const resp = await fetch(`${baseUrl}vehicles/${id}`);
			if (resp.ok) {
				let res = await resp.json();
				return {
					img: `https://starwars-visualguide.com/assets/img/vehicles/${res.result.uid}.jpg`,
					...res.result.properties,
				};
			}
			console.error(resp.status, resp.statusText);
			return [];
		} catch (error) {
			console.error("Error en la api", error);
			return [];
		}
	},
	getQuery: async (page = 1, limit = 10) => {
		try {
			const resp = await fetch(
				`${baseUrl}vehicles/?limit=${limit}&page=${page}`
			);
			if (resp.ok) {
				let data = await resp.json();
				data.results = data.results.map((vehicle) => {
					return {
						img: `https://starwars-visualguide.com/assets/img/vehicles/${vehicle.uid}.jpg`,
						...vehicle,
					};
				});
				return data;
			}
			console.error(resp.status, resp.statusText);
		} catch (error) {
			console.error(resp.status, resp.statusText);
			return [];
		}
	},
};

const species = {
	getById: async (id) => {
		try {
			const resp = await fetch(`${baseUrl}species/${id}`);
			if (resp.ok) {
				let res = await resp.json();
				return {
					img: `https://starwars-visualguide.com/assets/img/species/${res.result.uid}.jpg`,
					...res.result.properties,
				};
			}
			console.error(resp.status, resp.statusText);
			return [];
		} catch (error) {
			console.error("Error en la api", error);
			return [];
		}
	},
	getQuery: async (page = 1, limit = 10) => {
		try {
			const resp = await fetch(
				`${baseUrl}species/?limit=${limit}&page=${page}`
			);
			if (resp.ok) {
				let data = await resp.json();
				data.results = data.results.map((specie) => {
					return {
						img: `https://starwars-visualguide.com/assets/img/species/${specie.uid}.jpg`,
						...specie,
					};
				});
				return data;
			}
			console.error(resp.status, resp.statusText);
		} catch (error) {
			console.error(resp.status, resp.statusText);
			return [];
		}
	},
};

const starships = {
	getById: async (id) => {
		try {
			const resp = await fetch(`${baseUrl}starships/${id}`);
			if (resp.ok) {
				let res = await resp.json();
				return {
					img: `https://starwars-visualguide.com/assets/img/starships/${res.result.uid}.jpg`,
					...res.result.properties,
				};
			}
			console.error(resp.status, resp.statusText);
			return [];
		} catch (error) {
			console.error("Error en la api", error);
			return [];
		}
	},
	getQuery: async (page = 1, limit = 10) => {
		try {
			const resp = await fetch(
				`${baseUrl}starships/?limit=${limit}&page=${page}`
			);
			if (resp.ok) {
				let data = await resp.json();
				data.results = data.results.map((starship) => {
					return {
						img: `https://starwars-visualguide.com/assets/img/starships/${starship.uid}.jpg`,
						...starship,
					};
				});
				return data;
			}
			console.error(resp.status, resp.statusText);
		} catch (error) {
			console.error(resp.status, resp.statusText);
			return [];
		}
	},
};

export { people, planets, vehicles, species, starships };