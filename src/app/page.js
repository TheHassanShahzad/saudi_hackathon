"use client";

import dynamic from "next/dynamic";

// Dynamically import the MindARViewer with SSR disabled
const MindARViewer = dynamic(() => import("./MindARViewer"), {
  ssr: false,
});

export default function Home() {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>MindAR Cube Example</h1>
      <MindARViewer />
    </div>
  );
}
