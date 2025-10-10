export default function NotFound() {
  return (
    <main className="min-h-screen grid place-items-center p-8">
      <div className="text-center max-w-lg">
        <div className="font-mono text-terminal-green">$ error</div>
        <h1 className="mt-2 font-display text-3xl">
          Error 404: Logic not found
          <span className="ml-1 inline-block h-6 w-[10px] translate-y-[2px] bg-terminal-green [animation:blink_1s_steps(2,_start)_infinite]"></span>
        </h1>
        <p className="mt-3 text-muted-foreground">
          The page took a wrong turn. Head back home and try again.
        </p>
        <a href="/" className="btn btn-primary mt-6">
          Return home
        </a>
      </div>
    </main>
  );
}
