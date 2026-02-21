import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Section } from "@/components/section";
import { ProjectGrid } from "@/components/project-grid";
import { getCategorizedRepos, formatDate, getProjectImageUrl, getProjectLiveUrl } from "@/lib/github";

export default async function DevelopmentPage() {
    const { dev: projects } = await getCategorizedRepos();

    return (
        <div className="min-h-screen bg-[#020305] text-white">
            <header className="fixed inset-x-0 top-0 z-30 flex items-center justify-between px-6 py-8 sm:px-10 lg:px-16 bg-[#020305]/80 backdrop-blur-md">
                <Link
                    href="/#proyectos"
                    className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-sky-200/80 hover:text-white transition-colors"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Volver
                </Link>
                <span className="text-sm uppercase tracking-[0.4em] text-sky-200/80">
                    Desarrollo
                </span>
            </header>

            <main className="pt-24">
                <Section
                    id="desarrollo"
                    eyebrow="proyectos"
                    title="Desarrollo Web & Software"
                    className="px-6 sm:px-10 lg:px-16"
                >
                    <p className="mb-12 max-w-2xl text-emerald-100/70">
                        Creación de aplicaciones web modernas, robustas y escalables utilizando las últimas tecnologías
                        del ecosistema JavaScript y TypeScript.
                    </p>

                    <ProjectGrid
                        projects={projects}
                        formatDate={formatDate}
                        getProjectImageUrl={getProjectImageUrl}
                        getProjectLiveUrl={getProjectLiveUrl}
                    />
                </Section>
            </main>

            <footer className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-6 pb-12 pt-20 sm:px-10 lg:px-16 text-center">
                <div className="h-px bg-white/10" />
                <span className="text-xs text-zinc-500">© {new Date().getFullYear()} CtobinsonC. Todos los derechos reservados.</span>
            </footer>
        </div>
    );
}
