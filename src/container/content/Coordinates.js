import checkCoordinates from "../validation/checkCoordinates";

export default function Coordinates(props) {
    let coordinates = props.coordinates === undefined
        ? ''
        : JSON.parse(props.coordinates)[`${props.type}`];

    return(
        <div className='flex items-center ml-5'>
            <label className='pr-4'>{props.type}</label>
            <input
                type='text'
                className='form-input'
                name={props.name}
                onChange={e => checkCoordinates(e)}
                defaultValue={coordinates}
            />
        </div>
    )
}