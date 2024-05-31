import React from 'react'
import { Link, useParams } from 'react-router-dom';

const DropdownMenu = () => {
    const {email} = useParams();
    return (
        <div className='flex flex-col'>
            <ul className='flex flex-col gap-4'>
                <li>
                    <Link
                        to={`/changepassword`}
                    >Change password
                    </Link>
                </li>
                <li>
                    <Link
                        to={`/${email}/deleteuser`}
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