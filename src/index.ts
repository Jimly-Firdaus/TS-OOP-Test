import { sleep } from "./lib/time_sleep";
import { stdin } from "./lib/readline";
import { toCapitallize } from "./lib/string_modifier";

let name: string = "Hard Coded";

const sayHello = async (name: string) => {
    console.log("Init Program");

    stdin.question(
        "Enter name: ",
        async (input: string) => {
            name = input;
            stdin.close();
            console.log("Wait 3 sec\n");
            await sleep(1000);
            name = toCapitallize(name);
            console.log("Hello " + name);
        }
    )
}

sayHello(name).then(() => {
    console.log("After promise. Name: " + name);
});



// solved TS2451
export {};