import {nanoid} from "@reduxjs/toolkit";
import AmmunitionInput from "./AmmunitionInput";
import {useDispatch, useSelector} from "react-redux";
import {checkNumberValue} from "../../../validation/checkNumberValue";
import {addAmmunition, getAmmo} from "../../../../redux/reducer/ammunitionReducer";

export default (props) => {
    let items = props.ammunition === undefined
        ? []
        : JSON.parse(props.ammunition);

    const ammunition = useSelector(state => getAmmo(state.ammunition, items));

    const dispatch = useDispatch();

    let item = {
        id: nanoid(),
        name: '',
        value: 0
    }

    return (
        <div className='flex flex-col border-4 m-5 p-4'>
            <p className='text-center'>Виявлені ВНП</p>
            <div className='flex flex-col' id='ammunition'>
                {ammunition.map((item, key) =>
                    <AmmunitionInput
                        ammunition={item.name}
                        key={key}
                        id={item.id ?? nanoid()}
                        value={item.value}
                    />
                )}
            </div>
            <div>
                <button type='button' onClick={() => {
                    dispatch(addAmmunition(item))
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
