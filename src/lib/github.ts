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

export async function getPinnedRepos(limit = 6): Promise<GitHubRepo[]> {
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
    throw new Error(
      `No se pudieron cargar los repositorios de GitHub (status ${response.status}).`
    );
  }

  const repos: GitHubRepo[] = await response.json();

  const filtered = repos
    .filter((repo) => !repo.fork && !repo.private)
    .sort((a, b) => {
      const aHomepage = Boolean(a.homepage);
      const bHomepage = Boolean(b.homepage);

      if (aHomepage === bHomepage) {
        return (
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        );
      }

      return aHomepage ? -1 : 1;
    })
    .slice(0, limit);

  return filtered;
}
