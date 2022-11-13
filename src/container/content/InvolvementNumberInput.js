import checkNumberValue from "../validation/checkNumberValue";
 function getType(code) {
    return code.substr(0, 2)
 }

 function getNumber(code) {
    return code.split('/')[1]
 }

export default function InvolvementNumberInput (props) {
    const year = new Date().getFullYear();
    const name = props.name === 'act_number' ? 'Номер акта' : 'Номер донесення';
    let involvementType = props.defaultValue === undefined ? '' : getType(props.defaultValue);
    let involvementNumber = props.defaultValue === undefined ? '' : getNumber(props.defaultValue);

    return (
        <div className='flex flex-col p-1 font-serif'>
            <label className='text-center'>{name}</label>
            <div className='flex items-center justify-center'>
                <p>
                    <select name={props.type} defaultValue={involvementType}>
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
                    defaultValue={involvementNumber}
                />
            </div>
        </div>
    )
}