
export declare interface account {
    _username: string;
    _password: string | number;
    _id: number;
    _creditCardNumber: string | number;

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
    status: string;
    appeal?: boolean;
}
