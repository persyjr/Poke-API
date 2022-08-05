
const baseUrl = "https://pokeapi.co/api/v2/";

const pokemon = {
	//busca un pokemon por el id y retorna un pokemon con los datos
	//declaro una funcion callback que reciba como parámetro el id y retorne la data del personaje
	getById: async (id) => {
		try {
			const resp = await fetch(`${baseUrl}pokemon/${id}`);
			if (resp.ok) {
				let res = await resp.json();
				return {
					img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${res.id}.png`,
					numero: `${res.id}`,
					...res,
				};
			}
			console.error(resp.status, resp.statusText);
			return [];
		} catch (error) {
			console.error("Error en la api", error);
			return [];
		}
	},
	getQuery: async (page = 0, limit = 151) => {
		try {
			const resp = await fetch(
				`${baseUrl}pokemon?limit=${limit}&offset=${page}`
			);
			if (resp.ok) {
				let data = await resp.json();

				data.results = data.results.map((pokemon) => {
					return {
						
						img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.results.indexOf(pokemon)+1}.png`,
						id:parseInt(`${data.results.indexOf(pokemon)+1}`),
						...pokemon,
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

export { pokemon };