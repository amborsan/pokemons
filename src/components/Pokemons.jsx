import { useEffect, useState,useCallback , useRef} from "react"
// import icon from '../assets/pokemon.png'

const url = 'https://pokeapi.co/api/v2/pokemon?limit=50&offset=0';
const pokUrl= 'https://pokeapi.co/api/v2/pokemon/';
function Pokemons() {
   const [pokemons,setPokemons] = useState([]);
  
   const [pokemon,setPokemon] = useState([]);
   // My old static avatar for all pokemon cards
  //  const [pokemonAvatar,setPokemonAvatar] = useState([]);

   const dialogRef = useRef(null);
    // const pks= pokemons.map(pp => pp.url);

  

  
 useEffect(() => {
async function fetchPokemonsData(link) {
  try {
    const response = await fetch(link);
    
    //HTTP errors
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    const poks = data.results;

    setPokemons(poks)
  // setPpp(pks[0])
    

  } catch (error) {
    console.error('Fetch operation failed:', error);
  }
}
// My old atatic avatar fetch method
/*   const pName = 'wartortle';
  const pLink= pokUrl + pName;
async function fetchPokemonsAV(pLink) {
  try {
    const response = await fetch(pLink);
    
    // Explicitly check for HTTP errors
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    // console.log('Avatar data 2: ', data)
    const avatar = data.sprites?.other?.home?.front_default;
    setPokemonAvatar(avatar)
    // console.log(data.results);

  } catch (error) {
    console.error('Fetch operation failed:', error);
  }
} */
fetchPokemonsData(url)
// fetchPokemonsAV(pLink)

 }, []);
 //-------------

 //-------------

 //-------------




// Get the pokemon details for pokemon card
const handleGetPokemon = useCallback(async function(e)  {
   const pokName= e.target.name;
   const fullUrl = pokUrl + pokName;
     try {
    const response = await fetch(fullUrl);
    
    // Explicitly check for HTTP errors
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    setPokemon(data)


    
  } catch (error) {
    console.error('Fetch operation failed:', error);
  }
},[]) 
 function dialogHandler(e) {
     const dialog = dialogRef.current;
     console.log('Dialog', dialog)
     console.log('Open? : ', dialog.open)
     console.log('Role: ', dialog.role, 'Class:' ,dialog.className);
  
      if (dialog.open) {dialog.close()

      }else{
         handleGetPokemon(e); dialog.showModal();
        };
   
   }

  return (
    <>
    <section className="bg-base-200 py-8 sm:py-16 lg:py-24">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
     
      <div className="mb-12 space-y-4 md:mb-16 lg:mb-24">
        <div className="text-primary text-sm font-medium uppercase">Pokemons</div>
        <h2 className="text-base-content text-2xl font-semibold md:text-3xl lg:text-4xl">All Pokemons</h2>
      </div>
      


      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      
      {
       
        pokemons.map(p=>{
          // Begin of AI answer to get the avatar for each pokemon correctly in the grid
          // This is an API specific, not a core React thing.
          const getPokemonId = (url) => {
  const parts = url.split("/").filter(Boolean);
  return parts[parts.length - 1];
};
const id = getPokemonId(p.url);
const avatar = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`;
// End of AI suggested fix
      return   <div className="card shadow-gray-700/100 shadow-md" key={p.name}  >
          <div className="card-body text-center" name={p.name}>
            
            <a  href="#">
              <img
              name={p.name}
                src={avatar}
                alt={p.name}
                className="mb-6 h-49 w-full object-contain"
                onClick={dialogHandler}
              />
              <h3 className="text-base-content text-lg font-medium">{p.name}</h3>
            </a>

           
            <div className="flex justify-center gap-2">
              <span className="badge badge-soft badge-success">Pokemon</span>
              <span className="badge badge-soft badge-success">Defender</span>
            </div>



            
            <div className="divider my-2"></div>

            <div className="flex items-center justify-between">
              {/* <span className="text-center text-l font-semibold ">Strength : 145</span> */}
              <div>
                <button className="rounded-md bg-white/10 px-2.5 py-1.5 text-sm font-semibold text-white inset-ring inset-ring-white/5 hover:bg-white/20" arealabel="Circle Soft Icon Button" name={p.name} onClick={dialogHandler}>
                  Click to get {p.name} details...
                </button>
       
              </div>
            </div>
          </div>
        </div>
      })
      }
          </div>
    </div>
</section>
<dialog ref={dialogRef} 
        className="bg-gray-600 w-full max-w-lg rounded-lg shadow-xl p-10
              focus:outline-none m-auto"
              role="dialog">
   <h2 id="dialogTitle" className="text-xl font-bold mb-4">
        Pokemon name: {pokemon.name}
      </h2>

      <table className="w-full text-xl text-left rtl:text-right text-body">
  <thead>

  </thead>
  <tbody>
    
    <tr>
      <td></td>
      <td><img  src={pokemon.sprites?.other?.home?.front_default} alt={pokemon.name} /></td>
      
    </tr>
    

    <tr>
      <td><h4>Base experience</h4></td>
      <td></td>
      <td>  {pokemon.base_experience}</td>
      
    </tr>
    <tr>
      <td>Height</td>
      <td></td>
      <td>{pokemon.height}</td>
     
    </tr>
        <tr>
      <td>Weight</td>
      <td></td>
      <td>{pokemon.weight}</td>
     
    </tr>
    
  </tbody>
</table>

      <button id="closeBtn"
              className="mt-2 inline-flex justify-center rounded-md mb-xm
                     bg-orange-300 px-4 py-2 text-black hover:bg-red-600
                     focus-visible:ring-2 focus-visible:ring-offset-2
                     focus-visible:ring-indigo-500"
                     onClick={dialogHandler}>
        Close
      </button>
      </dialog>

</>
  )
}

export default Pokemons
