import { Link } from "react-router-dom";

const LandingPages = () => {
  return (
    <>
      <div className="w-screen h-screen flex md:items-center md:justify-center bg-[#00ffff] py-5">
        <div className=" flex flex-col items-center md:flex-row">
          <div className="font-semibold flex flex-col items-end ">
            <div className="flex justify-center items-center gap-2">
            <img src="./img/logoPuskesmas.png" className="w-24" alt="" />
            <div>
              <h1 className="text-[35px]">APLIKASI SPJ</h1>
              <h1 className="text-slate-800 text-[20px]">PUSKESMAS CILANDAK</h1>
            </div>
            </div>
            <Link to={'/login'}>
            <button className="bg-[#1090CB] text-white p-1 px-3  rounded-md hidden md:flex">Get Started</button>
            </Link>
          </div>
          <img
            src="/img/landingpageUser.png"
            className="md:w-96"
            alt="logoPuskesmas"
          />
          {/* MOBILE */}
          <Link to={'/login'}>
          <button className="bg-[#1090CB] hover:bg-green-400 text-white py-3 px-16 mt-5  rounded-md  md:hidden">Get Started</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default LandingPages;
