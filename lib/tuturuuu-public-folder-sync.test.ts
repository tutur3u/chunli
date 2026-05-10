import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, test } from "bun:test";
import {
	linkPublicFolderAssets,
	syncPublicFolderAssets,
} from "@/lib/tuturuuu-public-folder-sync";

function createManifest() {
	return {
		adapter: "junly",
		content: {
			entries: [
				{
					assets: [
						{
							assetType: "image",
							metadata: {
								publicPath: "/media/portfolio/research/cozy-games-trend/thumbnail.png",
								role: "thumbnail",
							},
							stableSourceId: "junly:project:cozy-games-market-force:thumbnail",
						},
					],
					collectionSlug: "projects",
					slug: "cozy-games-market-force",
					stableSourceId: "junly:project:cozy-games-market-force",
					title: "Cozy Games",
				},
			],
		},
		schema: {
			collections: [],
		},
		version: 1 as const,
	};
}

describe("Tuturuuu public folder sync", () => {
	test("links nested public media to deterministic Tuturuuu Drive storage paths", () => {
		const linked = linkPublicFolderAssets(createManifest());

		expect(linked.content.entries[0]?.assets?.[0]?.sourceUrl).toBeNull();
		expect(linked.content.entries[0]?.assets?.[0]?.storagePath).toBe(
			"external-projects/junly/projects/cozy-games-market-force/thumbnail.png",
		);
	});

	test("uploads linked nested public media before returning the manifest", async () => {
		const calls: Array<{ init?: RequestInit; input: RequestInfo | URL }> = [];
		const publicDir = await mkdtemp(join(tmpdir(), "junly-public-assets-"));
		await mkdir(join(publicDir, "media", "portfolio", "research", "cozy-games-trend"), {
			recursive: true,
		});
		await writeFile(
			join(publicDir, "media", "portfolio", "research", "cozy-games-trend", "thumbnail.png"),
			"png bytes",
		);

		const fetchImpl: typeof fetch = async (input, init) => {
			calls.push({ init, input });
			if (calls.length === 1) {
				return Response.json({
					fullPath:
						"ws_123/external-projects/junly/projects/cozy-games-market-force/thumbnail.png",
					path: "external-projects/junly/projects/cozy-games-market-force/thumbnail.png",
					signedUrl: "https://upload.example.com/object",
					token: "upload_token",
				});
			}

			return new Response(null, { status: 200 });
		};

		try {
			const result = await syncPublicFolderAssets({
				accessToken: "admin_token",
				apiBaseUrl: "https://platform.example.com/api/v1",
				fetch: fetchImpl,
				manifest: createManifest(),
				publicDir,
				tokenType: "Bearer",
				workspaceId: "ws_123",
			});

			expect(result.skipped).toEqual([]);
			expect(result.uploaded[0]?.storagePath).toBe(
				"external-projects/junly/projects/cozy-games-market-force/thumbnail.png",
			);
			expect(JSON.parse(calls[0]?.init?.body as string)).toEqual({
				collectionType: "projects",
				entrySlug: "cozy-games-market-force",
				filename: "thumbnail.png",
				upsert: true,
			});
			expect(new Headers(calls[1]?.init?.headers).get("Content-Type")).toBe("image/png");
		} finally {
			await rm(publicDir, { force: true, recursive: true });
		}
	});
});
