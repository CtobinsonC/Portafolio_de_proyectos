import { ProjectCard } from "./project-card";
import type { GitHubRepo } from "@/lib/github";

interface ProjectGridProps {
    projects: GitHubRepo[];
    formatDate: (date: string) => string;
    getProjectImageUrl: (repo: GitHubRepo) => string;
    getProjectLiveUrl: (repo: GitHubRepo) => string | null;
}

export function ProjectGrid({ projects, formatDate, getProjectImageUrl, getProjectLiveUrl }: ProjectGridProps) {
    if (projects.length === 0) {
        return (
            <div className="flex min-h-[200px] items-center justify-center rounded-3xl border border-emerald-500/10 bg-black/20 p-10 text-emerald-100/50">
                No se encontraron proyectos en esta categoría.
            </div>
        );
    }

    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
                <ProjectCard
                    key={project.id}
                    project={project}
                    formatDate={formatDate}
                    getProjectImageUrl={getProjectImageUrl}
                    getProjectLiveUrl={getProjectLiveUrl}
                />
            ))}
        </div>
    );
}
