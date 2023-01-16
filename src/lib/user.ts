import { stdin } from "./readline";
import { sleep } from "./time_sleep";
import { toCapitallize } from "./string_modifier";

class User {
    // user data
    private _username: string = undefined;
    private _password: number | string = undefined;
    private readonly _id: number;

    // Constructor
    constructor(username: string, password: number | string, id: number) {
        this.setUsername(username);
        this.setPassword(username);
        this._id = id;
    }

    // Class messages
    /**
     * @returns error message for set / unset value
     * */
    private _errMsg (
        user_data: string,
        method: string,
        type: string = "set" // err by set or unset
    ) {
        if (type === "set") {
            return `${toCapitallize(user_data)} is already set. Use ${method} method to change ${user_data}!`;
        } else {
            return `${toCapitallize(user_data)} is not defined yet!`;
        }
    }
    /**
     * @returns success message for changes on value
     * */
    private _succMsg (
        user_data: string
    ) {
        return `Succesfully changes ${user_data.toLowerCase()}!`;
    }
    // private _confirmPasswordChangesErr = "Confirmed password isn't same!";

    // Getters and Setters
    // Username
    public getUsername () {
        return this._username;
    }
    private setUsername (username: string) {
        if (this._username !== undefined) {
            console.log(this._errMsg("username", "changeUsername"));
        }
        else {
            this._username = username;
        }
    }
    public changeUsername (newUsername: string) {
        if (this._username !== undefined) {
            this._username = newUsername;
            console.log(this._succMsg("username"));
        }
        else {
            console.log(this._errMsg("username", "setUsername", "unset"));
        }
    }
    // Password
    private getPassword () {
        return this._password;
    }
    private setPassword (password: number | string) {
        if (this._password !== undefined) {
            console.log(this._errMsg("password", "changePassword", "set"));
        }
        else {
            this._password = password;
        }
    }
    public changePassword (newPassword: number | string) {
        if (this.getPassword() === newPassword) {
            console.log("Current password is same as old password!");
        } else {
            stdin.question(
                "Confirm Password: ",
                async (input: string | number) => {
                    console.log("Processing");
                    await sleep(1000);
                    if (newPassword === input) {
                        this._password = newPassword;
                        console.log(this._succMsg("password"))
                    } else {
                        console.log("Confirmed password is not same!");
                    }
                }
            )
        }
    }

}