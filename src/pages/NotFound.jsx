import { Helmet } from "react-helmet-async";

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>404 — Page not found | Console Logic</title>
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <main className="min-h-screen grid place-items-center p-8">
        <div className="text-center max-w-lg">
          <div className="font-mono text-terminal-green">$ error</div>
          <h1 className="mt-2 font-display text-4xl leading-snug">
            Error 404: Logic not found
            <span className="ml-1 inline-block w-[0.6em] h-[1em] translate-y-[2px] bg-terminal-green [animation:blink_1s_steps(2,_start)_infinite]" aria-hidden />
          </h1>
          <p className="mt-3 text-base text-muted-foreground leading-normal">
            The page took a wrong turn. Head back home and try again.
          </p>
          <a href="/" className="btn btn-primary mt-6">
            Return home
          </a>
        </div>
      </main>
    </>
  );
}
