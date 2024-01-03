/***************************************************************************************************************************************
 *                                                    ABOUT THIS EXERCISE                                                              *
 *                                                                                                                                     *
 *   This is just a small game-like to test some JavaScript tools that I learnt so far, images and dialogues will stay bland as they   *
 *                                                                                                                                     *
 *   are since they are not the main focus of this training exercise.                                                                  *
 *                                                                                                                                     *
 *   Code improvement advices are all welcome, thanks to anyone for the help on how to make it look nicer and work better! :)          *
 *                                                                                                                                     *
 ***************************************************************************************************************************************/

// Variable Values

let hp = 100;
let gold = 30;
let attack = 5;
let counter = 0; //Everytime you click on a button it will increase, it will be displayed as your highscore.

// Selectors

const buttons = document.querySelectorAll(".button"); // Button for counter
const button1 = document.querySelector("#buttonOne"); // Store Button
const button2 = document.querySelector("#buttonTwo"); // Dungeon Button
const button3 = document.querySelector("#buttonThree"); // Boss Button

const button1Text = document.querySelector("#buttonOneText");
const button2Text = document.querySelector("#buttonTwoText");
const button3Text = document.querySelector("#buttonThreeText");

const hpVal = document.querySelector("#hpValue"); // Health Points
const atkVal = document.querySelector("#atkValue"); // Attack
const goldVal = document.querySelector("#goldValue"); // Gold

const text = document.querySelector("#text"); // Text

// Objects for the weapons, places and monsters in the game

const weapons = [
  { name: "dagger", power: 30, cost: 20 },
  { name: "sword", power: 50, cost: 60 },
  { name: "greatsword", power: 100, cost: 120 },
];

const monsters = [
  { name: "slime", currrentHealth: 38, attack: 4, reward: 8, totalHealth: 38 }, // slime will need 2 hits to die, with dagger
  {
    name: "skeleton",
    currentHealth: 101,
    attack: 9,
    reward: 19,
    totalHealth: 101,
  }, // skeleton will need 3 hits to die, with sword
  { name: "evil rooster", health: 600, attack: 18 }, // evil rooster will need 6 hits to die, with greatsword // if you hit the head 4 times (150*4) it will die but you'll take a lot of damage
];

const places = [
  {
    name: "store",
    "button text": ["Buy Potion 10G (+10HP)", "Buy Weapon", "Leave the Store"],
    "button function": [buyPotion, buyWeapon, leavePlace],
    text: ["Welcome in the Store, how can I help you today?"],
    "picture url":
      "https://www.dndspeak.com/wp-content/uploads/2021/04/Shop-1.jpg",
  },
  {
    name: "dungeon",
    "button text": ["Fight slime", "Fight skeleton", "Leave the dungeon"],
    "button function": [fightSlime, fightSkeleton, leavePlace],
    text: [
      "There are plenty of monsters in front of you, what do you want do ?",
    ],
    "picture url":
      "https://cdnb.artstation.com/p/assets/images/images/010/785/853/large/alexander-sychov-deepeldercaves-screenshot-11.jpg?1526235622",
  },
  {
    name: "town",
    "button text": ["Store", "Dungeon", "Boss"],
    "button function": [goStore, goDungeon, goBoss],
    text: ["What are you up to now?"],
    "picture url":
      "https://get.wallhere.com/photo/sky-village-mountains-windmill-medieval-1658807.jpg",
  },
  {
    name: "boss",
    "button text": ["Attack head", "Attack body", "Flee"],
    "button function": [atkHead, atkBody, leavePlace],
    text: [
      "And so you reach the evil entity, you can't properly see because of the fog but...WAIT! That is not a simple rooster, that is the evil rooster 'Hahn'! We have to save the village from this evil creature, what are you going to do ?",
    ],
    "picture url":
      "https://i.pinimg.com/564x/88/10/f9/8810f9553f3c207b3dc2bf63121f17a9.jpg",
  },
];

// The counter will increase everytime you click on a button, giving your final score once you kill the boss

buttons.forEach(function (button) {
  button.addEventListener("click", function () {
    counter++;
  });
});

// Button actions

button1.onclick = goStore;
button2.onclick = goDungeon;
button3.onclick = goBoss;

// Main functions for locations and fighting.

function activity(place) {
  button1Text.innerText = place["button text"][0];
  button2Text.innerText = place["button text"][1];
  button3Text.innerText = place["button text"][2];
  button1.onclick = place["button function"][0];
  button2.onclick = place["button function"][1];
  button3.onclick = place["button function"][2];
  document.getElementById("enviroment").src = place["picture url"];
  text.innerText = place.text;
}

function fight(monster) {
  if (hp > monster.attack) {
    if (monster.currentHealth > attack) {
      monster.currentHealth -= attack;
      hp -= monster.attack;
      hpVal.innerText = hp;
      text.innerText = `The ${monster.name} has ${monster.currentHealth} health points left.`;
    } else {
      hp -= monster.attack;
      hpVal.innerText = hp;
      gold += monster.reward;
      goldVal.innerText = gold;
      text.innerText = `You have defeated the ${monster.name} you obtain ${monster.reward} gold.`;
      monster.currentHealth = monster.totalHealth;
    }
  } else {
    hpVal.innerText = 0;
    text.innerText = " You are dead.";
  }
}

// Functions related to the store activities;

function goStore() {
  activity(places[0]);
  // Because the weapons[0] will change everytime you buy a new one, adding it here will become dynamic.
  text.innerText = `Welcome in the Store, how can I help you today? We have in sale this ${weapons[0].name} for only ${weapons[0].cost} gold.`;
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
  if (weapons.length > 0) {
    if (gold >= weapons[0].cost) {
      attack = weapons[0].power;
      gold -= weapons[0].cost;
      gold += weapons[0].cost / 10;
      atkVal.innerText = attack;
      goldVal.innerText = gold;
      text.innerText =
        "I hope this new weapon will suit your taste, also I will buy your old weapon and give you some gold back.";
      weapons.shift();
    } else {
      text.innerText = `Are you sure you have enough gold to afford the ${weapons[0].name} ?`;
    }
  } else {
    text.innerText =
      "We don't have any new weapons in stock, can I help you with something else?";
  }
}

function leavePlace() {
  activity(places[2]);
}

// Functions related to the dungeon activities

function goDungeon() {
  activity(places[1]);
}

function fightSlime() {
  // monsters { name: "skeleton", health: 101, attack: 9, reward: 19, originalValue: 101 } pos 0
  fight(monsters[0]);
}

function fightSkeleton() {
  // { name: "skeleton", health: 101, attack: 9, reward: 19, originalValue: 101 } pos 1
  fight(monsters[1]);
}

//Functions related to the boss fight activities

function goBoss() {
  activity(places[3]);
}

function atkHead() {
  // { name: "evil rooster", health: 600, attack: 18} pos 2
  if (hp > monsters[2].attack + 20) {
    if (monsters[2].health > attack + 50) {
      monsters[2].health -= attack + 50;
      hp -= monsters[2].attack + 20;
      hpVal.innerText = hp;
      text.innerText = `You go for the head of the monster, it is a heavy hit but he also catches you unprepared and peaks you heavily. 
      The ${monsters[2].name} has ${monsters[2].health} health points left.`;
    } else {
      hp -= monsters[2].attack;
      hpVal.innerText = hp;
      text.innerText = `After ${counter} days the village of RPG Game is free from the calamity of the evil rooster, you proved your courage to the people and they elect you as the new ruler of the village!`;
    }
  } else {
    hpVal.innerText = 0;
    text.innerText =
      "You are dead, the evil rooster will take over the village and start its kingdom.";
  }
}

function atkBody() {
  if (hp > monsters[2].attack + 10) {
    if (attack > 5) {
      if (monsters[2].health > attack + 10) {
        monsters[2].health -= attack - 15;
        hp -= monsters[2].attack + 10;
        hpVal.innerText = hp;
        text.innerText = `You go for the body of the monster, it is a normal hit but it also catches you and scatches you with its fangs. 
        The ${monsters[2].name} has ${monsters[2].health}health points left.`;
      } else {
        hp -= monsters[2].attack;
        hpVal.innerText = hp;
        text.innerText =
          "After " +
          counter +
          " days the village of RPG Game is free from the calamity of the evil rooster, you proved your courage to the people and they elect you as the new ruler of the village!";
      }
    } else if (attack === 5) {
      hp -= monsters[2].attack + 5;
      hpVal.innerText = hp;
      text.innerText = `You aim for the body but your weapon is too weak to evenscratch the beast, it heals back and hits you with its fangs.
      The ${monsters[2].name} has ${monsters[2].health}health points left.`;
    }
  } else {
    hpVal.innerText = 0;
    text.innerText =
      " You are dead, the evil rooster will take over the village and start its kingdom.";
  }
}
