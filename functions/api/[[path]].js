export async function onRequest({ request }) {
    const url = new URL(request.url);

    const backendUrl =
        `https://chromatyk-server.cleverapps.io${url.pathname}${url.search}`;

    const response = await fetch(backendUrl, {
        method: request.method,
        headers: request.headers,
        body: ["GET", "HEAD"].includes(request.method)
            ? undefined
            : request.body,
        redirect: "manual",
    });

    return new Response(response.body, response);
}