"use client";

import dynamic from "next/dynamic";

const Intro3D = dynamic(
  () => import("./Intro3D").then((m) => ({ default: m.Intro3D })),
  {
    ssr: false,
    loading: () => (
      <div
        className="fixed inset-0 z-[150]"
        style={{ background: "#080604" }}
      />
    ),
  },
);

export function Intro3DLoader() {
  return <Intro3D />;
}
