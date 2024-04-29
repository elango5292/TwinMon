"use client"
import { Engine, Scene, MeshBuilder, Vector3, FreeCamera, HemisphericLight,StandardMaterial,Texture,ExecuteCodeAction,
    ActionManager } from "@babylonjs/core";
import { useEffect, useRef } from "react";
import { SceneLoader } from "@babylonjs/core/Loading/sceneLoader";
import "@babylonjs/loaders/glTF";

export default function Pipe() {
    const canvas = useRef<HTMLCanvasElement | null>(null);
    useEffect(() => {
        if (canvas.current) {

            const engine = new Engine(canvas.current, true);
            const scene = new Scene(engine);
            const camera = new FreeCamera('camera1', new Vector3(0, 5, -5), scene);
            camera.attachControl();
            camera.speed = 0.25;
            const light = new HemisphericLight('light1', new Vector3(0, 4, 0), scene);
            light.intensity = 1;
            const mesh = SceneLoader.ImportMesh("", "/models/printer/source/", "model.glb",scene, function (newMeshes) {

                console.log("meshes imported", newMeshes);
                newMeshes.forEach(m => m.scaling.scaleInPlace(5));
            })
        
            camera.target = new Vector3(0, 0, 0);

            engine.runRenderLoop(() => {
                scene.render();
            })

            window.addEventListener('resize', () => {
                engine.resize();
            });

        }
    }, [])

    return (
        <div>
           <canvas ref={canvas} className="w-3/4 h-3/4"></canvas>
        </div>
    )
}