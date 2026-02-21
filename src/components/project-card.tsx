import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Star, GitFork } from "lucide-react";
import type { GitHubRepo } from "@/lib/github";

interface ProjectCardProps {
    project: GitHubRepo;
    formatDate: (date: string) => string;
    getProjectImageUrl: (repo: GitHubRepo) => string;
    getProjectLiveUrl: (repo: GitHubRepo) => string | null;
}

export function ProjectCard({ project, formatDate, getProjectImageUrl, getProjectLiveUrl }: ProjectCardProps) {
    const liveUrl = getProjectLiveUrl(project);
    const primaryUrl = liveUrl ?? project.html_url;

    return (
        <article
            className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-emerald-500/20 bg-[#030509]/90 transition-transform hover:-translate-y-1 hover:border-emerald-400/40"
        >
            <div className="relative h-48 w-full overflow-hidden">
                <Image
                    src={getProjectImageUrl(project)}
                    alt={`Imagen del proyecto ${project.name}`}
                    fill
                    className="object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020305] via-transparent" />
            </div>
            <div className="flex flex-1 flex-col justify-between gap-6 p-6">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h3 className="text-xl font-semibold text-white group-hover:text-emerald-200">
                            {project.name}
                        </h3>
                        <p className="mt-2 text-sm text-emerald-100/75 line-clamp-3">
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
                            {project.topics.slice(0, 3).map((topic) => (
                                <span
                                    key={topic}
                                    className="rounded-full border border-emerald-400/30 px-3 py-1 text-xs text-emerald-200"
                                >
                                    {topic}
                                </span>
                            ))}
                            {project.topics.length > 3 && (
                                <span className="text-xs text-emerald-200/50">+{project.topics.length - 3}</span>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </article>
    );
}
