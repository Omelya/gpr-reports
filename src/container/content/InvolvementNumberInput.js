import checkNumberValue from "../validation/checkNumberValue";

export default function InvolvementNumberInput (props) {
    const year = new Date().getFullYear();
    const name = props.name === 'act_number' ? 'Номер акта' : 'Номер донесення';

    return (
        <div className='flex flex-col p-1 font-serif'>
            <label className='text-center'>{name}</label>
            <div className='flex items-center justify-center'>
                <p>
                    <select name='act_type'>
                        <option>
                            ОР
                        </option>
                        <option>
                            ГР
                        </option>
                        <option>
                            ТО
                        </option>
                        <option>
                            НР
                        </option>
                    </select>
                    -08-{year}/
                </p>
                <input
                    type='text'
                    className='form-input w-1/12'
                    name={props.name}
                    onChange={e => checkNumberValue(e)}
                />
            </div>
        </div>
    )
}