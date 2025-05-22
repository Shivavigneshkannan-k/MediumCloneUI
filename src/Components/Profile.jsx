import EditProfile from "./EditProfile";
import Sidebar from "./Sidebar";

const Profile = () => {
  return (
    <div className='bg-orange-100 h-dvh flex'>
      <Sidebar />
      <div>
        <EditProfile />
      </div>
    </div>
  );
};

export default Profile;
