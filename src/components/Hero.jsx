import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

function BlinkingCaret() {
  const reduce = useReducedMotion()
  return <span className={`ml-1 inline-block h-5 w-[10px] translate-y-[2px] bg-terminal-green ${reduce ? '' : '[animation:blink_1s_steps(2,_start)_infinite]'}`} aria-hidden="true" />
}

function Typewriter({ text, speed = 28, startDelay = 200 }) {
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)
  useEffect(() => {
    if (reduce) return
    let started = false
    const startTimer = setTimeout(() => { started = true }, startDelay)
    const id = setInterval(() => { if (started) setIndex(i => (i < text.length ? i + 1 : i)) }, speed)
    return () => { clearInterval(id); clearTimeout(startTimer) }
  }, [text, speed, startDelay, reduce])
  if (reduce) {
    return (
      <span className="font-mono">
        <span>{text}</span>
        <span className="ml-1 inline-block h-6 w-[10px] translate-y-[2px] bg-terminal-green" aria-hidden="true" />
      </span>
    )
  }
  const done = index >= text.length
  return (
    <span className="font-mono">
      <span>{text.slice(0, index)}</span>
      <span className={`ml-1 inline-block h-6 w-[10px] translate-y-[2px] bg-terminal-green ${done ? '[animation:blink_1s_steps(2,_start)_infinite]' : ''}`} aria-hidden="true" />
    </span>
  )
}

export default function Hero() {
  return (
    <section id="hero" className="mx-auto grid max-w-screen-xl grid-cols-1 gap-10 px-6 py-24 lg:grid-cols-2 lg:items-center">
      <div>
        <h1 className="font-display text-4xl leading-tight sm:text-5xl">
          Smart devs. Clean code. <span className="text-terminal-green">Logical</span> outcomes.
        </h1>
        <p className="mt-4 max-w-prose text-muted-foreground">
          We build crisp frontends, tidy backends, and automations that keep teams moving. Fewer surprises, faster shipping, measurable results.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a href="#contact" className="btn btn-primary">Start a project</a>
          <a href="#work" className="btn btn-ghost">See work</a>
        </div>
        <div className="mt-8 w-full rounded-xl border border-border/60 bg-elevated p-4 font-mono text-sm">
          <div className="opacity-70">~/studio</div>
          <div className="mt-1">
            <span className="text-terminal-green">console</span>.<span className="text-terminal-green">log</span>(<span className="text-accent">"Welcome to logic."</span>);<BlinkingCaret />
          </div>
        </div>
      </div>
      <div className="rounded-2xl border border-border/60 bg-elevated p-6">
        <ul className="grid gap-4">
          <li className="card">
            <h3 className="card-title">Web Apps</h3>
            <p className="card-text">React frontends with Tailwind v4, built for speed and sanity.</p>
          </li>
          <li className="card">
            <h3 className="card-title">Sites that sell</h3>
            <p className="card-text">Clean UX, clear copy, measurable outcomes.</p>
          </li>
          <li className="card">
            <h3 className="card-title">Automation</h3>
            <p className="card-text">From ops scripts to APIs that keep your team in flow.</p>
          </li>
        </ul>
      </div>
    </section>
  )
}
