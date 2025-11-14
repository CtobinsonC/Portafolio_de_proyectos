import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowUpRight,
  Bug,
  ClipboardList,
  Code,
  Database,
  Factory,
  Github,
  GitFork,
  Linkedin,
  Mail,
  Star,
} from "lucide-react";

import { HorizontalScroller } from "@/components/horizontal-scroller";
import { Section } from "@/components/section";
import { getPinnedRepos, type GitHubRepo } from "@/lib/github";

const HERO_SERVICES: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: "development",
    description:
      "Construyo experiencias front-end y back-end a medida con un enfoque en rendimiento y accesibilidad.",
    icon: Code,
  },
  {
    title: "Ingeniería Industrial",
    description:
      "Conozco herramientas para mejorar la eficiencia de los procesos industriales y la calidad de los productos.",
    icon: Factory,
  },
  {
    title: "data base",
    description:
      "Administro datos y creo pipelines analíticos respaldados por dashboards e informes accionables.",
    icon: Database,
  },
  {
    title: "QA tester",
    description:
      "Realizo pruebas de software para identificar y corregir errores en el código.",
    icon: Bug,
  },
];

const SKILL_GROUPS = [
  {
    title: "Desarrollo de Software",
    icon: Code,
    items:
      "Visual Studio Code, HTML5, CSS, JavaScript, Python, React, Bootstrap, Node, Express, MERN stack, API REST, Git, Postman, SoapUI, Administración de servicios SMALLWORLD, GIS, FME",
  },
  {
    title: "Base de datos",
    icon: Database,
    items: "SQL Server, PostgreSQL, MongoDB, Firebase, Databricks",
  },
  {
    title: "Pruebas de software",
    icon: Bug,
    items: "Cypress, Selenium, Pruebas unitarias, TestLink",
  },
  {
    title: "Administración Industrial",
    icon: Factory,
    items:
      "ISO 9001, ISO 45001, Manejo de indicadores, Six Sigma, SMED, Administración de producción, Análisis de datos",
  },
  {
    title: "Gestión de proyectos",
    icon: ClipboardList,
    items: "Jira, Kanban, SCRUM, MS Project",
  },
];

const PROJECT_IMAGE_MAP: Record<string, string> = {
  "proyecto-pagina-de-noticias-de-tecnologias": "/projects/Pagina_de_noticias.png",
  "proyecto-analisis-de-datos-analisis-de-ventas-de-ecommerce":
    "/projects/Dashboard_Analisis_de_datos.png",
  "batatabit-lading-page-criptomonedas": "/projects/Batatabit.png",
  "proyecto-css-google": "/projects/Screenshot_2025-11-13_181750.png",
};

const PROJECT_LIVE_LINKS: Record<string, string> = {
  "proyecto-pagina-de-noticias-de-tecnologias":
    "https://proyecto-pagina-de-noticias-de-tecn.vercel.app/#",
  "proyecto-css-google": "https://ctobinsonc.github.io/Proyecto-CSS-google/",
  "batatabit-lading-page-criptomonedas":
    "https://ctobinsonc.github.io/Batatabit-Lading-page-Criptomonedas/",
};

const EXPERIENCES = [
  {
    date: "2022",
    role: "Desarrollador Fullstack",
    company: "Freelance",
    description:
      "Diseño y desarrollo de aplicaciones web enfocadas en experiencias rápidas, accesibles y con despliegues automatizados.",
  },
  {
    date: "2022",
    role: "Frontend Developer",
    company: "Proyectos personales",
    description:
      "Implementación de interfaces reactivas, dashboards de datos y componentes reutilizables con Next.js y TypeScript.",
  },
  {
    date: "2022",
    role: "Analista de datos",
    company: "Proyectos personales",
    description:
      "Desarrollo de modelos de datos, dashboards de inteligencia de negocio y automatizaciones con Python para convertir métricas en decisiones accionables.",
  },

  {
    date: "2021",
    role: "Soporte técnico y administración de servidores",
    company: "SMW PNI",
    description:
      "implementacion de sistemas GIS, soporte técnico y administración de servidores.",
  },
];

function formatDate(date: string) {
  return new Intl.DateTimeFormat("es-ES", {
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getProjectImageUrl(repo: GitHubRepo) {
  const slugName = slugify(repo.name);
  if (slugName in PROJECT_IMAGE_MAP) {
    return PROJECT_IMAGE_MAP[slugName];
  }

  const slugFullName = slugify(repo.full_name);
  if (slugFullName in PROJECT_IMAGE_MAP) {
    return PROJECT_IMAGE_MAP[slugFullName];
  }

  return "/projects/Screenshot_2025-11-13_181750.png";
}

function getProjectLiveUrl(repo: GitHubRepo) {
  if (repo.homepage) {
    return repo.homepage;
  }

  const slugName = slugify(repo.name);
  if (slugName in PROJECT_LIVE_LINKS) {
    return PROJECT_LIVE_LINKS[slugName];
  }

  const slugFullName = slugify(repo.full_name);
  if (slugFullName in PROJECT_LIVE_LINKS) {
    return PROJECT_LIVE_LINKS[slugFullName];
  }

  return null;
}

export default async function Home() {
  let projects: GitHubRepo[] = [];
  let projectsError: string | null = null;

  try {
    projects = await getPinnedRepos(6);
  } catch (error) {
    projectsError =
      error instanceof Error
        ? error.message
        : "No se pudieron cargar los proyectos en este momento.";
  }

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#020305] text-white">

      <header className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-center justify-between px-6 py-8 sm:px-10 lg:px-16">
        <span className="text-sm uppercase tracking-[0.4em] text-sky-200/80">
          CtobinsonC
        </span>
        <nav className="pointer-events-auto hidden gap-8 text-sm text-sky-100/80 md:flex">
          {[
            { href: "#inicio", label: "Inicio" },
            { href: "#sobre-mi", label: "Sobre mí" },
            { href: "#habilidades", label: "Habilidades" },
            { href: "#proyectos", label: "Proyectos" },
            { href: "#contacto", label: "Contacto" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="mailto:ctobinsonc.dev@gmail.com"
          className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2 text-sm text-white transition-colors hover:border-white hover:bg-white/5"
        >
          <Mail className="h-4 w-4" />
          Hablemos
        </Link>
      </header>

      <HorizontalScroller>
        <section
          id="inicio"
          className="relative flex min-h-screen w-screen flex-none snap-start bg-[#020305] px-4 sm:px-6 lg:px-12"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(2,3,5,0.72), rgba(2,3,5,0.9)), url('/fondo_planta.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        >
          <div className="mt-24 flex w-full flex-1 flex-col overflow-hidden bg-[#020305] lg:mt-28 lg:flex-row">
            <div className="flex h-16 items-center justify-end border-b border-white/5 bg-black/30 px-6 text-emerald-300 lg:hidden">
              <div className="flex items-center gap-5">
                <Link
                  href="mailto:ctobinsonc.dev@gmail.com"
                  className="transition-colors hover:text-emerald-100"
                >
                  <Mail className="h-4 w-4" />
                </Link>
                <Link
                  href="https://www.linkedin.com/in/caleb-david-tobinson-cabrera-8aa0b9186/"
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-emerald-100"
                >
                  <Linkedin className="h-4 w-4" />
                </Link>
                <Link
                  href="https://github.com/CtobinsonC"
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-emerald-100"
                >
                  <Github className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="flex flex-1 flex-col lg:flex-row">
              <div className="hidden h-full w-20 flex-col items-center justify-between border-r border-white/5 bg-black/30 px-4 py-10 text-emerald-200/90 lg:flex">
                <div className="flex flex-col items-center gap-6 text-emerald-300/90">
                  <Link
                    href="mailto:ctobinsonc.dev@gmail.com"
                    className="transition-colors hover:text-emerald-100"
                  >
                    <Mail className="h-5 w-5" />
                  </Link>
                  <Link
                    href="https://www.linkedin.com/in/caleb-david-tobinson-cabrera-8aa0b9186/"
                    target="_blank"
                    rel="noreferrer"
                    className="transition-colors hover:text-emerald-100"
                  >
                    <Linkedin className="h-5 w-5" />
                  </Link>
                  <Link
                    href="https://github.com/CtobinsonC"
                    target="_blank"
                    rel="noreferrer"
                    className="transition-colors hover:text-emerald-100"
                  >
                    <Github className="h-5 w-5" />
                  </Link>
                </div>
                <div className="text-[0.65rem] uppercase tracking-[0.3em] text-emerald-200/70">
                  Disponible
                </div>
              </div>

              <div className="relative flex w-full flex-1 items-center justify-center bg-[#020305] px-10 pb-16 pt-10 sm:px-14 lg:basis-[50%] lg:flex-none lg:px-16 lg:py-16">
                <div
                  className="relative w-full max-w-[540px] overflow-hidden shadow-[0_60px_150px_-70px_rgba(0,0,0,0.95)] sm:max-w-[620px] lg:max-w-[700px] xl:max-w-[780px]"
                  style={{
                    WebkitMaskImage:
                      "radial-gradient(135% 135% at 50% 40%, rgba(0,0,0,1) 52%, rgba(0,0,0,0.65) 78%, transparent 100%)",
                    maskImage:
                      "radial-gradient(135% 135% at 50% 40%, rgba(0,0,0,1) 52%, rgba(0,0,0,0.65) 78%, transparent 100%)",
                  }}
                >
                  <div className="relative w-full pt-[142%]">
                    <Image
                      src="/Foto_de_presentacion-Photoroom.png"
                      alt="Fotografía de CtobinsonC"
                      fill
                      priority
                      className="object-cover object-top"
                    />
                  </div>
                  <div
                    className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_48%,rgba(0,0,0,0.9)_95%)]"
                    aria-hidden
                  />
                  <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black via-black/60 to-transparent px-10 pb-12 pt-24">
                    <div className="space-y-3 text-left">
                      <p className="text-[26px] font-semibold text-white">Caleb Tobison C.</p>
                      <p className="text-sm uppercase tracking-[0.35em] text-emerald-400">
                        Developer
                      </p>
                    </div>
                    <div className="mt-6 flex items-center gap-4 text-white/85">
                      <Link
                        href="mailto:ctobinsonc.dev@gmail.com"
                        className="transition-opacity hover:opacity-80"
                      >
                        <Mail className="h-4 w-4" />
                      </Link>
                      <Link
                        href="https://www.linkedin.com/in/caleb-david-tobinson-cabrera-8aa0b9186/"
                        target="_blank"
                        rel="noreferrer"
                        className="transition-opacity hover:opacity-80"
                      >
                        <Linkedin className="h-4 w-4" />
                      </Link>
                      <Link
                        href="https://github.com/CtobinsonC"
                        target="_blank"
                        rel="noreferrer"
                        className="transition-opacity hover:opacity-80"
                      >
                        <Github className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-1 flex-col gap-10 px-8 py-12 text-left text-white sm:px-12 lg:px-16">
                <div className="space-y-5">
                  <h2 className="text-3xl font-semibold text-white sm:text-4xl">
                    Analista de datos y desarrollador de software
                  </h2>
                  <div className="flex flex-wrap gap-6 text-sm text-emerald-300/85">
                    <span>5+ años de experiencia</span>
                    <span>Colombia</span>
                    <span>Freelance</span>
                  </div>
                </div>
                <div className="space-y-4 text-base text-white/70">
                  <p>
                    Ingeniero Industrial que conecta procesos, tecnología y negocio. Me especializo en
                    desarrollo full stack con ReactJS y NodeJS, automatización de pruebas y análisis de
                    datos para entregar productos digitales robustos y medibles.
                  </p>
                  <p>
                    Combino habilidades estratégicas y técnicas para acompañar equipos en todo el ciclo de
                    vida del producto, desde investigación y diseño hasta despliegue y observabilidad.
                  </p>
                </div>
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-white">my services</h3>
                  <div className="grid gap-6 sm:grid-cols-2">
                    {HERO_SERVICES.map((service) => (
                      <div
                        key={service.title}
                        className="group rounded-3xl border border-white/5 bg-black/25 p-6 transition-colors hover:border-emerald-400/50 hover:bg-emerald-400/10"
                      >
                        <service.icon className="mb-4 h-6 w-6 text-emerald-400 group-hover:text-emerald-300" />
                        <p className="text-lg font-medium capitalize text-white">
                          {service.title}
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-white/70">
                          {service.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Section id="sobre-mi" eyebrow="sobre mí" title="Curiosidad, estrategia y ejecución." className="pl-6 pr-6 sm:pl-10 sm:pr-10 lg:pl-16 lg:pr-16">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
            <div className="space-y-6 text-base text-emerald-100/80">
              <p>
                Soy Ingeniero Industrial con una base sólida en tecnologías de
                la información y procesos industriales. He trabajado con bases de
                datos relacionales y no relacionales, y me desempeño como
                desarrollador full stack utilizando ReactJS y NodeJS.
              </p>
              <p>
                Cuento con experiencia en pruebas funcionales y de
                automatización con herramientas como Cypress, Jest y Selenium, y
                conozco metodologías ágiles, administración de servidores y
                soporte técnico. También aplico análisis de datos con Python y
                soluciones de business intelligence para impulsar decisiones.
              </p>
              <p>
                Me caracterizo por el trabajo en equipo, la capacidad de liderar
                cambios y la motivación constante por mejorar procesos y
                recursos. Mi objetivo es aportar a proyectos competitivos
                mediante soluciones eficientes y un enfoque de mejora continua.
              </p>
            </div>
            <div className="space-y-6 rounded-3xl border border-emerald-500/20 bg-[#030509]/90 p-8 shadow-[0_40px_90px_-60px_rgba(5,8,15,0.9)]">
              {EXPERIENCES.map((experience) => (
                <div key={experience.date} className="flex gap-6">
                  <div className="mt-1 h-10 w-10 rounded-full border border-emerald-400/40 text-center text-sm font-semibold leading-10 text-emerald-200">
                    {experience.date}
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-white">
                      {experience.role} · {experience.company}
                    </h3>
                    <p className="text-sm text-emerald-100/70">
                      {experience.description}
                    </p>
                  </div>
                </div>
              ))}
              <div className="h-px bg-emerald-400/20" />
            </div>
          </div>
        </Section>

        <Section id="habilidades" eyebrow="habilidades" title="Tecnologías que impulsan mi trabajo." className="pl-6 pr-6 sm:pl-10 sm:pr-10 lg:pl-16 lg:pr-16">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {SKILL_GROUPS.map((group) => (
              <div
                key={group.title}
                className="flex flex-col gap-4 rounded-3xl border border-emerald-500/20 bg-[#030509]/90 p-6 text-sm shadow-[0_35px_80px_-65px_rgba(5,8,15,0.9)]"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-300">
                    <group.icon className="h-5 w-5" />
                  </span>
                  <h3 className="text-lg font-semibold text-white">
                    {group.title}
                  </h3>
                </div>
                <p className="leading-relaxed text-emerald-100/75">{group.items}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section id="proyectos" eyebrow="proyectos" title="Selección de proyectos recientes." className="pl-6 pr-6 sm:pl-10 sm:pr-10 lg:pl-16 lg:pr-16">
          {projectsError ? (
            <div className="rounded-3xl border border-red-500/50 bg-red-500/10 p-6 text-sm text-red-200">
              {projectsError}
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {projects
                .filter(project => !project.name.toLowerCase().includes('portafolio'))
                .map((project) => {
                const liveUrl = getProjectLiveUrl(project);
                const primaryUrl = liveUrl ?? project.html_url;

                return (
                  <article
                    key={project.id}
                    className="group relative flex h-[520px] flex-col overflow-hidden rounded-3xl border border-emerald-500/20 bg-[#030509]/90 transition-transform hover:-translate-y-1 hover:border-emerald-400/40"
                  >
                    <div className="relative h-48 w-full overflow-hidden">
                      <>
                        <Image
                          src={getProjectImageUrl(project)}
                          alt={`Imagen del proyecto ${project.name}`}
                          fill
                          className="object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          priority={false}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#020305] via-transparent" />
                      </>
                    </div>
                    <div className="flex flex-1 flex-col justify-between gap-6 p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-xl font-semibold text-white group-hover:text-emerald-200">
                            {project.name}
                          </h3>
                          <p className="mt-2 text-sm text-emerald-100/75">
                            {project.description ?? "Repositorio sin descripción"}
                          </p>
                          {liveUrl && (
                            <Link
                              href={liveUrl}
                              target="_blank"
                              className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 px-4 py-1.5 text-xs font-medium text-emerald-200 transition-colors hover:border-emerald-300 hover:bg-emerald-400/10"
                            >
                              Ver demo
                              <ArrowUpRight className="h-3.5 w-3.5" />
                            </Link>
                          )}
                        </div>
                        <Link
                          href={primaryUrl}
                          target="_blank"
                          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-emerald-400/30 text-emerald-200 transition-colors hover:border-emerald-300 hover:bg-emerald-400/10"
                        >
                          <ArrowUpRight className="h-4 w-4" />
                        </Link>
                      </div>
                      <div className="space-y-4">
                        <div className="flex flex-wrap items-center gap-3 text-xs text-emerald-200/70">
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-3 py-1 text-emerald-200">
                            <Star className="h-3 w-3" /> {project.stargazers_count}
                          </span>
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-3 py-1 text-emerald-200">
                            <GitFork className="h-3 w-3" /> {project.forks_count}
                          </span>
                          {project.language && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-3 py-1 text-emerald-200">
                              {project.language}
                            </span>
                          )}
                          <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-emerald-200">
                            Actualizado {formatDate(project.updated_at)}
                          </span>
                        </div>
                        {project.topics && project.topics.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {project.topics.map((topic) => (
                              <span
                                key={topic}
                                className="rounded-full border border-emerald-400/30 px-3 py-1 text-xs text-emerald-200"
                              >
                                {topic}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                  </div>
                </article>
              );
            })}
            </div>
          )}
        </Section>

        <Section id="experiencia" eyebrow="experiencia" title="Trayectoria profesional reciente." className="pl-6 pr-6 sm:pl-10 sm:pr-10 lg:pl-16 lg:pr-16">
          <div className="space-y-10 text-emerald-100/85">
            <div className="space-y-3">
              <h3 className="text-2xl font-semibold text-white">Ingeniero de Software</h3>
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-emerald-300/80">
                Empresa Implemental Systems · Sep 2021 – Actualidad
              </p>
              <p className="text-base leading-relaxed text-emerald-100/75">
                Programación de requerimientos en Magik, implementación de sistemas GIS, soporte N1 y N2 Smallworld,
                administración de servicios, análisis de datos y automatización con Python, web services, pruebas
                unitarias y automatizadas, pruebas en API con SoapUI y Postman.
              </p>
            </div>
            <div className="h-px w-full bg-emerald-400/20" aria-hidden />
            <div className="space-y-3">
              <h3 className="text-2xl font-semibold text-white">Administrador SIG</h3>
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-emerald-300/80">
                Servicios Industriales y Marítimos S.A.S · Mar 2019 – Jul 2021
              </p>
              <p className="text-base leading-relaxed text-emerald-100/75">
                Gestión de calidad, ambiente y seguridad, control y planificación de mantenimientos, control de
                inventarios, análisis de indicadores de gestión y administración de bases de datos.
              </p>
            </div>
          </div>
        </Section>

        <Section id="contacto" eyebrow="contacto" title="¿Conversamos?" className="pl-6 pr-6 sm:pl-10 sm:pr-10 lg:pl-16 lg:pr-16">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            <div className="space-y-6 text-base text-emerald-100/80">
              <p>
                Estoy listo para unirme a equipos que cuiden la experiencia de
                usuario y quieran lanzar productos memorables. Escríbeme para
                hablar sobre tu idea o proyecto.
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                <Link
                  href="mailto:ctobinsonc.dev@gmail.com"
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-5 py-2 font-medium text-black transition-transform hover:-translate-y-0.5"
                >
                  <Mail className="h-4 w-4" /> calebthowinson@gmail.com
                </Link>
                <Link
                  href="https://github.com/CtobinsonC"
                  target="_blank"
                  className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 px-5 py-2 text-emerald-200 transition-colors hover:border-emerald-300 hover:bg-emerald-400/10"
                >
                  <Github className="h-4 w-4" /> github.com/CtobinsonC
                </Link>
              </div>
            </div>
            <div className="rounded-3xl border border-emerald-500/20 bg-[#030509]/90 p-8 shadow-[0_40px_90px_-60px_rgba(5,8,15,0.9)]">
              <p className="text-sm uppercase tracking-[0.3em] text-emerald-300/80">
                Próximos pasos
              </p>
              <ul className="mt-6 space-y-4 text-sm text-emerald-100/75">
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-emerald-300" />
                  Compartir ideas o brief del proyecto.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-emerald-300" />
                  Definir alcance, roadmap y entregables.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-emerald-300" />
                  Diseñar, iterar y lanzar con calidad.
                </li>
              </ul>
            </div>
          </div>
        </Section>
      </HorizontalScroller>

      <footer className="pointer-events-none absolute bottom-0 left-0 right-0 z-30 mx-auto flex w-full max-w-5xl flex-col gap-4 px-6 pb-8 sm:px-10 lg:px-16">
        <div className="h-px bg-white/10" />
        <div className="flex flex-col gap-2 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} CtobinsonC. Todos los derechos reservados.</span>
          <div className="flex gap-4">
            <Link
              href="https://github.com/CtobinsonC"
              target="_blank"
              className="inline-flex items-center gap-1 text-zinc-400 transition-colors hover:text-white"
            >
              <Github className="h-3 w-3" /> GitHub
            </Link>
            <Link
              href="mailto:ctobinsonc.dev@gmail.com"
              className="inline-flex items-center gap-1 text-zinc-400 transition-colors hover:text-white"
            >
              <Mail className="h-3 w-3" /> Email
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
