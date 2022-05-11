const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			stared : [],
			planets:[],
			characters: []
		},
		actions: {
			// Use getActions to call a function within a fuction
			agregarFavorito : (newStared)=>{
				const store = getStore();
				store.stared=[...store.stared,newStared]
				setStore(store)

			},
			eliminarFavoritos: (id) => {
				/*fetch().then().then(data => setStore({ "foo": data.bar }))*/
				const store=getStore()
				setStore({started:store.stared.filter(item =>item.id!=id)})//me retorna una funcion filtro con la condicion que tienen como parametro, elementos los cuales el id no es igual 

			},
			
			
		}
	};
};

export default getState;
