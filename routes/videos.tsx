import { Handlers, PageProps } from "$fresh/server.ts";
import axios from "npm:axios"
import CompVideos from "../components/VideosComp.tsx"
import jwt from "npm:jsonwebtoken"
import {setCookie,getCookies} from "$std/http/cookie.ts"

export const handler: Handlers = {
  async GET(req, ctx) {
    try {
        const cookie=getCookies(req.headers)
        const authtok=cookie["auth"];
        const decodedtoken=jwt.decode(authtok);
        const name= decodedtoken.name;
        const respuesta= await axios.get(`https://videoapp-api.deno.dev/videos/${decodedtoken.id}`)
        const data= respuesta.data;
        const userid=decodedtoken.id;
        return ctx.render({data,name,userid})
    } catch (error) {
        return ctx.render()
    }

  },
};

export default function Videos(props:PageProps){
    return(
        <CompVideos
        videos={props.data.data}
        name={props.data.name}
        userid={props.data.userid}/>

    );
}