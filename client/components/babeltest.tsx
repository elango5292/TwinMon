"use client"
import { Engine, Scene, MeshBuilder, Vector3, FreeCamera,SpotLight, HemisphericLight,StandardMaterial,Texture,ExecuteCodeAction,
    ActionManager } from "@babylonjs/core";
import { useEffect, useRef } from "react";

export default function BabelTest(props:any) {
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
            const sphere = MeshBuilder.CreateSphere('sphere', {diameter: 2}, scene);
            sphere.position.y = 2;
            const ground = MeshBuilder.CreateGround('ground', {width: 12, height: 12}, scene);
            camera.setTarget(sphere.position);
            const stdmat = metalMat(scene);
            const stdmat1 =metal1Mat(scene);
            sphere.material = stdmat;
            const stdmat2 = groundMat(scene);
            ground.material = stdmat2;
            
            // add code to change material on click
            ground.actionManager = new ActionManager(scene);
            ground.actionManager.registerAction(
                new ExecuteCodeAction(
                    ActionManager.OnPickTrigger,
                    () => {
                        if (ground.material === stdmat2) {
                            ground.material = stdmat1;
                        } else {
                            ground.material = stdmat2;
                        }
                    }
                )
            )
         
           

            engine.runRenderLoop(() => {
                scene.render();
            });
            window.addEventListener('resize', () => {
                engine.resize();
            });
          
            
        }
    });

    function metalMat(scene:Scene):StandardMaterial{
const retMat = new StandardMaterial('retMat', scene);
const tex = [];

const diffTex = new Texture('/textures/metal/diff.jpg', scene);
tex.push(diffTex);
const normTex = new Texture('/textures/metal/norm.jpg', scene);
// normTex.invertY = true;
normTex.invertZ = true;
tex.push(normTex);
const roughTex = new Texture('/textures/metal/rough.jpg', scene);
tex.push(roughTex);
const aoTex = new Texture('/textures/metal/ao.jpg', scene);
tex.push(aoTex);

tex.map((t) => t.uScale = t.vScale = 4);
retMat.diffuseTexture = diffTex;
retMat.bumpTexture = normTex;
// retMat.roughness = 0.2;
// retMat.alTexture = roughTex;
retMat.ambientTexture = aoTex;


return retMat;
    }

    function metal1Mat(scene:Scene):StandardMaterial{
        const retMat = new StandardMaterial('retMat', scene);
        const tex = [];
        var path = '/textures/metal1/'
        
        const diffTex = new Texture(path + 'diff.jpg', scene);
        tex.push(diffTex);
        const normTex = new Texture(path + 'norm.jpg', scene);
        tex.push(normTex);
        const roughTex = new Texture(path + 'rough.jpg', scene);
        tex.push(roughTex);
        const aoTex = new Texture(path + 'ao.jpg', scene);
        tex.push(aoTex);
        
        tex.map((t) => t.uScale = t.vScale = 4);
        retMat.diffuseTexture = diffTex;
        retMat.bumpTexture = normTex;
        // retMat.roughness = 0.2;
        // retMat.alTexture = roughTex;
        retMat.ambientTexture = aoTex;
        
        
        return retMat;
            }




    function groundMat(scene:Scene):StandardMaterial{
        const retMat = new StandardMaterial('groundMat', scene);
        const tex = [];
        
        const diffTex = new Texture('/textures/ground/diff.jpg', scene);
        tex.push(diffTex);
        const normTex = new Texture('/textures/ground/norm.jpg', scene);
        normTex.invertZ = true;
        tex.push(normTex);
        const roughTex = new Texture('/textures/ground/rough.jpg', scene);
        tex.push(roughTex);
        const aoTex = new Texture('/textures/ground/ao.jpg', scene);
        tex.push(aoTex);
        
        tex.map((t) => t.uScale = t.vScale = 4);
        retMat.diffuseTexture = diffTex;
        retMat.bumpTexture = normTex;
        retMat.roughness = 0.2;
        // retMat.alTexture = roughTex;
        retMat.ambientTexture = aoTex;
        
        
        return retMat;
            }
        

    return (
        <canvas ref={canvas} {...props}></canvas>
    );
}
