export default function Container({ className = "", children }) {
  return (
    <div className={`mx-auto max-w-screen-xl px-6 ${className}`.trim()}>
      {children}
    </div>
  );
}
