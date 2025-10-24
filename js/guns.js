// Weapons available: Assault Rifle, Sniper, Shotgun, RPG, Freeze Gun, Grenade
let currentWeapon = 'Assault Rifle';


const WEAPONS = {
'Assault Rifle': {damage:20, fireRate:100, ammo:-1},
'Sniper': {damage:120, fireRate:800, ammo:10},
'Shotgun': {damage:45, fireRate:400, ammo:8},
'RPG': {damage:200, fireRate:1200, ammo:3},
'Freeze Gun': {damage:5, fireRate:150, ammo:50, special:'freeze'},
'Grenade': {damage:150, fireRate:1000, ammo:5, aoe:true}
};


function getCurrentWeaponDamage(){
return WEAPONS[currentWeapon].damage || 10;
}


// Simple key switching: 1-6
window.addEventListener('keydown', (e)=>{
if(e.key === '1') switchWeapon('Assault Rifle');
if(e.key === '2') switchWeapon('Sniper');
if(e.key === '3') switchWeapon('Shotgun');
if(e.key === '4') switchWeapon('RPG');
if(e.key === '5') switchWeapon('Freeze Gun');
if(e.key === '6') switchWeapon('Grenade');
});


function switchWeapon(name){
if(!WEAPONS[name]) return;
currentWeapon = name;
document.getElementById('weapon-val').innerText = name;
document.getElementById('ammo-val').innerText = (WEAPONS[name].ammo===-1)?'∞':WEAPONS[name].ammo;
}


// export to global so engine can call damage
window.getCurrentWeaponDamage = getCurrentWeaponDamage;


// initialize UI default
switchWeapon(currentWeapon);
