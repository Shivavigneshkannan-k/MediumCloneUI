import EditProfile from "./EditProfile";
import Sidebar from "./Sidebar";

const Profile = () => {
  return (
    <div className='h-dvh grid grid-cols-12'>
      <div className="grid col-start-1 col-end-3">
        <Sidebar />
      </div>
      <div className="grid col-start-4 col-end-12">
        <EditProfile />
      </div>
    </div>
  );
};

export default Profile;
