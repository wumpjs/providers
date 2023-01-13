import { Checker } from "../index";

new Checker<number>(5); // Using number
new Checker<string>("@wumpjs/providers"); // Using string
new Checker<symbol>(Symbol("My symbol")); // Using Symbol
// ...
new Checker<any>(); // Using Anything