import {passwordConfirmationCheck} from "./passwordConfirmationCheck";

export const checkTypeInput = (type, password) => {
    let confirmType;

    if (
        (type === 'password' || type === 'confirm_password')
        && password.length >= 8
    ) {
        switch (type) {
            case 'password':
                confirmType = 'confirm_password';
                break;
            case 'confirm_password':
                confirmType = 'password';
                break;
        }

        passwordConfirmationCheck(type, confirmType, password)
    }
}
