import personal from "../../JSON/personal.json"

const addPerson = () => {
    let element = document.getElementById('personnel'),
        select = document.createElement('select');

    personal.forEach(item => {
        let option = document.createElement('option');

        option.innerText = item.first_name + ' ' + item.second_name;
        select.className = 'm-2';
        select.name = 'person';

        select.append(option);
    })

    element.append(select);
}

export default (props) => {
    let persons = [],
        loadPersonal = props.personal === undefined
            ? ['']
            : JSON.parse(props.personal);

    personal.forEach(item => {
        persons.push(item.first_name + ' ' + item.second_name);
    })

    return (
        <div className='flex flex-col border-4 m-5 p-5'>
            <div id='personnel' className='flex flex-col'>
                <p>Залучений особовий склад</p>
                {
                    loadPersonal.map((item, key) =>
                        <select className="m-2" key={key} defaultValue={item} name="person">
                            {persons.map((item, key) =>
                                <option key={key}>
                                    {item}
                                </option>
                            )}
                        </select>
                    )
                }
            </div>
            <div>
                <button type='button' onClick={() => addPerson()}>
                    Добавити сапера
                </button>
            </div>
        </div>
    )
}
