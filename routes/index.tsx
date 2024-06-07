import { useSignal } from "@preact/signals";
import Counter from "../islands/Counter.tsx";
import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
   GET(req, ctx) {
    const headers = new Headers();
    headers.set("location", "/login");
    return new Response(null, {
      status: 303,
      headers,
    });  },

};


export default function Home() {

}
