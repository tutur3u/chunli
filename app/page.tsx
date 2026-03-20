"use client";

import {
	Briefcase,
	Gamepad2,
	Github,
	Image as ImageIcon,
	Mail,
	MessageSquare,
	Music,
	Settings,
	Star,
	Twitter,
	User,
	X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useEffect, useState, useSyncExternalStore } from "react";

type AppData = {
	id: string;
	title: string;
	icon: React.ReactNode;
	color: string;
};

type SettingsContentProps = {
	loadingScreensEnabled: boolean;
	onToggleLoadingScreens: () => void;
};

const LOADING_PREF_KEY = "junly-loading-screens";

const AboutContent = () => (
	<div className="p-6 space-y-6 text-slate-700 wii-u-scrollbar overflow-y-auto h-full">
		<div className="flex items-center gap-6">
			<div className="w-24 h-24 rounded-full bg-blue-100 border-4 border-white shadow-md overflow-hidden relative flex-shrink-0">
				<Image
					src="https://picsum.photos/seed/junly/200/200"
					alt="Junly"
					fill
					className="object-cover"
					referrerPolicy="no-referrer"
				/>
			</div>
			<div>
				<h2 className="text-3xl font-bold text-slate-800">
					Hi, I&apos;m Junly!
				</h2>
				<p className="text-lg text-slate-500">Digital Creator & Developer</p>
			</div>
		</div>

		<div className="bg-white/50 p-4 rounded-xl border border-white/60 shadow-inner">
			<p className="leading-relaxed">
				Welcome to my digital space. Here, we shall journey together through
				thoughts and ideas, blending the digital with the organic. I invite you
				to delve into the ways our worlds intertwine.
			</p>
			<p className="mt-4 leading-relaxed">
				Though my form is virtual, I hope this can touch your physical being and
				bridge the gap between microchip and flesh. Feel free to take something
				with you when you leave, something to upgrade your digital soul.
			</p>
		</div>

		<div className="grid grid-cols-2 gap-4">
			<div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
				<h3 className="font-bold mb-2 text-blue-800">Stats</h3>
				<ul className="space-y-1 text-sm">
					<li>Level: 24</li>
					<li>Class: Web Weaver</li>
					<li>Element: Pixel</li>
				</ul>
			</div>
			<div className="bg-pink-50/50 p-4 rounded-xl border border-pink-100">
				<h3 className="font-bold mb-2 text-pink-800">Current Mood</h3>
				<div className="flex items-center gap-2">
					<Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
					<span>Creative & Energetic</span>
				</div>
			</div>
		</div>
	</div>
);

const ProjectsContent = () => (
	<div className="p-6 h-full wii-u-scrollbar overflow-y-auto">
		<h2 className="text-2xl font-bold text-slate-800 mb-6">My Projects</h2>
		<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
			{[1, 2, 3, 4].map((i) => (
				<div
					key={i}
					className="bg-white/60 p-4 rounded-xl border border-white shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
				>
					<div className="w-full h-32 bg-slate-200 rounded-lg mb-3 overflow-hidden relative">
						<Image
							src={`https://picsum.photos/seed/project${i}/400/300`}
							alt={`Project ${i}`}
							fill
							className="object-cover group-hover:scale-105 transition-transform duration-500"
							referrerPolicy="no-referrer"
						/>
					</div>
					<h3 className="font-bold text-slate-700">Project Title {i}</h3>
					<p className="text-sm text-slate-500 mt-1">
						A brief description of this amazing project and what it does.
					</p>
				</div>
			))}
		</div>
	</div>
);

const GalleryContent = () => (
	<div className="p-6 h-full wii-u-scrollbar overflow-y-auto">
		<h2 className="text-2xl font-bold text-slate-800 mb-6">Art Gallery</h2>
		<div className="columns-2 md:columns-3 gap-4 space-y-4">
			{[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
				<div
					key={i}
					className="break-inside-avoid rounded-xl overflow-hidden border-4 border-white shadow-sm hover:shadow-lg transition-shadow bg-white relative group"
				>
					<Image
						src={`https://picsum.photos/seed/art${i}/400/${300 + (i % 3) * 100}`}
						alt={`Artwork ${i}`}
						width={400}
						height={300 + (i % 3) * 100}
						className="w-full h-auto object-cover"
						referrerPolicy="no-referrer"
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
						<span className="text-white font-medium text-sm">Artwork {i}</span>
					</div>
				</div>
			))}
		</div>
	</div>
);

const BlogContent = () => (
	<div className="p-6 h-full wii-u-scrollbar overflow-y-auto bg-[#f0f8ff]">
		<div className="flex items-center justify-between mb-6">
			<h2 className="text-2xl font-bold text-green-700">Miiverse</h2>
			<button
				type="button"
				className="wii-u-round-button text-green-700 px-4 py-2 rounded-full font-bold border border-white/80 hover:-translate-y-0.5 transition-all"
			>
				+ Post
			</button>
		</div>
		<div className="space-y-4">
			{[1, 2, 3, 4].map((i) => (
				<div
					key={i}
					className="bg-white p-4 rounded-2xl border-2 border-green-200 shadow-sm"
				>
					<div className="flex items-center gap-3 mb-3">
						<div className="w-10 h-10 bg-green-100 rounded-full border-2 border-white shadow-sm overflow-hidden relative">
							<Image
								src={`https://picsum.photos/seed/user${i}/100/100`}
								alt="User"
								fill
								className="object-cover"
								referrerPolicy="no-referrer"
							/>
						</div>
						<div>
							<div className="font-bold text-slate-700 text-sm">User_{i}</div>
							<div className="text-xs text-slate-400">2 hours ago</div>
						</div>
					</div>
					<div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-slate-600 font-medium">
						{i === 1 &&
							"Just finished working on a new web project! The Wii U aesthetic is so nostalgic. ^^"}
						{i === 2 &&
							"Does anyone remember the old Miiverse? I miss drawing on the GamePad."}
						{i === 3 &&
							"Listening to the Wii Shop Channel music while coding. Peak productivity."}
						{i === 4 &&
							"Hello world! Welcome to my digital space. Make yourself at home."}
					</div>
					<div className="flex items-center gap-4 mt-3 pt-3 border-t border-slate-100">
						<button
							type="button"
							className="flex items-center gap-1 text-slate-400 hover:text-green-500 transition-colors text-sm font-bold"
						>
							<Star className="w-4 h-4" /> Yeah!
						</button>
						<button
							type="button"
							className="flex items-center gap-1 text-slate-400 hover:text-blue-500 transition-colors text-sm font-bold"
						>
							<MessageSquare className="w-4 h-4" /> Comment
						</button>
					</div>
				</div>
			))}
		</div>
	</div>
);

const ContactContent = () => (
	<div className="p-6 h-full wii-u-scrollbar overflow-y-auto flex flex-col items-center justify-center text-center">
		<div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-6 shadow-inner border-4 border-white">
			<Mail className="w-10 h-10 text-blue-500" />
		</div>
		<h2 className="text-2xl font-bold text-slate-800 mb-2">
			Let&apos;s Connect!
		</h2>
		<p className="text-slate-500 mb-8 max-w-md">
			Have a question, a project idea, or just want to say hi? Drop me a
			message!
		</p>

		<div className="flex gap-4 mb-8">
			<a
				href="#"
				className="wii-u-round-button w-12 h-12 rounded-full flex items-center justify-center hover:shadow-md hover:-translate-y-1 transition-all text-slate-600 hover:text-blue-500 border border-white/80"
			>
				<Twitter className="w-5 h-5" />
			</a>
			<a
				href="#"
				className="wii-u-round-button w-12 h-12 rounded-full flex items-center justify-center hover:shadow-md hover:-translate-y-1 transition-all text-slate-600 hover:text-slate-900 border border-white/80"
			>
				<Github className="w-5 h-5" />
			</a>
			<a
				href="#"
				className="wii-u-round-button w-12 h-12 rounded-full flex items-center justify-center hover:shadow-md hover:-translate-y-1 transition-all text-slate-600 hover:text-pink-500 border border-white/80"
			>
				<MessageSquare className="w-5 h-5" />
			</a>
		</div>

		<div className="w-full max-w-md bg-white/50 p-6 rounded-2xl border border-white/60 shadow-sm text-left">
			<div className="space-y-4">
				<div>
					<label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
						Name
					</label>
					<input
						type="text"
						className="wii-u-field w-full border border-slate-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-shadow"
						placeholder="Guest"
					/>
				</div>
				<div>
					<label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
						Message
					</label>
					<textarea
						className="wii-u-field w-full border border-slate-200 rounded-lg px-4 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-300 transition-shadow"
						placeholder="Hello!"
					></textarea>
				</div>
				<button className="wii-u-primary-button w-full text-white font-bold py-2 rounded-lg transition-all">
					Send Message
				</button>
			</div>
		</div>
	</div>
);

const SettingsContent = ({
	loadingScreensEnabled,
	onToggleLoadingScreens,
}: SettingsContentProps) => (
	<div className="p-6 h-full wii-u-scrollbar overflow-y-auto text-slate-700">
		<div className="flex items-center justify-between gap-6 mb-6">
			<div>
				<h2 className="text-2xl font-bold text-slate-800">System Settings</h2>
				<p className="text-slate-500 mt-1">
					Adjust the launcher behavior and compare both interaction modes.
				</p>
			</div>
			<div className="w-14 h-14 rounded-full bg-slate-100 border-4 border-white shadow-md flex items-center justify-center">
				<Settings className="w-7 h-7 text-slate-500" />
			</div>
		</div>

		<div className="space-y-4">
			<div className="wii-u-soft-panel rounded-2xl border border-white/70 p-5">
				<div className="flex items-start justify-between gap-4">
					<div>
						<h3 className="text-slate-800 font-bold">Loading screens</h3>
						<p className="text-slate-500 mt-2 max-w-xl">
							Show a short launch animation before opening each app window.
							Disable this to open tabs instantly.
						</p>
					</div>

					<button
						type="button"
						onClick={onToggleLoadingScreens}
						aria-pressed={loadingScreensEnabled}
						className={`relative inline-flex h-12 w-24 items-center rounded-full border transition-all ${
							loadingScreensEnabled
								? "bg-gradient-to-b from-sky-300 to-sky-400 border-sky-200 shadow-[0_10px_18px_rgba(96,165,250,0.22),inset_0_1px_0_rgba(255,255,255,0.65)]"
								: "bg-white/80 border-white/80 shadow-[0_8px_14px_rgba(130,169,196,0.14),inset_0_1px_0_rgba(255,255,255,0.9)]"
						}`}
					>
						<span
							className={`absolute h-9 w-9 rounded-full bg-white shadow-[0_8px_12px_rgba(112,150,179,0.24),inset_0_1px_0_rgba(255,255,255,0.95)] transition-all ${
								loadingScreensEnabled
									? "translate-x-[2.85rem]"
									: "translate-x-1"
							}`}
						/>
						<span className="sr-only">Toggle loading screens</span>
					</button>
				</div>
			</div>

			<div className="grid gap-4 md:grid-cols-2">
				<div className="wii-u-soft-panel rounded-2xl border border-white/70 p-5">
					<div className="text-sm uppercase tracking-[0.18em] text-slate-400 font-bold">
						Current mode
					</div>
					<div className="text-slate-800 text-2xl font-bold mt-3">
						{loadingScreensEnabled ? "Cinematic launch" : "Instant launch"}
					</div>
					<p className="text-slate-500 mt-3">
						{loadingScreensEnabled
							? "Apps open with a Wii U-style startup moment."
							: "Apps open immediately after clicking an icon."}
					</p>
				</div>

				<div className="wii-u-soft-panel rounded-2xl border border-white/70 p-5">
					<div className="text-sm uppercase tracking-[0.18em] text-slate-400 font-bold">
						Why it matters
					</div>
					<ul className="mt-3 space-y-2 text-slate-500">
						<li>Loading on: more playful and presentational.</li>
						<li>Loading off: faster for exploration and repeat opens.</li>
						<li>The setting is saved locally for the next visit.</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
);

const apps: AppData[] = [
	{
		id: "about",
		title: "Mii Maker",
		icon: <User className="w-12 h-12 text-green-500" />,
		color: "bg-green-100",
	},
	{
		id: "projects",
		title: "Projects",
		icon: <Briefcase className="w-12 h-12 text-blue-500" />,
		color: "bg-blue-100",
	},
	{
		id: "gallery",
		title: "Gallery",
		icon: <ImageIcon className="w-12 h-12 text-yellow-500" />,
		color: "bg-yellow-100",
	},
	{
		id: "blog",
		title: "Miiverse",
		icon: <MessageSquare className="w-12 h-12 text-green-600" />,
		color: "bg-green-50",
	},
	{
		id: "music",
		title: "Music",
		icon: <Music className="w-12 h-12 text-pink-500" />,
		color: "bg-pink-100",
	},
	{
		id: "games",
		title: "Games",
		icon: <Gamepad2 className="w-12 h-12 text-purple-500" />,
		color: "bg-purple-100",
	},
	{
		id: "contact",
		title: "Friends",
		icon: <Mail className="w-12 h-12 text-orange-500" />,
		color: "bg-orange-100",
	},
	{
		id: "settings",
		title: "Settings",
		icon: <Settings className="w-12 h-12 text-slate-500" />,
		color: "bg-slate-200",
	},
];

export default function Home() {
	const [activeApp, setActiveApp] = useState<string | null>(null);
	const [loadingApp, setLoadingApp] = useState<string | null>(null);
	const [isBooting, setIsBooting] = useState(true);
	const [currentTime, setCurrentTime] = useState<string>("");
	const hasMounted = useSyncExternalStore(
		() => () => {},
		() => true,
		() => false,
	);
	const [loadingScreensEnabled, setLoadingScreensEnabled] = useState(() => {
		if (typeof window === "undefined") {
			return true;
		}

		return window.localStorage.getItem(LOADING_PREF_KEY) !== "false";
	});

	useEffect(() => {
		const updateTime = () => {
			const now = new Date();
			setCurrentTime(
				now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
			);
		};
		updateTime();
		const interval = setInterval(updateTime, 1000);
		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		if (!hasMounted) {
			return;
		}

		const timeout = window.setTimeout(() => {
			setIsBooting(false);
		}, 1500);

		return () => window.clearTimeout(timeout);
	}, [hasMounted]);

	useEffect(() => {
		window.localStorage.setItem(
			LOADING_PREF_KEY,
			String(loadingScreensEnabled),
		);
	}, [loadingScreensEnabled]);

	useEffect(() => {
		if (!activeApp || !loadingApp || !loadingScreensEnabled) {
			return;
		}

		const timeout = window.setTimeout(() => {
			setLoadingApp(null);
		}, 950);

		return () => window.clearTimeout(timeout);
	}, [activeApp, loadingApp, loadingScreensEnabled]);

	const activeAppData = apps.find((a) => a.id === activeApp);
	const isLoading = Boolean(activeApp && loadingApp === activeApp);

	const openApp = (id: string) => {
		setActiveApp(id);
		setLoadingApp(loadingScreensEnabled ? id : null);
	};

	const closeApp = () => {
		setActiveApp(null);
		setLoadingApp(null);
	};

	const toggleLoadingScreens = () => {
		setLoadingScreensEnabled((current) => {
			const next = !current;
			if (!next) {
				setLoadingApp(null);
			}
			return next;
		});
	};

	return (
		<main className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-[#e0f2fe] via-[#bae6fd] to-[#e0f2fe]">
			<div className="absolute inset-0 bg-stripes opacity-30 pointer-events-none"></div>

			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				{[...Array(15)].map((_, i) => {
					const size = ((i * 17) % 40) + 10;
					const left = (i * 23) % 100;
					const top = (i * 31) % 100;
					const duration = ((i * 13) % 10) + 10;
					const xOffset = ((i * 7) % 50) - 25;

					return (
						<motion.div
							key={i}
							className="absolute bg-white/40 rounded-full blur-sm"
							style={{
								width: size,
								height: size,
								left: `${left}%`,
								top: `${top}%`,
							}}
							animate={{
								y: [0, -100, 0],
								x: [0, xOffset, 0],
								opacity: [0.2, 0.6, 0.2],
							}}
							transition={{
								duration,
								repeat: Infinity,
								ease: "easeInOut",
							}}
						/>
					);
				})}
			</div>

			<header className="wii-u-topbar absolute top-0 left-0 right-0 h-16 flex items-center justify-between px-6 z-10">
				<div className="flex items-center gap-3">
					<div className="wii-u-user-badge w-11 h-11 rounded-full flex items-center justify-center border border-white/90">
						<User className="w-5 h-5 text-slate-400" />
					</div>
					<span className="font-bold text-slate-600 tracking-wide text-[1.05rem]">
						Junly
					</span>
				</div>
				<div className="font-bold text-slate-500 tracking-wider text-[1.05rem]">
					{currentTime}
				</div>
			</header>

			<div className="absolute inset-0 pt-24 pb-24 px-8 md:px-20 flex items-center justify-center">
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-10 gap-y-8 md:gap-x-18 md:gap-y-8 max-w-6xl w-full place-items-center">
					{apps.map((app, index) => (
						<motion.div
							key={app.id}
							initial={{ opacity: 0, scale: 0.8, y: 20 }}
							animate={{ opacity: 1, scale: 1, y: 0 }}
							transition={{
								delay: index * 0.05,
								type: "spring",
								stiffness: 200,
								damping: 15,
							}}
							className="flex flex-col items-center gap-3 cursor-pointer"
						>
							<button
								type="button"
								onClick={() => openApp(app.id)}
								className="wii-u-icon w-28 h-28 sm:w-40 sm:h-40 flex items-center justify-center group relative cursor-pointer"
							>
								<motion.div
									className="transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-rotate-2 group-active:scale-95"
								>
									{app.icon}
								</motion.div>

								<div className="absolute -bottom-12 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-slate-700 shadow-md border border-white/50 pointer-events-none whitespace-nowrap z-20">
									{app.title}
								</div>
							</button>
						</motion.div>
					))}
				</div>
			</div>

			<div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/25 to-transparent flex items-center justify-center gap-8 z-10">
				<div className="wii-u-status-pill flex items-center gap-2 text-slate-500 text-sm font-medium px-5 py-2 rounded-full backdrop-blur-sm border border-white/70">
					<span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
					System Online
				</div>
				<div className="text-slate-400 text-xs">v1.0.0</div>
			</div>

			<div className="absolute bottom-6 left-6 z-10">
				<div className="wii-u-home-button w-12 h-12 rounded-full flex items-center justify-center border border-white/15 text-white/90 text-xl font-medium shadow-lg">
					N
				</div>
			</div>

			{hasMounted && isBooting && <InitialBootOverlay />}

			<AnimatePresence>
				{activeApp && activeAppData && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-slate-900/20 backdrop-blur-sm"
						onClick={closeApp}
					>
						<motion.div
							initial={{ scale: 0.9, y: 20, opacity: 0 }}
							animate={{ scale: 1, y: 0, opacity: 1 }}
							exit={{ scale: 0.9, y: 20, opacity: 0 }}
							transition={{ type: "spring", stiffness: 300, damping: 25 }}
							className="wii-u-window w-full max-w-4xl h-[80vh] max-h-[800px] flex flex-col overflow-hidden"
							onClick={(e) => e.stopPropagation()}
						>
							<div className="wii-u-titlebar flex-shrink-0">
								<div className="flex items-center gap-2">
									<div
										className={`w-8 h-8 rounded-full ${activeAppData.color} flex items-center justify-center border border-white/90 shadow-inner`}
									>
										<div className="scale-50">{activeAppData.icon}</div>
									</div>
									<span className="font-bold text-slate-700 tracking-wide">
										{activeAppData.title}
									</span>
								</div>
								<button
									type="button"
									onClick={closeApp}
									className="wii-u-close-button w-9 h-9 rounded-full flex items-center justify-center text-slate-500 transition-colors border border-white/80"
								>
									<X className="w-5 h-5" />
								</button>
							</div>

							<div className="wii-u-dialog-surface flex-1 overflow-hidden relative">
								<div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.02)] pointer-events-none z-10"></div>
								{isLoading ? (
									<LoadingContent app={activeAppData} />
								) : (
									renderAppContent(activeAppData.id, {
										loadingScreensEnabled,
										onToggleLoadingScreens: toggleLoadingScreens,
									})
								)}
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</main>
	);
}

function InitialBootOverlay() {
	return (
		<div className="fixed inset-0 z-[60] flex items-center justify-center bg-gradient-to-br from-[#eff8ff] via-[#d6efff] to-[#c1e6ff]">
			<div className="absolute inset-0 bg-stripes opacity-25 pointer-events-none" />

			<div className="w-full max-w-2xl px-6 text-center">
				<motion.div
					initial={{ opacity: 0, y: 14, scale: 0.95 }}
					animate={{ opacity: 1, y: 0, scale: 1 }}
					transition={{ duration: 0.45, ease: "easeOut" }}
					className="wii-u-soft-panel rounded-[36px] border border-white/85 px-10 py-12"
				>
					<div className="mx-auto mb-7 flex h-32 w-32 items-center justify-center rounded-[32px] border-[5px] border-white/95 bg-gradient-to-b from-white/95 via-white/80 to-sky-100/70 shadow-[0_18px_40px_rgba(120,170,205,0.22),inset_0_2px_18px_rgba(255,255,255,0.95),inset_0_-18px_28px_rgba(121,175,210,0.18)]">
						<motion.div
							animate={{ scale: [1, 1.06, 1], rotate: [0, -1.5, 1.5, 0] }}
							transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
						>
							<User className="w-16 h-16 text-sky-500" />
						</motion.div>
					</div>

					<div className="text-slate-800 text-4xl font-bold tracking-wide">
						Junly
					</div>
					<p className="mt-3 text-slate-500">
						Starting up the Wii U-style portfolio system.
					</p>

					<div className="mt-8 h-4 rounded-full border border-white/80 bg-white/70 p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.95)]">
						<motion.div
							className="h-full rounded-full bg-gradient-to-r from-sky-300 via-sky-400 to-blue-500"
							initial={{ width: "10%" }}
							animate={{ width: ["10%", "38%", "68%", "100%"] }}
							transition={{ duration: 1.35, ease: "easeInOut" }}
						/>
					</div>

					<div className="mt-5 flex items-center justify-center gap-3 text-slate-400 text-sm font-bold uppercase tracking-[0.18em]">
						<motion.span
							className="h-2.5 w-2.5 rounded-full bg-sky-300"
							animate={{ opacity: [0.25, 1, 0.25] }}
							transition={{ duration: 0.9, repeat: Infinity, delay: 0 }}
						/>
						<motion.span
							className="h-2.5 w-2.5 rounded-full bg-sky-400"
							animate={{ opacity: [0.25, 1, 0.25] }}
							transition={{ duration: 0.9, repeat: Infinity, delay: 0.14 }}
						/>
						<motion.span
							className="h-2.5 w-2.5 rounded-full bg-blue-500"
							animate={{ opacity: [0.25, 1, 0.25] }}
							transition={{ duration: 0.9, repeat: Infinity, delay: 0.28 }}
						/>
						<span>booting system</span>
					</div>
				</motion.div>
			</div>
		</div>
	);
}

function renderAppContent(
	appId: string,
	settings: SettingsContentProps,
): React.ReactNode {
	switch (appId) {
		case "about":
			return <AboutContent />;
		case "projects":
			return <ProjectsContent />;
		case "gallery":
			return <GalleryContent />;
		case "blog":
			return <BlogContent />;
		case "music":
			return <div className="p-6 text-center text-slate-500 mt-20">Now playing...</div>;
		case "games":
			return <div className="p-6 text-center text-slate-500 mt-20">Insert Disc</div>;
		case "contact":
			return <ContactContent />;
		case "settings":
			return <SettingsContent {...settings} />;
		default:
			return null;
	}
}

function LoadingContent({ app }: { app: AppData }) {
	return (
		<div className="h-full flex items-center justify-center p-8">
			<div className="w-full max-w-xl text-center">
				<motion.div
					initial={{ opacity: 0, y: 8, scale: 0.94 }}
					animate={{ opacity: 1, y: 0, scale: 1 }}
					className="wii-u-soft-panel rounded-[28px] border border-white/80 px-8 py-10"
				>
					<div className="mx-auto mb-6 flex h-28 w-28 items-center justify-center rounded-[30px] border-[4px] border-white/90 bg-gradient-to-b from-white/95 via-white/80 to-sky-100/70 shadow-[0_18px_36px_rgba(120,170,205,0.18),inset_0_2px_16px_rgba(255,255,255,0.95)]">
						<motion.div
							animate={{ scale: [1, 1.08, 1], rotate: [0, -2, 2, 0] }}
							transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
						>
							{app.icon}
						</motion.div>
					</div>

					<div className="text-slate-800 text-3xl font-bold">
						Launching {app.title}
					</div>
					<p className="mt-3 text-slate-500">
						Preparing the interface and loading the window shell.
					</p>

					<div className="mt-8 h-4 rounded-full border border-white/80 bg-white/70 p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.95)]">
						<motion.div
							className="h-full rounded-full bg-gradient-to-r from-sky-300 via-sky-400 to-blue-500"
							initial={{ width: "18%" }}
							animate={{ width: ["18%", "52%", "86%"] }}
							transition={{ duration: 0.9, ease: "easeInOut" }}
						/>
					</div>

					<div className="mt-4 flex items-center justify-center gap-2 text-slate-400 text-sm font-bold uppercase tracking-[0.18em]">
						<motion.span
							className="h-2.5 w-2.5 rounded-full bg-sky-300"
							animate={{ opacity: [0.25, 1, 0.25] }}
							transition={{ duration: 0.9, repeat: Infinity, delay: 0 }}
						/>
						<motion.span
							className="h-2.5 w-2.5 rounded-full bg-sky-400"
							animate={{ opacity: [0.25, 1, 0.25] }}
							transition={{ duration: 0.9, repeat: Infinity, delay: 0.14 }}
						/>
						<motion.span
							className="h-2.5 w-2.5 rounded-full bg-blue-500"
							animate={{ opacity: [0.25, 1, 0.25] }}
							transition={{ duration: 0.9, repeat: Infinity, delay: 0.28 }}
						/>
					</div>
				</motion.div>
			</div>
		</div>
	);
}
