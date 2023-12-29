/*
PROBLEMS TO FIX 
1. The shop doesn't change the "sale" chat updating the weapon everytime you buy a new one, it alwyas shows the dagger as choice;
2. Fixing some values from rewards and monster stats;
*/


// Variable Values
let hp = 100;
let gold = 50;
let attack = 5;

// Selectors
const button1 = document.querySelector("#buttonOne"); // Store Button
const button2 = document.querySelector("#buttonTwo"); // Dungeon Button
const button3 = document.querySelector("#buttonThree"); // Boss Button

const button1Text = document.querySelector("#buttonOneText");
const button2Text = document.querySelector("#buttonTwoText");
const button3Text = document.querySelector("#buttonThreeText");

const hpVal = document.querySelector("#hpValue"); // Health Points
const atkVal = document.querySelector("#atkValue"); // Attack
const goldVal = document.querySelector("#goldValue"); // Gold

const text = document.querySelector("#text");

// Objects for the weapons, places and monsters in the game

const weapons = [
  { name: "dagger", power: 30, cost: 20},
  { name: "sword", power: 50, cost: 60},
  { name: "greatsword", power: 100, cost: 120},
];

const monsters = [
  { name: "slime", health: 38, attack: 4}, // slime will need 2 hits to die
  { name: "skeleton", health: 101, attack: 9}, //skeleton will need 3 hits to die
  //{ name: "evil rooster", health: 50, attack: 60}, //evil rooster will need 6 hits to die
]
const places = [
  {
    name: 'store',
    "button text" : ["Buy Potion 10G (+10HP)", "Buy Weapon", "Leave the Store"],
    "button function" : [buyPotion, buyWeapon, leavePlace],
    text: ["Welcome in the Store, how can I help you today? We have in sale this " + weapons[0].name + " for only " + weapons[0].cost + "."]
  },
  {
    name: 'dungeon',
    "button text" : ["Fight slime", "Fight skeleton", "Leave the dungeon"],
    "button function" : [fightSlime, fightSkeleton, leavePlace],
    text: ["There are plenty of monsters in front of you, what do you want do ?"]
  },
  {
    name: "town",
    "button text": ["Store", "Dungeon", "Cave"],
    "button function": [goStore, goDungeon, goBoss],
    text: ["What are you up to now?"]
  }
];

// Button actions

button1.onclick = goStore;
button2.onclick = goDungeon;
button3.onclick = goBoss;

// Main function recalling objects in places.

function activity(place) {
  button1Text.innerText = place["button text"][0];
  button2Text.innerText = place["button text"][1];
  button3Text.innerText = place["button text"][2];
  button1.onclick = place["button function"][0];
  button2.onclick = place["button function"][1];
  button3.onclick = place["button function"][2];
  text.innerText = place.text;
}

// Functions related to the store activities;
function goStore() {
  document.getElementById("enviroment").src =
    "https://www.dndspeak.com/wp-content/uploads/2021/04/Shop-1.jpg";
 activity(places[0]);
}

function buyPotion() {
  if (gold >= 10) {
    hp += 10;
    gold -= 10;
    hpVal.innerText = hp;
    goldVal.innerText = gold;
    text.innerText = "Thanks for your purchase!";
  } else {
    text.innerText =
      "It looks like you don't have enough money to buy a potion.";
  }
}
function buyWeapon() {
  if (gold >= weapons[0].cost) {
    attack = weapons[0].power;
    gold -= weapons[0].cost + (weapons[0].cost/10);
    atkVal.innerText = attack;
    goldVal.innerText = gold;
    text.innerText = "I hope this new weapon will suit your taste, also I will buy your old weapon and give you some gold back.";
    weapons.shift();
  } else {
    text.innerText =
      "Are you sure you have enough money to afford the " + weapons[0].name + "?";
  }
}
function leavePlace() {
  activity(places[2]);
  document.getElementById("enviroment").src =
    "https://get.wallhere.com/photo/sky-village-mountains-windmill-medieval-1658807.jpg";
}

// Functions related to the dungeon activities

function goDungeon() {
  document.getElementById("enviroment").src =
    "https://cdnb.artstation.com/p/assets/images/images/010/785/853/large/alexander-sychov-deepeldercaves-screenshot-11.jpg?1526235622";
  activity(places[1]);
}

function fightSlime() {
  // monsters { name: "slime", health: 38, attack: 8}
  if(hp > monsters[0].attack){
  if(monsters[0].health > attack) {
  monsters[0].health -= attack;
  hp -= monsters[0].attack;
  hpVal.innerText = hp;
  text.innerText = "The slime has " + monsters[0].health + " health points left."
  } else {
    hp -= monsters[0].attack;
    hpVal.innerText = hp;
    gold += 8;
    goldVal.innerText = gold;
    text.innerText = "You have defeated the slime, you obtain 8 gold";
    monsters[0].health= 38;
  }
} else {
  hpVal.innerText = 0;
  text.innerText = " You are dead."
}
}

function fightSkeleton() {
  // monsters { name: "skeleton", health: 115, attack: 13}
  if(hp > monsters[1].attack){
    if(monsters[1].health > attack) {
    monsters[1].health -= attack;
    hp -= monsters[1].attack;
    hpVal.innerText = hp;
    text.innerText = "The slime has " + monsters[1].health + " health points left."
    } else {
      hp -= monsters[0].attack;
      hpVal.innerText = hp;
      gold += 28;
      goldVal.innerText = gold;
      text.innerText = "You have defeated the skeleton, you obtain 28 gold";
      monsters[1].health= 115;
    }
  } else {
    hpVal.innerText = 0;
    text.innerText = " You are dead."
  }
}

//Functions related to the boss fight activities
function goBoss() {
  console.log("Hi")
}


