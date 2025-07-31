"use client"
import React, { useEffect, useState } from "react";
import { Stage, Layer, Rect, Circle, Text } from "react-konva";
import { useSocket } from "@/context/socketProvider";

const TILE_SIZE = 60;
const GRID_WIDTH = 100;
const GRID_HEIGHT = 60;

const teamColors = {
  red: "#f87171",
  blue: "#60a5fa",
  green: "#34d399",
  neutral: "#d1d5db",
};

const players = [
  { id: "p1", x: 2, y: 3, team: "red" },
  { id: "p2", x: 4, y: 1, team: "blue" },
];

const zones = Array.from({ length: GRID_WIDTH * GRID_HEIGHT }, (_, i) => {
  const x = i % GRID_WIDTH;
  const y = Math.floor(i / GRID_WIDTH);
  return {
    id: `zone-${i}`,
    x,
    y,
    team: "neutral",
  };
});

const CanvasMap = () => {

  //get custom socket context
  const socket = useSocket();

  //hook up listener
   useEffect(() => {
    const handleMessage = (msg: string) => {
      console.log("Message received:", msg);
    };

    socket.on("message", handleMessage);

    return () => {
      socket.off("message", handleMessage);
    };
  }, [socket]);

  const handleZoneClick = (zoneId: string) => {
    console.log("Clicked zone:", zoneId);
    // Only strategists can move players here
  };

 


  return (
    <Stage width={GRID_WIDTH * TILE_SIZE} height={GRID_HEIGHT * TILE_SIZE}>
      <Layer>
        {zones.map((zone) => (
          <Rect
            key={zone.id}
            x={zone.x * TILE_SIZE}
            y={zone.y * TILE_SIZE}
            width={TILE_SIZE}
            height={TILE_SIZE}
            fill={teamColors[zone.team as keyof typeof teamColors]}
            stroke="black"
            strokeWidth={1}
            onClick={() => handleZoneClick(zone.id)}
          />
        ))}

        {players.map((player) => (
          <Circle
            key={player.id}
            x={player.x * TILE_SIZE + TILE_SIZE / 2}
            y={player.y * TILE_SIZE + TILE_SIZE / 2}
            radius={10}
            fill={teamColors[player.team as keyof typeof teamColors]}
            stroke="white"
            strokeWidth={2}
          />
        ))}
      </Layer>
    </Stage>
  );
};

export default CanvasMap;
