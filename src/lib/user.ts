import { stdin, inputData } from "./readline";
import { sleep } from "./time_sleep";
import { toCapitallize } from "./string_modifier";
import {
    account,
    customer,
    paymentObject,
    authentication,
    credential,
} from "../typings";


// solved TS2420:
// @ts-ignore
abstract class baseUser implements account{
    // Class props
    protected _username: string = undefined;
    protected _password: string | number = undefined;
    protected _id: number = undefined;
    protected _creditCardNumber: string | number = undefined;
    protected balance: number = 0;
    // New user merchant role defaults to false
    // Status set to paid
    protected isMerchant: boolean = false;
    protected status: string = "paid";

    // Class messages
    /**
     * @param user_data changed user field
     * @returns error message for set / unset value
     * */
    protected _errChangesMsg (
        user_data: string,
    ) {
        return `${toCapitallize(user_data)} cannot be same as previous!`;
    }
    /**
     * @param user_data changed user field
     * @returns success message for changes on value
     * */
    protected _succChangesMsg (
        user_data: string
    ) {
        return `Successfully changes ${user_data.toLowerCase()}!`;
    }

    // Getters and Setters
    // Username

    public getUsername () {
        return this._username;
    }
    protected setUsername (username: string) {
        this._username = username;
    }

    public changeUsername (newUsername: string) {
        if (this._username === newUsername) {
            console.log(this._errChangesMsg("username"));
        }
        else {
            this._username = newUsername;
            console.log(this._succChangesMsg("username"));
        }
    }
    // Password
    protected getPassword () {
        return this._password;
    }
    protected setPassword (password: number | string) {
        this._password = password;
    }

    public changePassword (newPassword: number | string) {
        if (this.getPassword() === newPassword) {
            console.log(this._errChangesMsg("new password"));
        } else {
            stdin.question(
                "Confirm Password: ",
                async (input: string | number) => {
                    // TODO : Refactor this code using the new input function
                    console.log("Processing");
                    await sleep(1000);
                    if (newPassword === input) {
                        this._password = newPassword;
                        console.log(this._succChangesMsg("password"))
                    } else {
                        console.log("Confirmed password is not same!");
                    }
                }
            )
        }
    }
    // Credit Card Number
    protected setCreditCardNumber (creditCardNumber: string | number) {
        this._creditCardNumber = creditCardNumber;
    }

    public getCreditCardNumber () {
        return this._creditCardNumber;
    }

    protected retrieveCardData () {
        if (this._creditCardNumber !== undefined) {
            // dummy balance
            this.balance = 10000000
        }
    }

    protected topUpBalance (topUpValue: number = 50000) {
        this.balance = this.balance + topUpValue;
    }


}

export class User extends baseUser{
    paymentBasket: paymentObject[] = [];
    // Constructor
    constructor(username: string, password: number | string, creditCardNumber: string | number, id: number) {
        super();
        this._username = username;
        this._password = password;
        this._creditCardNumber = creditCardNumber;
        this._id = id;
    }

    public getBalance () {
        return this.balance;
    }


    public getBasketItem () {
        console.log(`${toCapitallize(this._username)}'s basket:`);
        console.log("No.----Item Id----Cost");
        for (let i = 0; i < this.paymentBasket.length; i++) {
            console.log(`|${i}|\t|${this.paymentBasket[i].item_id}|\t|${this.paymentBasket[i].cost}|`);
        }
    }

    public makePayment (cost: number, id: number) {
        // per unique item have different object
        let item: paymentObject = {
            username: this._username,
            // unique item id to mark transaction
            item_id: id,
            cost: cost,
            // false status === uncheckPayment, status set to true when the item is checked out
            status: false,
        };
        this.paymentBasket.push(item);
        console.log("Item is stored on your basket. Please check it!");
    }

    public async checkoutPayment() {
        console.log(`Balance: ${this.balance}`);
        let exitMenu: boolean = false;
        if (this.paymentBasket.length !== 0) {
            const maxChoice: number = this.paymentBasket.length;
            let userChoice: number =  parseInt(await inputData("choice"), 10);
            let endChoice: boolean = false;
            while (!endChoice) {
                if (userChoice > maxChoice) {
                    console.log("Invalid input!");
                    userChoice = parseInt(await inputData("choice"), 10);
                } else {
                    endChoice = true;
                    if (userChoice === 0) {
                        exitMenu = true;
                    }
                    else {
                        // Filter out the chosen index
                        this.paymentBasket = this.paymentBasket.filter((ele, index) => {
                            return index !== userChoice - 1;
                        })
                        console.log("Current Basket: ");
                        this.getBasketItem();
                    }
                }
            }
        }
        else {
            console.log("Nothing in basket");
            exitMenu = true;
        }
        return exitMenu;
    }

    public enableMerchantMode () {
        this.isMerchant = true;
    }
}

export class Merchant extends User {

    // List of this merchant customer
    customers: customer[] = [];
    // Getters and setters
    public addCustomer(customerData: customer) {
        this.customers.push(customerData);
    }
    /**
     * @param username customer username
     * @returns removed given customer username from merchant basket
     * */
    private removeCustomer(username: string) {
        let i = 0;
        let usernameFound = false;
        while (i < this.customers.length && !usernameFound) {
            // filter out the chosen username
          if (this.customers[i].username === username) {
              this.customers = this.customers.filter(
                  (ele) => {
                      return ele.username !== username;
                  }
              )
          }
          i++;
        }
    }

    /**
     * Shows list of customer, then throws input stream to confirm selected customer payment
     * */
    public async confirmPayment() {
        const username: string = await inputData("username");
        const length: number = this.customers.length;
        let confirmed: boolean = false;
        this.removeCustomer(username);
        if (this.customers.length === length) {
            console.log(`Unable to find ${username} (does not exist).`);
        }
        else {
            confirmed = true;
            console.log(`Successfully confirmed ${username}!`);
        }
        return confirmed;
    }

    public getCustomerList () {
        console.log(`${toCapitallize(this._username)}'s customers:`);
        if (this.customers.length > 0){
            this.customers.forEach((ele) => {
                console.log(`Username: ${ele.username}`);
                console.log(`\tTotal: ${ele.total_cost}`);
                console.log(`\tStatus: ${ele.status}`);
            })
        }
        else {
            console.log("No customers.");
        }
    }

}
// TODO: global database to store all transaction information

// solved TS2420:
// @ts-ignore
export class Auth implements authentication {
    public database: credential[] = [];
    public currentUserIndex: number = -1;
    private username: string;
    private password: number | string;


    /**
     * @returns true if merchant, false if customer
     * */
    public async login (asMerchant: boolean = false) {
        const username = await inputData("username");
        const password = await inputData("password");
        console.log("Authenticating...");
        let foundCredential = false;
        let isMerchant = asMerchant;
        this.database.forEach((credential, index) => {
            if (credential.username === username && credential.password === password && credential.isMerchant === isMerchant) {
                foundCredential = true;
                this.currentUserIndex = index;
            }
        })
        if (foundCredential) {
            this.database[this.currentUserIndex].loggedIn = true;
        }
    }


    public async signUp () {
        let currentUser: credential = {
            username: await inputData("username"),
            password: await inputData("password"),
            creditCardNumber: await inputData("credit card number"),
            balance: 0,
            loggedIn: false,
            isMerchant: false
        }
        this.database.push(currentUser);
        console.log(`Account created! Please login!`);
    }



}


