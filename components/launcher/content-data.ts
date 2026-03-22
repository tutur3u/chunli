export type ProjectRecord = {
	id: string;
	title: string;
	kicker: string;
	year: string;
	status: string;
	stack: string[];
	summary: string;
	details: string[];
	features: string[];
	seed: string;
};

export type ArtworkRecord = {
	id: number;
	title: string;
	seed: string;
	height: number;
};

export type FeedPost = {
	id: number;
	user: string;
	copy: string;
	seed: string;
	initialYeahs: number;
	initialComments: string[];
};

export type GamePreview = {
	id: string;
	title: string;
	tagline: string;
	state: string;
	accent: string;
	seed: string;
	description: string;
	features: string[];
	genres: string[];
	videoUrl?: string;
	gddUrl?: string;
	screenshots?: {
		gameplay: string[];
		bts?: string[];
	};
	playUrl?: string;
	tools?: string[];
	role?: string;
	year?: string;
	nominated?: boolean;
	projectGoals?: string[];
	contribution?: {
		title: string;
		items: string[];
	};
};

export type MusicTrack = {
	id: string;
	title: string;
	artist: string;
	length: string;
	mood: string;
	seed: string;
	accent: string;
};

export const PROJECTS: ProjectRecord[] = [
	{
		id: "wii-u-os",
		title: "Wii U Portfolio OS",
		kicker: "Immersive portfolio launcher",
		year: "2026",
		status: "Live prototype",
		stack: ["Next.js 16", "Motion", "Tailwind v4"],
		summary:
			"A playful operating-system style portfolio designed around the feeling of opening apps on a Nintendo console.",
		details: [
			"The experience treats navigation as software, not pages, so every section feels launched rather than loaded.",
			"It focuses on nostalgic motion, polished chrome, and layered ambient lighting to make the site feel tactile and memorable.",
		],
		features: [
			"Boot sequence and per-app launch transitions",
			"Themeable shell with Wii U-inspired day/night modes",
			"Local settings persistence for interaction preferences",
		],
		seed: "project1",
	},
	{
		id: "miiverse-club",
		title: "Miiverse Club",
		kicker: "Social micro-community concept",
		year: "2025",
		status: "Concept design",
		stack: ["React", "Community UX", "Interaction design"],
		summary:
			"A social feed concept built around expressive reactions, friendly prompts, and illustrated conversation spaces.",
		details: [
			"The focus was making social interactions feel playful and low-pressure, with strong visual identity around each action.",
			"The interaction patterns borrow from old console communities and remix them into a softer, more modern interface language.",
		],
		features: [
			"Reaction-first interactions",
			"Conversation threads with low-friction posting",
			"Visual identity system for posts, badges, and mood states",
		],
		seed: "project2",
	},
	{
		id: "pixel-atlas",
		title: "Pixel Atlas",
		kicker: "Curated art archive",
		year: "2024",
		status: "Archived build",
		stack: ["Next.js", "CMS", "Image pipelines"],
		summary:
			"A gallery-first site for collecting artwork, process notes, and visual references in a clean but characterful system.",
		details: [
			"The challenge was balancing a dense archive with a calm browsing experience so artwork always remained the focus.",
			"Layout, hierarchy, and asset treatment were tuned to feel collectible rather than generic.",
		],
		features: [
			"Masonry-inspired gallery composition",
			"Rich project metadata and collection filtering",
			"Responsive image treatment with archival framing",
		],
		seed: "project3",
	},
	{
		id: "console-mail",
		title: "Console Mail",
		kicker: "Messaging UI exploration",
		year: "2023",
		status: "Private study",
		stack: ["UI systems", "Interaction design", "Prototyping"],
		summary:
			"A communication concept that explores how console-native messaging could feel warm, legible, and delightfully tactile.",
		details: [
			"The design language was driven by rounded hardware metaphors, soft depth, and highly readable information architecture.",
			"It became a useful study in how nostalgia can guide interaction design without collapsing into imitation.",
		],
		features: [
			"Message composition and status models",
			"Soft-panel interface architecture",
			"Theme-aware contrast and accessibility tuning",
		],
		seed: "project4",
	},
];

export const ARTWORKS: ArtworkRecord[] = [
	{ id: 1, title: "Sea Glass Memory", seed: "art1", height: 300 },
	{ id: 2, title: "Blue Plaza", seed: "art2", height: 400 },
	{ id: 3, title: "Loading Dream", seed: "art3", height: 500 },
	{ id: 4, title: "Quiet Orbit", seed: "art4", height: 300 },
	{ id: 5, title: "Distant Signal", seed: "art5", height: 400 },
	{ id: 6, title: "Synthetic Meadow", seed: "art6", height: 500 },
	{ id: 7, title: "Night Console", seed: "art7", height: 300 },
	{ id: 8, title: "Soft System", seed: "art8", height: 400 },
];

export const POSTS: FeedPost[] = [
	{
		id: 1,
		user: "User_1",
		copy: "Just finished working on a new web project! The Wii U aesthetic is so nostalgic. ^^",
		seed: "user1",
		initialYeahs: 14,
		initialComments: ["That launcher transition looks so satisfying."],
	},
	{
		id: 2,
		user: "User_2",
		copy: "Does anyone remember the old Miiverse? I miss drawing on the GamePad.",
		seed: "user2",
		initialYeahs: 21,
		initialComments: ["Same. The little doodles gave everything so much personality."],
	},
	{
		id: 3,
		user: "User_3",
		copy: "Listening to the Wii Shop Channel music while coding. Peak productivity.",
		seed: "user3",
		initialYeahs: 9,
		initialComments: [],
	},
	{
		id: 4,
		user: "User_4",
		copy: "Hello world! Welcome to my digital space. Make yourself at home.",
		seed: "user4",
		initialYeahs: 17,
		initialComments: ["The atmosphere on this page is immaculate."],
	},
];

export const GAME_PREVIEWS: GamePreview[] = [
	{
		id: "asphyxiated",
		title: "Asphyxiated",
		tagline: "2D Platformer, Team Project",
		state: "Completed",
		accent: "from-emerald-400 via-teal-500 to-cyan-500",
		seed: "asphyxiated",
		description:
			"A platformer game made based on the theme of Serious Game: Games for Environment. The game features a post-apocalypse world where you're the keeper of the Seed Vault, trying to recover the green planet you used to live.",
		features: ["Environmental narrative", "Post-apocalypse world", "Seed Vault progression", "Atmospheric platforming"],
		genres: ["2D Platformer", "Team Project"],
		videoUrl: "https://www.youtube.com/embed/nlDw83RSUSU",
		gddUrl: "https://drive.google.com/uc?export=download&id=1OisrUjFteUwJYaQ_UhtHfs2yeAvwNCEF",
		screenshots: {
			gameplay: [
				"/media/portfolio/games/asphyxiated/gameplay/1.png",
				"/media/portfolio/games/asphyxiated/gameplay/2.png",
				"/media/portfolio/games/asphyxiated/gameplay/3.png",
				"/media/portfolio/games/asphyxiated/gameplay/4.png",
				"/media/portfolio/games/asphyxiated/gameplay/5.png",
				"/media/portfolio/games/asphyxiated/gameplay/6.png",
			],
			bts: [
				"/media/portfolio/games/asphyxiated/behind-the-scenes/1.png",
				"/media/portfolio/games/asphyxiated/behind-the-scenes/2.png",
			],
		},
		playUrl: "https://zuutheturtlecat.itch.io/asphyxiated",
		tools: ["Unity", "Aseprite"],
		role: "Game Designer, Game Artist",
		year: "May 2023 - June 2023",
	},
	{
		id: "xavier",
		title: "Xavier the Explorer",
		tagline: "3D Puzzle Game, Mini-game Compilation, Team Project",
		state: "Completed",
		accent: "from-amber-400 via-orange-500 to-rose-600",
		seed: "xavier",
		description:
			"In Xavier The Explorer, you guide Xavier, a secondary school student, as he navigates through everyday challenges related to mobility and social responsibility. The game consists of three key types of levels: organizing road systems, managing interactions on public transport, and navigating to various destinations on foot. Each scenario helps Xavier understand the importance of mobility in daily life, from arranging traffic to assisting others on the bus. As players progress, they help Xavier grow into a responsible, informed citizen, learning key lessons about independence and community.",
		features: [
			"Road system organization",
			"Public transport management",
			"Pedestrian navigation",
			"Citizenship growth system",
		],
		genres: ["3D Puzzle Game", "Mini-game Compilation", "Team Project"],
		videoUrl: "https://www.youtube.com/embed/EgwJ16ZPhCQ",
		gddUrl: "https://drive.google.com/uc?export=download&id=12Hvkym3n3nOO67nbHpQ2wi3WrwGJSFI1",
		screenshots: {
			gameplay: [
				"/media/portfolio/games/xavier/gameplay/1.png",
				"/media/portfolio/games/xavier/gameplay/2.jpg",
				"/media/portfolio/games/xavier/gameplay/3.jpg",
				"/media/portfolio/games/xavier/gameplay/4.jpg",
				"/media/portfolio/games/xavier/gameplay/5.jpg",
				"/media/portfolio/games/xavier/gameplay/6.jpg",
				"/media/portfolio/games/xavier/gameplay/7.jpg",
			],
		},
		playUrl: "https://theguyser.itch.io/xavier-the-explorer",
		tools: ["Unity"],
		role: "Game Designer, Narrative Director",
		year: "Nov 2023 - Jan 2024",
		projectGoals: [
			"Raise awareness about safe mobility and its importance in everyday commuting.",
			"Promote green and sustainable transportation methods, such as biking and public transport, to reduce pollution.",
			"Offer engaging levels that mirror real-life transportation challenges, from organizing roadways to creating safe commuting environments for work and school.",
			"Working with a real client.",
		],
		contribution: {
			title: "Gameplay Designer",
			items: [
				"Gameplay Flow Design: Developed the overall gameplay and narrative flow.",
				"Level Design: Designed the overall gameplay and context for all levels (3 levels in total), ensuring they fit the game's theme and narrative.",
				"Detailed Level Design: Took charge of designing and developing one specific level, providing a detailed layout and structure to guide its development.",
			],
		},
	},
	{
		id: "kawaii-mario",
		title: "Kawaii Mario Pimpop~Sugar Sweet Treatment~",
		tagline: "Prototype, Point and Click, Fangame, Jam, Solo Dev",
		state: "Completed",
		accent: "from-fuchsia-400 via-pink-400 to-rose-300",
		seed: "kawaii-mario",
		description:
			"Mamma mia — a 1 week game jam adventure with the theme: 10-second game. Help Mario navigate this kawaii sweet treat journey in this point-and-click fangame.",
		features: [
			"Point and click gameplay",
			"Mario fangame",
			"1-week jam project",
			"Solo developed",
		],
		genres: ["Prototype", "Point and Click", "Fangame", "Jam"],
		screenshots: {
			gameplay: [
				"/media/portfolio/games/mario/gameplay/1.png",
				"/media/portfolio/games/mario/gameplay/2.png",
				"/media/portfolio/games/mario/gameplay/3.png",
				"/media/portfolio/games/mario/gameplay/4.png",
			],
		},
		playUrl: "https://jjunly.itch.io/kawaii-mario-pimpop-sugar-sweet-treatment",
		tools: ["Unity", "Procreate"],
		role: "Game Designer, Game Developer, Artist",
		year: "March 2024",
	},
	{
		id: "remedy",
		title: "Remedy",
		tagline: "Prototype, Puzzle, Experimental, Jam, Solo Dev",
		state: "Completed",
		accent: "from-violet-400 via-purple-500 to-indigo-600",
		seed: "remedy",
		description:
			"Remedy is a puzzle adventure game where a teacher and a mysterious young high school student find themselves waking up in an unknown room. The narrative delves into themes of loss and the journey of moving on. Made for a 3-week game jam with the theme Chain Reaction.",
		features: [
			"Experimenting with RPG Maker MZ",
			"Puzzle genre exploration",
			"Chain Reaction game jam theme",
			"Narrative-driven experience",
		],
		genres: ["Prototype", "Puzzle", "Experimental", "Jam", "Solo Dev"],
		videoUrl: "https://www.youtube.com/embed/lFhr36BS3LY",
		screenshots: {
			gameplay: [
				"/media/portfolio/games/remedy/gameplay/1.png",
				"/media/portfolio/games/remedy/gameplay/2.png",
				"/media/portfolio/games/remedy/gameplay/3.png",
				"/media/portfolio/games/remedy/gameplay/4.png",
				"/media/portfolio/games/remedy/gameplay/5.png",
				"/media/portfolio/games/remedy/gameplay/6.png",
				"/media/portfolio/games/remedy/gameplay/7.png",
			],
		},
		playUrl: "https://chunlii.itch.io/remedy",
		tools: ["RPG Maker MZ", "Aseprite"],
		role: "Game Designer, Game Developer, Artist",
		year: "March 2024 - April 2024",
		nominated: true,
		projectGoals: [
			"Experimenting with new engine.",
			"Experimenting with the puzzle genre.",
			"Develop a prototype that has potential for future development.",
		],
	},
	{
		id: "ghostly-wok",
		title: "Ghostly Wok Wonders",
		tagline: "Prototype, Restaurant Simulator, Experimental, Jam, Team Project",
		state: "Completed",
		accent: "from-emerald-400 via-teal-500 to-cyan-500",
		seed: "ghostly-wok",
		description:
			"A cooking game where you try to make a delicious dish for the ghost! Made for a 1-month game jam.",
		features: [
			"Restaurant simulator gameplay",
			"Ghost-themed cooking mechanics",
			"1-month game jam project",
			"Experimental cooking interactions",
		],
		genres: ["Prototype", "Restaurant Simulator", "Experimental", "Jam", "Team Project"],
		screenshots: {
			gameplay: [
				"/media/portfolio/games/wok/gameplay/1.png",
				"/media/portfolio/games/wok/gameplay/2.png",
				"/media/portfolio/games/wok/gameplay/3.png",
				"/media/portfolio/games/wok/gameplay/4.png",
			],
		},
		playUrl: "https://hoanglan.itch.io/ghostly-wok-wonders",
		tools: ["Unity", "Aseprite"],
		role: "Game Designer, Artist",
		year: "April 2024 - May 2024",
	},
	{
		id: "magi-girl",
		title: "MAGI-GIRL.EXE",
		tagline: "Vertical Slice, Turn-based, Experimental, Solo Dev",
		state: "Completed",
		accent: "from-pink-400 via-rose-500 to-purple-600",
		seed: "magi-girl",
		description:
			"MAGI-GIRL.EXE is a 2D story-driven, turn-based RPG developed solo over the span of three months. You play as Arthur, an aspiring romance novelist, helping him gather advice to improve his manuscript and finally publish it. However, in the midst of what seems like an ordinary daily life, Arthur is suddenly pulled into an event that transforms his life forever. Now, against his will, he has been transformed… into a magical girl?! This is a singleplayer demo covering the prologue of a larger story.",
		features: [
			"Turn-based battle system",
			"Unique 'Novelize' mechanic tied to story",
			"Game-in-Game gimmick",
			"Story-driven RPG experience",
			"Vertical slice with expansion potential",
		],
		genres: ["Vertical Slice", "Turn-based", "Experimental", "Solo Dev"],
		screenshots: {
			gameplay: [
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
			],
		},
		tools: ["RPG Maker MZ", "Aseprite", "Clip Studio Paint", "Miro", "Photoshop", "Premiere Pro"],
		role: "Game Designer, Game Developer, Artist",
		year: "July 2025 - Sep 2025",
		nominated: true,
	},
];

export const MUSIC_TRACKS: MusicTrack[] = [
	{
		id: "lobby-lights",
		title: "Lobby Lights",
		artist: "Chunli System Sound Team",
		length: "3:28",
		mood: "Soft boot groove",
		seed: "lobby-lights",
		accent: "from-pink-400 via-fuchsia-500 to-orange-400",
	},
	{
		id: "night-plaza",
		title: "Night Plaza",
		artist: "Portable Dreams",
		length: "4:11",
		mood: "Late-hour menu drift",
		seed: "night-plaza",
		accent: "from-cyan-300 via-sky-500 to-indigo-500",
	},
	{
		id: "starlight-bus",
		title: "Starlight Bus",
		artist: "Pixel Garden",
		length: "2:57",
		mood: "Bright handheld pop",
		seed: "starlight-bus",
		accent: "from-emerald-300 via-lime-400 to-yellow-300",
	},
];
