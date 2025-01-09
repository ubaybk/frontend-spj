import { Link } from "react-router-dom";
import Header from "../../../components/header";
import { IoIosAddCircle } from "react-icons/io";


const DataPoa = () => {
  return (
    <>
      <div className="flex">
        <div className="h-screen">
          <Header />
        </div>
        <div className="p-4">
          <h1>ini data POA</h1>
          <Link to={"/addTahunanPoa"}>
          <div  className=" flex items-center cursor-pointer hover:underline bg-blue-400 rounded-xl p-2 text-white">
            <IoIosAddCircle className="text-[25px]" />
            <h1>TAMBAHAN DATA TAHUNAN P O A</h1>
          </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default DataPoa;
