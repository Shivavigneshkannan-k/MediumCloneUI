import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { removeFeed } from "../store/feedSlice";
import { removeUser } from "../store/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faUser } from "@fortawesome/free-regular-svg-icons";
const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const handleLogout = async () => {
    try {
      await axios.post(API + "/logout", {}, { withCredentials: true });
      dispatch(removeFeed());
      dispatch(removeUser());
      navigate("/");
    } catch (err) {
      console.log(err, "error in logout");
    }
  };
  return (
    <nav className='z-50 sticky top-0 bg-white w-full min-h-3/12 border-b border-slate-200 px-4 py-2 font-serif flex flex-grow items-center justify-between'>
      <Link
        className='text-3xl'
        to='/feed'>
        Medium
      </Link>
      <div className='flex items-center flex-grow lg:max-w-1/4 justify-end gap-4 px-4'>
        <Link
          to='/post'
          className='space-x-2 mx-2 flex'>
          <FontAwesomeIcon
            icon={faPenToSquare}
            size='xl'
            className='text-slate-400'
          />
          <div className='text-slate-400'>Write</div>
        </Link>
        <div to='/profile'>
          <div className='dropdown dropdown-end'>
            <div
              tabIndex={0}
              className=''>
              {user ? (
                <img
                  src={user.photo_url}
                  alt='user_photo'
                  className='size-12 border rounded-full object-center object-cover'
                />
              ) : (
                <FontAwesomeIcon icon={faUser} />
              )}
            </div>
            <ul
              tabIndex={0}
              className='dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm'>
              <li>
                <Link to={`profile/${user?.user_id}`}>profile</Link>
              </li>
              <li
                className='pl-4 hover:bg-gray-200 px-2 py-1'
                onClick={handleLogout}>
                logout
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
