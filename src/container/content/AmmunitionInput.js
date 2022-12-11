import {useState} from "react";
import closeIcons from "../../img/icons/icons.svg";
import checkNumberValue from "../validation/checkNumberValue";
import ammunition from "../JSON/ammunition.json";

function numberAmmunition () {
    let input = document.getElementById('all_ammunition'),
        ammunition = document.querySelectorAll('.number'),
        value = 0;

    for (let i = 0; i < ammunition.length; i++) {
        value += Number(ammunition[i].value);
    }

    input.value = value;
}

function deleteFields (e) {
    e.currentTarget.closest('.grid.grid-cols-7.items-center').remove()
    numberAmmunition()
}

function checkValue (e) {
    checkNumberValue(e)
    numberAmmunition()
}

function getAmmunition(e) {
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

function Input(props) {
    let ammunition = props.ammunition !== undefined
        ? props.ammunition.replace('_', ' ')
        : '';

    return (
        <div className='grid grid-cols-7 items-center'>
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
                name='number_ammunition'
                defaultValue={props.value ?? 0}
                onChange={e => checkValue(e)}
            />
            <button
                className='bg-gray-200 rounded-md h-8 w-8 col-start-7'
                onClick={e => deleteFields(e)}
            >
                <img src={closeIcons + '#close'} alt='remove'/>
            </button>
        </div>
    )
}

export default function AmmunitionInput (props) {
    let ammunition = props.ammunition[0] !== ''
            ? JSON.parse(props.ammunition)
            : [],
        ammunitionType = Object.keys(ammunition).length !== 0
            ? Object.keys(ammunition)
            : [],
        ammunitionValue = Object.values(ammunition).length !== 0
            ? Object.values(ammunition)
            : [];
    const [ammo, setAmmunition] = useState(ammunitionType);

    return (
        <div className='flex flex-col border-4 m-5 p-4'>
            <p className='text-center'>Виявлені ВНП</p>
            <div className='flex flex-col' id='ammunition'>
                {ammo.map((item, key) =>
                    <Input
                        ammunition={item}
                        key={key}
                        value={ammunitionValue[key]}
                    />
                )}
            </div>
            <div>
                <button type='button' onClick={() => {
                    ammunitionType.push('');
                    setAmmunition(ammunitionType);
                    console.log(ammo)
                }}>
                    Добавити поле
                </button>
            </div>
            <div className='flex flex-col'>
                <label className='text-center'>Всього ВНП</label>
                <input
                    name='all_ammunition'
                    type='text'
                    className='form-input'
                    id='all_ammunition'
                    defaultValue={props.allAmmunition}
                    onChange={e => checkNumberValue(e)}
                />
            </div>
        </div>
    )
}
