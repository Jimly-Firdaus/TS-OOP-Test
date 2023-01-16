"use strict";
exports.__esModule = true;
exports.stdin = void 0;
var readline = require("readline");
/**
 * Readline module built in Node
 */
exports.stdin = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
