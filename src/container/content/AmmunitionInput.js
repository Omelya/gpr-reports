import closeIcons from "../../img/icons/icons.svg";

function numberAmmunition () {
    let input = document.getElementById('all_ammunition'),
        ammunition = document.querySelectorAll('.number'),
        value = 0;

    for (let i = 0; i < ammunition.length; i++) {
        value += Number(ammunition[i].value);
    }

    input.value = value;
}

function addFields () {
    let element = document.getElementById('ammunition'),
        div = document.createElement('div'),
        select = document.createElement('select'),
        option = document.createElement('option'),
        input = document.createElement('input'),
        closeButton = document.createElement('button'),
        img = document.createElement('img');

    div.className = 'grid grid-cols-7 items-center';
    select.className = 'm-2 col-span-4';
    select.name = 'name_ammunition';
    option.innerText = 'Граната Ф-1';
    input.className = 'form-input m-2 number col-span-2'
    input.type = 'text';
    input.name = 'number_ammunition';
    closeButton.className = 'bg-gray-200 rounded-md h-8 w-8 col-start-7';
    closeButton.type = 'button';
    img.src = closeIcons + '#close';
    input.addEventListener('change', numberAmmunition, false);

    closeButton.append(img);
    select.append(option);
    div.append(select, input, closeButton);
    element.append(div);
}

export default function AmmunitionInput () {
    return (
        <div className='flex flex-col border-4 m-5 p-4'>
            <p className='text-center'>Виявлені ВНП</p>
            <div className='flex flex-col' id='ammunition'>

            </div>
            <div>
                <button type='button' onClick={() => addFields()}>
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
                />
            </div>
        </div>
    )
}