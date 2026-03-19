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
  Plus,
  ArrowRight
} from "lucide-react";

import { HorizontalScroller } from "@/components/horizontal-scroller";
import { Section } from "@/components/section";
import {
  getCategorizedRepos,
  formatDate,
  getProjectImageUrl,
  getProjectLiveUrl,
  type GitHubRepo
} from "@/lib/github";
import { ProjectGrid } from "@/components/project-grid";

const HERO_SERVICES: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: "Ingenieria de datos",
    description:
      "Diseño e implemento pipelines ETL/ELT robustos en entornos multi-cloud (AWS, GCP, Azure), asegurando la escalabilidad y disponibilidad de los datos. Poseo un dominio avanzado en la administración de Bases de Datos (SQL Server, Oracle, MongoDB) y el diseño de arquitecturas de Data Warehouse y Cubos OLAP para analítica avanzada.",
    icon: Code,
  },
  {
    title: "Ingeniería Industrial",
    description:
      "Conozco herramientas para mejorar la eficiencia de los procesos industriales y la calidad de los productos.",
    icon: Factory,
  },
  {
    title: "administracion de bases de datos",
    description:
      "Administro datos y creo pipelines analíticos respaldados por dashboards e informes accionables.",
    icon: Database,
  },
  {
    title: "analista de datos ",
    description:
      "Analizo datos y creo dashboards e informes accionables.",
    icon: Bug,
  },
];

const SKILL_GROUPS = [
  {
    title: "Ingenieria de datos",
    icon: Code,
    items:
      " Google Cloud Platform (GCP) , BigQuery , Dataproc , Cloud Composer , PySpark , Airflow, AWS, Data mench, Arquitectura ETL/ELT , Docker. Data stream, dbt,  Azure databricks, Terraform, pySpark, SQL"
  },
  {
    title: "Base de datos",
    icon: Database,
    items: "SQL Server, PostgreSQL, MongoDB, Firebase, mySQL, Oracle",
  },
  {
    title: "Desarrollo de software",
    icon: Bug,
    items: "Python, React, Node.js, Express, JavaScript, TypeScript, HTML, CSS, Git, GitHub, Docker",
  },
  {
    title: "Administración Industrial",
    icon: Factory,
    items:
      "ISO 9001, ISO 45001, Manejo de indicadores, Six Sigma, SMED, Administración de producción",
  },
  {
    title: "Gestión de proyectos",
    icon: ClipboardList,
    items: "Jira, Kanban, SCRUM, MS Project",
  },
  {
    title: "Análisis de datos",
    icon: ClipboardList,
    items: "Tableau, PowerBI, Excel, Python "
  }
];

const EXPERIENCES = [
  {
    date: "2022",
    role: "Ingeniero de datos",
    company: "implemental systems",
    description:
      "Diseñé, desarrollé y ejecuté la migración de pipelines de datos y servicios hacia entornos en la nube, garantizando la disponibilidad y el flujo eficiente de la información"
  },
  {
    date: "2023",
    role: "Administrador de bases de datos",
    company: "implemental systems",
    description:
      "Administración de DB : Administré y optimicé bases de datos Oracle SQL para clientes regionales, reduciendo lostiempos de ejecución de queries críticas en un 60% mediante el tuning de índices y procedimientos almacenados"

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

export default async function Home() {
  let dataProjects: GitHubRepo[] = [];
  let devProjects: GitHubRepo[] = [];
  let projectsError: string | null = null;

  try {
    const { data, dev } = await getCategorizedRepos();
    dataProjects = data.slice(0, 3);
    devProjects = dev.slice(0, 3);
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
            { href: "#proyectos-home", label: "Proyectos" },
            { href: "#contacto", label: "Contacto" },
            { href: "/analisis-de-datos", label: "Datos" },
            { href: "/desarrollo", label: "Desarrollo" },
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
                        Data Engineer / Software Developer
                      </p>
                    </div>
                    <div className="mt-6 flex items-center gap-4 text-white/85">
                      <Link
                        href="mailto:[EMAIL_ADDRESS]"
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
                    Ingeniero industrial / Ingeniero de datos / especialista en analisis de datos e informacion
                  </h2>
                  <div className="flex flex-wrap gap-6 text-sm text-emerald-300/85">
                    <span>5+ años de experiencia</span>
                    <span>Colombia</span>
                    <span>Freelance</span>
                  </div>
                </div>
                <div className="space-y-4 text-base text-white/70">
                  <p>
                    Profesional en datos con más de 4 años de experiencia especializándose en el ciclo de
                    vida completo de la información. Amplia experiencia en el diseño e implementación de
                    pipelines ETL/ELT robustos en entornos multi-cloud (AWS, GCP, Azure), asegurando la
                    escalabilidad y disponibilidad de los datos. Poseo un dominio avanzado en la
                    administración de Bases de Datos (SQL Server, Oracle, MongoDB) y el diseño de
                    arquitecturas de Data Warehouse y Cubos OLAP para analítica avanzada.

                  </p>
                  <p>
                    Mi perfil se potencia con conocimiento y experiencia en Desarrollo de Software
                    utilizando tecnologias (Node.js, React, Express), lo que me permite una visión 360° del
                    dato: desde la ingesta y transformación con herramientas como dbt y Airflow, hasta su
                    consumo eficiente en aplicaciones e interfaces de usuario. Soy un profesional orientado
                    a la automatización de procesos y la optimización de queries para transformar datos
                    crudos en activos estratégicos de negocio.
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
                Soy Profesional en Datos e Ingeniero Industrial, especializado en el ciclo de vida
                completo de la información. Mi formación técnica y analítica me ha permitido
                entender el negocio y traducirlo en arquitecturas tecnológicas eficientes,
                escalables y orientadas a resultados.
              </p>
              <p>
                Destaco en el diseño de pipelines ETL/ELT robustos y despliegues en ecosistemas
                multi-cloud (GCP, AWS, Azure). Me apasiona administrar bases de datos complejas,
                además de estructurar Data Warehouses y Cubos OLAP utilizando herramientas
                modernas como Python, dbt y Airflow para limpiar, transformar y asegurar la
                calidad óptima del dato.
              </p>
              <p>
                Mi visión 360° integra el conocimiento en desarrollo de software con la ingeniería
                de datos avanzada. De esta forma, no solo garantizo flujos de ingesta precisos,
                sino que también transformo la información en dashboards dinámicos e informes
                accionables que impulsan la toma de decisiones estratégicas.
              </p>
            </div>
            <div className="space-y-6 rounded-3xl border border-emerald-500/20 bg-[#030509]/90 p-8 shadow-[0_40px_90px_-60px_rgba(5,8,15,0.9)]">
              {EXPERIENCES.map((experience, index) => (
                <div key={`${experience.date}-${index}`} className="flex gap-6">
                  <div className="mt-1 flex-none h-10 w-10 rounded-full border border-emerald-400/40 text-center text-sm font-semibold leading-10 text-emerald-200">
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

        <Section id="proyectos-home" eyebrow="proyectos" title="Explora mis trabajos por categoría." className="pl-6 pr-6 sm:pl-10 sm:pr-10 lg:pl-16 lg:pr-16">
          {projectsError ? (
            <div className="rounded-3xl border border-red-500/50 bg-red-500/10 p-6 text-sm text-red-200">
              {projectsError}
            </div>
          ) : (
            <div className="space-y-16">
              {/* Categoría Análisis de Datos */}
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-white">Análisis de Datos</h3>
                  <Link
                    href="/analisis-de-datos"
                    className="group inline-flex items-center gap-2 text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    Ver todos los proyectos
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
                <ProjectGrid
                  projects={dataProjects}
                  formatDate={formatDate}
                  getProjectImageUrl={getProjectImageUrl}
                  getProjectLiveUrl={getProjectLiveUrl}
                />
              </div>

              {/* Categoría Desarrollo */}
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-white">Desarrollo Web</h3>
                  <Link
                    href="/desarrollo"
                    className="group inline-flex items-center gap-2 text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    Ver todos los proyectos
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
                <ProjectGrid
                  projects={devProjects}
                  formatDate={formatDate}
                  getProjectImageUrl={getProjectImageUrl}
                  getProjectLiveUrl={getProjectLiveUrl}
                />
              </div>
            </div>
          )}
        </Section>

        <Section id="experiencia" eyebrow="experiencia" title="Trayectoria profesional reciente." className="pl-6 pr-6 sm:pl-10 sm:pr-10 lg:pl-16 lg:pr-16">
          <div className="space-y-10 text-emerald-100/85">
            <div className="space-y-3">
              <h3 className="text-2xl font-semibold text-white">Data Engineer / Software developer</h3>
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-emerald-300/80">
                Empresa Implemental Systems · Sep 2022 – Ene 2026
              </p>
              <p className="text-base leading-relaxed text-emerald-100/75">
                Diseñé, desarrollé y ejecuté la migración de pipelines de datos y servicios hacia entornos en la nube, garantizando la
                disponibilidad y el flujo eficiente de la información. <br />
                <br />
                Administración de DB : "Administré y optimicé bases de datos Oracle/SQL para clientes regionales, reduciendo los
                tiempos de ejecución de queries críticas en un 60% mediante el tuning de índices y procedimientos almacenados.
                "<br />
                <br />
                Lideré procesos de migración de datos utilizando FME y automaticé la generación de reportes de calidad de datos. <br />
                <br />
                Automatización de KPIs : "Automaticé el análisis de peticiones Jboss, reduciendo el tiempo de generación de reportes
                de KPIs de 3 días a solo 15 minutos.
                "<br />
                Aporté valor en la capa de aplicaciones mediante el desarrollo Full Stack (React JS, Angular JS, Node) y la
                implementación de funcionalidades que incrementaron la velocidad de procesamiento en servicios Jboss y GSS. <br />
                Creación y mantenimiento de Cubos OLAP (OnLine Analytical Processing) para analítica de BI (Business Intelligent). <br />
                Administracion de Data Warehouse
              </p>
            </div>
            <div className="h-px w-full bg-emerald-400/20" aria-hidden />
            <div className="space-y-3">
              <h3 className="text-2xl font-semibold text-white">Data enginner / data analyst</h3>
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-emerald-300/80">
                Bitecso S.A.S · Mar 2020 – Mar 2021
              </p>
              <p className="text-base leading-relaxed text-emerald-100/75">
                ETL de Extracción de Datos de Sistemas ArcGIS | Claro Colombia
                ETL ArcGIS para Claro : "Implementé un pipeline ETL para datos geoespacial complejos, automatizando la carga en
                buckets y asegurando la calidad del 100% de los datos mediante validaciones con dbt. <br />
                < br />
                Dashboard de Salud de Negocio | Empresa del sector Turismo
                Construí y desplegué un tablero de control integral conectando múltiples fuentes de información para monitorear en
                tiempo real los KPIs críticos de la empresa, facilitando la toma de decisiones a nivel gerencial. <br />
                <br />
                Análisis de Rotación de Productos | E-commerce
                Desarrollé un modelo de análisis utilizando SQL y Python para procesar históricos de ventas, identificando cuellos de
                botella en el inventario y patrones de consumo para optimizar el stock. <br />
                <br />
                Reportes de Calidad de Datos | Seimar SAS
                Creé scripts de automatización para la validación, limpieza y perfilado de grandes volúmenes de datos operativos,
                garantizando la fiabilidad y exactitud de la información reportada a los stakeholders. <br />
                <br />
                Análisis de Acciones con Visualización en Power BI | ETB
                Modelé y visualicé conjuntos de datos financieros y operativos en Power BI, transformando información cruda en
                dashboards interactivos para el seguimiento de tendencias y el análisis de acciones. <br />
                <br />
                Pipeline para ETB : "Desarrollé un pipeline de extracción de logs de servicios Jboss hacia AWS, permitiendo el
                procesamiento de +10GB de datos diarios con una latencia menor a 5 minutos.
              </p>
            </div>
            <div className="h-px w-full bg-emerald-400/20" aria-hidden />
            <div className="space-y-3">
              <h3 className="text-2xl font-semibold text-white">Data Analyst / Administrador SIG</h3>
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-emerald-300/80">
                Servicios Industriales y Marítimos S.A.S · Mar 2019 – Jul 2020
              </p>
              <p className="text-base leading-relaxed text-emerald-100/75">
                Lideré la administración de indicadores estratégicos y el análisis de datos complejos utilizando Python, Power BI y bases
                de datos relacionales. <br />
                <br />
                Ejecuté estrategias de Business Analytics , extrayendo insights para analizar los impactos en los programas de formación
                de personal. <br />
                <br />
                Planificación de Mantenimiento : "Mejoré la planificación del mantenimiento preventivo mediante modelos de datos,
                incrementando la disponibilidad de activos en un 20% <br />
                <br />
                Migración desde Excel : "Lideré la migración de sistemas operativos desde archivos Excel hacia MySQL, eliminando el
                100% de las duplicidades de datos y reduciendo los errores manuales de carga en un 80%
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
