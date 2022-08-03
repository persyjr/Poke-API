const baseUrl = "https://www.swapi.tech/api/";
//const baseUrl = "https://pokeapi.co/api/v2/";


const pokemon = {
	//busca un pokemon por el id y retorna un pokemon con los datos
	//declaro una funcion callback que reciba como parámetro el id y retorne la data del personaje
	getById: async (id) => {
		try {
			// Buscar un personaje por el id y retornar el objeto con los datos
			//hago la consulta usando el metodo fetch
			const resp = await fetch(`${baseUrl}pokemon/${id}`);
			if (resp.ok) {
				let res = await resp.json();
				return {
					img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${res.abilities.order}.png`,
					...res.abilities.species,
				};
			}
			console.error(resp.status, resp.statusText);
			return [];
		} catch (error) {
			console.error("Error en la api", error); //en la api de arnaldo esta console.error
			return [];
		}
	},
	getQuery: async (page = 1, limit = 20) => {
		//Declaro una función call back para ingresar parametros numero de pagina y limite de elementos
		// Ejemplo de peticion https://www.swapi.tech/api/people?limit=20&page=2
		//ingreso imagenes de toda la pgina.
		try {
			const resp = await fetch(
				`${baseUrl}pokemon?offset=${page}&limit=${limit}`
			);
			//lo que hago es modificar la cantidad de resultados por consulta al cambiar los limites en la url
			if (resp.ok) {
				let res = await resp.json();
				res.results = res.results.map((person) => {
					return {
						img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${res.results.indexOf(person)+1}.png`,
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



export { pokemon, planets, };