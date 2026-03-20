"use client";

import dynamic from "next/dynamic";

const HomeClient = dynamic(
	() => import("@/components/launcher/home-client"),
	{
		ssr: false,
		loading: () => (
			<main className="min-h-screen w-full bg-gradient-to-br from-[#e0f2fe] via-[#bae6fd] to-[#e0f2fe]" />
		),
	},
);

export default function HomeEntry() {
	return <HomeClient />;
}
