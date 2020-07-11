import Entity from "./Entity";

class Loot extends Entity {
  action(verb, world) {
    if (verb === "bump") {
      console.log("pickup", this);
      world.player.add(this);
      world.remove(this);
    }

    if (verb === "drop") {
      console.log("drop", this);
      world.player.remove(this);
    }
    if (verb === "use") {
      console.log("use", this);
      world.addToHistory(`hey hey`);
      world.player.use(this);
    }
  }
}

export default Loot;
