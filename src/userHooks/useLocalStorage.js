import {useState} from "react";

export const useLocalStorage = (keyName, defaultValue) => {
    const [item, setItem] = useState(() => {
        const value = window.localStorage.getItem(keyName);

        if (value) {
            return window.localStorage.getItem(keyName)
        } else {
            window.localStorage.setItem(keyName, JSON.stringify(defaultValue));

            return defaultValue;
        }
    });

    const setValue = (value) => {
        window.localStorage.setItem(keyName, JSON.stringify(value));

        return setItem(defaultValue);
    }

    return [item, setValue];
}
