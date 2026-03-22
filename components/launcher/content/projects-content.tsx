"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { PROJECTS } from "@/components/launcher/content-data";
import type { ThemeMode } from "@/components/launcher/types";

// Global flag to track if escape was handled by a modal (shared across content files)
declare global {
  var escapeHandledByModal: boolean;
}

type ProjectsContentProps = {
	theme: ThemeMode;
	selectedProject: string | null;
	setSelectedProject: (value: string | null) => void;
};

// Convert Google Drive view URL to embed URL
function getGoogleDriveEmbedUrl(url: string): string {
	const match = url.match(/\/d\/(.*?)(?:\/|$)/);
	if (match && match[1]) {
		return `https://drive.google.com/file/d/${match[1]}/preview`;
	}
	return url;
}

export function ProjectsContent({ theme, selectedProject, setSelectedProject }: ProjectsContentProps) {
	const isDark = theme === "dark";
	const scrollRef = useRef<HTMLDivElement>(null);
	const projectData =
		PROJECTS.find((project) => project.id === selectedProject) ?? null;
	const [previewPdf, setPreviewPdf] = useState<{ label: string; url: string } | null>(null);

	useEffect(() => {
		if (projectData && scrollRef.current) {
			scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
		}
	}, [projectData]);

	// Handle Escape key to close PDF preview or go back from project details
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				// Check if PDF preview is open - close it and stop propagation
				if (previewPdf) {
					e.stopImmediatePropagation();
					setPreviewPdf(null);
					return;
				}
				// Check if a modal already handled this escape
				if (globalThis.escapeHandledByModal) return;
				// If in project details, go back to projects list and stop propagation
				if (projectData) {
					e.stopImmediatePropagation();
					setSelectedProject(null);
					return;
				}
				// If in projects list (no projectData), let the shell handle it to close the app
			}
		};
		// Use capture phase to handle escape before other handlers
		window.addEventListener("keydown", handleKeyDown, true);
		return () => window.removeEventListener("keydown", handleKeyDown, true);
	}, [projectData, setSelectedProject, previewPdf]);

	if (projectData) {
		return (
			<>
				<div ref={scrollRef} className={`h-full overflow-y-auto p-4 sm:p-6 wii-u-scrollbar`}>
				<div className="space-y-4 sm:space-y-6">
					<div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
						<div className="flex-1 min-w-0">
							<button
								type="button"
								onClick={() => setSelectedProject(null)}
								className={`mb-3 sm:mb-4 inline-flex cursor-pointer items-center rounded-full border px-3 py-1.5 text-sm transition-colors ${
									isDark
										? "border-sky-200/15 text-sky-200 hover:bg-sky-400/10"
										: "border-sky-100 text-sky-700 hover:bg-sky-50"
								}`}
							>
								← Back
							</button>
							<div className={`text-xs sm:text-sm uppercase tracking-[0.18em] ${isDark ? "text-sky-300" : "text-sky-700"}`}>
								{projectData.kicker}
							</div>
							<h2 className={`mt-2 text-2xl sm:text-3xl font-bold ${isDark ? "text-white" : "text-slate-800"}`}>
								{projectData.title}
							</h2>
							<p className={`mt-2 sm:mt-3 max-w-2xl ${isDark ? "text-slate-400" : "text-slate-500"}`}>
								{projectData.summary}
							</p>
						</div>
						<div className={`grid grid-cols-2 gap-x-4 gap-y-1 text-sm sm:min-w-[180px] ${isDark ? "text-slate-400" : "text-slate-500"}`}>
							<div>Year</div>
							<div className={`text-right font-medium ${isDark ? "text-slate-100" : "text-slate-700"}`}>{projectData.year}</div>
							<div>Status</div>
							<div className={`text-right font-medium ${isDark ? "text-emerald-300" : "text-emerald-600"}`}>{projectData.status}</div>
						</div>
					</div>

					{projectData.researchDocs?.thumbnail ? (
						<div
							className={`relative overflow-hidden rounded-2xl sm:rounded-[28px] border p-2 sm:p-3 ${
								isDark ? "bg-slate-950/45 border-sky-200/10" : "bg-white/70 border-white/80"
							}`}
						>
							<div className="relative w-full overflow-hidden rounded-xl sm:rounded-[22px]">
								<Image
									src={projectData.researchDocs.thumbnail}
									alt={projectData.title}
									width={1200}
									height={800}
									className="w-full h-auto object-contain"
									priority
								/>
							</div>
							<div className="mt-3 sm:mt-4 flex flex-wrap gap-2">
								{projectData.stack.map((item) => (
									<span
										key={item}
										className={`rounded-full border px-2 sm:px-3 py-0.5 sm:py-1 text-xs sm:text-sm ${
											isDark
												? "bg-slate-950/65 text-sky-100 border-sky-200/10"
												: "bg-white/90 text-slate-700 border-white/90"
										}`}
									>
										{item}
									</span>
								))}
							</div>
						</div>
					) : (
						<div
							className={`relative overflow-hidden rounded-2xl sm:rounded-[28px] border p-2 sm:p-3 ${
								isDark ? "bg-slate-950/45 border-sky-200/10" : "bg-white/70 border-white/80"
							}`}
						>
							<div className="relative h-48 sm:h-64 overflow-hidden rounded-xl sm:rounded-[22px]">
								<Image
									src={`https://picsum.photos/seed/${projectData.seed}/1200/800`}
									alt={projectData.title}
									fill
									className="object-cover"
									referrerPolicy="no-referrer"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-slate-950/20 to-transparent" />
								<div className="absolute right-3 sm:right-5 bottom-3 sm:bottom-5 left-3 sm:left-5 flex flex-wrap gap-2">
									{projectData.stack.map((item) => (
										<span
											key={item}
											className={`rounded-full border px-2 sm:px-3 py-0.5 sm:py-1 text-xs sm:text-sm ${
												isDark
													? "bg-slate-950/65 text-sky-100 border-sky-200/10"
													: "bg-white/90 text-slate-700 border-white/90"
											}`}
										>
											{item}
										</span>
									))}
								</div>
							</div>
						</div>
					)}

					<div className="grid gap-4 lg:grid-cols-[1.25fr_0.85fr]">
						<div
							className={`rounded-2xl border p-4 sm:p-5 ${
								isDark ? "bg-slate-900/55 border-white/8" : "bg-white/65 border-white"
							}`}
						>
							<h3 className={`text-base sm:text-lg font-bold ${isDark ? "text-white" : "text-slate-800"}`}>Overview</h3>
							<div className={`mt-3 sm:mt-4 space-y-3 sm:space-y-4 text-sm ${isDark ? "text-slate-300" : "text-slate-600"}`}>
								{projectData.details.map((paragraph) => (
									<p key={paragraph}>{paragraph}</p>
								))}
							</div>
						</div>
						<div
							className={`rounded-2xl border p-4 sm:p-5 ${
								isDark ? "bg-slate-900/55 border-white/8" : "bg-white/65 border-white"
							}`}
						>
							<h3 className={`text-base sm:text-lg font-bold ${isDark ? "text-white" : "text-slate-800"}`}>Key Features</h3>
							<ul className={`mt-3 sm:mt-4 space-y-2 sm:space-y-3 ${isDark ? "text-slate-300" : "text-slate-600"}`}>
								{projectData.features.map((feature) => (
									<li key={feature} className="flex items-start gap-3">
										<span className="mt-1 h-2 w-2 rounded-full bg-sky-400 flex-shrink-0" />
										<span className="text-sm">{feature}</span>
									</li>
								))}
							</ul>
						{projectData.researchDocs && (
							<div className="mt-4 sm:mt-6 space-y-3">
								<h4 className={`text-sm font-bold uppercase tracking-[0.12em] ${isDark ? "text-slate-400" : "text-slate-500"}`}>
									Research Documents
								</h4>
								<div className="flex flex-wrap gap-2">
									{projectData.researchDocs.poster && (
										<button
											type="button"
											onClick={() => setPreviewPdf({ label: "Research Poster", url: projectData.researchDocs!.poster! })}
											className={`inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold transition-all hover:-translate-y-0.5 ${
												isDark
													? "border-sky-200/20 text-sky-200 hover:bg-sky-400/10"
													: "border-sky-200 text-sky-700 hover:bg-sky-50"
											}`}
										>
											<svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-label="Poster">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
											</svg>
											Research Poster
										</button>
									)}
									{projectData.researchDocs.paper && (
										<button
											type="button"
											onClick={() => setPreviewPdf({ label: "Research Paper", url: projectData.researchDocs!.paper! })}
											className={`inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold transition-all hover:-translate-y-0.5 ${
												isDark
													? "border-sky-200/20 text-sky-200 hover:bg-sky-400/10"
													: "border-sky-200 text-sky-700 hover:bg-sky-50"
											}`}
										>
											<svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-label="Paper">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
											</svg>
											Research Paper
										</button>
									)}
									{projectData.researchDocs.fieldNotes && (
										<button
											type="button"
											onClick={() => setPreviewPdf({ label: "Field Notes", url: projectData.researchDocs!.fieldNotes! })}
											className={`inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold transition-all hover:-translate-y-0.5 ${
												isDark
													? "border-sky-200/20 text-sky-200 hover:bg-sky-400/10"
													: "border-sky-200 text-sky-700 hover:bg-sky-50"
											}`}
										>
											<svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-label="Notes">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
											</svg>
											Field Notes
										</button>
									)}
									{projectData.researchDocs.proposal && (
										<button
											type="button"
											onClick={() => setPreviewPdf({ label: "Research Proposal", url: projectData.researchDocs!.proposal! })}
											className={`inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold transition-all hover:-translate-y-0.5 ${
												isDark
													? "border-sky-200/20 text-sky-200 hover:bg-sky-400/10"
													: "border-sky-200 text-sky-700 hover:bg-sky-50"
											}`}
										>
											<svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-label="Proposal">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
											</svg>
											Research Proposal
										</button>
									)}
									{projectData.researchDocs.interviews?.map((interview) => (
										<button
											type="button"
											key={interview.label}
											onClick={() => setPreviewPdf({ label: interview.label, url: interview.url })}
											className={`inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold transition-all hover:-translate-y-0.5 ${
												isDark
													? "border-sky-200/20 text-sky-200 hover:bg-sky-400/10"
													: "border-sky-200 text-sky-700 hover:bg-sky-50"
											}`}
										>
											<svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-label="Interview">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
											</svg>
											{interview.label}
										</button>
									))}
								</div>
							</div>
						)}
						</div>
					</div>
				</div>
			</div>

			{/* PDF Preview Modal */}
			{previewPdf && (
				<div
					data-pdf-open="true"
					className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
					onClick={() => setPreviewPdf(null)}
					onKeyDown={(e) => { if (e.key === "Escape") { e.stopPropagation(); setPreviewPdf(null); } }}
				>
					<div className={`absolute inset-0 ${isDark ? "bg-black/80" : "bg-black/60"}`} />
					<div
						className={`relative w-full max-w-6xl max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl ${
							isDark ? "bg-slate-900 border border-white/10" : "bg-white border border-slate-200"
						}`}
						onClick={(e) => e.stopPropagation()}
						onKeyDown={(e) => e.stopPropagation()}
						role="dialog"
						aria-modal="true"
						aria-labelledby="pdf-preview-title"
					>
						<div className={`flex items-center justify-between px-4 sm:px-6 py-3 border-b ${isDark ? "border-white/10" : "border-slate-200"}`}>
							<h3 className={`font-bold text-sm sm:text-base ${isDark ? "text-white" : "text-slate-800"}`}>
								{previewPdf.label}
							</h3>
							<div className="flex items-center gap-2">
								<a
									href={previewPdf.url}
									target="_blank"
									rel="noopener noreferrer"
									className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
										isDark
											? "text-sky-300 hover:bg-sky-400/10"
											: "text-sky-700 hover:bg-sky-50"
									}`}
								>
									Open in Drive
								</a>
								<button
									type="button"
									onClick={() => setPreviewPdf(null)}
									className={`rounded-lg p-1.5 transition-colors ${
										isDark
											? "text-slate-400 hover:text-white hover:bg-white/10"
											: "text-slate-500 hover:text-slate-800 hover:bg-slate-100"
									}`}
									aria-label="Close PDF preview"
								>
									<svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
									</svg>
								</button>
							</div>
						</div>
						<div className="h-[70vh] sm:h-[75vh]">
							<iframe
								src={getGoogleDriveEmbedUrl(previewPdf.url)}
								className="w-full h-full"
								title={previewPdf.label}
								allow="autoplay"
							/>
						</div>
					</div>
				</div>
			)}
		</>
	);
	}

	return (
		<div className={`h-full overflow-y-auto p-4 sm:p-6 wii-u-scrollbar`}>
			<div className="mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
				<div>
					<h2 className={`text-xl sm:text-2xl font-bold ${isDark ? "text-white" : "text-slate-800"}`}>Research</h2>
					<p className={`mt-1 sm:mt-2 max-w-2xl text-sm sm:text-base ${isDark ? "text-slate-400" : "text-slate-500"}`}>
						Open a project to view its full presentation, stack, and experience notes.
					</p>
				</div>
				<div className={`text-sm ${isDark ? "text-slate-500" : "text-slate-400"}`}>{PROJECTS.length} projects</div>
			</div>
			<div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
				{PROJECTS.map((project) => (
					<button
						key={project.id}
						type="button"
						onClick={() => setSelectedProject(project.id)}
						className={`group cursor-pointer rounded-2xl border p-3 sm:p-4 text-left transition-all hover:-translate-y-1 ${
							isDark
								? "bg-slate-900/45 border-white/8 shadow-[0_10px_24px_rgba(0,0,0,0.22)] hover:border-sky-200/20 hover:shadow-[0_16px_30px_rgba(0,0,0,0.3)]"
								: "bg-white/60 border-white shadow-sm hover:shadow-md"
						}`}
					>
						<div className={`relative mb-2 sm:mb-3 h-32 sm:h-40 overflow-hidden rounded-xl ${isDark ? "bg-slate-800" : "bg-slate-200"}`}>
							<Image
								src={project.researchDocs?.thumbnail || `https://picsum.photos/seed/${project.seed}/800/600`}
								alt={project.title}
								fill
								className="object-cover transition-transform duration-500 group-hover:scale-105"
								referrerPolicy="no-referrer"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-transparent to-transparent" />
							<div className="absolute right-2 sm:right-3 bottom-2 sm:bottom-3 rounded-full bg-black/35 px-2 sm:px-3 py-0.5 sm:py-1 text-xs text-white backdrop-blur-sm">
								Open
							</div>
						</div>
						<div className={`text-xs uppercase tracking-[0.18em] ${isDark ? "text-sky-300" : "text-sky-700"}`}>
							{project.kicker}
						</div>
						<h3 className={`mt-1 sm:mt-2 font-bold text-sm sm:text-base ${isDark ? "text-slate-100" : "text-slate-700"}`}>{project.title}</h3>
						<p className={`mt-1 text-xs sm:text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}>{project.summary}</p>
					</button>
				))}
			</div>
		</div>
	);
}
