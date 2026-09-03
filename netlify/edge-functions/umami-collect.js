// Proxies the Umami collect endpoint, forwarding the visitor's real IP.
//
// This replaces the plain 200-rewrite that used to live in public/_redirects.
// That rewrite worked, but Umami saw only Netlify's egress address, so every
// visitor geolocated to the same city and the daily visitor hash (ip + user
// agent) lost the IP as an entropy source, letting two people on the same
// browser and OS version collapse into one visitor.
//
// Umami Cloud honours True-Client-IP and ignores X-Forwarded-For, X-Real-IP and
// CF-Connecting-IP. That was determined empirically: the same payload posted
// with each header in turn recorded United Kingdom only for True-Client-IP.
// Do not swap in a more conventional-looking header without re-testing.
const UPSTREAM = "https://gateway.umami.is/api/send";

export default async (request, context) => {
  const headers = new Headers(request.headers);

  // context.ip is the real client address as Netlify's edge sees it.
  headers.set("True-Client-IP", context.ip);

  // Both describe this hop rather than the upstream one, and a stale
  // content-length would be rejected outright.
  headers.delete("host");
  headers.delete("content-length");

  // Buffered rather than streamed: a ReadableStream body needs duplex support
  // that is not reliable here, and these payloads are well under a kilobyte.
  const body = await request.text();

  try {
    const response = await fetch(UPSTREAM, { method: "POST", headers, body });
    return new Response(response.body, {
      status: response.status,
      headers: { "content-type": response.headers.get("content-type") ?? "application/json" },
    });
  } catch {
    // Analytics is never worth surfacing an error to the page. The tracker
    // already swallows failures, so a 204 keeps it quiet.
    return new Response(null, { status: 204 });
  }
};

export const config = { path: "/api/send" };
