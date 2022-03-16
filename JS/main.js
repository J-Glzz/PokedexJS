const fetchPokemon = () => {
    const pokeNameInput = document.getElementById("inputNombre");
    let inputNombre = pokeNameInput.value;
    inputNombre = inputNombre.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${inputNombre}`;
    fetch(url).then((res) => {
        if(res.status != "200"){
            console.log(res);
            pokeImage("./IMG/sad-pikachu.gif");
            cambiarNombre("NOT FOUND");
            cambiarTipoPoke("FALSE")
            cambiarEstatPoke("ERROR")
            cambiarMovPoke("404")
        }
        else{
            return res.json();
        }
    }).then((data) => {
        if(data){
            let changeImg = data.sprites.front_default;
            pokeImage(changeImg);

            let changeName = data.species.name;
            cambiarNombre(changeName);

            let changeTipo = "";
            data.types.forEach(
                element => changeTipo += element.type.name + "/"
            );
            cambiarTipoPoke("Pokemón tipo: " +  changeTipo.slice(0, -1));

            let changeEstats = "";
            data.stats.forEach(
                element =>
                changeEstats += element.base_stat + " " + element.stat.name + "/"
            );
            cambiarEstatPoke("Estadísticas: " + changeEstats.slice(0, -1));

            let changeMov = "";
            for(let num = 0; num <= 4; num++){
                changeMov += data.moves[num].move.name + "/";
            } 
            cambiarMovPoke("Movimientos: " + changeMov.slice(0, -1) +", and more...");
        }
    });
}

const pokeImage = (url) => {
    const pokePhoto = document.getElementById("changeImg");
    pokePhoto.src = url;
}
const cambiarNombre = (url) => {
    const pokeName = document.getElementById("changeName");
    pokeName.innerHTML = url;
}
const cambiarTipoPoke = (url) => {
    const pokeTipo = document.getElementById("tipoPoke");
    pokeTipo.innerHTML = url;
}
const cambiarEstatPoke = (url) => {
    const pokeEstats = document.getElementById("estaPoke");
    pokeEstats.innerHTML = url;
}
const cambiarMovPoke = (url) => {
    const pokeMov = document.getElementById("movPoke");
    pokeMov.innerHTML = url;
}