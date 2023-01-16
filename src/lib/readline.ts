import * as readline from "readline"

/**
 * Readline module built in Node
 */
export const stdin =  readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
