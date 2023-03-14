let pagina = 1
const Anterior = document.getElementById('Anterior')
const Siguiente = document.getElementById('Siguiente')

Siguiente.addEventListener('click', ()=>{
    if(pagina<1000){
    pagina += 1;
    cargarPeliculas();
    }   
})
Anterior.addEventListener('click', ()=>{
    if(pagina>1){
    pagina -= 1;
    cargarPeliculas();
    }   
})

const cargarPeliculas = async() =>{
    try{
        const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=b353a68755debaadd372af7e173c63a4&language=es-ES&page=${pagina}`)

        if(respuesta.status === 200){
            const datos = await respuesta.json()
            let peliculas = ""
            datos.results.forEach(pelicula => {
                peliculas += `
                <div class="pelicula"> 
                <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
                </div>
                <h3 class="titulo">${pelicula.title}</h3>
                `
            })
            document.getElementById('contenedor').innerHTML = peliculas;
            
            ;
        } else if(respuesta.status === 401){
            console.log("pusiste la llave mal");
        }else if(respuesta.status === 404){
            console.log("la pelicula que buscas no existe");
        }else{
            console.log("Upss hubo un error!");
        }
    }
    catch(error){
  
    }
}

cargarPeliculas()