import position from '../../../JSON/position.json';
import rank from '../../../JSON/rank.json';
import {useInput} from "../../../../userHooks/useInput";

const getPosition = (event, id) => {
    let value = event.currentTarget.value,
        list = [],
        datalist = document.getElementById(`${id}_list`),
        selectList = id === 'position' ? position : rank;

    while (datalist.firstChild) {
        datalist.removeChild(datalist.firstChild);
    }

    if (value.length > 2) {
        list = selectList.filter(e => e.item.toLowerCase().search(value.toLowerCase()) !== -1);

        list.forEach(e => {
            let option = document.createElement('option');

            option.value = e.item;
            datalist.appendChild(option);
        })
    }

}
export default (props) => {
    const item = useInput('', {isEmpty: props.isEmpty})

    let error = (item.isEmpty && item.isDirty) || (item.isDirty && item.minLengthError) === true
        ? 'border-red-700 border-2'
        : '';

    return(
        <div className='flex flex-col m-2'>
            <label className='mb-2' htmlFor={props.id}>
                {props.name}
            </label>
            <input
                className={error}
                id={props.id}
                type='text'
                list={`${props.id}_list`}
                name={props.id}
                onChange={e => {
                    item.onChange(e);
                    getPosition(e, props.id);
                }}
                onBlur={e => item.onBlur(e)}
                required/>
            <datalist id={`${props.id}_list`}>

            </datalist>
        </div>
    )
}
