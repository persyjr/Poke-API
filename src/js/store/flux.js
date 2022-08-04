const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			stared : [],
		},
		actions: {
			// Use getActions to call a function within a fuction
			agregarFavorito : (newStared)=>{
				const store = getStore();
				if(store.stared.length<=5){
				store.stared=[...store.stared,newStared]
				setStore(store)
				}

			},
			eliminarFavoritos: (id) => {
				/*fetch().then().then(data => setStore({ "foo": data.bar }))*/
				const store=getStore()
				setStore({stared:store.stared.filter(item =>item.id!=id)})//me retorna una funcion filtro con la condicion que tienen como parametro, elementos los cuales el id no es igual 

			},
			
			
		}
	};
};

export default getState;
