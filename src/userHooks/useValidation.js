import {useEffect, useState} from "react";

export const useValidation = (value, validations) => {
    const [isEmpty, setEmpty] = useState(true);
    const [minLengthError, setMinLengthError] = useState(false);

    if (value === undefined) {
        value = '';
    }

    useEffect(() => {
        for (const validation in validations) {
            switch (validation) {
                case 'minLength':
                    value.length < validations[validation]
                        ? setMinLengthError(true)
                        : setMinLengthError(false);
                    break;
                case 'isEmpty':
                    value.length === 0 ? setEmpty(true) : setEmpty(false);
            }
        }
    }, [value]);

    return {
        isEmpty,
        minLengthError
    }
}
