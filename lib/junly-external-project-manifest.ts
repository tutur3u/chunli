import {
	ARTWORKS,
	GAME_PREVIEWS,
	MUSIC_TRACKS,
	POSTS,
	PROJECTS,
	type ArtworkRecord,
	type ContentSection,
	type FeedPost,
	type GamePreview,
	type MusicTrack,
	type ProjectRecord,
} from "@/components/launcher/content-data";

export type JunlySyncField = {
	description?: string | null;
	key: string;
	label: string;
	options?: string[];
	required?: boolean;
	type:
		| "boolean"
		| "date"
		| "datetime"
		| "json"
		| "markdown"
		| "number"
		| "string"
		| "string-array";
};

export type JunlySyncCollectionSchema = {
	assetTypes?: string[];
	blockTypes?: string[];
	collection_type: string;
	description?: string | null;
	metadataFields?: JunlySyncField[];
	profileFields?: JunlySyncField[];
	slug: string;
	title: string;
};

type JunlyManifestEntry = {
	assets?: Array<{
		altText?: string | null;
		assetType: string;
		metadata?: Record<string, unknown>;
		sortOrder?: number;
		sourceUrl?: string | null;
		stableSourceId: string;
		storagePath?: string | null;
	}>;
	blocks?: Array<{
		blockType: string;
		content: Record<string, unknown>;
		sortOrder?: number;
		stableSourceId: string;
		title?: string | null;
	}>;
	collectionSlug: string;
	metadata?: Record<string, unknown>;
	profileData?: Record<string, unknown>;
	slug: string;
	stableSourceId: string;
	status?: "draft" | "scheduled" | "published" | "archived";
	subtitle?: string | null;
	summary?: string | null;
	title: string;
};

export type JunlyExternalProjectManifest = {
	adapter: "junly";
	content: {
		entries: JunlyManifestEntry[];
	};
	schema: {
		collections: JunlySyncCollectionSchema[];
		metadataFields?: JunlySyncField[];
		profileFields?: JunlySyncField[];
	};
	version: 1;
};

const PUBLISHED_STATUS = "published" as const;

const launcherProfileFields = [
	{ key: "brand", label: "Brand", type: "string" },
	{ key: "tagline", label: "Tagline", type: "string" },
	{ key: "theme", label: "Default theme", options: ["light", "dark"], type: "string" },
] satisfies JunlySyncField[];

const projectProfileFields = [
	{ key: "kicker", label: "Kicker", type: "string" },
	{ key: "year", label: "Year", type: "string" },
	{ key: "status", label: "Status", type: "string" },
	{ key: "stack", label: "Stack", type: "string-array" },
	{ key: "seed", label: "Visual seed", type: "string" },
	{ key: "nominated", label: "Showcase nomination", type: "boolean" },
	{ key: "contentSections", label: "Content sections JSON", type: "json" },
	{ key: "researchDocs", label: "Research docs JSON", type: "json" },
] satisfies JunlySyncField[];

const gameProfileFields = [
	{ key: "tagline", label: "Tagline", type: "string" },
	{ key: "state", label: "State", type: "string" },
	{ key: "accent", label: "Accent classes", type: "string" },
	{ key: "seed", label: "Visual seed", type: "string" },
	{ key: "genres", label: "Genres", type: "string-array" },
	{ key: "tools", label: "Tools", type: "string-array" },
	{ key: "role", label: "Role", type: "string" },
	{ key: "year", label: "Year", type: "string" },
	{ key: "nominated", label: "Showcase nomination", type: "boolean" },
	{ key: "playUrl", label: "Playable URL", type: "string" },
	{ key: "videoUrl", label: "Video URL", type: "string" },
	{ key: "documents", label: "Documents JSON", type: "json" },
	{ key: "screenshots", label: "Screenshots JSON", type: "json" },
	{ key: "contentSections", label: "Content sections JSON", type: "json" },
] satisfies JunlySyncField[];

const artworkProfileFields = [
	{ key: "seed", label: "Visual seed", type: "string" },
	{ key: "height", label: "Display height", type: "number" },
] satisfies JunlySyncField[];

const postProfileFields = [
	{ key: "user", label: "User", type: "string" },
	{ key: "seed", label: "Visual seed", type: "string" },
	{ key: "initialYeahs", label: "Initial yeahs", type: "number" },
	{ key: "initialComments", label: "Initial comments", type: "string-array" },
] satisfies JunlySyncField[];

const musicProfileFields = [
	{ key: "artist", label: "Artist", type: "string" },
	{ key: "length", label: "Length", type: "string" },
	{ key: "mood", label: "Mood", type: "string" },
	{ key: "seed", label: "Visual seed", type: "string" },
	{ key: "accent", label: "Accent classes", type: "string" },
] satisfies JunlySyncField[];

function markdownFromSections(sections: ContentSection[]) {
	return sections
		.map((section) => {
			const parts = [`## ${section.title}`];

			if (section.body) {
				parts.push(section.body);
			}

			if (section.items?.length) {
				parts.push(section.items.map((item) => `- ${item}`).join("\n"));
			}

			if (section.links?.length) {
				parts.push(section.links.map((link) => `- [${link.label}](${link.url})`).join("\n"));
			}

			return parts.join("\n\n");
		})
		.join("\n\n");
}

function publicImageAsset({
	altText,
	publicPath,
	role,
	sortOrder,
	stableSourceId,
}: {
	altText: string;
	publicPath: string;
	role: string;
	sortOrder: number;
	stableSourceId: string;
}) {
	return {
		altText,
		assetType: "image",
		metadata: {
			publicPath,
			role,
		},
		sortOrder,
		stableSourceId,
	};
}

function projectAssets(project: ProjectRecord) {
	const thumbnail = project.researchDocs?.thumbnail;
	if (!thumbnail) {
		return undefined;
	}

	return [
		publicImageAsset({
			altText: `${project.title} research thumbnail`,
			publicPath: thumbnail,
			role: "thumbnail",
			sortOrder: 0,
			stableSourceId: `junly:project:${project.id}:thumbnail`,
		}),
	];
}

function gameAssets(game: GamePreview) {
	const gameplay = game.screenshots?.gameplay ?? [];
	const bts = game.screenshots?.bts ?? [];
	const assets = [
		...gameplay.map((publicPath, index) =>
			publicImageAsset({
				altText: `${game.title} gameplay screenshot ${index + 1}`,
				publicPath,
				role: "gameplay",
				sortOrder: index,
				stableSourceId: `junly:game:${game.id}:gameplay:${index + 1}`,
			}),
		),
		...bts.map((publicPath, index) =>
			publicImageAsset({
				altText: `${game.title} behind-the-scenes screenshot ${index + 1}`,
				publicPath,
				role: "bts",
				sortOrder: gameplay.length + index,
				stableSourceId: `junly:game:${game.id}:bts:${index + 1}`,
			}),
		),
	];

	return assets.length > 0 ? assets : undefined;
}

function projectEntry(project: ProjectRecord): JunlyManifestEntry {
	return {
		assets: projectAssets(project),
		blocks: [
			{
				blockType: "markdown",
				content: {
					markdown: markdownFromSections(project.contentSections),
				},
				sortOrder: 0,
				stableSourceId: `junly:project:${project.id}:content`,
			},
		],
		collectionSlug: "projects",
		profileData: {
			contentSections: project.contentSections,
			kicker: project.kicker,
			nominated: project.nominated ?? false,
			researchDocs: project.researchDocs ?? null,
			seed: project.seed,
			stack: project.stack,
			status: project.status,
			year: project.year,
		},
		slug: project.id,
		stableSourceId: `junly:project:${project.id}`,
		status: PUBLISHED_STATUS,
		summary: project.summary,
		title: project.title,
	};
}

function gameEntry(game: GamePreview): JunlyManifestEntry {
	return {
		assets: gameAssets(game),
		blocks: [
			{
				blockType: "markdown",
				content: {
					markdown: markdownFromSections(game.contentSections),
				},
				sortOrder: 0,
				stableSourceId: `junly:game:${game.id}:content`,
			},
		],
		collectionSlug: "games",
		profileData: {
			accent: game.accent,
			contentSections: game.contentSections,
			documents: game.documents ?? null,
			genres: game.genres,
			nominated: game.nominated ?? false,
			playUrl: game.playUrl ?? null,
			role: game.role ?? null,
			screenshots: game.screenshots ?? null,
			seed: game.seed,
			state: game.state,
			tagline: game.tagline,
			tools: game.tools ?? [],
			videoUrl: game.videoUrl ?? null,
			year: game.year ?? null,
		},
		slug: game.id,
		stableSourceId: `junly:game:${game.id}`,
		status: PUBLISHED_STATUS,
		summary: game.description,
		title: game.title,
	};
}

function artworkEntry(artwork: ArtworkRecord): JunlyManifestEntry {
	const slug = `artwork-${artwork.id}`;

	return {
		blocks: [],
		collectionSlug: "artworks",
		profileData: {
			height: artwork.height,
			seed: artwork.seed,
		},
		slug,
		stableSourceId: `junly:artwork:${artwork.id}`,
		status: PUBLISHED_STATUS,
		title: artwork.title,
	};
}

function postEntry(post: FeedPost): JunlyManifestEntry {
	return {
		blocks: [
			{
				blockType: "markdown",
				content: {
					markdown: post.copy,
				},
				sortOrder: 0,
				stableSourceId: `junly:post:${post.id}:copy`,
			},
		],
		collectionSlug: "posts",
		profileData: {
			initialComments: post.initialComments,
			initialYeahs: post.initialYeahs,
			seed: post.seed,
			user: post.user,
		},
		slug: `post-${post.id}`,
		stableSourceId: `junly:post:${post.id}`,
		status: PUBLISHED_STATUS,
		summary: post.copy,
		title: `${post.user} post`,
	};
}

function musicEntry(track: MusicTrack): JunlyManifestEntry {
	return {
		blocks: [],
		collectionSlug: "music",
		profileData: {
			accent: track.accent,
			artist: track.artist,
			length: track.length,
			mood: track.mood,
			seed: track.seed,
		},
		slug: track.id,
		stableSourceId: `junly:music:${track.id}`,
		status: PUBLISHED_STATUS,
		title: track.title,
	};
}

export const junlyExternalProjectManifest = {
	adapter: "junly",
	content: {
		entries: [
			{
				blocks: [
					{
						blockType: "markdown",
						content: {
							markdown:
								"Junly is a Wii U-inspired portfolio launcher for games, research, writing, music, and visual work.",
						},
						sortOrder: 0,
						stableSourceId: "junly:launcher:home:intro",
					},
				],
				collectionSlug: "launcher",
				profileData: {
					brand: "CHUNLI",
					tagline: "Portfolio Web",
					theme: "light",
				},
				slug: "home",
				stableSourceId: "junly:launcher:home",
				status: PUBLISHED_STATUS,
				summary: "Main portfolio launcher configuration.",
				title: "Home Launcher",
			},
			...PROJECTS.map(projectEntry),
			...GAME_PREVIEWS.map(gameEntry),
			...ARTWORKS.map(artworkEntry),
			...POSTS.map(postEntry),
			...MUSIC_TRACKS.map(musicEntry),
		],
	},
	schema: {
		collections: [
			{
				blockTypes: ["markdown"],
				collection_type: "launcher",
				description: "Top-level portfolio launcher copy and defaults.",
				profileFields: launcherProfileFields,
				slug: "launcher",
				title: "Launcher",
			},
			{
				assetTypes: ["image"],
				blockTypes: ["markdown"],
				collection_type: "projects",
				description: "Research and portfolio project entries.",
				profileFields: projectProfileFields,
				slug: "projects",
				title: "Projects",
			},
			{
				assetTypes: ["image"],
				blockTypes: ["markdown"],
				collection_type: "games",
				description: "Playable game and prototype entries.",
				profileFields: gameProfileFields,
				slug: "games",
				title: "Games",
			},
			{
				collection_type: "artworks",
				description: "Gallery artwork cards.",
				profileFields: artworkProfileFields,
				slug: "artworks",
				title: "Artworks",
			},
			{
				blockTypes: ["markdown"],
				collection_type: "posts",
				description: "Miiverse-style post feed entries.",
				profileFields: postProfileFields,
				slug: "posts",
				title: "Posts",
			},
			{
				collection_type: "music",
				description: "Music player track entries.",
				profileFields: musicProfileFields,
				slug: "music",
				title: "Music",
			},
		],
		profileFields: [
			{ key: "brand", label: "Brand", type: "string" },
			{ key: "deliveryPreset", label: "Delivery preset", type: "string" },
		],
	},
	version: 1,
} satisfies JunlyExternalProjectManifest;

export function getJunlyManifestCollectionSchema(
	collectionSlug: string | null | undefined,
) {
	return (
		junlyExternalProjectManifest.schema.collections.find(
			(collection) => collection.slug === collectionSlug,
		) ?? null
	);
}
