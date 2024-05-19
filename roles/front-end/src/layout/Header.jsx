import React from 'react';
import {Link} from 'react-router-dom'

const Header = () => {
    return (
        <div className='fixed top-0 z-20 h-14 bg-white w-full px-8 flex items-center justify-between text-lg shadow-[0px_28px_36px_-24px_rgba(184,184,184,1);]'>
            <div className='hover:text-[rgb(11,116,229)]'>
                <Link to="/">Home</Link>
            </div>
            <div>
                Trần Quang Huy
            </div>
        </div>
    );
};

export default Header;