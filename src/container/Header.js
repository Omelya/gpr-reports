import {
    Link
} from "react-router-dom";
import logo from '../logo.svg.png';

function Header() {
    return (
        <div className='bg-gray-400 rounded flex flex-col place-items-center'>
            <div className='flex justify-start'>
                <div className='p-2'>
                    <Link to='/'>
                        <img className='max-h-14' src={logo} alt='logo'/>
                    </Link>
                </div>
                <div className='flex justify-start flex-wrap content-center'>
                    <div className='p-2'>
                        <Link to='/involvement'>
                            Внести дані по виїзду
                        </Link>
                    </div>
                    <div className='p-2'>
                        <Link to='/report'>
                            Звіт
                        </Link>
                    </div>
                    <div className='p-2'>
                        <Link to='/overview'>
                            Загальні відомості
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header
