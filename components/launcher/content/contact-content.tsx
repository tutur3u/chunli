import { ArrowRight, Mail } from "pixelarticons/react";
import { motion } from "motion/react";
import type { ThemeMode } from "@/components/launcher/types";

export function ContactContent({ theme }: { theme: ThemeMode }) {
	const isDark = theme === "dark";

	return (
		<div className="flex h-full items-center justify-center overflow-y-auto p-6 wii-u-scrollbar">
			<motion.div
				initial={{ opacity: 0, y: 14 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.32, ease: "easeOut" }}
				className={`w-full max-w-4xl rounded-[30px] border p-5 md:p-8 ${
					isDark
						? "border-cyan-300/15 bg-[linear-gradient(180deg,rgba(8,47,73,0.22),rgba(2,6,23,0.45))]"
						: "border-[#daf7fc] bg-[linear-gradient(180deg,rgba(235,252,255,0.98),rgba(220,246,251,0.92))] shadow-[0_18px_34px_rgba(67,152,184,0.1)]"
				}`}
			>
				<div className={`text-xs uppercase tracking-[0.18em] ${isDark ? "text-slate-500" : "text-cyan-700"}`}>
					Send To
				</div>
				<a
					href="mailto:hi@chunli.space"
					className={`mt-3 block break-all text-[1.65rem] font-bold leading-tight underline underline-offset-4 md:text-[2rem] ${
						isDark ? "text-white" : "text-slate-800"
					}`}
				>
					hi@chunli.space
				</a>
				<p className={`mt-5 text-sm leading-7 md:text-base ${isDark ? "text-slate-300" : "text-sky-900/76"}`}>
					Contact me through email
				</p>
				<a
					href="mailto:hi@chunli.space"
					className="wii-u-primary-button mt-6 inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 font-bold text-white transition-transform hover:scale-[1.01]"
				>
					<Mail className="h-4 w-4" />
					Email hi@chunli.space
					<ArrowRight className="h-4 w-4" />
				</a>
			</motion.div>
		</div>
	);
}
