import { Handlers, PageProps } from "$fresh/server.ts";
import axios from "npm:axios"
import jwt from "npm:jsonwebtoken"
import {getCookies, setCookie} from "$std/http/cookie.ts"
import CompVideo from "../../components/Uniquecomp.tsx"
export const handler: Handlers = {
   async GET(req, ctx) {
    try {
        const cookie=getCookies(req.headers)
        const authtok=cookie["auth"];
        const decodedtoken=jwt.decode(authtok);
        const name= decodedtoken.name;
        const respuesta= await axios.get(`https://videoapp-api.deno.dev/video/${decodedtoken.id}/${ctx.params.videoid}`)
        const data= respuesta.data;
        const userid=decodedtoken.id;
        return ctx.render({data,name,userid})
    } catch (error) {
        const headers = new Headers();

        headers.set("location", "/login");
        return new Response(null, {
          status: 303, // See Other
          headers,
        });
    }
  },

};

export default function Video(props: PageProps) {
    return(
  <CompVideo
  video={props.data.data}
  name={props.data.name}
  userid={props.data.userid}/>
    );
}
