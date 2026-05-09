"use client";

import {
  getJunlyAdminAssetSources,
  type JunlyAdminImageAsset,
} from "@/lib/junly-admin-assets";
import { ImageIcon, LoaderCircle } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";

export function JunlyAdminMediaImage({
  alt,
  asset,
}: {
  alt: string;
  asset: JunlyAdminImageAsset | null | undefined;
}) {
  const sources = useMemo(() => getJunlyAdminAssetSources(asset), [asset]);
  const sourceKey = sources.join("\n");
  const [loadState, setLoadState] = useState(() => ({
    failedSources: [] as string[],
    loadedSource: null as string | null,
    sourceKey,
  }));

  const currentLoadState =
    loadState.sourceKey === sourceKey
      ? loadState
      : {
          failedSources: [],
          loadedSource: null,
          sourceKey,
        };
  const currentSource = sources.find((source) => !currentLoadState.failedSources.includes(source));
  const isLoading = Boolean(currentSource && currentLoadState.loadedSource !== currentSource);

  if (!currentSource) {
    return (
      <div className="grid h-full w-full place-items-center text-white/24">
        <ImageIcon className="size-10" />
      </div>
    );
  }

  return (
    <>
      {isLoading ? (
        <div className="absolute inset-0 z-10 grid place-items-center bg-black/20 text-white/38">
          <LoaderCircle className="size-6 animate-spin" />
        </div>
      ) : null}
      <Image
        alt={alt}
        className="object-cover"
        fill
        onError={() =>
          setLoadState((current) => {
            const failedSources = current.sourceKey === sourceKey ? current.failedSources : [];

            if (failedSources.includes(currentSource)) {
              return current;
            }

            return {
              failedSources: [...failedSources, currentSource],
              loadedSource: current.sourceKey === sourceKey ? current.loadedSource : null,
              sourceKey,
            };
          })
        }
        onLoad={() =>
          setLoadState((current) => ({
            failedSources: current.sourceKey === sourceKey ? current.failedSources : [],
            loadedSource: currentSource,
            sourceKey,
          }))
        }
        sizes="(max-width: 1024px) 88vw, 32vw"
        src={currentSource}
        unoptimized={currentSource.startsWith("/api/")}
      />
    </>
  );
}
