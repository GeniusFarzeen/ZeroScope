const canvas = document.getElementById('renderCanvas');
const engine = new BABYLON.Engine(canvas, true);
let scene, camera, playerMesh;


const createScene = ()=>{
scene = new BABYLON.Scene(engine);
scene.clearColor = new BABYLON.Color3(0.05,0.06,0.08);


camera = new BABYLON.UniversalCamera('cam', new BABYLON.Vector3(0,2,-10), scene);
camera.attachControl(canvas,true);
camera.speed = 0.5;
camera.ellipsoid = new BABYLON.Vector3(0.5,1,0.5);


const light = new BABYLON.HemisphericLight('h', new BABYLON.Vector3(0,1,0), scene);
const ground = BABYLON.MeshBuilder.CreateGround('g', {width:200, height:200}, scene);


// simple player mesh for collisions
playerMesh = BABYLON.MeshBuilder.CreateBox('player', {size:1}, scene);
playerMesh.isVisible = false; // camera is player's view


// spawn a simple NPC for PvE testing
spawnTestNPC(new BABYLON.Vector3(5,1,5));


// input: left-click to shoot
canvas.addEventListener('pointerdown', ()=>{ shootRay(); });


return scene;
}


engine.runRenderLoop(()=>{ if(scene) scene.render(); });
window.addEventListener('resize', ()=>{ engine.resize(); });


createScene();


// Simple ray-based shooting hooked to guns.js
function shootRay(){
const origin = camera.position;
const forward = camera.getForwardRay(1000);
const hit = scene.pickWithRay(forward);
if(hit && hit.pickedMesh && hit.pickedMesh.metadata && hit.pickedMesh.metadata.isNPC){
// notify npc
if(typeof window.onNPCHit === 'function') window.onNPCHit(hit.pickedMesh, computeWeaponDamage());
}
}


function computeWeaponDamage(){
// delegates to guns.js; fallback
return (window.getCurrentWeaponDamage) ? window.getCurrentWeaponDamage() : 25;
}
