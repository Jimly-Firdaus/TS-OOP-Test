
export declare interface account {
    _username: string;
    _password: string | number;
    _id: number;
    _creditCardNumber: string | number;
    balance: number;
    isMerchant: boolean;
    status: string;
    /**
     * @returns current username user object
     * */
    getUsername(): string;

    setUsername(username: string): void;

    /**
     * @description change current username of user object
     * @param newUsername new username
     * */
    changeUsername(newUsername: string): void;

    getPassword(): string | number;
    setPassword(password: number | string): void;

    /**
     * @description change current password of user object
     * @param newPassword new password
     * */
    changePassword(newPassword: number | string): void;

    setCreditCardNumber(creditCardNumber: string | number): void;

    /**
     * @returns credit card number of current user object
     * */
    getCreditCardNumber(): string | number;
    /**
     * @returns set up credit card balance
     * */
    retrieveCardData(): void;
    /**
     * @returns top up user balance
     * */
    topUpBalance(): void;
}

export declare interface paymentObject {
    username: string;
    item_id?: string | number;
    cost: number;
    status?: boolean;
}

export declare interface customer {
    username: string;
    item_id: string[];
    total_cost: number;
    status: string; // paid or unpaid
    appeal?: boolean;
}

export declare interface authentication {

    database: credential[];
}

export declare interface credential {
    username: string;
    password: string | number;
    creditCardNumber: string | number;
    balance: number;
    loggedIn?: boolean;
    isMerchant: boolean;
}