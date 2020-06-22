import Entity from "./Entity";

class Monster extends Entity {
  action(verb, world) {
    if (verb === "bump") {
      //attack
      world.addToHistory(`Player attacks ${this.attributes.name}!`);
      this.attributes.health = this.attributes.health - 1;
      if (this.attributes.health <= 0) {
        world.addToHistory(`${this.attributes.name} dies!`);
        world.remove(this);
      } else {
        world.addToHistory(
          `${this.attributes.name}'s health = ${this.attributes.health}`
        );
        world.player.attributes.health = world.player.attributes.health - 1;
        if (world.player.attributes.health <= 0) {
          world.addToHistory("You have died!");
        } else {
          world.addToHistory(
            `You have ${world.player.attributes.health} health`
          );
        }
      }
    }
  }

  move(dx, dy) {
    if (this.attributes.health <= 0) return;
    this.x += dx;
    this.y += dy;
  }

  copyMonster() {
    let newMonster = new Monster();
    Object.assign(newMonster, this);
    return newMonster;
  }
}

export default Monster;
