"use client"
import { Engine, Scene, Vector3, FreeCamera, HemisphericLight, StandardMaterial, Texture, ExecuteCodeAction, ActionManager, Color4,Color3, Mesh, Layer,ArcRotateCamera, DynamicTexture } from "@babylonjs/core";
import { useEffect, useRef, useState } from "react";
import { SceneLoader } from "@babylonjs/core/Loading/sceneLoader";
import "@babylonjs/loaders/glTF";
import TwinUi from "./TwinUi";
import { GradientMaterial } from "@babylonjs/materials";
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

  const BaseDynamicTexture = useRef(null)
  const BaseTexture = useRef(null)
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


  function generateImage(tl:any, tr:any, bl:any, br:any) {
    const width = 512;
    const height = 512;
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    for(let y = 0; y < height; y++) {
        for(let x = 0; x < width; x++) {
            const t = y / (height - 1);
            const l = x / (width - 1);

            const top = (1 - l) * tl + l * tr;
            const bottom = (1 - l) * bl + l * br;
            const temp = Math.round((1 - t) * top + t * bottom);

            ctx.fillStyle = `rgb(${temp}, 0, ${255 - temp})`;
            ctx.fillRect(x, y, 1, 1);
        }
    }

    return canvas.toDataURL();
}



  // useeffect that executes every 5 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      const dataUrl = generateImage(255, 0, 0, 0);// ,tl ,br , bl
      console.log("here",dataUrl);
      let texture = new Texture(dataUrl, mainScene.current);
      texture.uScale = 1;
      texture.vScale = 1;
      BaseDynamicTexture.current.diffuseTexture = texture;
      base1.current.material = BaseDynamicTexture.current;
    }, 2000); // Executes every 5 seconds, or 5000 milliseconds

    return () => {
      clearInterval(intervalId); // This clears the interval when the component is unmounted
    };
  }, []);

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
    
     
      const myMesh1 = scene.getMeshByName("nozzle_primitive0");
      console.log("22",myMesh1)

      
     
      // material.diffuseTexture = dynamicTexture;
      let base = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAIAAAB7GkOtAAAACXBIWXMAAAPoAAAD6AG1e1JrAAAgAElEQVR4nO3de/it9ZgG8HsO5nyeMecZM+bAYIzSQSNbUiRJ56I9nXSghArbOaSSpEQ6qlQqlUqSQ0qiVCqTQokkSg7jkEiEufa1trXXftda73rXet/3+9zP89zXdf8xf7pe+/f53nN/v78fAL8EflGTX8PPa/LreKAmv4Gf1eQ38dP6PAj31+S38JOa/Dbuq8nv4Mc1+V38qD6/h3tr8vv4YU3+APfU5A/xg/r8Eb5fkz/G92ryJ/huTf4U/1eTP8N36vPn+HZN/gLfqsmD8c2a/CXurs9f4Rs1+WvcVZO/wZ01+Vt8vSZ/h6/V5+9xR03+AV+tyT/i9po8BF+pzz/htpr8M75ck4fiSzX5F9xak3/FF+vzb7ilJv+Om2vyMHyhJg/H5+vzH/hcTR6Bm2rySNxYk0fhszX5T9xQn0fjf2vyX/hMTR6D62uyGq6ryeq4DhK/Cfr9iT8TfSvxZ6Lfn/gz0e9P/JbotxG/JfptxO8V/Xrxe0W/jfiP6BP9evF7Rv/a0SBnx88pfsua30b8ljW/XnzV/MI1vyX6bcTvFf1H1orfK/r14neL/ioHgMR3LX6vw069+FGHHdV8XzXfcNt5lE/0V8e1j8WnB0GvHb++4Pvt+C2nfFrxNewsMOxEXfN7rfm9bjtRB/3HdIT+aCDxzcXXlL9Ax/d7f+t3zfe77fhFf7Va8RdDf5g1cM3yA0AdX+KHn/L9DjvMNd/vtuP3Fne11uiPBt2uOvWTTtpVh7nj+53ye32xo5pPWPM16K/eBfrVA4BW/F7f4zOLn/bylnnYUc0nrPlpB/3VW6C/Bq5ZE1cPAokv8Q1f5Qcednq9v7Vd85mvcJm3ncf0cIu7APqjWX4A9PdQRx0/4XMdDTsm97eB1/zAjzVXs0B/mLVwFSS+i1Un8O9hadhRzS9c85lf6K/ebttpgv5oYNvx60d829/Ayiw+8+Wt62FHNZ+z5j/a86A/L/qrHABUD3UkvlPxbad82xc7tmt+r8OO6zU/87azZi36a+GqtfGpQZYfABJfHV/iexHf9v7W9Zofu+av2Rj90aDwta06vjq+hh3V/GI1Pzb6a9WKPw39YR6HK+H6Mb52fMNVR1O+ar5Jzde2s1Y79EeDYOK3/EtqsW9uY1/eup7yk6/5sbedx5Ya9BuiXz0AmCcd27+dKfF7FZ/88tb1ix3vaz55zV+de9upR/9xuHIdXDEIgj3NlPiZxSd/o0l+f5u85q8Wa9upQX806HvS8S5+y7+r433VIX+g2bf4yYcd7zWf/Ap3zT63nRr0h/lvfBJsI37fv34l8W3F7/v3sJJP+X0PO94f7fRd89eg2XZq0B8NvI/4fV/bquMnF7/vKT/8sOO95j/W57ZTg/4qB4C7Scdc/JZ/SS38qmMuvvcp33zYUc1fw/+2U5/H4xODwHzSMb+2NRe/7/f45uJ7f66jYafv+1vV/LW73nZq0B8N4o34fT/Gl/j84ptP+ebDTvj7W/M1f03rmj8T/Ynij2ZdXA7+Ed/82rbvv5asjp9BfA075m/zzdf8tQtuOzXojwYJR/wA4vf9Hj9Axze/vOV/scM/7PDX/LVMr3AXQ796AHifdMxHfIkv8ZO82DF/ppmh5q/TxbZTnyfg44OAcNLhH/HN/z6+Or6L5zoBpvwA97eq+euuiv5olh8AmnT4n2ZK/BjPdTTsqOav09G207zmT8sSXAbCgp9hxGcQ3/w9PsMDTf7nOgw1n3/YUc1ftzH6owGD+AEmHQbx+/67OknE53+u42LYCXB/uzb9Fe4C4lcPgJAF34X45g91JH6Y5zouxGdAP4D467ZGfwkueyI+NsjyA0Diuyj4El+XtxI/Z81ftzX6Q/ErgQq+xNeqo2EnTMeX+EtmoT/Merh0+QGgSUcdP9uOL/EjDTtCf8k86I8GURd8rTq6uZX4Uad8ib9kUfEnHAAxxNeI3/Chjjq+Lm8lfmb018OlT8Ilg2AB7iW+rm216iR/rqOa/3if4ley/ABIwr0e6pQc8bXjU4mvYadkx1+XG/1h1sdHEVj8Au8y9TSzOfe6uW0uPknNdzHlx3imuaSI+AP0RwMv3JOIX+B3r/L8wq3e6iQUP8/97RM40K+IXz0AaMVvz70X8dtzH+ZpZpjXmV6m/Pbih3mx8/i4NX88T8bFgyw/APQoszn3JOLP5N6L+DO5l/iFxScZdmaKT1Lzl7QWv0DNHxW/Eqjga9KR+IE7vqb8hMPO+rXoD7MBPoJUCz7JpONlxCe5ttWq41F8DTtPnEf8Xmv+qPiVQAu+Jh1317apdnxd3hIOO0tc1fyaLD8AVPA9vtJJ9VCH5A8mS/yoU/4TOIadnmr+eDbEhwdB7Cc6JHe2kX73iuShjsR3+lwn0q9iPdH0/nYu9IfiVwJHv2Qb6Rl+pBFf4nOuOpF+DyvSsPOk4jV/Wp6CD8HqwtZRwdekw3ltq1VH4jOIvx59zR8VvxLw7Dkq+H4nHUfiz7y2dXRz66jjR5ry1+O4v20i/kT0VzkAmAv+zHafreA7mnQcPdRx9B5f4vud8tcvOOzMzFPxwUEQ7MI2250tj/hlrm0lPu2T/GyXt08iHnZqxK8EzHuOCr7rScfRQ51gHT+b+DzDzpOLiN8E/Wnij2YjXARfF7aOnugEK/g8I77El/g84q9POezUiF8JwnMfbMEPVvB5Jh2ev6QW7Oa2WMcPNuxs2F3NrwkS7jkJC77El/hdic/zXEfiP3V+8TfCRU/DB4aBIfcq+Jp0Sk466vgSv2TH38Bu2KlHv3oABNtzfBX8hJOOrxE/4aqTsOOv72rKn7fmT8vGuBAZ9hxfC76vO1tfI36xhzoSvz/xfV3eblhkym8ufiWg4r7Yha0Kvu0rHV/XtsWeZqrj24r/ZD+Xtw3RHxe/egBoz4la8ONNOvHE7+RvZxZ7q1Ns1Yknft9T/lzoPx3vHwZdzffx9px4T3SoCn68EV/ixxB/A4dT/lzor3IAaM8hvLBVwc8z4qvjmz/J3yCT+KPZBBcg5HxPtedQFfxid7Y5J51i/4soIVednOJv1MWU31z8ShDgOaa7Pcddwad6pUM16VBd21L9zq078Tdkurydd8pvLv6EA6AY91TzvbsLWxV8BvGLTToSX+JvPD/6M8XfBBc8A+8bBrbcUz3HLFnwi3EfsuCHHPGL/fpVyLc6IZ/rbNxRzR8VvxKwcZ92z3H3RMfdL16xiV9sxJf42cTfpBb9YTbF+YjBvbv3OSr4jsSnmnTc/e1Mjx3/qXzPdboSvxJE5V57DknBd3dnG1X8Yte2En9jYvGrB4C4Zy747vaczJNOyBE/s/gbmT7Q7En8TXH+M3HeMMsPALV7Eu4zix+Se4kfT/ynlXqg2ZP4lUBjjrhXwZf46vhPc1LzW4o/zGY4dzOci8zbvdp9yD1HHV+rTvjL201boD8amHMv8ePtOZp0NOIXmHRiP9DctB/xJxwAXXGvgp9zvu+Qe434urYtwH1m8TfDuZvjvcNA3Me4rXUqftQ9Rw91qK5tJf7mI+hXDwC1+064V8HXgs/zLjPz08yG3G+co+NPyxY4ZwucA405Lgp+yXafvOAnf4kfWPwm3D89uviVIPZVrdM9pwn3gfccwkmnK+4JxW/CvcR/hkPxp6G/ygEg7s25dzrfq+Br0vHY8ZsU/E3iir8FztkSZw+z4gBQu++Ee+05XbV7woKvSacr7iX+ZnbiVwKNOV64J9xztOA32XM06Th9qPOMEB1/WrbCWVvhrBUHQPLtnvC2VnuOCn7hVzqE17YSf/Ouxa8E4j7YbS3h+5zYb/Bjv9KJLf6mDQq+945fnxUHgNq9uCd8n+P3iU7sVzqxn2ZuGlr8rXDW1njPMNCYQ9LuY8/3KvjlC37s37aV+FsuJH4lKP8n7/1u9+Le9Z5T+A0+Z8H3O+kUfpr5zCgdf1q2wZnb4EyIe1/c+53vOV9k+l3wNenQir9FA+6txK8EtO2+8EPM8Nxrz1HBt5p0/I74m4UTv3oA9P0KU9yLe/I9RwXf+6Qj8bduLP42OHNbnDHMigNA3Kvda89JteBzFnzOSWfzQOJXApJ7Wo05nY85mu87v7ANv+CXL/iuxd+yAfcNxW/CfSfiD7MdTt8Op4P2WU6G7V63tQH2HBX8AJPO5p7Fb8L9UPxK4Iv7Dv+IgrgP8ByT9kWm64LvetIpf227pSvxJx8AhZcccU8+5pTnPsOe43rBL1/wM4z4WxcXfzuc/iy8exj4Gu7L/82c8g8xabkv//o+w56ToeBnmHS2KnVtO6/4o9yPB8zDvbg3/N1acW+459AWfE06W9ld23Yi/jDPxmnPxmng4b7D4d57uxf3/PN9+T3He8HXpLPNQg91uhW/EgQY7sv/ibQkYw7tbS3tfE+753gv+LSTztbWI/684lcPAJ4lh/ZZjrh3wT3tfO/9Db73gu99xN+uU/G3x6mjQZ4lh/Zv5qjdm+85tNx7f6KT5JXONhbiN+F+XPzqAcBT7b3/jpW4N2/32nPMxfde8Lfu4bdtSxb8meIPsxSnLMUpIOeedskR9zm5157jRXzvBf9Z/YhfCXisF/c5r2rzcK8L22AFf1uH4k8+AMS9i/+FE5NfsxL3jrgPsOAzi7+dc+6X4pT/wbtGA1V77/e04j5tuxf3KvhL5xR/8gGgJUfca8zJxr0K/rYJOv607ICTd8DJaLnaa7hXu3e93acSX3tOPO6Xzil+JSsOAFmvMcf1Va32HF/c6852+yIFf2agam813Gu7F/fl232eC9vOC/6zPEw6M7MjThoN+J/bB3hx39x6vcxJ3u615/CI/2yHk85M8asHABv33Vqf6hVmjHf3MbhPNd+r4G9PU/Bnij/MTjhxJ5y44gBQtXfHfUPrxb24j7HnkBf87TkmnXruxwNV+4RLjl7meGz35PO9FvylLbgvJv7kAyDVam9V7cl/pTbbQ0zyt5jac1Twd2jMfXPxd8Y7RwOt9jmHe3Ev7hPuOdkK/k5j4k8+ALrt9WGqfbbh3uqPKIS5qrW6rbWa77O9yFxqfWfbkvvR7IITdsEJCP8gJ8ySE+ZZjrhn495qvlfB37Hngl/hfjwrDgBVey05tq8w1e79ch9mz1karuDPDIrNOAmrfZglR9y3H3PCPM7h33PyLPg7z8n9LjjhOTh+NLCdcfhXe/4lR9wTbvf8v2wVZr7n535Hu4Jf4X48ILQ+YbVPONzz/xEFca89ZwfnBb8mu+K4XXEc0s44qvbinuRlDn+7N5zvVfB36UL8AffjgWacqNU+0nDP/2tWObmPtOeELPgzAy+TveGMY7jaR1pyDB/di3vv3Bu+z9mReMGfl/tdcdxuOHY00Iyjau9iuDe8pzV8mePicY7hc0zDC9udPBT8CvfjQU+Tfc4Zx0W1d7HkiHtx75T7nZkK/rTsjmMGgWYcj6u9iyXHxbMcF+3ecLt30e4N5/udeyj4nXM/Kn4lMJ/sDV/jpK32LpYcF68w03Lv4rbWcL7fhaPgzww4rQ8246St9i6WHHGfjXsX8/2uXRT88eyBo0cDR9YHe3xpW+1dvMnxwn3n97Rq99pzduuB+/Egj/XB3tp7qfZph/t43Lt4ixlvz9mtsfgzuR/muXjHICsOAFmvau/denEv7lNxv/tC4lcC9foMM068ai/uE17VZm73u3fB/dQDQBuOrJf1WnLE/XNCc/88HFUJCu/1XiZ7VXtV+2zDvaN2r4L/3EXFn3wANLc+3vWsrO/cei054l7c705Q8KdlT7x9EMh6zsleq73hmxy1e7X73RzuOU3Er2TFAaANRze03fb65Je0GnM05uxBUPBnBtk2nOSvcUI+yAk53Gu79/I4Z3frgt+c+73wtkpWHgCy3tD6kI8vHVV7R/e0IR9iOnqLubsf7ieKXz0A1OuzTfaq9n1Yb/4sR9yH5P557Qr+tDwfRw6y8gDQhuPFelV7R9XefMlRuxf3z/8V9+OB9vry1pvPOFrtteSY/1Zt1DHnuaXm+yYFf2YQ+27W/Ho2qvVRV3stOeJ+j7jc7423VgJZT2591BvaqO8vfS055r9Sq3a/Z0Hu6w4AR73e/G5W1qvak1zS+nqWI+73XPS2thPuh3kBjhgE5f9Ggqx31+sDzzi+3uSIe3fb/Z79cD+X+EPux7PyAJD1DL3e12Tva8bRkkNyT9vTH1EQ93vP4n7CAaBer+vZkNW+p9Ve1d4j9z29u9+Tu92P54U4vBLwPMIJvNcz9HqGGYeh2vdkPcMlbeDhXtzv3QX3Ew4A8geXsl7Wu55xGFZ7hiWHYbhneIj5/ILtviYvwlsGWXkAmJd6Wd+39QyTvbsZR9Ve3O8VhfvxgN/6nv5GQuwNx5317mYcd9Xe3ZLD8Cxnr1jc1x0AvsZ6We/3ejb2jONutSfhnuGedq/o3O+DwyoB/4Dj7vdmSXp9bOtjzzgk3DNUexLu917o16zYuK87ABisZxhwZH0e60m4Z7A+PPc9Vfu9XXE/zL548yAIVuplPduzS1nvnXt31ov7faZwP56VB4Csd73hyHq2Xu/RenG/d6B23yRQqQ8MfYZeL+7FvcacfZtxvx8OrWTlAaABR9bzc69qr2qfdrjfpzX3Ew6ADpd6jfUBer2szzbjaLh/ASX3nVs/mhfjTYOsPAA8Qh9+rOfZcNTr21jPw73HS9oM7X7f3rgfWj8x8GI9CfSyPuGG47Taz2U9D/ck1r8wIvd1BwAJ9E5LvdNeP9dY79R6pzOOqj1ttX+RT+5fgkPGg5ClnmfAkfU5reep9nP1eqfV3umSs29x7usOgAylnmfAUa+X9YFnHC05+3Z3T9sh94O8FG8cBir1VAMOzyOcJBsOz2TPc0Orar9PUO7Hs/IA6K/R+y31PAOOrJf17macJJe0+/Z8T9sh95Usw8GIutRrwGlf6tXrM0/2fld7nkva/fqs9gtwP56VB4BKPfmA0+sjHFkf7OWlqr24XzZJ/OoB4Gi98Vvq/Q44VO/r/T67lPX81X5ft0vOtHY/LS/DQcMgwHrj91aWqtRTWd/rm8s81ueZcZIvOcuacT8eBL6SzVPqqQYcWS/rqf4mWp5qv2wW95W8HAci4XpDVeqpBhyqB5dUby5dX89SvcahmnH2Y6r2bZachtyPB1pvNODIelnPYD3VjPNiV0tOQ+7rDgCqmZ5qvdGA4+ViNtVen2qyp5pxXsK35MyVV+ANw8AX9KmW+lQDjqw3tN71ZM/G/TKOaj+R+/EgJ/Splvps1vc61nvv9akme+/V/mVzcl9v/XheiQMg6COVetcv69kuZmW9ZpyXslq/GPfjWXkAqNELelmvXq9q/1I+7juxfvIBoOkmealXr9eGoxlnGY31vXI/yKvw+mFQbKNnm+kFvQac5Hu9Jvtl0a2vcD8ehL+PTQi9Sr15qZf17q5nl/nnvt768bwar1t5AKjRdw691htdzKrXL2C999c4Lyeo9hO5Hw/U6F2U+nmf3yR8gRNgwEm44QSw/uWU1b5hEGm60XrDAD3ha0tC6+eFXtb3Yf3L+Kr9vNbPxf0gr8Frh4Gg76TRE769ISz1hC/rCa2ft9Sr1zu1/pV9Vvtx6ydmlQNAjZ4BesL1Jmepl/VON5wC1r+CacZpzn0l+2N/JJlucs70OZf6nGN9jL2e8Hr2FfQzTkPrJ2aVA0DQC3qVev6xXtbL+tcsxP2EAyDJqxvO1/Qx1huVep6xvsD7es5eH2Oyf3V31b4mr8VrhlnlABD0gl5LvZeLWU7rC+z1sn7/hayfGKjRh2/0nFeynEt92gFH1r+KqdcvUO1nWj+e1+HVIL+J5byM5byPDbPecD6r5yz1nBeznHeznNezr2k94zS0fmIg6AW9o3eWnM/qwww4sv7V/q2v4X7GAUD4tlKNXusNlfWcpT7Mxax6/Wt7s36Y1+NVw4Bkt6GFnnOjp53pw6w3tNZzlnpZvz+99RODkNAXGOgFfdor2UilPpL1nHez+9NYP54D8Er4VV7QczZ6lfow1nNCL+tfv5D1E7PKASDoNd0IepV6Wb+/817fPOipzqvRh9no1egXaPS0pV69PtiGc8CceQNeMZpVDoDkyie/jGWGXks9LfTacF7Hav049+NBQujLKC/odSW7QKNXqdfd7AH9WD+eA/FyuFCeGfoF6nywRh8Meq03wUp9sA3ngEWtnxhQQa/dRtALevKlntn6BaB/bRrrZx8AqvPFdhtBvxj0zA/qmdcb5lLP/Lj+dYGsH+QgvGw0UJ1n2210GVsSeua3Nyr1Ia1/w/zQd2L9xMDLOs/83qZYnY/36iYe9Cr1IQec1/u3fjwHYxlyKi/oBb2gD38rK+sPGrF+YuDlDpb8vU28Jzdq9FpvHN3KxhvrD2zR65sHqvOcuw059MWeV5JPN+QzPXmp14BzYAvr54J+mDfipaOByWhDvs6T13lBL+h9Pb8JWerf4M36iQGb8uSjTcg6r0bv5ZFlSehDLvXBBpyD57F+PIfgJXCkvOq8I+iLvaMvOd0IepX6Ax1afwheMi3IrDz/bkOuvKB39JtT/OuNBpyDuyj1c2WVA0DKO1rnBb1Vo9d9rKA/yKH1g7wJLx4N1OWlfPg6zw+9Sr2vW9mDHFo/MbBabKKONqrzvgb6wsoLekH/Rgvox3Mo9jsU+0HTfFTlAzd6Qa+ZvvNGf1B06ydmlQNAXb4T5bXO54F+sctY3cdqvTmkuPWTDwAtNi7q/GJd3kWdF/QeH94EnukPdl7q6/Nm7DsauNvlA0/zLkYbF3XexU2soE+13hxS1voK9NMCKb+w8qrz5tC7uIkV9OalfjHo3+iz1DfMYdjnMOxTPQDU5VMpX7jOx4Z+sd0m9nQTe705hLLUT7N+YsD5krLwYuNltIm9zse+iRX0gv7QIqV+rlQPACkv5VXny+82avSu15s3MZX6mrwFL6oE6vK+uryX0cZLnfcC/WK7Tfjpxgv0hxYs9dOsn5jqAVByrtFik1Z5L9ewgt479F6uZN/cXalvmMPxwsPxQkh5d13eyzSvOq9GL+jfXLzUT7N+YuC0yxd+Y+NIeS8vbTLUeS9PbjI0ei8z/WH9QD/1AKAlXsonr/PhlRf0VNAf6m29WSBH4AWVVA8AKR+gyztSXtCr0YeH/jAO6ycGBYq8uryUV52Psds4mm4E/RG19L8Ve78Ve1cPABGvLu+oy2u3CTPQC/rD+4R+WqAi39Vco8VG63ybOq+bWDX6w1tAP9P6RgdA+dc1GR7Y5Nnlfd3BJrmGTbLb+NroD++t1NfkSDy/EkR9Q+nr6lXKB1PeV50X9G+JDv20IGeRl/KcXd7Xk8o8dd7XQJ+50R/ZOG/DXm/DXiAnPs9ck2exMVHeZLTJU+cF/RF9Qt/G+gH004KuiFeRl/JSXnWeaqAv8I7+CCfQTz0AVOR5Rnl3LynddXl3o43qvKA/sgvoB3k79qwEDFuNu0Xe3Vwj5aMq7+69jbuB/ogQ0E8L+Il397rGo/Imb2ysury7aT7VOu8R+iNbX8b2Df14jsLzjsLzkJl4zTVSXsp7hN5dnT/SGvppgYiPVOTV5QO/p/Q42nis82+NCH3TA0AtXsSHmWsSjjaCXtAfNZ37d+C5laDYUONxq1GRd6F8G+KlvOr8kVHqfA3001I9AES8i60m29WrYZFXly822mi3Oaof5SfmaOxxNPaAWjyt8lbES/kMi43W+bc5afTtla8JYgw1Cbcap0Xe6Sgv5Ut2eafXsG8nhn7qASDio241Tou8lHfU5Z2ONl4G+nd0B/3R2OMY7D6eCQdAwhavIu+oyBuO8jkXG0Plc9b5d/QA/bRAxAfeavwWeSkv5VXnj+4O+kqOxW6DTDgArCp82hafc5H3O8qn7fJ+R5skdf6Y6dBPC0S8iKdV3nCukfLZlD/Kbp0vAP0cB4Bhize8brVt8Wm3mrSjvOsu73eat63zR3e02yyW47DreOBopclMfNqnNa6LvJSX8sdwQD8tEw4AEZ+QeCnvVHnDIq8ufwxZnW+e4/GcQVC4wqvFi3gVeSlfbLHxu84f2yn00zLhAMjsu1q8361Gc43fLu96mj+GXvm6AyAb8S1XGg01WuS12Ej5Y4sr3xL64/GcE7DLeMDmu/ch3vsW7/3SNfO9K0OXT77YHGta56cpXxO4q/DmxLf0XcR7J95c+ZbES3nvyh8/P/SVvBM7D4J4FV7Em7d48znevMhL+ZZFXl3++O6UrwkSVnjzlcb8abyIZyDefK4xv3oNoPxxxUebxaCf4wAw9z1AhRfxDC3efKvRXCPljydQfpATsdN44NH3ABWeocWbb/EMxAfYagJcvarLn9Cn8jVBSN9jEG8+xIv4MFsNw1zDoLz57esJFsqP5yTsOAjku98KL+IjbTUMygcgXsqfOKZ8TRC1vzNUeBHPM9SIeCkfu8uftFDgl3j5zrPSiHieFk9S5NXl30mj/EnY8WTsMDGTDwD53lV/10qjFt8H8STKM8w16vInzVK+Jsjc38NMNDGe00QaasIU+fbEhxnl38nd5efKu/A/g0w+AOR7h76TrDTtfScZ4kV8yK2GRPkTWxNPqHxNoP4ew3dV+KgtXkVeyp/cTvm5D4Aw+4wmmqgrDcl1q4jvvMVHmmtO6qLLtyR+kFOwdGIg30km+EgVPtJKI+I5txqeueYkeuVrAub+TrK/8/geaYUPRjzJFs8zx0da5E8qOMr3ofx4TsX2g8D1OCPfwxNP4ruIV5E/2Sfx9Zl8AMh32v4ezHcRH77Fq8i/y1r5ugPAsLyrv8v3khVeLV7El9xq3kWj/KnY/jQ8e2ImHwDBcFd/76+/q8Jn2OKpWnzgRf7UHoivDwL43sk4E2+fiTfRqMKLeKfEn2KqfCXvxrOGQX+4U/neCe7yPY/vVBVeLV5bzWktlK8JAuBOVd5D9neqhzRUzyWpVhoNNS62mlN7KPILB0mWdzbfqfb3kAibHIoAABMjSURBVL6rwqfa4kNuNad1pPzp2G5aEKO8hxxn5LsqfIDffhLxp/VPfL3ycx8AIXGP6jvV/s7W30Ou8GwVPirxpzJtNQsTP54zsO0wEO7MuMt3X76L+JzEn0am/Cjx9YGL5h61vMt3+a4K36vvUYk/fR7l6w4ABt+Fe5lxRvtMsf6ulcZdhT8tKPFnYNszsc20TD0AhHva8h51f5fvmYf4Dn1/tyvi64NIzT3wMkNY3uV7yVvWwBetIv6MPokfz3uw9TBTDwDhrvKu/p7Zd8IKT7jSnE5PfH2g5q7yzjDOxN5nOvQ9doUX8Wd2TfyCB0DgWYZzmSFc3uW7a99jV3i1+Pc0Vv4sbDUtYJBduLte3jnLe/j+zlnhY/t+hkPi6zP1ABDurq9V5bt8V4UX8WdNQv9sbDkMSGp7+FlGuAco7+H7uyr8md4q/Ezi6zP1AAgvu3DXONMf7vLdaqKJt9Kc1cL32QdASNw7rO0Zmjvt8p5hfM/Q3zOs8O9hJf4cbFETFJBduOta1RHutOVdvoep8GcVJH7GAcAjO+0mk6S5a3mX7776e5IKf3Y74it5LzYfDdzJTrvJCPdg5Z12nEmyzzD7fhZNhZ9JfH0QVXbhbr6558Gd2Xfa+9U8vp9tSvyCB4BkD7bJCPd4uMt3+f7eWcSfi81qAtV24Z65uct39fez3fb3JsQvfgBokGGo7Wruwr38OKN95hwa4tv4Pp7z8MzRIPbUnmqTUXPnWWZSjTOp9vdzuH0fJ74+dQeAZI+6yWiWCYw7eXmX7+cW9H32AaDOrtquzT0t7uTlXf39vNbEn49Na1J3AKRaY/gHmWy1nX+WybbMyPdzvfk+M2BjXbIL95C4Z1tm+Mv7exP4Pp734RmjqTsAJDtbZ1dt55Rd5V2+n0fp+8xAnT2q7NpkOGVXeecs7+c67O/tA9cjO//OLtnzbDJ9yO5imck5zpznwfcLsEl9wCl756xL9jxXqcI9G+4uyvv5Fr63OgByFva0nT1tbVdzz4a7i/L+vi58H8/78fTRgJN1yZ5Q9rSbjJdZJu0yc74T3yu4N0ndASDW1dlpZRfu5LIL9wsIfJ99ANC2dS9TTOY1RrLnrO2OcE/u+4XYuD4zDgCxzs+6ZNcmI9yF+4WzrJ98AGRr68kLe/LO7mhtV3P30twvMCrvC+QDeFolMw4Ase5F9j5Yl+yOZNcskxz3Cyf5PjNQW2dmXbL31Nkdre09ye7otYyv5v7+UuW9kyDMCKMdpqfC7muNkey+blOF+4W94X4RNpoZJDRdbV2sq7YL9/cTLzNd+d72ABDr7nYYFfZe1xhfg4xqe6+yX8iN+3g+iKdWArV1se5oinG3s0t2j4P7hb3JXhL3JoHJAuNuhHHX1n0t7JK9QGd3t7YL94va4d7oAOA33d0CI9YLsO5uipHsBWR3t8lc1CfuH8JTZgbBTBfrrncYj1OMR9ndDTIeN5mLrHFvdADIdF8LjMcRplfWJbv3QUa4f7Af3MfzYWxYCax6uqp6ANZV2L0Xdsl+UVDZGwYyvb+qLtZjtHWnsvdX2NXZP+gB924OAI83pU4XGI0wYViX7CWndqe1/UN94v4RbNAkkOmq6pG2db+sOx3ZJfuHitf2hrh3cwA47emq6oVNF+vBphi/svsdZD7SnezjuRhPHg8cge7XdL/PYMS6WOdh3e8g82EL3Jtk9gHgF3SZbmK6RhiTtq7CLtkvnlP/j2J9+DK915Luuqe7rup+t3XtMFEL+4dZO3tz3JsEsUu6TI9quuttve+27ndhl+wXdyR70wNAoEfq6a7nF+9V3Tvr3mXvtbB/hKazL5xL8KTxIHZDLwC6d9PFulhnZl2yf3Qh2RsGMj0e6DLd3HS19fCsX2zU2TvMpVgPGUp636AHKOkB5pcAC4z3EaYA6wGmmI8Wkb1h4BF0lXSZ7oj1vk0X6ySyX9Iz63PJ3uUBEAB0lfQ8PV1VPU9bj1HYL+lB9ko+hidODKR57OFFpqeq6mI9FeuXTpe9YZCkngt0tpIeo6eHMV1t/RIm1tvL3iSXYQn8gl6gnodp6GGGlzCmh6nqYUaYSzwU9uayNwxS1XOBTmh6AdBlOqHpYv1jvbE+xwEgzfM09EglPZLpquqEVf1SvrbeJh/HEyYGPN28TD0X6AJdpqet6klY/3jjQJrz1PNgDV0lnXZSD2a6WP/4QvpfjnWRsJsH21sEuoaXkqYHq+ofi8h680CapwW9zIZebEaPV9JlOrnpl7Gy3v0BEKybx9NcoAv0wNtLSdMv88/6eD6Bx08MpDmn5gLdBejxSnpJ01XVL+/B9LkCtmIespuH1Dzk5BISdPV0Lz398o5Yb5hP4r8Rg3Jp7kjzqKCrpDvaXhjml0/0Y/pcaXoAiHJ182yaRy3pUff02FX9k/0EKuZaWpKAXlJzge4O9MujmD6eK7DOtCD5Yh54N4+teeB6HrihBy7pn6Axfa5AlEvzbJoLdKegy/QrOnL/CqxzJR53JR43xwEQuJXHLubS3G89j93QY4P+SSPT5wpEuS/KpbnrvUWgy/Qreja9rwOgcCUP38rDU15+aQmvefiGHr6kX9G/6eP5FNaeFsRzPAPlGTQvTHkGzTOAnsH0T00Hfd6A2XFRHoNyaR5Gc4F+Jb3pDXMV1roKa0GOq5WTU56km6ueh2noV1qAPjR9rsx3AGSYVkzWlSSt3IRyaR5sbxHoV80P/dQDQI57d1yUxyvmJktLHs0dNfSrWudqrFmT+Q6APH1clIds5dI8pOYC/epa5esOADkeppKnGlhSUZ6qm1tp/inKht5frsEa12CN+Q6AVGU8m+PZKE81s0jzJKBfM2cgx+W4HJfm6uZX+de8xAGQrYwn7OPZKnnOYp5taTHU/OqCoFfyaTy2PhDiclyOi3JpfjW95k1AnzdzHwAJm3jOMm7bxw0rec5WbljMc3bza3rQvHmuxeqDQIjLcTkuygNQnlbzT4+APm/gqIbbNnHbMp5zHzfv47aV3LaVpy3m17jVfJEDQIgnQVyOy/GElKfS/NqxXIfV6rPIAZC5hgtx9fGclVyUX2tKeRPNFwgkeLYmnnxUMd9VzB0X5SEpv26eXI/HDLLIAZC8g0twOS7HGdYV84HlWjLNFwgkeM4aztDEGcq4+rgovzYE5eUOAPMCztDBGQQX4jyIM+wqquQkjl9nQfl4PoP/mhlIcAlu3sGFOBXiJNOKKL9+HsoXy4IHgHn7JingJB1cWwpbE5fjcvz6RVt5gfwvHj0IxLe53SR8kwwpPIKTIK4+TriuXM9H+WJZ8AAw790q4MyC8yBubrcQp53Irw/k+OIHgOzmKeASXIJ7Wcbl+GeYHB/PDfjPJlnwADDfTAj3E/FN3sF5thQhzlzGP8PkeHPKFwtkt/j2sqJIcDVxOX5Da/Q/i0cNs/gBYF63Oas3z/wtvr10cKpNnKqJpyrjN7RwfOFAdtParfYtwYW4HP9sF9B3fwCYF23m3s1mN9V4QljA2To4Ww1na+JsZfyGjvp4V7kRj2wYmMMtu93ZLb4leDzBbyBDfC7HF06rA8C8Zat3B7CbsH0TFnB1cI+Cf7YI4vPmJjxiGJiTzTmYqHf7tVt8++3gQvzG+RFvk1YHgLnRXuBW73ZtN2H7phXcvHF7qeE3dod4qwPA3GvBHWMzkd0B+JbgN3oTfGI+h/9omLYHgHmz9lK3meGmtVvVOwbf6uA39SZ4y8Aca8EtuJPPJuLb9Ypyk6ng8+bzePho2h4A5p3aY91W45bdyas3Od83EQs+jnibwJxpqR14KuEv3cyzifgW35/vzvq+DgDzNu20a5OrLbhlt9r353ou4H3kC3hY88AcaF9kS+3YjZu8dJPPJuTLSTy+v9A6HRwA5iJ7J5u/a/OrzQ+37A5v9+eL871Absa/jwbmOotsqW1Os1+11bsz831z63RzAJg36Bgt20XRdtG1BXeezcSL3V/oge8ODgBzl117LbKltvmoLbhz2n3zWG7Bv82bbg4Ac4WDee2lZXsp2i4uJx3VbS+N25HdNy/Ed/vAXOQAWDvyWmRnVltwR7L7lvnzRfxrJZ0dAOYEh8TakdeOWrbUVt32Bfctk+zuJDDnWFjL62Beu+vajnYSd3Df0pvddAeAeVmO2qw99mt3ZJsTHJtsqf3Fnim/Ff+yQGAOsbA2l9od1iJbZCeH+9aO0uUBYN6RM9RqYa2WHaloO1X7i9ZwL5Yv4aGVwJzgwFI7xdrjHuJxEvHrtci+1VTtDtPxAWAOrqQ2hzgw1vJaRftWArW7PADM5c1QqJ12amGtfp1hGLnVm9rj+TL+ebF0fwCYU5uTade12m+z9ruHyOsv+SS728Dc3FRGi2lJndZr1xX7SzRkL5zb8E/j6eUAMEc2s9EBCrXrTi2szaWO4fWXp5DdbWCurYw21zYz0wFqtfdmLa9v6x/6ogeAef9VjxbT5ihHlTpGuS7Tr2/rP1/BQ9oE5simXTmC9egYVToS02GkDoP1ba297jx9HQDmqgro2EZHYlpSm7t8mwes2+R2/OPEwJxX1eeoQMto8+KcoVPnwfr2HtLjAWC+SGjiyKNzsB4tps0V/gof1r0cAOaqan0W0ObOyuiobTqM1LeP5av4h/bp9wAwnyC0bGSuz4OYrxNaPDIzfXtHUvcUmGOqxTktzVF1Dtyjoxp9O73UbXIH/n5aej8AzHdhjc6iOY/OsYEObPRXa5nuLzA3tPOYt1q1ZhVnAW3uaSSm73B9AJiLKZS1aag7h2/QUY2+Yyxfw991FZjT2VPMJ2ANzZo1tG8k1PmOro3uNYUOAHMoJbK2Zu3O6s7ugP5a63wdf1sTmIvZd8wv5XQBqPtAzRoh6/PX+ge67xQ9AMx9FMd6oaG5OcOyEUPnrxc4AMyVLBPz52t6M6cLQC3Oovnr7by+E3/TbUofAOYmymI9ydA1oCozP813FgnMZSwc8zdqeh6nVxnaMUquHObI3mmXu/DX9TE4AMwdNI/5GzW9kNOybDs9m8tI7vJdpQJzDUWwniqLY1uOJfKdZC7HPwDMeyhJzN858MQcQZKY91OemPt4F0e+gb/qKTAXUP6ayyuCZbE4vosG5ZKxPADMvSOMef1ki3kJJYx5ISWMuaTfIMvd+MsmgTl5PDHHjjPm3nHGnDzOmMPnXeS7y8b+ADAHjjnmzDHHHDvmmHvHHHN276YJzI0jjDlt/DEHjj/mzJHH3L676fNNPLjvsBwA5qK5iDlqXmKum4uYA+cl3+wfYqvAHDXymFvmKOai+Yq5a45iDuU3XeVb+IuG4ToAzAlzF3PF3MXcMo8xFy0wwd8yDcwJcxRzvJzG3C+/MYfMacxh/ZaTMB4A5mC5jrlZ3mOOl+uYi+Y938aflwzMwXIac6dixBysGDFnK0a+XRZfhvAeAOY2RYq5UJFi7lSkmAv47UD5Dv5s3sDcphgxVylezG0KGXOkQuY788tLEvYDwJyhwDHHKHbMVQoccze/EyUwZyhkzPXJEHOGwsecpwz5P/ypYdwcAObcpIo5PXliDlCe2FLLGZhbkyTm0CSMuTgJYy5aznwXf7JY/B0A5qxkjrkvyWMOTeZ8d1FkmQNzU9LGXBNFqpqrGpvX79LH8QEgv9i+gDkiilQlz/fwx1SBuRqKDHUBt7kdiiNYv+ckQQ4Acx0UGRoGaHOVlO81+Ajfxx+1DyQX/xcwF0ERoxlQ/n4XpPpKwANAWrn+AuYKKDL0+3kOAPMfeEVcyty0DTRqfoA/dJH4B4BwifoFzH/IleR6/sB/YP5jrIhISSoxzSn8gYfcgz/oNukOAFmT8wuY/+gqYdC8J1Bg/pOpyEThaP4FzCVS7tEBoGJoDoEiFmXxPQ0s/iF+P0CgH3h9AXVDkdfVFzAXTfmhDgD9v8MSzfwLSCJ9gR+2O5Duxe/1HZj/nChhvoB+4PUF/FJ4b8roABBwYov3C5gDodwb+iPA/J+4kvkLmP8AKPoC9/7qn8GP8LvZogNAkImARF/AXBzlR0wfAeb/IhV9AVlmDoHyI6OP8GP8jmF0AKh56YdfXyAIZ8qP5z0AdPLrCyT/AlJDX+DHWQ8PHQD2AAkj8x8DxfsXuA+/rdw3/0eA+X9zir5AyC8gj/QF7qM/lnQA2EshZcx/DBR9gfs6/WfwE/yWi0D/xesL6At4/wLmjig/8fkRdADY//RKDfMfA0Vf4Ccp/xnA/D+Boi+gLxDmC9yPByn3+/kIOgDsf2bCxPxfs6IvoC9w/1wHgL6XvoC+gL6AvsD9eNBP8ZvZogNA//S9fgHzHx5FX+Cnzv8ZwPw/gaIvoC+gL6Av8FMdAPpHoC8Q5gv8DL+h6Av8jPufAcz/Eyj6AvoC+gL6Aj/TAaB/BPoC+gKuv8AD+HXlAT8fAeb/CRR9AX0BfQF9gQd0AOgfgb6AvoC+gL7AA8X+P4Cf49cUfQF9AX0BfYGf58NQB4D9fweKvoC+gL7Az00OgF9A0RfQF9AX0BdAQgzt/xMo+gL6AvoC+gK/MDkAfvmr/EL/t75Dsn8Dir7AL3P/M/h/aeM9TDbqzaAAAAAASUVORK5CYII="
      let basetex = new Texture(base, mainScene.current);
      BaseTexture.current = basetex;

const baseDyna = new StandardMaterial("dynamicMaterial", mainScene.current);
BaseDynamicTexture.current = baseDyna;
baseDyna.diffuseTexture = basetex;

     

    


     









      
    

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