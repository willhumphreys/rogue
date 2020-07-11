import Loot from "./Loot";
import Monster from "./Monster";
import Stairs from "./Stairs";
import monsters from "./monsters.json";
import { rollDice } from "./DiceRoller";

const lootTable = [
  {
    name: "Long Sword",
    color: "darkgrey",
    ascii: "/",
    offset: { x: 6, y: 3 },
  },
  {
    name: "Health Potion",
    color: "red",
    ascii: "!",
    offset: { x: 6, y: 3 },
  },
  {
    name: "Gold coin",
    color: "yellow",
    ascii: "$",
    offset: { x: 6, y: 3 },
  },
  {
    name: "Light Armor",
    color: "lightgrey",
    ascii: "#",
    offset: { x: 4, y: 3 },
  },
];

const monsterTable = monsters.map((monster) => {
  monster.ascii = monster.name.substr(0, 1);
  monster.offset = { x: 2, y: 3 };
  monster.health =
    typeof monster.hp === "string" ? rollDice(monster.hp) : monster.hp;
  return monster;
});

class Spawner {
  constructor(world) {
    this.world = world;
  }

  spawn(spawnCount, createEntity) {
    for (let count = 0; count < spawnCount; count++) {
      let entity = createEntity();
      this.world.add(entity);
      this.world.moveToSpace(entity);
    }
  }

  spawnLoot(spawnCount) {
    this.spawn(spawnCount, () => {
      return new Loot(
        getRandomInt(this.world.width - 1),
        getRandomInt(this.world.height - 1),
        this.world.tilesize,
        lootTable[getRandomInt(lootTable.length)]
      );
    });
  }

  spawnMonsters(spawnCount) {
    this.spawn(spawnCount, () => {
      return new Monster(
        getRandomInt(this.world.width - 1),
        getRandomInt(this.world.height - 1),
        this.world.tilesize,
        monsterTable[getRandomInt(monsterTable.length)]
      );
    });
  }

  spawnStairs() {
    let stairs = new Stairs(
      this.world.width - 10,
      this.world.height - 10,
      this.world.tilesize
    );
    this.world.add(stairs);
    this.world.moveToSpace(stairs);
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

export default Spawner;
