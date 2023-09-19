console.log("Hello via Bun!");
import { Database } from "bun:sqlite";
const db = new Database(":memory:");

const server = Bun.serve({
    port: 3000,
    fetch(request: Request) {
        const url = new URL(request.url);
        if (url.pathname === "/") return new Response("Home page!");
        if (url.pathname === "/blog") return new Response("Blog!");
        if (url.pathname === "/data") {
            const query = db.query("select 'Hello world' as message;");
            const dbRes = query.get(); // => { message: "Hello world" }
            return new Response(JSON.stringify(dbRes));
        }
        if (url.pathname === "/err") throw new Error("woops!");
        return new Response("404!");

    },
    tls: {

    }, 

});

console.log(`Listening on http://localhost:${server.port}`);