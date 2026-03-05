import TypingText from "@/components/terminal/TypingText.jsx";
import LoaderLine from "@/components/terminal/LoaderLine.jsx";
import { TYPING_SPEED_MS } from "@/data/constants";
import { useTerminalLoader } from "@/hooks/useTerminalLoader.js";

export default function PromptHeader({ label = "loading section" }) {
  const { percent, verifying, verified, progressBar } = useTerminalLoader(true);

  return (
    <div className="mb-6 font-mono text-sm text-terminal-green leading-normal">
      <TypingText text={`> ${label}...`} speed={TYPING_SPEED_MS} active />

      <div className="mt-1">
        [{progressBar}] {percent}%
      </div>

      {verifying && <LoaderLine text="verifying integrity..." />}
      {verified && <LoaderLine text="section loaded." />}
    </div>
  );
}
