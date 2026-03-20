"use client";

import type { ReactNode } from "react";
import { AboutContent } from "@/components/launcher/content/about-content";
import { BlogContent } from "@/components/launcher/content/blog-content";
import { ContactContent } from "@/components/launcher/content/contact-content";
import { GalleryContent } from "@/components/launcher/content/gallery-content";
import { GamesContent } from "@/components/launcher/content/games-content";
import { MusicContent } from "@/components/launcher/content/music-content";
import { ProjectsContent } from "@/components/launcher/content/projects-content";
import { SettingsContent } from "@/components/launcher/content/settings-content";
import type { AppId, SettingsContentProps } from "@/components/launcher/types";

const APP_COMPONENTS: Record<
	AppId,
	(settings: SettingsContentProps) => ReactNode
> = {
	about: (settings) => <AboutContent theme={settings.theme} />,
	projects: (settings) => <ProjectsContent theme={settings.theme} />,
	gallery: (settings) => <GalleryContent theme={settings.theme} />,
	blog: (settings) => <BlogContent theme={settings.theme} />,
	music: (settings) => <MusicContent theme={settings.theme} />,
	games: (settings) => <GamesContent theme={settings.theme} />,
	contact: (settings) => <ContactContent theme={settings.theme} />,
	settings: (settings) => <SettingsContent {...settings} />,
};

export function renderAppContent(
	appId: AppId,
	settings: SettingsContentProps,
): ReactNode {
	return APP_COMPONENTS[appId]?.(settings) ?? null;
}
