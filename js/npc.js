function spawnTestNPC(position){
const npc = BABYLON.MeshBuilder.CreateSphere('npc', {diameter:1.6}, scene);
npc.position = position;
npc.metadata = { isNPC:true, hp:100 };
npc.material = new BABYLON.StandardMaterial('m',scene);
npc.material.emissiveColor = new BABYLON.Color3(0.6,0.1,0.1);
return npc;
}


window.onNPCHit = function(mesh, damage){
if(!mesh || !mesh.metadata) return;
mesh.metadata.hp -= damage;
// visual feedback
mesh.scaling = new BABYLON.Vector3(1, 1 - Math.max(0, (100-mesh.metadata.hp)/100*0.3), 1);
if(mesh.metadata.hp <= 0){
mesh.dispose();
// reward player
const cur = JSON.parse(localStorage.getItem('zeroscope_player')) || {xp:0};
cur.xp = (cur.xp||0) + 50;
localStorage.setItem('zeroscope_player', JSON.stringify(cur));
document.getElementById('xp-val').innerText = cur.xp;
}
}
