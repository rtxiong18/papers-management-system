import React from 'react'
import { Link } from 'react-router-dom';

const DropdownMenu = () => {
    return (
        <div className='flex flex-col'>
            <ul className='flex flex-col gap-4'>
                <li>
                    <Link
                        to={'/user/changepassword'}
                    >Change password
                    </Link>
                </li>
                <li>
                    <Link
                        to={'/user/deleteuser'}
                    >Delete user
                    </Link>
                </li>
                <li>
                    <Link
                        to={'/'}
                    >Logout
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default DropdownMenu