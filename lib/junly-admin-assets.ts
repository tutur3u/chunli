export type JunlyAdminImageAsset = {
  asset_url?: string | null;
  id?: string | null;
  preview_url?: string | null;
  source_url?: string | null;
  storage_path?: string | null;
};

export type JunlyAdminImageTransform = {
  format?: "origin";
  height?: number;
  quality?: number;
  resize?: "contain" | "cover" | "fill";
  width?: number;
};

const DEFAULT_ADMIN_IMAGE_TRANSFORM = {
  height: 1600,
  quality: 82,
  resize: "cover",
  width: 1600,
} satisfies JunlyAdminImageTransform;

function appendTransformParams(
  params: URLSearchParams,
  transform: JunlyAdminImageTransform,
) {
  if (transform.width !== undefined) {
    params.set("width", transform.width.toString());
  }

  if (transform.height !== undefined) {
    params.set("height", transform.height.toString());
  }

  if (transform.resize) {
    params.set("resize", transform.resize);
  }

  if (transform.quality !== undefined) {
    params.set("quality", transform.quality.toString());
  }

  if (transform.format) {
    params.set("format", transform.format);
  }
}

export function getJunlyAdminAssetProxyPath(
  asset: JunlyAdminImageAsset | null | undefined,
  transform: JunlyAdminImageTransform = DEFAULT_ADMIN_IMAGE_TRANSFORM,
) {
  if (!asset?.id?.trim()) {
    return null;
  }

  const params = new URLSearchParams();
  appendTransformParams(params, transform);

  const query = params.toString();
  return `/api/admin/assets/${encodeURIComponent(asset.id)}${query ? `?${query}` : ""}`;
}

function compactUniqueSources(values: Array<string | null | undefined>) {
  const seen = new Set<string>();
  const sources: string[] = [];

  for (const value of values) {
    const source = value?.trim();

    if (!source || seen.has(source)) {
      continue;
    }

    seen.add(source);
    sources.push(source);
  }

  return sources;
}

export function getJunlyAdminAssetSources(
  asset: JunlyAdminImageAsset | null | undefined,
) {
  return compactUniqueSources([
    getJunlyAdminAssetProxyPath(asset),
    asset?.preview_url,
    asset?.asset_url,
    asset?.source_url,
  ]);
}
