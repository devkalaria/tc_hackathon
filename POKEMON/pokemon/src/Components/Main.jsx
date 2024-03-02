// import React from "react";
// import Card from "./Card";
// import Pokeinfo from "./Pokeinfo";
// import axios from "axios";
// import { useState } from "react";
// import { useEffect } from "react";
// const Main=()=>{
//     const [pokeData,setPokeData]=useState([]);
//     const [loading,setLoading]=useState(true);
//     const [url,setUrl]=useState("https://pokeapi.co/api/v2/pokemon/")
//     const [nextUrl,setNextUrl]=useState();
//     const [prevUrl,setPrevUrl]=useState();
//     const [pokeDex,setPokeDex]=useState();
//     const [searchQuery, setSearchQuery] = useState("");


//     const pokeFun=async()=>{
//         setLoading(true)
//         const res=await axios.get(url);
//         setNextUrl(res.data.next);
//         setPrevUrl(res.data.previous);
//         getPokemon(res.data.results)
//         setLoading(false)
//     }
//     const getPokemon=async(res)=>{
//        res.map(async(item)=>{
//           const result=await axios.get(item.url)
//           setPokeData(state=>{
//               state=[...state,result.data]
//               state.sort((a,b)=>a.id>b.id?1:-1)
//               return state;
//           })
//        })   
//     }
//     useEffect(()=>{
//         pokeFun();
//     },[url])

//     const handleSearch = (e) => {
//         setSearchQuery(e.target.value);
//     };

   
//     const filteredPokemon = pokeData.filter((pokemon) =>
//         pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
//     );

    
//     const sortById = () => {
//         const sortedPokemon = [...pokeData].sort((a, b) => a.id - b.id);
//         setPokeData(sortedPokemon);
//     };
    
//     return(
//         <>
//             <div className="container">
//                 <div className="left-content">
//                     {/* Search bar */}
//                     <input
//                         type="text"
//                         placeholder="Search Pokemon..."
//                         value={searchQuery}
//                         onChange={handleSearch}
//                     />
//                     {/* Display filtered cards */}
//                     <Card
//                         pokemon={filteredPokemon}
//                         loading={loading}
//                         infoPokemon={(poke) => setPokeDex(poke)}
//                     />

//                     <div className="btn-group">
//                         {prevUrl && (
//                             <button
//                                 onClick={() => {
//                                     setPokeData([]);
//                                     setUrl(prevUrl);
//                                 }}
//                             >
//                                 Previous
//                             </button>
//                         )}

//                         {nextUrl && (
//                             <button
//                                 onClick={() => {
//                                     setPokeData([]);
//                                     setUrl(nextUrl);
//                                 }}
//                             >
//                                 Next
//                             </button>
//                         )}
//                     </div>
//                 </div>
//                 <div className="right-content">
//                     <Pokeinfo data={pokeDex} />
//                 </div>
//             </div>
//         </>
//     )
// }
// export default Main;

import React from "react";
import Card from "./Card";
import Pokeinfo from "./Pokeinfo";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const Main = () => {
    const [pokeData, setPokeData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
    const [nextUrl, setNextUrl] = useState();
    const [prevUrl, setPrevUrl] = useState();
    const [pokeDex, setPokeDex] = useState();
    const [searchQuery, setSearchQuery] = useState("");

    const pokeFun = async () => {
        setLoading(true);
        const res = await axios.get(url);
        setNextUrl(res.data.next);
        setPrevUrl(res.data.previous);
        getPokemon(res.data.results);
        setLoading(false);
    };

    const getPokemon = async (res) => {
        let pokemonData = [];
        for (const item of res) {
            const result = await axios.get(item.url);
            pokemonData.push(result.data);
        }
        setPokeData((prevState) => [...prevState, ...pokemonData]);
    };

    useEffect(() => {
        pokeFun();
    }, [url]);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    // Update filteredPokemon to include all Pokemon names
    const filteredPokemon = pokeData.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sortById = () => {
        const sortedPokemon = [...pokeData].sort((a, b) => a.id - b.id);
        setPokeData(sortedPokemon);
    };

    return (
        <>
            <div className="container">
                <div className="left-content">
                    {/* Search bar */}
                    <input
                        type="text"
                        placeholder="Search Pokemon..."
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                    {/* Display filtered cards */}
                    <Card
                        pokemon={filteredPokemon}
                        loading={loading}
                        infoPokemon={(poke) => setPokeDex(poke)}
                    />

                    <div className="btn-group">
                        {prevUrl && (
                            <button
                                onClick={() => {
                                    setPokeData([]);
                                    setUrl(prevUrl);
                                }}
                            >
                                Previous
                            </button>
                        )}

                        {nextUrl && (
                            <button
                                onClick={() => {
                                    setPokeData([]);
                                    setUrl(nextUrl);
                                }}
                            >
                                Next
                            </button>
                        )}
                    </div>
                </div>
                <div className="right-content">
                    <Pokeinfo data={pokeDex} />
                </div>
            </div>
        </>
    );
};

export default Main;

