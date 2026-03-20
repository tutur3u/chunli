import { Gamepad2, Sparkles, Trophy, Zap } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { GAME_PREVIEWS } from "@/components/launcher/content-data";
import type { ThemeMode } from "@/components/launcher/types";

export function GamesContent({ theme }: { theme: ThemeMode }) {
	const isDark = theme === "dark";
	const [selectedGameId, setSelectedGameId] = useState<string>(GAME_PREVIEWS[0].id);
	const activeGame =
		GAME_PREVIEWS.find((game) => game.id === selectedGameId) ?? GAME_PREVIEWS[0];

	return (
		<div className="h-full overflow-y-auto p-6 wii-u-scrollbar">
			<div
				className={`relative overflow-hidden rounded-[30px] border p-6 ${
					isDark
						? "border-sky-200/10 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.16),transparent_24%),linear-gradient(180deg,rgba(10,20,31,0.95),rgba(7,15,24,0.98))]"
						: "border-white/85 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.12),transparent_20%),linear-gradient(180deg,rgba(255,255,255,0.92),rgba(236,246,255,0.78))]"
				}`}
			>
				<div className="pointer-events-none absolute inset-0 bg-stripes opacity-10" />
				<div className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
					<div>
						<div
							className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-bold uppercase tracking-[0.18em] ${
								isDark
									? "bg-sky-400/10 text-sky-200 border border-sky-200/10"
									: "bg-sky-100/80 text-sky-700 border border-white/80"
							}`}
						>
							<Gamepad2 className="h-4 w-4" />
							Game Center
						</div>
						<h2 className={`mt-4 text-3xl font-bold ${isDark ? "text-white" : "text-slate-800"}`}>
							Playable Ideas, Parked Here
						</h2>
						<p className={`mt-3 max-w-2xl ${isDark ? "text-slate-400" : "text-slate-500"}`}>
							The games tab is now a staged placeholder hub: concept cards, status signals, and a preview desk for ideas that are still in production.
						</p>
					</div>

					<div className="grid grid-cols-3 gap-3">
						{[
							{ label: "Concepts", value: "03", icon: <Sparkles className="h-4 w-4" /> },
							{ label: "Badges", value: "12", icon: <Trophy className="h-4 w-4" /> },
							{ label: "Power", value: "89%", icon: <Zap className="h-4 w-4" /> },
						].map((item) => (
							<div
								key={item.label}
								className={`rounded-2xl border px-4 py-3 ${
									isDark ? "border-white/8 bg-slate-950/35 text-slate-200" : "border-white/80 bg-white/70 text-slate-700"
								}`}
							>
								<div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] opacity-70">
									{item.icon}
									{item.label}
								</div>
								<div className="mt-2 text-xl font-bold">{item.value}</div>
							</div>
						))}
					</div>
				</div>
			</div>

			<div className="mt-6 grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
				<div className="grid gap-4">
					{GAME_PREVIEWS.map((game, index) => {
						const isSelected = game.id === activeGame.id;

						return (
							<motion.button
								key={game.id}
								type="button"
								onClick={() => setSelectedGameId(game.id)}
								initial={{ opacity: 0, y: 16 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: index * 0.06, duration: 0.28 }}
								className={`group relative cursor-pointer overflow-hidden rounded-[28px] border p-4 text-left transition-all ${
									isSelected
										? isDark
											? "border-sky-300/25 bg-slate-900/80 shadow-[0_18px_36px_rgba(0,0,0,0.28)]"
											: "border-sky-200 bg-white/80 shadow-[0_14px_30px_rgba(133,178,211,0.18)]"
										: isDark
											? "border-white/8 bg-slate-900/55 hover:border-sky-200/15 hover:bg-slate-900/72"
											: "border-white/80 bg-white/58 hover:bg-white/74"
								}`}
								whileHover={{ y: -3 }}
								whileTap={{ scale: 0.99 }}
							>
								<div className="grid gap-4 md:grid-cols-[220px_1fr]">
									<div className="relative h-40 overflow-hidden rounded-[22px]">
										<Image
											src={`https://picsum.photos/seed/${game.seed}/700/520`}
											alt={game.title}
											fill
											className="object-cover transition-transform duration-500 group-hover:scale-105"
											referrerPolicy="no-referrer"
										/>
										<div
											className={`absolute inset-0 bg-gradient-to-t ${isDark ? "from-slate-950/80 via-slate-950/20 to-transparent" : "from-slate-900/45 via-transparent to-transparent"}`}
										/>
										<div className="absolute right-3 bottom-3">
											<span className={`rounded-full bg-gradient-to-r ${game.accent} px-3 py-1 text-xs font-bold text-white shadow-lg`}>
												{game.state}
											</span>
										</div>
									</div>
									<div className="flex flex-col justify-between">
										<div>
											<div className={`text-xs uppercase tracking-[0.18em] ${isDark ? "text-sky-300" : "text-sky-700"}`}>{game.tagline}</div>
											<h3 className={`mt-2 text-2xl font-bold ${isDark ? "text-white" : "text-slate-800"}`}>{game.title}</h3>
											<p className={`mt-3 ${isDark ? "text-slate-400" : "text-slate-500"}`}>{game.description}</p>
										</div>
										<div className="mt-4 flex flex-wrap gap-2">
											{game.features.map((feature) => (
												<span
													key={feature}
													className={`rounded-full px-3 py-1 text-sm ${
														isDark
															? "bg-slate-950/55 text-slate-300 border border-white/8"
															: "bg-slate-100/80 text-slate-600 border border-white/70"
													}`}
												>
													{feature}
												</span>
											))}
										</div>
									</div>
								</div>
							</motion.button>
						);
					})}
				</div>

				<div
					className={`relative overflow-hidden rounded-[30px] border p-5 ${
						isDark
							? "border-sky-200/10 bg-[linear-gradient(180deg,rgba(13,25,38,0.98),rgba(8,17,28,0.98))]"
							: "border-white/85 bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(238,247,255,0.82))]"
					}`}
				>
					<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.18),transparent_30%)]" />
					<div className="relative">
						<div className="flex items-center justify-between">
							<div>
								<div className={`text-xs uppercase tracking-[0.18em] ${isDark ? "text-slate-500" : "text-slate-400"}`}>Preview Deck</div>
								<div className={`mt-2 text-2xl font-bold ${isDark ? "text-white" : "text-slate-800"}`}>{activeGame.title}</div>
							</div>
							<div className={`rounded-full px-3 py-1 text-sm font-bold bg-gradient-to-r ${activeGame.accent} text-white`}>
								{activeGame.state}
							</div>
						</div>

						<div className="mt-6 flex items-center justify-center">
							<motion.div
								className="relative flex h-48 w-48 items-center justify-center"
								animate={{ rotate: 360 }}
								transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
							>
								<div className={`absolute inset-3 rounded-full border ${isDark ? "border-sky-200/10" : "border-sky-200/40"}`} />
								<div className={`absolute inset-10 rounded-full border ${isDark ? "border-white/8" : "border-white/70"}`} />
								<div className={`absolute h-26 w-26 rounded-full bg-gradient-to-br ${activeGame.accent} blur-xl opacity-35`} />
								<div
									className={`relative flex h-24 w-24 items-center justify-center rounded-full border ${
										isDark ? "border-sky-200/15 bg-slate-950/80" : "border-white/90 bg-white/80"
									}`}
								>
									<Gamepad2 className="h-10 w-10 text-sky-400" />
								</div>
							</motion.div>
						</div>

						<div className="mt-5 grid gap-3">
							{[
								["Build phase", activeGame.state],
								["Mood", "Playable concept energy"],
								["Focus", "HUD, feedback, reward loops"],
							].map(([label, value]) => (
								<div
									key={label}
									className={`flex items-center justify-between rounded-2xl border px-4 py-3 ${
										isDark ? "border-white/8 bg-slate-950/35 text-slate-300" : "border-white/80 bg-white/65 text-slate-600"
									}`}
								>
									<span className={`text-sm uppercase tracking-[0.14em] ${isDark ? "text-slate-500" : "text-slate-400"}`}>{label}</span>
									<span className={`font-bold ${isDark ? "text-slate-100" : "text-slate-800"}`}>{value}</span>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
