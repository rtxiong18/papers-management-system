import { Link, useParams } from 'react-router-dom';
import { BsList } from 'react-icons/bs';
import { useState } from 'react';

const MenuButton = () => {
  const [isClick, setIsClick] = useState(false);
  const {email} = useParams();
  return (
    <div>
      <button onClick={() => setIsClick((prev) => !prev)}>
        <BsList className='text-2xl' />
      </button>
      {
        isClick && <div className='flex flex-col border-2 rounded-lg p-2 w-40'>
          <ul className='flex flex-col gap-4'>
            <li>
              <Link
                to={`/${email}/changepassword`}
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
      }
    </div>
  );
};

export default MenuButton;