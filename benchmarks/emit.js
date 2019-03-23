const { Suite } = require("benchmark");
const { EventEmitter } = require("events");
const { EventEmitter2 } = require("eventemitter2");
const EventEmitter3 = require("eventemitter3");
const { EventEmitter: DripEmitter } = require("drip");
const { EventEmitter: FoxifyEmitter } = require("..");

function handle() {
  return 1;
}

const eventEmitter = new EventEmitter();
const eventEmitter2 = new EventEmitter2();
const eventEmitter3 = new EventEmitter3();
const dripEmitter = new DripEmitter();
const foxifyEmitter = new FoxifyEmitter();

eventEmitter.on("foo", handle);
eventEmitter2.on("foo", handle);
eventEmitter3.on("foo", handle);
dripEmitter.on("foo", handle);
foxifyEmitter.on("foo", handle);

new Suite()
  .add("events", () => {
    eventEmitter.emit("foo");
  })
  .add("@foxify/events", () => {
    foxifyEmitter.emit("foo");
  })
  .add("eventemitter2", () => {
    eventEmitter2.emit("foo");
  })
  .add("eventemitter3", () => {
    eventEmitter3.emit("foo");
  })
  .add("drip", () => {
    dripEmitter.emit("foo");
  })
  .on("cycle", e => {
    console.log(e.target.toString());
  })
  .on("complete", function onComplete() {
    console.log("Fastest is %s", this.filter("fastest").map("name"));
  })
  .run({ async: true });