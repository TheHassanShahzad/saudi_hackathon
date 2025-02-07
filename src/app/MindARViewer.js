"use client";

import { useEffect } from "react";
import "aframe";
import "mind-ar/dist/mindar-image-aframe.prod.js";

const MindARViewer = () => {
    useEffect(() => {
        const sceneEl = document.querySelector("a-scene");

        const onSceneLoaded = () => {
            const arSystem = sceneEl?.systems?.["mindar-image-system"];
            if (arSystem) {
                // Patch the system’s video object so that stopProcessVideo is defined.
                if (!arSystem.video) {
                    arSystem.video = {};
                }
                if (typeof arSystem.video.stopProcessVideo !== "function") {
                    arSystem.video.stopProcessVideo = () => {
                        // A dummy function to avoid errors.
                    };
                }
                // Now start the AR system.
                arSystem.start();
            }
        };

        sceneEl?.addEventListener("loaded", onSceneLoaded);

        return () => {
            try {
                const arSystem = sceneEl?.systems?.["mindar-image-system"];
                if (arSystem && typeof arSystem.stop === "function") {
                    arSystem.stop();
                }
            } catch (err) {
                // Log a warning but do not crash.
                console.warn("Error stopping MindAR system:", err);
            }
        };
    }, []);

    return (
        <div style={{ width: "100vw", height: "100vh" }}>
            <a-scene
                mindar-image="imageTargetSrc: /mindar/target.mind;"
                embedded
                vr-mode-ui="enabled: false"
                arjs
            >
                {/* Camera */}
                <a-camera position="0 0 0" look-controls-enabled="false"></a-camera>

                {/* Marker for the cube */}
                <a-entity mindar-image-target="targetIndex: 0">
                    <a-box
                        position="0 0 0"
                        scale="0.2 0.2 0.2"
                        material="color: red"
                    ></a-box>
                </a-entity>
            </a-scene>
        </div>
    );
};

export default MindARViewer;
