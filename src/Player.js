import Entity from "./Entity";

class Player extends Entity {
  inventory = [];

  attributes = {
    name: "Player",
    ascii: "@",
    health: 10,
    strength: 16,
    gold: 0,
    armor: 0,
    exp: 0,
    level: 1,
  };

  move(dx, dy) {
    if (this.attributes.health <= 0) return;
    this.x += dx;
    this.y += dy;
  }

  add(item) {
    this.inventory.push(item);
  }

  remove(item) {
    this.inventory = this.inventory.filter(
      (inventoryItem) => inventoryItem.name !== item.name
    );
  }

  copyPlayer() {
    let newPlayer = new Player();
    Object.assign(newPlayer, this);
    return newPlayer;
  }
}

export default Player;
