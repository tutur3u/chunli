import type { ReactNode } from "react";

export type ThemeMode = "light" | "dark";
export type ThemePreference = ThemeMode | "system";

export type AppId =
	| "about"
	| "projects"
	| "gallery"
	| "blog"
	| "music"
	| "games"
	| "contact"
	| "settings";

export type AppData = {
	id: AppId;
	title: string;
	icon: ReactNode;
	color: string;
};

export type SettingsContentProps = {
	theme: ThemeMode;
	themePreference: ThemePreference | null;
	loadingScreensEnabled: boolean;
	onToggleLoadingScreens: () => void;
	onSetThemePreference: (preference: ThemePreference) => void;
};
