"use client"
import { Engine, Scene, Vector3, FreeCamera, HemisphericLight, StandardMaterial, Texture, ExecuteCodeAction, ActionManager, Color4,Color3, Mesh, Layer,ArcRotateCamera } from "@babylonjs/core";
import { useEffect, useRef, useState } from "react";
import { SceneLoader } from "@babylonjs/core/Loading/sceneLoader";
import "@babylonjs/loaders/glTF";
import TwinUi from "./TwinUi";
// import { ArcRotateCamera, GUI3DManager, CylinderPanel, VRExperienceHelper, 
//   Plane, AdvancedDynamicTexture, Rectangle, StackPanel, InputText, TextBlock, Box, Button, EnvironmentHelper, VirtualKeyboard } from 'react-babylonjs'
import { AdvancedDynamicTexture,StackPanel,Rectangle,TextBlock,LinearGradient } from '@babylonjs/gui/2D';
import { usePathname } from 'next/navigation'
export default function Pipe({ data,tdata }:any) {
  const pathName=usePathname()

  const [colo1, setColo1] = useState(Color3.Red());
  const [colo2, setColo2] = useState(Color3.Green());
  const [colo3, setColo3] = useState(Color3.FromHexString("#0060c7"));
 const [cam, setCam] = useState("main");

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
  const mcamera = useRef(null);
  const upanel1 = useRef<StackPanel | null>(null)
  const ulabel1 = useRef<Rectangle | null>(null)
  const utext1 = useRef<TextBlock | null>(null)
  const uadvancedTexture1 = useRef<AdvancedDynamicTexture | null>(null)
  // var bgUr = "http://192.168.57.33:3000"
  var bgUr="http://localhost:3000"

  function temperatureToColor(value:any) {
    value = Math.max(0, Math.min(250, value));
    var red = Math.round((value / 250) * 255);
    var blue = 255 - red;
    var redHex = red.toString(16).padStart(2, '0');
    var blueHex = blue.toString(16).padStart(2, '0');
    return '#' + redHex + '00' + blueHex;
  }

  useEffect(() => {
    targetMesh(cam)
    
  },[cam])



  useEffect(() => {
    if (material1.current) {
      material1.current.diffuseColor = Color3.FromHexString(temperatureToColor(data.nozzleTemp));
    }


    if (noz0.current) {
      var positionAbsolute = transformCoordinates(data.xPos, data.yPos, data.zPos);
      changeNozzlePositionAbsolute(positionAbsolute.x, positionAbsolute.z);
      changeRodPositionAbsolute(positionAbsolute.z);
      changeBasePositionAbsolute(positionAbsolute.y);
      
     

    }


    if (ulabel1.current && utext1.current && upanel1.current && uadvancedTexture1.current &&noz0.current) {
      upanel1.current.width = 0.25;
      upanel1.current.rotation = 0.2;

      ulabel1.current.background = "black"
        
      ulabel1.current.color = "white";
      ulabel1.current.height = "30px";
      ulabel1.current.alpha = 0.8;
      ulabel1.current.width = "150px";
      ulabel1.current.cornerRadius = 20;
      ulabel1.current.thickness = 1;
      ulabel1.current.linkOffsetY = -60;
uadvancedTexture1.current?.addControl(upanel1.current);
ulabel1.current.linkWithMesh(noz0.current); 
      utext1.current.text = "N "+data.nozzleTemp+"°C "+data.xPos+"x "+data.yPos+"y "+data.zPos+"z";
      utext1.current.color = "white";
        utext1.current.fontSize=12;
      ulabel1.current.addControl(utext1.current); 
    }
   


    
  }, [data]);

  // useEffect(() => {

  //   const interval = setInterval(() => {
    
      
  //   }, 1000)

  //   return () => clearInterval(interval);
    
  // },[])

  useEffect(() => {
   

    if (canvas.current) {
      const engine = new Engine(canvas.current, true);
      const scene = new Scene(engine);
      mainScene.current=scene

      var background = new Layer("back",bgUr+"/bgg.jpg", mainScene.current);
      background.isBackground = true;
      var advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI("mainui",true,scene);
      uadvancedTexture1.current=advancedTexture
const camera = new ArcRotateCamera("camera1", -Math.PI / 2, Math.PI / 2.5, 10, new Vector3(-9.342750198299138, 80.35949206836682, -2.7322700114203506), scene);
mcamera.current=camera
      // const camera = new FreeCamera('camera1', new Vector3(-9.342750198299138, 9.35949206836682, -2.7322700114203506), scene);
      camera.attachControl(canvas.current, true);
      camera.speed = 1;
      const light = new HemisphericLight('light1', new Vector3(0, 1, 0), scene);
      light.intensity = 1;
      const universal = SceneLoader.ImportMesh("", "/models/", "ender.glb", scene, function (newMeshes) {
        console.log("newMeshes",newMeshes)
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
            
            var panel = new StackPanel();  
            upanel1.current = panel
          panel.width = 0.25;
          panel.rotation = 0.2;
          advancedTexture.addControl(panel);
        
            
          
          var label = new Rectangle("label for " + "myMesh1");
          ulabel1.current=label
          label.background = "black"
        
          label.color = "white";
          label.height = "30px";
          label.alpha = 0.8;
          label.width = "150px";
          label.cornerRadius = 20;
          label.thickness = 1;
          label.linkOffsetY = -60;
          advancedTexture.addControl(label);
          label.linkWithMesh(noz0.current); 
             var text1 = new TextBlock();
            utext1.current = text1
        text1.text = "N "+data.nozzleTemp+"°C "+data.xPos+"x "+data.yPos+"y "+data.zPos+"z";
        text1.color = "white";
        text1.fontSize=12;
        label.addControl(text1);  

        // var label1 = new Rectangle("label for " + "noz");
        //   label1.background = "black"
        //   label1.color = "white";
        //   label1.height = "30px";
        //   label1.alpha = 0.8;
        //   label1.width = "80px";
        //   label1.cornerRadius = 10;
        //   label1.thickness = 1;
        //   label1.linkOffsetY = -90;
        //   advancedTexture.addControl(label1);
        //   label1.linkWithMesh(m); 

        // var text2 = new TextBlock();
        // text2.text = "Nozzle";
        // text2.color = "white";
        // text2.fontSize=12;
        // text2.fontWeight = "bold";
        // label1.addControl(text2);
          
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
            material3.current.ambientColor= colo3;
           
            m.material = material3.current;

            
          }
          if (m.name === "base_primitive0" ) {
            var panel = new StackPanel();  
            upanel1.current = panel
          panel.width = 0.25;
          panel.rotation = 0.2;
          advancedTexture.addControl(panel);
          
          
          var label = new Rectangle("label for " + "base");
          label.background = "black"
          label.color = "white";
          label.height = "30px";
          label.alpha = 0.8;
          label.width = "60px";
          label.cornerRadius = 20;
          label.thickness = 1;
          label.linkOffsetY = 0;
          advancedTexture.addControl(label);
          label.linkWithMesh(m); 
             var text1 = new TextBlock();
        text1.text = "B "+data.bedTemp+"°C";
        text1.color = "white";
        text1.fontSize=12;
        label.addControl(text1);  

            

      //   var label1 = new Rectangle("label for " + "noz");
      //   label1.background = "black"
      //   label1.color = "white";
      //   label1.height = "28px";
      //   label1.alpha = 0.8;
      //   label1.width = "50px";
      //   label1.cornerRadius = 10;
      //   label1.thickness = 1;
      //   label1.linkOffsetY = -30;
      //   advancedTexture.addControl(label1);
      //   label1.linkWithMesh(m); 

      // var text2 = new TextBlock();
      // text2.text = "Base";
      // text2.color = "white";
      // text2.fontSize=12;
      // text2.fontWeight = "bold";
      // label1.addControl(text2);

          }
        });
      }, null, function (scene, message, exception) {
        console.error("Error loading model: ", message, exception);
      });
      let myMesh11 = noz0.current
      console.log("11",myMesh11)
      camera.position = new Vector3(348.93757667651093, 299.76323215468295, 0.079756604162622);
    
      // camera.rotation = new Vector3(0.6731406779922281, 0.646166345275046, 0);

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

  function targetMesh(mesh:any) {
    if (mesh=="nozzle" && mcamera.current && noz0.current) {
      let nozpos = noz0.current.position.add(new Vector3(0, 0, 5));

      // mcamera.current.position = new Vector3(548.93757667651093, 0.76323215468295, 0.079756604162622);
mcamera.current.target = nozpos

    }
    if (mesh=="fan"&& mcamera.current &&base0.current){}
    if (mesh=="bed" && mcamera.current && base0.current){

      let basepos = base0.current.position.add(new Vector3(0, 0, 5));

      // mcamera.current.position = new Vector3(548.93757667651093, 0.76323215468295, 0.079756604162622);
mcamera.current.target = basepos
    }
    if(mesh=="main" && mcamera.current){

      mcamera.current.position = new Vector3(348.93757667651093, 299.76323215468295, 0.079756604162622);
    
    }
    
  }

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
  
  // 
  return (
    <>
    <div className="w-screen h-screen relative">
      <TwinUi className="z-10 w-full h-auto absolute " tdata={tdata} data={data} setCam={setCam} />
      <canvas id="canvas" ref={canvas} className="w-full h-full absolute"></canvas>
      
      </div>
      </>
  )
}