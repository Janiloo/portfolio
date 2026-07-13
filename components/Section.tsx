export default function Section({
  id,
  kicker,
  title,
  children,
  className = "",
}: {
  id: string;
  kicker: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`mx-auto w-full max-w-5xl px-5 py-20 sm:px-8 sm:py-28 ${className}`}>
      <p className="font-mono text-xs tracking-[0.2em] text-accent">
        <span className="text-faint">{"//"}</span> {kicker.toUpperCase()}
      </p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-fg sm:text-4xl">{title}</h2>
      <div className="mt-10">{children}</div>
    </section>
  );
}
