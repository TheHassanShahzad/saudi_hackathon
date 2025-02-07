"use client";

import { useEffect } from "react";
// Import A-Frame first
import "aframe";
// Then import MindAR’s A-Frame integration
import "mind-ar/dist/mindar-image-aframe.prod.js";

const MindARViewer = () => {
    useEffect(() => {
        const sceneEl = document.querySelector("a-scene");

        const onSceneLoaded = () => {
            const arSystem = sceneEl.systems["mindar-image-system"];
            if (arSystem && typeof arSystem.start === "function") {
                arSystem.start();
            }
        };

        // Listen for the scene to load before starting AR
        sceneEl?.addEventListener("loaded", onSceneLoaded);

        return () => {
            // Cleanup: safely try to stop the AR system
            try {
                const arSystem = sceneEl?.systems?.["mindar-image-system"];
                if (arSystem && typeof arSystem.stop === "function") {
                    arSystem.stop();
                }
            } catch (err) {
                console.error("Error stopping MindAR system:", err);
            }
        };
    }, []);

    return (
        <div style={{ width: "100vw", height: "100vh" }}>
            <a-scene mindar-image="imageTargetSrc: /mindar/target.mind;" embedded arjs>
                {/* Camera */}
                <a-camera position="0 0 0" look-controls-enabled="false"></a-camera>

                {/* Marker for the cube */}
                <a-entity mindar-image-target="targetIndex: 0">
                    <a-box position="0 0 0" scale="0.2 0.2 0.2" material="color: red"></a-box>
                </a-entity>
            </a-scene>
        </div>
    );
};

export default MindARViewer;
