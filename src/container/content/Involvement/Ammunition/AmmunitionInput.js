import {useDispatch} from "react-redux";
import ammunition from "../../../JSON/ammunition.json";
import closeIcons from "../../../../img/icons/icons.svg";
import {checkNumberValue} from "../../../validation/checkNumberValue";
import {deleteAmmunition} from "../../../../redux/reducer/ammunitionReducer";

const numberAmmunition = () => {
    let input = document.getElementById('all_ammunition'),
        ammunition = document.querySelectorAll('.number'),
        value = 0;

    for (let i = 0; i < ammunition.length; i++) {
        value += Number(ammunition[i].value);
    }

    input.value = value;
}
const checkValue = (e) => {
    checkNumberValue(e)
    numberAmmunition()
}
const getAmmunition = (e) => {
    let value = e.currentTarget.value,
        ammunitionList = [],
        datalist = document.getElementById('ammunition_list');

    e.currentTarget.classList.remove('border-red-700');
    e.currentTarget.classList.remove('border-2');

    while (datalist.firstChild) {
        datalist.removeChild(datalist.firstChild);
    }

    if (value.length > 2) {
        ammunitionList = ammunition.filter(e => e.type.search(value.toLowerCase()) !== -1);

        ammunitionList.forEach(item => {
            let option = document.createElement('option');

            option.value = item.type + ' ' + item.caliber;
            datalist.appendChild(option);
        })
    }
}
export default (props) => {
    const dispatch = useDispatch();

    let ammunition = props.ammunition !== undefined
        ? props.ammunition.replace('_', ' ')
        : '';

    return (
        <div className='grid grid-cols-7 items-center' data-id={props.id}>
            <input
                type='text'
                className='form-input m-2 col-span-4'
                name='name_ammunition'
                list='ammunition_list'
                onChange={e => getAmmunition(e)}
                defaultValue={ammunition}
                placeholder='Введіть тип боєприпасу'
            />
            <datalist id='ammunition_list'>

            </datalist>
            <input
                className='form-input m-2 number col-span-2'
                type='text'
                name='number_ammunition'
                defaultValue={props.value}
                onChange={e => checkValue(e)}
            />
            <button
                className='bg-gray-200 rounded-md h-8 w-8 col-start-7'
                type='button'
                onClick={() => {
                    dispatch(deleteAmmunition(props))
                }}
            >
                <img src={closeIcons + '#close'} alt='remove'/>
            </button>
        </div>
    )
}
