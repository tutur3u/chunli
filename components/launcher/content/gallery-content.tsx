"use client";

import { Cancel, Expand } from "pixelarticons/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { ThemeMode } from "@/components/launcher/types";

// Global flag to track if escape was handled by a modal (shared with games-content)
declare global {
  var escapeHandledByModal: boolean;
}

// All images from public/media/portfolio folder
const PORTFOLIO_IMAGES = [
	"/media/portfolio/games/atelier/thumbnail.png",
	"/media/portfolio/games/aa-sequel/gameplay/1.png",
	"/media/portfolio/games/aa-sequel/gameplay/2.png",
	"/media/portfolio/games/aa-sequel/gameplay/3.png",
	"/media/portfolio/games/aa-sequel/gameplay/4.png",
	"/media/portfolio/games/aa-sequel/gameplay/5.png",
	"/media/portfolio/games/aa-sequel/gameplay/6.png",
	"/media/portfolio/games/aa-sequel/gameplay/7.png",
	"/media/portfolio/games/aa-sequel/gameplay/8.png",
	"/media/portfolio/games/aa-sequel/gameplay/9.png",
	"/media/portfolio/games/remedy/gameplay/1.png",
	"/media/portfolio/games/remedy/gameplay/2.png",
	"/media/portfolio/games/remedy/gameplay/3.png",
	"/media/portfolio/games/remedy/gameplay/4.png",
	"/media/portfolio/games/remedy/gameplay/5.png",
	"/media/portfolio/games/remedy/gameplay/6.png",
	"/media/portfolio/games/remedy/gameplay/7.png",
	"/media/portfolio/games/wok/gameplay/1.png",
	"/media/portfolio/games/wok/gameplay/2.png",
	"/media/portfolio/games/wok/gameplay/3.png",
	"/media/portfolio/games/wok/gameplay/4.png",
	"/media/portfolio/games/xavier/gameplay/1.png",
	"/media/portfolio/games/xavier/gameplay/2.jpg",
	"/media/portfolio/games/xavier/gameplay/3.jpg",
	"/media/portfolio/games/xavier/gameplay/4.jpg",
	"/media/portfolio/games/xavier/gameplay/5.jpg",
	"/media/portfolio/games/xavier/gameplay/6.jpg",
	"/media/portfolio/games/xavier/gameplay/7.jpg",
	"/media/portfolio/games/asphyxiated/behind-the-scenes/1.png",
	"/media/portfolio/games/asphyxiated/behind-the-scenes/2.png",
	"/media/portfolio/games/asphyxiated/gameplay/1.png",
	"/media/portfolio/games/asphyxiated/gameplay/2.png",
	"/media/portfolio/games/asphyxiated/gameplay/3.png",
	"/media/portfolio/games/asphyxiated/gameplay/4.png",
	"/media/portfolio/games/asphyxiated/gameplay/5.png",
	"/media/portfolio/games/asphyxiated/gameplay/6.png",
	"/media/portfolio/games/magi/gameplay/1.png",
	"/media/portfolio/games/magi/gameplay/2.png",
	"/media/portfolio/games/magi/gameplay/3.png",
	"/media/portfolio/games/magi/gameplay/4.png",
	"/media/portfolio/games/magi/gameplay/5.png",
	"/media/portfolio/games/magi/gameplay/6.png",
	"/media/portfolio/games/magi/gameplay/7.png",
	"/media/portfolio/games/magi/gameplay/8.png",
	"/media/portfolio/games/magi/gameplay/9.png",
	"/media/portfolio/games/magi/gameplay/10.png",
	"/media/portfolio/games/magi/gameplay/11.png",
	"/media/portfolio/games/magi/gameplay/12.png",
	"/media/portfolio/games/mario/gameplay/1.png",
	"/media/portfolio/games/mario/gameplay/2.png",
	"/media/portfolio/games/mario/gameplay/3.png",
	"/media/portfolio/games/mario/gameplay/4.png",
];

type GalleryContentProps = {
	theme: ThemeMode;
	selectedArtwork: string | null;
	setSelectedArtwork: (value: string | null) => void;
};

export function GalleryContent({ theme, setSelectedArtwork }: GalleryContentProps) {
	const isDark = theme === "dark";
	const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

	// Handle Escape key to close fullscreen view
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape" && selectedIndex !== null) {
				// Mark that modal handled this escape
				globalThis.escapeHandledByModal = true;
				setSelectedIndex(null);
				setSelectedArtwork(null);
				// Reset flag after other handlers have had a chance to check it
				setTimeout(() => {
					globalThis.escapeHandledByModal = false;
				}, 50);
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [selectedIndex, setSelectedArtwork]);

	const openLightbox = (index: number) => {
		setSelectedIndex(index);
		setSelectedArtwork(String(index));
	};

	const closeLightbox = () => {
		setSelectedIndex(null);
		setSelectedArtwork(null);
	};

	const goNext = () => {
		if (selectedIndex !== null) {
			setSelectedIndex((selectedIndex + 1) % PORTFOLIO_IMAGES.length);
		}
	};

	const goPrev = () => {
		if (selectedIndex !== null) {
			setSelectedIndex((selectedIndex - 1 + PORTFOLIO_IMAGES.length) % PORTFOLIO_IMAGES.length);
		}
	};

	// Handle arrow keys for navigation
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (selectedIndex === null) return;
			if (e.key === "ArrowRight") {
				setSelectedIndex((selectedIndex + 1) % PORTFOLIO_IMAGES.length);
			}
			if (e.key === "ArrowLeft") {
				setSelectedIndex((selectedIndex - 1 + PORTFOLIO_IMAGES.length) % PORTFOLIO_IMAGES.length);
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [selectedIndex]);

	const currentImage = selectedIndex !== null ? PORTFOLIO_IMAGES[selectedIndex] : null;

	return (
		<div className="h-full overflow-y-auto p-6 wii-u-scrollbar">
			<h2 className={`mb-6 text-2xl font-bold ${isDark ? "text-white" : "text-slate-800"}`}>Art Gallery</h2>
			<div className="columns-2 space-y-4 gap-4 md:columns-3">
				{PORTFOLIO_IMAGES.map((src, index) => (
					<button
						key={src}
						type="button"
						onClick={() => openLightbox(index)}
						onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(index); } }}
						className={`group relative block w-full cursor-pointer break-inside-avoid overflow-hidden rounded-xl border-4 shadow-sm transition-shadow hover:shadow-lg ${
							isDark ? "bg-slate-900/50 border-slate-700" : "bg-white border-white"
						}`}
					>
						<Image
							src={src}
							alt={`Portfolio image ${index + 1}`}
							width={400}
							height={300}
							className="h-auto w-full object-cover"
						/>
						<div className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-black/55 to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
							<span className="text-sm font-medium text-white">View</span>
							<span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm">
								<Expand className="h-4 w-4" />
							</span>
						</div>
					</button>
				))}
			</div>

			{currentImage && (
				<div
					className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/88 p-6 backdrop-blur-xl"
					data-lightbox-open="true"
				>
					<button
						type="button"
						className="absolute inset-0 cursor-default"
						onClick={closeLightbox}
						aria-label="Close lightbox by clicking background"
					/>
					<div className="relative w-full max-w-6xl pointer-events-auto">
					<button
						type="button"
						onClick={closeLightbox}
						className="absolute -top-12 right-0 z-10 inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm transition-colors hover:bg-black/55"
						aria-label="Close"
					>
						<Cancel className="h-5 w-5" />
					</button>
					<button
						type="button"
						onClick={(e) => { e.stopPropagation(); goPrev(); }}
						className="absolute left-4 top-1/2 -translate-y-1/2 z-10 inline-flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm transition-colors hover:bg-black/55"
						aria-label="Previous image"
					>
						<svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-label="Previous">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
						</svg>
					</button>
					<button
						type="button"
						onClick={(e) => { e.stopPropagation(); goNext(); }}
						className="absolute right-4 top-1/2 -translate-y-1/2 z-10 inline-flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm transition-colors hover:bg-black/55"
						aria-label="Next image"
					>
						<svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-label="Next">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
						</svg>
					</button>
						<div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-slate-950/85 p-3 shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
							<div className="relative h-[72vh] overflow-hidden rounded-[22px]">
								<Image
									src={currentImage}
									alt={`Portfolio image ${selectedIndex! + 1}`}
									fill
									className="object-contain"
								/>
							</div>
							<div className="flex items-center justify-between px-3 pt-4 text-white">
								<div>
									<div className="text-lg font-bold">{selectedIndex! + 1} / {PORTFOLIO_IMAGES.length}</div>
									<div className="text-sm text-slate-400">Use arrow keys to navigate</div>
								</div>
								<div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
									Press ESC to close
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
