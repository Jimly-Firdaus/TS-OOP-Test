import { sleep } from "./lib/time_sleep";
import { stdin, inputData } from "./lib/readline";
import { toCapitallize } from "./lib/string_modifier";
import { User } from "./lib/user";

const main = async () => {
    console.log("\n");

    const username = await inputData("username");
    const password = await inputData("password");
    const creditCardNumber = await inputData("credit card number")
    console.log("Saving...");
    // instantiate new user
    let user = new User(
        username,
        password,
        creditCardNumber,
        13521102,
    )
    sleep(500).then(() => {
        console.log(`Saved username: ${username}`);
        console.log(`Saved password: ${password}`);
        console.log(`Saved credit card number: ${user.getCreditCardNumber()}`);
        console.log(`Balance: ${user.getBalance()}`);

        stdin.close();
    })

}

main().then(() => {
    sleep(3000).then(() => {
        console.log("Should be prompt after 3s main resolved");
    })
});




// solved TS2451
export {};