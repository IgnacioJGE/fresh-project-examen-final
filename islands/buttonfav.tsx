import axios from "npm:axios";
import { useState } from "preact/hooks";



type propsfav={
    fav:boolean,
    userid:string,
    videoid:string
}


export default function ButtonFav(props:propsfav){
    const [favorito,setFavorito]=useState(props.fav)
    const [texto,setTexto]=useState("")

   async  function handleclick(){
    const respuesta= await axios.post(`https://videoapp-api.deno.dev/fav/${props.userid}/${props.videoid}`)
    setFavorito(!favorito)
    if(favorito){
        setTexto("❤️ Remove from Favorites")
    }else{
        setTexto("🤍 Add to Favorites")

    }
    }

    if(favorito){
        setTexto("❤️ Remove from Favorites")
    }else{
        setTexto("🤍 Add to Favorites")

    }

    return(
        <button class="fav-button" onClick={()=>handleclick()}>{texto}</button>

    )

}