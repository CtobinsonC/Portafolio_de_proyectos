export type GitHubRepo = {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  fork: boolean;
  private: boolean;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  language: string | null;
  topics?: string[];
};

const GITHUB_USER = "CtobinsonC";
const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&direction=desc&per_page=100`;

export const PROJECT_IMAGE_MAP: Record<string, string> = {
  "proyecto-pagina-de-noticias-de-tecnologias": "/projects/Pagina_de_noticias.png",
  "batatabit-lading-page-criptomonedas": "/projects/Batatabit.png",
  "proyecto-css-google": "/projects/Screenshot_2025-11-13_181750.png",
  
  // Data Engineering
  "etl-extraccion-de-datos-meteorologicos": "/projects/dashboard_de_ETL.png",
  "gcp-data-enginner": "/projects/GCP-data-enginer.png",
  "gcp-data-engineer-sf-powerbi": "/projects/Esquema general de arquitectura GCP data engineer sf pb.png",
  "gcp-project-data-engineer-comprobante-de-pagos": "/projects/gcp-data-engineer-comprobante.jpg",
  "implementacion-de-un-datamesh-para-una-plataforma-de-e-commerce": "/projects/gcp-implementacion-datamesh.png",
  
  // Data Analysis
  "proyecto-analisis-de-datos-analisis-de-ventas-de-ecommerce": "/projects/Dashboard_Analisis_de_datos.png",
  "proyecto-analisis-de-rotacion-de-productos": "/projects/analisis_rotacion_productos.png",
  "proyecto-reporte-de-calidad-de-datos": "/projects/reporte_de_calidad_de_datos.png",
  "proyecto-visualizacion-power-bi": "/projects/dashboard_visualizacion_power_bi.png",
  
  "analisis-rotacion-productos": "/projects/analisis_rotacion_productos.png",
  "dashboard-de-etl": "/projects/dashboard_de_ETL.png",
};

export const PROJECT_LIVE_LINKS: Record<string, string> = {
  "proyecto-pagina-de-noticias-de-tecnologias": "https://proyecto-pagina-de-noticias-de-tecn.vercel.app/#",
  "proyecto-css-google": "https://ctobinsonc.github.io/Proyecto-CSS-google/",
  "batatabit-lading-page-criptomonedas": "https://ctobinsonc.github.io/Batatabit-Lading-page-Criptomonedas/",
};

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getProjectImageUrl(repo: GitHubRepo) {
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

export function getProjectLiveUrl(repo: GitHubRepo) {
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

export function categorizeProject(repo: GitHubRepo): "data" | "dev" | "other" {
  const name = repo.name.toLowerCase();
  const description = (repo.description || "").toLowerCase();
  const language = (repo.language || "").toLowerCase();
  const topics = (repo.topics || []).map(t => t.toLowerCase());

  const dataKeywords = ["analisis", "data", "ventas", "dashboard", "visualizacion", "python", "jupyter", "pandas", "numpy", "tableau", "powerbi", "sql", "etl", "gcp", "engineer", "datamesh", "pipeline", "arquitectura"];
  const devKeywords = ["web", "page", "react", "next", "javascript", "typescript", "css", "html", "api", "node", "express", "fullstack", "frontend", "backend"];

  const isData = dataKeywords.some(k => name.includes(k) || description.includes(k) || topics.includes(k)) || language === "python" || language === "jupyter notebook";
  const isDev = devKeywords.some(k => name.includes(k) || description.includes(k) || topics.includes(k)) || ["javascript", "typescript", "html", "css"].includes(language);

  // Special case for projects that might match both, check for specific primary indicators
  if (isData && name.includes("analisis")) return "data";
  if (isDev && (name.includes("page") || name.includes("web"))) return "dev";

  if (isData) return "data";
  if (isDev) return "dev";

  return "other";
}

export async function getCategorizedRepos(): Promise<{ data: GitHubRepo[], dev: GitHubRepo[] }> {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const response = await fetch(GITHUB_API_URL, {
    headers,
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`No se pudieron cargar los repositorios de GitHub (status ${response.status}).`);
  }

  const repos: GitHubRepo[] = await response.json();

  const filtered = repos.filter((repo) => !repo.fork && !repo.private && !repo.name.toLowerCase().includes('portafolio'));

  const data: GitHubRepo[] = [];
  const dev: GitHubRepo[] = [];

  filtered.forEach(repo => {
    const category = categorizeProject(repo);
    if (category === "data") data.push(repo);
    else if (category === "dev") dev.push(repo);
    // If "other", we might want to default to dev or just omit. 
    // For now let's put "other" in dev if it has a description or language
    else if (repo.language || repo.description) dev.push(repo);
  });

  return { data, dev };
}

export async function getPinnedRepos(limit = 6): Promise<GitHubRepo[]> {
  const { data, dev } = await getCategorizedRepos();
  // Return a mix for the home page
  return [...data, ...dev].sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()).slice(0, limit);
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("es-ES", {
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}
