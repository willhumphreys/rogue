import React, { useRef, useEffect, useState } from "react";
import InputManager from "./InputManager";
import Player from "./Player";
import World from "./World";
import Spawner from "./Spawner";

const ReactRogue = ({ width, height, tilesize }) => {
  const canvasRef = useRef();
  const [player, setPlayer] = useState(new Player(1, 2, tilesize));
  const [world, setworld] = useState(new World(width, height, tilesize));

  let inputManager = new InputManager();

  const handleInput = (action, data) => {
    console.log(`handle input: ${action}:${JSON.stringify(data)}`);
    let newWorld = new World();
    Object.assign(newWorld, world);

    switch (action) {
      case "move":
        newWorld.movePlayer(data.x, data.y);
        newWorld.moveMonster(data.x, data.y);
        setworld(newWorld);

        break;
      case "use":
        if (data === "health potion") {
          if (newWorld.playerUsesItem(data)) {
            newWorld.addToHistory("You drink a health potion");
          } else {
            newWorld.addToHistory("You have no health potion to drink");
          }
        }
        setworld(newWorld);

        break;
      default:
        console.log(`Unknown action ${action}`);
        break;
    }
  };

  useEffect(() => {
    console.log("Create Map!");

    let newWorld = new World();
    Object.assign(newWorld, world);
    newWorld.createCellularMap();
    newWorld.moveToSpace(world.player);
    let spawner = new Spawner(newWorld);
    spawner.spawnLoot(10);
    spawner.spawnMonsters(6);
    spawner.spawnStairs();
    setworld(newWorld);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log("Bind input");
    inputManager.bindkeys();
    inputManager.subscribe(handleInput);
    return () => {
      inputManager.unbindKeys();
      inputManager.unsubscribe(handleInput);
    };
  });

  useEffect(() => {
    console.log("Draw to canvas");
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, width * tilesize, height * tilesize);
    world.draw(ctx);
  });

  return (
    <>
      <canvas
        ref={canvasRef}
        width={width * tilesize}
        height={height * tilesize}
        style={{ border: "1px solid black", background: "Dimgray" }}
      ></canvas>
      <KeyboardShortcuts />
      <Inventory world={world} />
      <History world={world} />
    </>
  );
};

const KeyboardShortcuts = () => {
  return (
    <>
      <h4>Keyboard Shortcuts</h4>
      <ul>
        <li>Move player: Arrow keys</li>
        <li>Drink health potion: H</li>
      </ul>
    </>
  );
};

const Inventory = ({ world }) => {
  return (
    <>
      <h4>Inventory</h4>
      <ul>
        {world.player.inventory.map((item, index) => (
          <li key={index}>{item.attributes.name}</li>
        ))}
      </ul>
    </>
  );
};

const History = ({ world }) => {
  return (
    <>
      <h4>History</h4>
      <ul>
        {world.history.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </>
  );
};

export default ReactRogue;
