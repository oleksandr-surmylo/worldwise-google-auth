
import Sidebar from "../components/Sidebar/Sidebar";
import Map from "../components/Map/Map";
import User from "../components/User/User";

const AppLayout = () => {
    return (
        <div className="flex flex-col relative h-dvh p-[2.4rem] lg:flex-row">
            <Sidebar/>
            <Map/>
            <User/>
        </div>
    );
};

export default AppLayout;