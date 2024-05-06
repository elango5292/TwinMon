"use client"
import { Engine, Scene, Vector3, FreeCamera, HemisphericLight, StandardMaterial, Texture, ExecuteCodeAction, ActionManager, Color4,Color3, Mesh, Layer } from "@babylonjs/core";
import { useEffect, useRef, useState } from "react";
import { SceneLoader } from "@babylonjs/core/Loading/sceneLoader";
import "@babylonjs/loaders/glTF";
// import { ArcRotateCamera, GUI3DManager, CylinderPanel, VRExperienceHelper, 
//   Plane, AdvancedDynamicTexture, Rectangle, StackPanel, InputText, TextBlock, Box, Button, EnvironmentHelper, VirtualKeyboard } from 'react-babylonjs'
import { AdvancedDynamicTexture,StackPanel,Rectangle,TextBlock,LinearGradient } from '@babylonjs/gui/2D';
export default function Pipe({ data }:any) {

  const [colo1, setColo1] = useState(Color3.Red());
  const [colo2, setColo2] = useState(Color3.Green());
  const [colo3, setColo3] = useState(Color3.FromHexString("#0060c7"));

  const material1 = useRef<StandardMaterial | null>(null);
  const material2 = useRef<StandardMaterial | null>(null);
  const material3 = useRef<StandardMaterial | null>(null);

  const mainScene = useRef<Scene|null>(null)


  const noz0 = useRef<Mesh | null>(null);
  const noz1 = useRef<Mesh | null>(null);
  const noz2 = useRef<Mesh | null>(null);
  const noz3 = useRef<Mesh | null>(null);
  const noz4 = useRef<Mesh | null>(null);

  const rod0 = useRef<Mesh | null>(null);
  const rod1 = useRef<Mesh | null>(null);
  const rod2 = useRef<Mesh | null>(null);
  const rod3 = useRef<Mesh | null>(null);
  const rod4 = useRef<Mesh | null>(null);
  const rod5 = useRef<Mesh | null>(null);

  const base0 = useRef<Mesh | null>(null);
  const base1 = useRef<Mesh | null>(null);
  const base2 = useRef<Mesh | null>(null);
  const base3 = useRef<Mesh | null>(null);
  const base4 = useRef<Mesh | null>(null);
  const base5 = useRef<Mesh | null>(null);

  const canvas = useRef<HTMLCanvasElement | null>(null);

  function temperatureToColor(value:any) {
    value = Math.max(0, Math.min(250, value));
    var red = Math.round((value / 250) * 255);
    var blue = 255 - red;
    var redHex = red.toString(16).padStart(2, '0');
    var blueHex = blue.toString(16).padStart(2, '0');
    return '#' + redHex + '00' + blueHex;
  }

  useEffect(() => {
    if (material1.current) {
      material1.current.diffuseColor = Color3.FromHexString(temperatureToColor(data.nozzleTemp));
    }


    if (noz0.current) {
      var positionAbsolute = transformCoordinates(data.xPos, data.yPos, data.zPos);
      changeNozzlePositionAbsolute(positionAbsolute.x, positionAbsolute.z);
      changeRodPositionAbsolute(positionAbsolute.z);
      changeBasePositionAbsolute(positionAbsolute.y);
      var url = process.env.PUBLIC_URL + "/bg.png";
      var background = new Layer("back","https://picsum.photos/200/300.jpg", mainScene.current);
    background.isBackground = true;

    }
    
  }, [data]);
  // changeRodPositionAbsolute(50);
  useEffect(() => {
    if (canvas.current) {
      const engine = new Engine(canvas.current, true);
      const scene = new Scene(engine);
      mainScene.current=scene
      const camera = new FreeCamera('camera1', new Vector3(-9.342750198299138, 9.35949206836682, -2.7322700114203506), scene);
      camera.attachControl(canvas.current, true);
      camera.speed = 1;
      const light = new HemisphericLight('light1', new Vector3(0, 1, 0), scene);
      light.intensity = 1;

      SceneLoader.ImportMesh("", "/models/", "ender.glb", scene, function (newMeshes) {
        material1.current = new StandardMaterial("newMaterial", scene);
        material2.current = new StandardMaterial("newMaterial2", scene);
        material3.current = new StandardMaterial("newMaterial3", scene);


        newMeshes.forEach(m => {
          // console.log(m)
          switch (m.name) {
            case "nozzle_primitive0": noz0.current = m; break;
            case "nozzle_primitive1": noz1.current = m; break;
            case "nozzle_primitive2": noz2.current = m; break;
            case "nozzle_primitive3": noz3.current = m; break;
            case "nozzle_primitive4": noz4.current = m; break;
          }

         

          if (m.name === "nozzle_primitive0"){
            console.log("Nozzle",noz0)
            var advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI("mainui",true,scene);
            var panel = new StackPanel();  
          panel.width = 0.25;
          panel.rotation = 0.2;
          advancedTexture.addControl(panel);
          
          
          var label = new Rectangle("label for " + "myMesh1");
          label.background = "black"
          label.color = "white";
          label.height = "30px";
          label.alpha = 0.5;
          label.width = "100px";
          label.cornerRadius = 20;
          label.thickness = 1;
          label.linkOffsetY = -30;
          advancedTexture.addControl(label);
          label.linkWithMesh(m); 
             var text1 = new TextBlock();
        text1.text = "Temp:";
        text1.color = "white";
        text1.fontSize=12;
        label.addControl(text1);  
          
          }
          if (m.name === "nozzle_primitive0" || m.name === "nozzle_primitive1" || m.name === "nozzle_primitive2" || m.name === "nozzle_primitive3" || m.name === "nozzle_primitive4" || m.name === "nozzle_primitive5") {
            material1.current.diffuseColor = colo1;
            m.material = material1.current;
            
          }
          if (m.name === "rod_primitive0" || m.name === "rod_primitive1" || m.name === "rod_primitive2" || m.name === "rod_primitive3" || m.name === "rod_primitive4" || m.name === "rod_primitive5") {
            material2.current.diffuseColor = colo2;
            m.material = material2.current;
          }

          switch (m.name) {
            case "rod_primitive0": rod0.current = m; break;
            case "rod_primitive1": rod1.current = m; break;
            case "rod_primitive2": rod2.current = m; break;
            case "rod_primitive3": rod3.current = m; break;
            case "rod_primitive4": rod4.current = m; break;
            case "rod_primitive5": rod5.current = m; break;
          }

          switch (m.name) {
            case "base_primitive0": base0.current = m; break;
            case "base_primitive1": base1.current = m; break;
            case "base_primitive2": base2.current = m; break;
            case "base_primitive3": base3.current = m; break;
            case "base_primitive4": base4.current = m; break;
            case "base_primitive5": base5.current = m; break;
          }

          

          if (m.name === "base_primitive0" || m.name === "base_primitive1" || m.name === "base_primitive2" || m.name === "base_primitive3" || m.name === "base_primitive4" || m.name === "base_primitive5") {
            material3.current.diffuseColor = colo3;
            m.material = material3.current;
          }
        });
      }, null, function (scene, message, exception) {
        console.error("Error loading model: ", message, exception);
      });
      let myMesh11 = noz0.current
      console.log("11",myMesh11)
      camera.position = new Vector3(248.93757667651093, 299.76323215468295, 12.079756604162622);
      camera.rotation = new Vector3(0.6731406779922281, 4.646166345275046, 0);

      const myMesh1 = scene.getMeshByName("nozzle_primitive0");
      console.log("22",myMesh1)
      

    


     

      
    

      engine.runRenderLoop(() => {
        scene.render();
      });

      window.addEventListener('resize', () => {
        engine.resize();
      });
    }
   
   
  }, []);

  useEffect(() => {
    if (material3.current) {
      material3.current.diffuseColor = colo3;
    }
      
    
  }, [colo3]);
  

  useEffect(() => {
    if (material2.current) {
      material2.current.diffuseColor = colo2;
    }
    // changeRodPosition("y", -5);
    // changeNozzlePositionAbsolute(0, 200, 0);
    // changeRodPositionAbsolute(0, 200, 0);

    
    
  }, [colo2]);

  function changeNozzlePosition(axis: string, value: number) {
    if (noz0.current && noz1.current && noz2.current && noz3.current && noz4.current) {
      if (axis === "x") {
        noz0.current.position.x += value;
        noz1.current.position.x += value;
        noz2.current.position.x += value;
        noz3.current.position.x += value;
        noz4.current.position.x += value;
      }
      if (axis === "y") { //-65 down max  200 top max
        noz0.current.position.y += value; 
        noz1.current.position.y += value;
        noz2.current.position.y += value;
        noz3.current.position.y += value;
        noz4.current.position.y += value;
      }
      if (axis === "z") { //left right -100 (left) to 100
        noz0.current.position.z += value;
        noz1.current.position.z += value;
        noz2.current.position.z += value;
        noz3.current.position.z += value;
        noz4.current.position.z += value;
      }
      console.log(noz0.current.position, noz1.current.position, noz2.current.position, noz3.current.position, noz4.current.position)
    }
    
  }

  
  function changeRodPosition(axis: string, value: number) {
    if (rod0.current && rod1.current && rod2.current && rod3.current && rod4.current) {
      if (axis === "x") {
        rod0.current.position.x += value;
        rod1.current.position.x += value;
        rod2.current.position.x += value;
        rod3.current.position.x += value;
        rod4.current.position.x += value;
        rod5.current.position.x += value;
      }
      if (axis === "y") { //-65 down max  200 top max
        rod0.current.position.y += value; 
        rod1.current.position.y += value;
        rod2.current.position.y += value;
        rod3.current.position.y += value;
        rod4.current.position.y += value;
        rod5.current.position.y += value;
      }
      if (axis === "z") { 
        rod0.current.position.z += value;
        rod1.current.position.z += value;
        rod2.current.position.z += value;
        rod3.current.position.z += value;
        rod4.current.position.z += value;
        rod5.current.position.z += value;
      }
      console.log(rod0.current.position, rod1.current.position, rod2.current.position, rod3.current.position, rod4.current.position, rod5.current.position)
    }
    
  }

  function changeBasePosition(axis: string, value: number) {
    if (base0.current && base1.current && base2.current && base3.current && base4.current && base5.current) {
      if (axis === "x") { // -93 from 165 back
        base0.current.position.x += value;
        base1.current.position.x += value;
        base2.current.position.x += value;
        base3.current.position.x += value;
        base4.current.position.x += value;
        base5.current.position.x += value;
      }
      if (axis === "y") { 
        base0.current.position.y += value; 
        base1.current.position.y += value;
        base2.current.position.y += value;
        base3.current.position.y += value;
        base4.current.position.y += value;
        base5.current.position.y += value;
      }
      if (axis === "z") { 
        base0.current.position.z += value;
        base1.current.position.z += value;
        base2.current.position.z += value;
        base3.current.position.z += value;
        base4.current.position.z += value;
        base5.current.position.z += value;
      }
      console.log(base0.current.position, base1.current.position, base2.current.position, base3.current.position, base4.current.position)
    }
    
  }


  function changeNozzlePositionAbsolute(x: number, z: number) {
    if (noz0.current && noz1.current && noz2.current && noz3.current && noz4.current) {
     
      noz0.current.position.z = x;
      noz0.current.position.y = z;


     
      noz1.current.position.z = x;
      noz1.current.position.y = z;


      
      noz2.current.position.z = x;
      noz2.current.position.y = z;


      
      noz3.current.position.z = x;
      noz3.current.position.y = z;


      
      noz4.current.position.z = x;
      noz4.current.position.y = z;

      
      console.log(noz0.current.position, noz1.current.position, noz2.current.position, noz3.current.position, noz4.current.position)
    }
  }


  function changeRodPositionAbsolute(z: number) {
    if (rod0.current && rod1.current && rod2.current && rod3.current && rod4.current && rod5.current) {
   
      rod0.current.position.y = z;
     


      rod1.current.position.y = z;
    


     
      rod2.current.position.y = z;
  


    
      rod3.current.position.y = z;
     

      rod4.current.position.y = z;
  

      rod5.current.position.y = z;

      console.log(rod0.current.position, rod1.current.position, rod2.current.position, rod3.current.position, rod4.current.position,rod5.current.position)
    }
  }

  function changeBasePositionAbsolute(y: number) {
    if (base0.current && base1.current && base2.current && base3.current && base4.current && base5.current) {
      base0.current.position.x = y;
     


      base1.current.position.x = y;
     


      base2.current.position.x = y;
      


      base3.current.position.x = y;
      


      base4.current.position.x = y;
      
      base5.current.position.x = y;
     
      console.log(base0.current.position, base1.current.position, base2.current.position, base3.current.position, base4.current.position,base5.current.position)
    }
  }


  function transformCoordinates(x: number, y: number, z: number) {
    const minX = -93, maxX = 120;
    const minY = 130, maxY = -90;
    const minZ = -60, maxZ = 165;


    const minX1 = 0, maxX1 = 220;
    const minY1 = 0, maxY1 = 220;
    const minZ1 = 0, maxZ1 = 250;
  

    const transformedX = ((x - minX1) / (maxX1 - minX1)) * (maxX - minX) + minX;
  
    const transformedY = ((y - minY1) / (maxY1 - minY1)) * (maxY - minY) + minY;
  
    const transformedZ = ((z - minZ1) / (maxZ1 - minZ1)) * (maxZ - minZ) + minZ;
  
    return {
      x: transformedX,
      y: transformedY,
      z: transformedZ
    };
  }
  return (
    <div className="w-full h-full">
      <canvas id="canvas" ref={canvas} className="w-full h-full"></canvas>
      <div className="flex flex-row gap-x-3">
         </div></div>
  )
}