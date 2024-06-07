import { Handlers, PageProps } from "$fresh/server.ts";
import axios from "npm:axios"
import CompLog from "../components/CompLog.tsx"
import jwt from "npm:jsonwebtoken"
import {setCookie} from "$std/http/cookie.ts"

export const handler: Handlers = {
   GET(req, ctx) {
    const fallo:boolean=false;
    return ctx.render({fallo})
  },
  async POST(req, ctx) {
    try {
        const form = await req.formData();
        const email = form.get("email")?.toString();
        const password = form.get("password")?.toString();

        const respuesta= await axios.post("https://videoapp-api.deno.dev/checkuser",{
            email,
            password
        })
        const data= respuesta.data
        const JWT_SECRET=Deno.env.get("JWT_SECRET")
        if(!JWT_SECRET){
            throw new Error("Missing JWT_SECRET")
        }
        const token=jwt.sign(
            {
                email,
                id:data.id,
                name:data.name
            },
            Deno.env.get("JWT_SECRET"),{
                expiresIn:"24h",

            },
        );
        const headers = new Headers();
        setCookie(headers,{
            name:"auth",
            value:token,
            sameSite:"Lax",
            path:"/",
            secure:true,
        });
        headers.set("location", "/videos");
        return new Response(null, {
          status: 303, // See Other
          headers,
        });
    } catch (error) {
        const fallo:boolean=true;
        return ctx.render({fallo})
    }

  },
};


export default function Login(props:PageProps){
    return(
        <CompLog
        fallo={props.data.fallo}/>
    );
}