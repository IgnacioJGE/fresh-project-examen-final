import { Handlers, PageProps } from "$fresh/server.ts";
import axios from "npm:axios"
import CompReg from "../components/CompReg.tsx"
import jwt from "npm:jsonwebtoken"
import {setCookie} from "$std/http/cookie.ts"

export const handler: Handlers = {
  async GET(req, ctx) {
    return ctx.render()
  },
  async POST(req, ctx) {
    try {
        const form = await req.formData();
        const email = form.get("email")?.toString();
        const password = form.get("password")?.toString();
        const name = form.get("name")?.toString();

        const respuesta= await axios.post("https://videoapp-api.deno.dev/register",{
            email,
            password,
            name
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
        return ctx.render()
    }

  },
};

export default function Register(){
    return(
        <CompReg/>
    );
}