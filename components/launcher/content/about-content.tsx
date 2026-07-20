import { Link, Sparkles, Trophy } from "pixelarticons/react";
import { motion } from "motion/react";
import type { ThemeMode } from "@/components/launcher/types";

const PROFILE_FACTS = [
	["Name", "Cat Tuong"],
	["Call Me", "Chunli"],
	["Role", "Game Designer and Developer"],
] as const;

const PROFILE_CHIPS = [
	"Brainstorming fun and unusual game ideas",
	"Experimenting across different genres",
	"Designing experiences that feel a little unconventional",
	"Building prototypes and demos",
	"Drawing pixel art",
	"Creating game assets",
] as const;

const SKILL_GROUPS = [
	{
		title: "Game Engine",
		items: ["Unity", "Godot", "Unreal Engine", "RPG Maker", "Twine"],
	},
	{
		title: "Technical Skills",
		items: ["C", "Python", "C#", "GDScript", "Git"],
	},
] as const;

const SOFTWARE_GROUPS = [
	{
		title: "Production Planning",
		items: ["Trello", "Excel", "Miro", "Notion"],
	},
	{
		title: "Game Mockup",
		items: ["Photoshop", "PowerPoint"],
	},
	{
		title: "Game Art",
		items: ["Clip Studio Paint", "Photoshop", "Aseprite", "Procreate"],
	},
] as const;

const FEATURED_LINK = {
	label: "itch.io",
	href: "https://chunlii.itch.io",
	title: "Play Space",
	description:
		"Playable prototypes, experiments, and finished game work that show how the ideas hold up once they are in motion.",
} as const;

type ToolGroup = {
	readonly title: string;
	readonly items: readonly string[];
};

function ToolCategory({
	title,
	groups,
	isDark,
}: {
	title: string;
	groups: readonly ToolGroup[];
	isDark: boolean;
}) {
	return (
		<div
			className={`rounded-[24px] border p-4 ${
				isDark ? "border-white/8 bg-slate-950/40" : "border-[#daf7fc] bg-[#ecfdff]/86"
			}`}
		>
			<h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-slate-800"}`}>
				{title}
			</h3>
			<div className="mt-4 space-y-5">
				{groups.map((group) => (
					<div key={group.title}>
						<div
							className={`text-xs uppercase tracking-[0.16em] ${
								isDark ? "text-slate-500" : "text-sky-700/80"
							}`}
						>
							{group.title}
						</div>
						<ul
							className={`mt-3 flex flex-wrap gap-2 text-sm ${
								isDark ? "text-slate-200" : "text-sky-950/80"
							}`}
						>
							{group.items.map((item) => (
								<li
									key={item}
									className={`rounded-full border px-3 py-1.5 ${
										isDark
											? "border-cyan-300/12 bg-cyan-300/6"
											: "border-cyan-200/70 bg-white/60"
									}`}
								>
									{item}
								</li>
							))}
						</ul>
					</div>
				))}
			</div>
		</div>
	);
}

export function AboutContent({ theme }: { theme: ThemeMode }) {
	const isDark = theme === "dark";

	return (
		<div className="h-full space-y-6 overflow-y-auto p-6 wii-u-scrollbar">
			<motion.section
				initial={{ opacity: 0, y: 18 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.35, ease: "easeOut" }}
				className="launcher-soft-hero"
			>
				<div className="pointer-events-none absolute inset-0 bg-stripes opacity-10" />
				<div className="relative max-w-4xl">
					<div className="launcher-mini-tab">
						<Sparkles className="h-4 w-4" />
						Identity Module
					</div>
					<h2
						className={`mt-4 max-w-3xl text-4xl font-bold leading-[1.08] md:text-6xl ${
							isDark ? "text-white" : "text-slate-800"
						}`}
					>
						About Me
					</h2>
					<p
						className={`mt-5 max-w-3xl text-[1.02rem] leading-8 ${
							isDark ? "text-slate-300" : "text-sky-900/80"
						}`}
					>
						Hi! I&apos;m Cat Tuong, but everyone around me prefers me as Chunli, so I
						would appreciate it if you could call me that. My role is primarily a
						game designer and developer.
					</p>
				</div>
			</motion.section>

			<section className="grid gap-4 xl:grid-cols-[1.04fr_0.96fr]">
				<motion.div
					initial={{ opacity: 0, y: 16 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.3, delay: 0.06 }}
					className={`rounded-[30px] border p-5 md:p-6 ${
						isDark
							? "border-white/8 bg-slate-900/55"
							: "border-[#daf7fc] bg-[linear-gradient(180deg,rgba(232,252,255,0.96),rgba(214,246,251,0.88))] shadow-[0_18px_36px_rgba(67,152,184,0.1)]"
					}`}
				>
					<div
						className={`text-xs uppercase tracking-[0.18em] ${
							isDark ? "text-slate-500" : "text-cyan-700"
						}`}
					>
						I Enjoy
					</div>
					<ul
						className={`mt-4 grid gap-x-5 gap-y-3 rounded-[24px] border p-4 text-sm leading-7 md:grid-cols-2 ${
							isDark
								? "border-white/8 bg-slate-950/35 text-slate-300"
								: "border-[#daf7fc] bg-[#ecfdff]/90 text-sky-900/78"
						}`}
					>
						{PROFILE_CHIPS.map((tag, index) => (
							<li key={tag} className="flex gap-3">
								<span
									className={`mt-2 h-2.5 w-2.5 flex-shrink-0 rounded-full ${
										index % 2 === 0 ? "bg-cyan-400" : "bg-pink-400"
									}`}
								/>
								{tag}
							</li>
						))}
					</ul>

					<a
						href={FEATURED_LINK.href}
						target="_blank"
						rel="noopener noreferrer"
						className={`mt-6 flex items-start justify-between gap-4 rounded-[24px] border p-4 transition-all hover:-translate-y-0.5 ${
							isDark
								? "border-cyan-300/15 bg-slate-950/40 hover:border-cyan-300/30 hover:bg-slate-900/70"
								: "border-[#daf7fc] bg-[#ecfdff]/92 shadow-[0_16px_30px_rgba(67,152,184,0.1)] hover:bg-[#f5feff]"
						}`}
						aria-label="Visit Chunli on itch.io"
					>
						<div>
							<div className={`text-xs uppercase tracking-[0.18em] ${isDark ? "text-slate-500" : "text-cyan-700"}`}>
								{FEATURED_LINK.title}
							</div>
							<div className={`mt-2 flex items-center gap-2 text-lg font-bold ${isDark ? "text-white" : "text-slate-800"}`}>
								<Link className="h-4 w-4" />
								{FEATURED_LINK.label}
							</div>
							<p className={`mt-2 max-w-xl text-sm leading-7 ${isDark ? "text-slate-300" : "text-sky-900/76"}`}>
								{FEATURED_LINK.description}
							</p>
						</div>
					</a>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 16 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.3, delay: 0.12 }}
					className={`rounded-[30px] border p-5 md:p-6 ${
						isDark
							? "border-white/8 bg-slate-900/55"
							: "border-[#daf7fc] bg-[linear-gradient(180deg,rgba(229,252,255,0.96),rgba(208,244,250,0.88))] shadow-[0_18px_36px_rgba(67,152,184,0.1)]"
					}`}
				>
					<div className={`text-xs uppercase tracking-[0.18em] ${isDark ? "text-slate-500" : "text-cyan-700"}`}>
						Profile Card
					</div>
					<div className={`mt-2 text-2xl font-bold ${isDark ? "text-white" : "text-slate-800"}`}>
						Creative Readout
					</div>
					<div className="mt-5 space-y-4">
						{PROFILE_FACTS.map(([label, value]) => (
							<div
								key={label}
								className={`grid gap-2 border-b pb-4 md:grid-cols-[132px_1fr] ${
									isDark ? "border-white/8" : "border-cyan-200/70"
								}`}
							>
								<div className={isDark ? "text-slate-500" : "text-sky-700/75"}>{label}</div>
								<div className={`leading-7 ${isDark ? "text-slate-200" : "text-sky-950/85"}`}>{value}</div>
							</div>
						))}
					</div>
				</motion.div>
			</section>

			<section className="grid gap-4 xl:grid-cols-[0.82fr_1.18fr]">
				<motion.div
					initial={{ opacity: 0, y: 16 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.3, delay: 0.18 }}
					className={`rounded-[28px] border p-5 ${
						isDark
							? "border-white/8 bg-slate-950/40"
							: "border-[#daf7fc] bg-[linear-gradient(180deg,rgba(235,253,255,0.96),rgba(216,247,251,0.88))] shadow-[0_18px_36px_rgba(67,152,184,0.08)]"
					}`}
				>
					<div className={`text-xs uppercase tracking-[0.18em] ${isDark ? "text-slate-500" : "text-cyan-700"}`}>
						Education
					</div>
					<div className={`mt-2 text-2xl font-bold ${isDark ? "text-white" : "text-slate-800"}`}>
						Game Design Degree
					</div>
					<div className={`mt-5 rounded-[24px] border p-4 ${isDark ? "border-amber-300/20 bg-amber-300/5" : "border-[#daf7fc] bg-[#f7feff]"}`}>
						<div className="flex items-start gap-3">
							<div className={`inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl ${isDark ? "bg-amber-300/12 text-amber-200" : "bg-amber-50 text-amber-700"}`}>
								<Trophy className="h-5 w-5" />
							</div>
							<div>
								<div className={`inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] ${isDark ? "bg-amber-300/10 text-amber-200" : "bg-amber-50 text-amber-700"}`}>
									Distinction 2026
								</div>
								<div className={`mt-3 text-sm font-bold ${isDark ? "text-white" : "text-slate-800"}`}>
									Bachelor of Design in Games
								</div>
								<p className={`mt-2 text-sm leading-7 ${isDark ? "text-slate-300" : "text-sky-900/78"}`}>
									Graduated with Distinction in 2026.
								</p>
							</div>
						</div>
					</div>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 16 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.3, delay: 0.24 }}
					className={`rounded-[28px] border p-5 ${
						isDark
							? "border-cyan-200/10 bg-slate-950/45"
							: "border-[#daf7fc] bg-[linear-gradient(180deg,rgba(234,253,255,0.96),rgba(211,245,251,0.88))] shadow-[0_18px_36px_rgba(67,152,184,0.08)]"
					}`}
				>
					<div className={`text-xs uppercase tracking-[0.18em] ${isDark ? "text-slate-500" : "text-cyan-700"}`}>
						Tools
					</div>
					<div className="mt-5 grid gap-4 md:grid-cols-2">
						<ToolCategory title="Skill" groups={SKILL_GROUPS} isDark={isDark} />
						<ToolCategory title="Software" groups={SOFTWARE_GROUPS} isDark={isDark} />
					</div>
				</motion.div>
			</section>
		</div>
	);
}
