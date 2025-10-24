// Simple guest/localStorage login and OP dev account
const STORAGE_KEY = 'zeroscope_player';
const OP_USERNAME = 'OP_Farzeen';


function loadPlayer(){
const raw = localStorage.getItem(STORAGE_KEY);
if(raw) return JSON.parse(raw);
return { name: 'Guest', hp:100, xp:0, weapon:'Assault Rifle', weapons:['Assault Rifle','Sniper','Shotgun','RPG','Freeze Gun','Grenade'], god:false };
}


function savePlayer(p){ localStorage.setItem(STORAGE_KEY, JSON.stringify(p)); }


const player = loadPlayer();


// UI bindings
const usernameInput = document.getElementById('username');
const guestBtn = document.getElementById('guest-btn');
const opBtn = document.getElementById('op-login');


function applyPlayerToUI(){
document.getElementById('hp-val').innerText = player.hp;
document.getElementById('xp-val').innerText = player.xp;
document.getElementById('weapon-val').innerText = player.weapon;
}


guestBtn.addEventListener('click', ()=>{
const name = usernameInput.value.trim() || 'Guest';
player.name = name; player.god = false; savePlayer(player); applyPlayerToUI();
alert('Playing as '+name+' — progress saved locally.');
});


// OP login: built-in dev account (use carefully!)
opBtn.addEventListener('click', ()=>{
player.name = OP_USERNAME; player.god = true; player.hp = 99999; player.xp = 999999; savePlayer(player); applyPlayerToUI();
alert('OP account activated. God mode ON.');
});


applyPlayerToUI();
