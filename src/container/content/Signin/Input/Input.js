import {useInput} from "../../../../userHooks/useInput";
import {checkTypeInput} from "../../../../helpers/password/checkTypeInput";

export default (props) => {
    const item = useInput(
        props.val ?? '',
        {isEmpty: props.isEmpty, minLength: props.minLength ?? 0}
    );

    let error = (item.isEmpty && item.isDirty) || (item.isDirty && item.minLengthError) === true
        ? 'border-red-700 border-2'
        : '';

    return (
        <div className='flex flex-col m-2'>
            <label className='mb-2' htmlFor={props.id}>
                {props.name}
            </label>
            <input
                className={error}
                id={props.id}
                type={props.type ?? 'text'}
                onChange={e => {
                    item.onChange(e);
                    checkTypeInput(props.id, e.target.value);
                }}
                onBlur={e => item.onBlur(e)}
                name={props.id}
                value={item.value}
                required/>
        </div>
    )
}
