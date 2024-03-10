const allStats = document.querySelectorAll(".stats")
const searchInput = document.querySelector("#search-input")
const searchButton = document.querySelector("#search-button")
const pokemonName = document.querySelector("#pokemon-name")
const pokemonId = document.querySelector("#pokemon-id")
const weight = document.querySelector("#weight")
const height = document.querySelector("#height")
const img = document.querySelector("#sprite")
const types = document.querySelector("#types")
const hp = document.querySelector("#hp")
const attack = document.querySelector("#attack")
const defense = document.querySelector("#defense")
const specialAttack = document.querySelector("#special-attack")
const specialDefense = document.querySelector("#special-defense")
const speed = document.querySelector("#speed")
const pokemonContainer = document.querySelector("#pokemon-container")
const pokemonListUrl = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon"
let pokemonUrlArray;
let found = false
let pokemonUrl = ""
let getPokemonData;

const fetchData = async () =>{
    try {
        let fetchPokemonUrl = await fetch(pokemonListUrl)
        let getPokemonUrl = await fetchPokemonUrl.json()
        pokemonUrlArray = await getPokemonUrl.results
    } catch (err){
        console.log(err)
    }
}
fetchData()

const findPokemon = (arr) =>{
    arr.forEach((pokemon)=>{
        if(Number(pokemon.id)==Number(searchInput.value)){
            pokemonId.textContent = `#${pokemon.id}`
            pokemonName.textContent = pokemon.name
            pokemonUrl = `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemon.id}`
            fetchUrl(pokemonUrl)
        } if (pokemon.name.toLowerCase()==searchInput.value.toLowerCase()){
            pokemonName.textContent = pokemon.name
            pokemonId.textContent = `#${pokemon.id}`
            pokemonUrl = `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemon.name}`

            fetchUrl(pokemonUrl)
        } 
    })
}

const fetchUrl = async (url)=>{
    found = true
    pokemonContainer.style.visibility = "visible"
    try{
        let fetchPokemonData = await fetch(url)
        getPokemonData = await fetchPokemonData.json()
        updateData(getPokemonData)
    } catch(err){
        console.log(err)
    }
    
}

const updateData = (data) =>{
    let statsArray = data.stats
    let typesArray = data.types
    statsArray.forEach((stat, index)=>{
        allStats[index].textContent=stat.base_stat
    })
    typesArray.forEach((type)=>{
        types.innerHTML+=`<span>${type.type.name}</span>`
    })
    weight.textContent = `Weight: ${data.weight}`
    height.textContent = `Height: ${data.height}`
    img.src=data.sprites.front_default
}

searchButton.addEventListener("click",()=>{
    types.innerHTML = ""
    findPokemon(pokemonUrlArray)
    if (!found){
        window.alert("Pokémon not found")
        pokemonContainer.style.visibility = "hidden"
    }
    found = false
})
