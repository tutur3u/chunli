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
	nominated?: boolean;
	researchDocs?: {
		poster?: string;
		paper?: string;
		fieldNotes?: string;
		proposal?: string;
		thumbnail?: string;
		documents?: { label: string; url: string }[];
		interviews?: { label: string; url: string }[];
	};
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
	documents?: { label: string; url: string }[];
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
		id: "mario-kart-split-screen",
		title: "The Technology Evolution Of Split Screen in Mario Kart (1992-2017)",
		kicker: "Game Studies, Team Project",
		year: "April 2025",
		status: "Completed",
		stack: ["Ethnography", "Secondary Research", "Remote Observation", "Gameplay Systems Analysis"],
		summary:
			"This zine traces how split-screen play evolved between Super Mario Kart (1992) and Mario Kart 8 Deluxe (2017), focusing on the technical and experiential shifts that reshaped local multiplayer.",
		details: [
			"Imagine huddling on the couch in 1992, elbows bumping, SNES controllers in hand, racing on pixelated tracks. Fast forward to 2017 and you're dodging red shells on the go with a Joy-Con in hand.",
			"This zine explores the technical journey of split-screen gameplay through two titles in the Mario Kart series: Super Mario Kart (1992) and Mario Kart 8 Deluxe (2017).",
		],
		features: [
			"Comparative analysis across two generations of Mario Kart split-screen design",
			"Technical research into how hardware shifts changed local multiplayer play",
			"Ethnographic framing grounded in player experience and observation",
			"Team-led synthesis across creative direction, systems analysis, and research",
		],
		seed: "mario-kart-split-screen",
		nominated: true,
		researchDocs: {
			documents: [
				{ label: "Research Zine", url: "https://drive.google.com/file/d/1G6rHOE0NV63yBCCoiUaieGAacntAxXcj/view?usp=drive_link" },
			],
		},
	},
	{
		id: "cozy-games-market-force",
		title: "The Rise of Cozy Games as a Market Force",
		kicker: "Market Research, Solo Project",
		year: "July 2025",
		status: "Completed",
		stack: ["Market Research", "Quantitative", "PowerPoint", "Word"],
		summary:
			"This project examines the rise of cozy games as a commercial force and uses Spry Fox Studio as a case study to understand what the genre reveals about player engagement today.",
		details: [
			"This project explores the rise of cozy games and examines how the genre sheds light on complex issues surrounding player engagement in today's gaming landscape, using Spry Fox Studio as a primary case study.",
			"The work combines market-focused analysis with quantitative framing to position cozy games as both a cultural and commercial shift in the current games industry.",
		],
		features: [
			"Market-focused analysis of cozy games as a growing genre category",
			"Spry Fox Studio case study",
			"Quantitative framing for engagement and audience trends",
			"Presentation and written research package",
		],
		seed: "cozy-games-market-force",
			researchDocs: {
				thumbnail: "/media/portfolio/research/cozy-games-trend/thumbnail.png",
				documents: [
					{ label: "Pitch Presentation", url: "https://drive.google.com/file/d/15lIrHAqQbBuSl68C_ZxVrlolyAJ9EVI1/view?usp=drive_link" },
					{ label: "Research Paper", url: "https://drive.google.com/file/d/1FqRrrlJsWJkfw86PDCTnbijq8guEXJEx/view?usp=drive_link" },
				],
			},
		},
	{
		id: "ace-attorney-research",
		title: "Player Engagement in Narrative Games (Ace Attorney Case Study)",
		kicker: "Game Culture Research, Solo Project",
		year: "July 2024 – September 2024",
		status: "Completed",
		stack: ["Ethnography", "Surveys", "Interviews", "Mixed Methods"],
		summary:
			"This project investigates how narrative design can drive long-term player engagement. By analyzing Ace Attorney through player research and community behavior, I translated findings into practical design insights for retention, replayability, and player-driven content.",
		details: [
			"This project investigates how narrative design can drive long-term player engagement through a case study of the Ace Attorney series.",
			"By analyzing the game through player research and community behavior, I translated findings into practical design insights for retention, replayability, and player-driven content.",
		],
		features: [
			"Mixed methodology combining surveys and interviews",
			"Ethnographic approach to player community analysis",
			"Practical design insights for narrative-driven games",
			"Focus on retention and replayability strategies",
		],
		seed: "ace-attorney-research",
		researchDocs: {
			thumbnail: "/media/portfolio/research/ace-attorney-research/thumbnail.png",
			poster: "https://drive.google.com/file/d/1Qu90jFLhe0Vl1mnHpITOEPAK2BdYmg-r/view?usp=drive_link",
			paper: "https://drive.google.com/file/d/11sQPD_U-EQsrRgD5ZEUkRUrQ4fRaWy70/view?usp=drive_link",
			fieldNotes: "https://drive.google.com/file/d/123mM1tJghAydT1iq7jC8TXIyG_aRKF31/view?usp=drive_link",
			proposal: "https://drive.google.com/file/d/1QX7Rxv3VE7vb_H_uUO3J5L1E8e4ISU0u/view?usp=drive_link",
			interviews: [
				{ label: "Interview 1", url: "https://drive.google.com/file/d/1ZSS2dIVhzeWfu4fD-xb1i26gysoQ4MuV/view?usp=drive_link" },
				{ label: "Interview 2", url: "https://drive.google.com/file/d/1KpocJ1D74Kr3TmFOV2z-sys8KHgcCJ6R/view?usp=drive_link" },
			],
		},
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
		id: "atelier",
		title: "Atelier",
		tagline: "Board Game, Project Brief, Rulebook, Solo Project",
		state: "Completed",
		accent: "from-amber-300 via-orange-400 to-rose-500",
		seed: "atelier",
		description:
			"In Atelier, rival potion factories race to advertise cures for the current ailment while hiding the downsides their own lab staff uncovered. The catch is that the factories are so large that creators and promoters barely communicate, so every pitch can reveal a surprising truth about the potion being sold.",
		features: [
			"Competitive board game concept",
			"Potion advertising and bluffing dynamic",
			"Factory-scale communication twist",
			"Solo-designed ruleset and brief",
		],
		genres: ["Board Game", "Project Brief", "Rulebook", "Solo Project"],
		documents: [
			{ label: "Project Brief", url: "https://drive.google.com/file/d/1fKjz51zj7lND7ZKsML19cDBR0h-Ds_2f/view?usp=sharing" },
		],
		screenshots: {
			gameplay: ["/media/portfolio/games/atelier/thumbnail.png"],
		},
		tools: [],
		role: "Game Designer",
		year: "Nov 2022",
	},
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
		id: "athena-cykes-ace-attorney",
		title: "Athena Cykes: The Ace Attorney",
		tagline: "Ace Attorney sequel project, GDD, Team Project",
		state: "Completed",
		accent: "from-sky-400 via-cyan-500 to-blue-600",
		seed: "athena-cykes-ace-attorney",
		description:
			"Inspired by the Ace Attorney series, this sequel concept explores how strong narration, sound design, and simple point-and-click interactions can still produce a memorable visual novel experience. The project focused on translating that admiration into a team-led concept package and playable prototype direction.",
		features: [
			"Visual novel sequel concept rooted in Ace Attorney design language",
			"Team-authored game design document and concept presentation",
			"Point-and-click investigation inspiration",
			"Prototype materials with process documentation",
		],
		genres: ["Ace Attorney sequel project", "GDD", "Team Project"],
		videoUrl: "https://www.youtube.com/embed/w751CvzhmlM",
		documents: [
			{ label: "Game Design Document", url: "https://drive.google.com/file/d/11tVohiGnNHUsDB102S3wbEUyUSJkFw9c/view?usp=drive_link" },
			{ label: "Introduction, Game Idea, Work Process", url: "https://drive.google.com/file/d/110xyBRT64j4Ldv96FTaFbl4OO5-O073U/view?usp=drive_link" },
		],
		screenshots: {
			gameplay: [
				"/media/portfolio/games/aa-sequel/gameplay/1.png",
				"/media/portfolio/games/aa-sequel/gameplay/2.png",
				"/media/portfolio/games/aa-sequel/gameplay/3.png",
				"/media/portfolio/games/aa-sequel/gameplay/4.png",
				"/media/portfolio/games/aa-sequel/gameplay/5.png",
				"/media/portfolio/games/aa-sequel/gameplay/6.png",
				"/media/portfolio/games/aa-sequel/gameplay/7.png",
				"/media/portfolio/games/aa-sequel/gameplay/8.png",
				"/media/portfolio/games/aa-sequel/gameplay/9.png",
			],
		},
		role: "Game Writer, Gameplay Design, Team Leader",
		year: "Aug-Sep 2023",
		nominated: true,
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
