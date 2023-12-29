// Variable Values
let exp = 0;
let hp = 100;
let gold = 50;
let attack = 0;

// Selectors
const button1 = document.querySelector("#buttonOne"); // Store Button
const button2 = document.querySelector("#buttonTwo"); // Dungeon Button
const button3 = document.querySelector("#buttonThree"); // Boss Button

const button1Text = document.querySelector("#buttonOneText");
const button2Text = document.querySelector("#buttonTwoText");
const button3Text = document.querySelector("#buttonThreeText");

const expVal = document.querySelector("#expValue"); // Experience
const hpVal = document.querySelector("#hpValue"); // Health Points
const atkVal = document.querySelector("#atkValue"); // Attack
const goldVal = document.querySelector("#goldValue"); // Gold

const text = document.querySelector("#text");

// Button actions

button1.onclick = goStore;
//button2.onclick = goDungeon;
//button3.onclick = goBoss;

// Functions

function goStore() {
  button1Text.innerText = "Buy Potion 10G (+10HP)";
  button2Text.innerText = "Buy Weapon";
  button3Text.innerText = "Leave the Store";
  text.innerText = "Welcome in the Store, how can I help you today?";
  document.getElementById("enviroment").src =
    "https://image.tensorartassets.com/cdn-cgi/image/w=1920,f=jpeg/posts/images/616996207239212426/6a3a3931-1888-4b4d-b8fc-14514b0f73d9.jpg";
  button1.onclick = buyPotion;
  function buyPotion() {
    if (gold >= 10) {
      hp += 10;
      gold -= 10;
      hpVal.innerText = hp;
      goldVal.innerText = gold;
      text.innerText = "Thanks for your purchase!";
    } else {
      text.innerText =
        'It looks like you don\'t have enough money to purchase a "healthy beverage".';
    }
  }
  button2.onclick = buyWeapon;
  function buyWeapon() {
    if (gold >= 30) {
      attack += 5;
      gold -= 30;
      atkVal.innerText = attack;
      goldVal.innerText = gold;
      text.innerText = "I hope this new weapon will suit your taste.";
    } else {
      text.innerText =
        "This weapon costs 30G, are you sure you have enough money to afford it?";
    }
  }
  button3.onclick = leaveStore;
  function leaveStore() {
    document.getElementById("enviroment").src =
      "https://get.wallhere.com/photo/sky-village-mountains-windmill-medieval-1658807.jpg";
    button1.onclick = goStore;
    button1Text.innerText = "Store";
    button2Text.innerText = "Dungeon";
    button3Text.innerText = "Boss";
  }
}
/*
function goDungeon() {
    button1Text.innerText = "Fight Slime";
    button2Text.innerText = "Fight Werewolf";
    button3Text.innerText = "Leave the Dungeon";
}

function goBoss() {
    button1Text.innerText = "Attack head";
    button2Text.innerText = "Attack body";
    button3Text.innerText = "Flee";
}
*/
