import { ReactNode } from "react";

interface SectionProps {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
  className?: string;
}

export function Section({
  id,
  eyebrow,
  title,
  children,
  className,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`relative flex h-screen w-screen flex-none snap-start items-center justify-center bg-[#020305] px-6 sm:px-10 lg:px-16 ${className ?? ""}`.trim()}
      style={{
        backgroundImage:
          "linear-gradient(180deg, rgba(2,3,5,0.58), rgba(2,3,5,0.78)), url('/fondo_planta.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="relative z-10 w-full max-w-6xl rounded-[48px] border border-white/5 bg-[#020305] p-12 text-left shadow-[0_70px_140px_-90px_rgba(5,8,15,0.95)] sm:p-16">
        <div className="flex items-center gap-4 text-emerald-300/80">
          <span className="h-px w-10 bg-emerald-400/60" aria-hidden />
          <span className="text-xs uppercase tracking-[0.4em]">{eyebrow}</span>
        </div>
        <div className="mt-10 space-y-10">
          <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            {title}
          </h2>
          <div className="space-y-6 text-lg text-emerald-100/80">{children}</div>
        </div>
      </div>
    </section>
  );
}
