import { useSignal } from "@preact/signals";
import Counter from "../islands/Counter.tsx";
import { Handlers } from "$fresh/server.ts";
import jwt from "npm:jsonwebtoken"
import {setCookie,getCookies} from "$std/http/cookie.ts"


export const handler: Handlers = {
   GET(req, ctx) {
    try {
      const cookie=getCookies(req.headers)
      const authtok=cookie["auth"];
      const decodedtoken=jwt.decode(authtok);
      const headers = new Headers();
      headers.set("location", "/videos");
      return new Response(null, {
        status: 303,
        headers,
      }); 
    } catch (error) {
      const headers = new Headers();
      headers.set("location", "/login");
      return new Response(null, {
        status: 303,
        headers,
      }); 
    }

   },

};


export default function Home() {

}
