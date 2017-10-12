"use strict";

let directions = ["north", "east", "south", "west"];

function Robot(bearing, coordinates) {
  // implement your solution here!
  if (bearing) {
    this.bearing = bearing;
  }
  if (coordinates) {
    this.coordinates = coordinates;
  }

  this.at = function(x, y) {
    this.coordinates = [x, y];
  };

  this.orient = function(direction) {
    if (directions.includes(direction)) {
      this.bearing = direction;
    } else {
      throw new Error("Invalid Robot Bearing");
    }
  };

  this.turnLeft = function() {
    let currentIndex = directions.indexOf(this.bearing);
    return currentIndex === 0
      ? (this.bearing = directions[3])
      : (this.bearing = directions[--currentIndex]);
  };

  this.turnRight = function() {
    let currentIndex = directions.indexOf(this.bearing);
    return currentIndex === 3
      ? (this.bearing = directions[0])
      : (this.bearing = directions[++currentIndex]);
  };

  this.advance = function() {
    if (this.bearing === "north") {
      this.coordinates[1]++;
    } else if (this.bearing === "east") {
      this.coordinates[0]++;
    } else if (this.bearing === "south") {
      this.coordinates[1]--;
    } else if (this.bearing === "west") {
      this.coordinates[0]--;
    }
  };

  this.place = function(location) {
    this.coordinates = [location.x, location.y];
    this.bearing = location.direction;
  };

  this.instructions = function(instructions) {
    return instructions.split("").map(function(instruction) {
      if (instruction === "A") {
        return "advance";
      } else if (instruction === "R") {
        return "turnRight";
      } else if (instruction === "L") {
        return "turnLeft";
      }
    });
  };

  this.evaluate = function(instructions) {
    this.instructions(instructions).forEach(
      function(instruction) {
        //can't just call this.instruction() b/c this will look for a method call instruction
        this[instruction]();
      }.bind(this)
    );
  };
}
