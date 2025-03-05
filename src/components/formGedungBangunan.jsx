import React, { useState, useContext, useEffect } from "react";
import { poaContext } from "../context/PoaContextProvider";


import { inputGedungBangunanContext } from "../context/InputGedungBangunanContextProvider";


import FormTanggaPasien from "./GedungBangunan/formTanggaPasien";
import FormPenambahanAksesTangga from "./GedungBangunan/formPenambahanAksesTangga";










import { fetchPoaData } from "../poaGedungBangunan";
import { MdCalendarMonth } from "react-icons/md";


const FormGedungBangunan = ({ activeMonth }) => {
 
  const [viewTanggaPasien, setTanggaPasien] = useState(false)
  const [viewPenambahanAksesTangga, setPenambahanAksesTangga] = useState(false)
  


  const { dataPoa } = useContext(poaContext);
  const { dataInputGedungBangunan } = useContext(inputGedungBangunanContext);
  const [resultTanggaPasien, setResultTanggaPasien] = useState(null)
  const [resultPenambahanAksesTangga, setResultPenambahanAksesTangga] = useState(null)
 
  
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getPoaData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchPoaData(dataPoa?.[0]?.tahun);
        if (data) {
            setResultTanggaPasien(data.tanggaPasien)
            setResultPenambahanAksesTangga(data.penambahanAkesTangga)
         
          


        }
      } catch (error) {
        console.error("Error fetching POA data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getPoaData();
  }, [dataPoa, dataInputGedungBangunan]);

  const FormSection = ({ title, isOpen, onToggle, children, colorClass }) => (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-[1.01]">
      <div
        onClick={onToggle}
        className={`${colorClass} flex items-center justify-between p-4 cursor-pointer transition-colors duration-200`}
      >
        <h3 className="font-medium text-white text-lg">{title}</h3>
        <svg
          className={`w-6 h-6 text-white transition-transform duration-200 ${
            isOpen ? "transform rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
      <div
        className={`transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-screen p-6" : "max-h-0"
        } overflow-hidden bg-gradient-to-b from-white to-gray-50`}
      >
        {children}
      </div>
    </div>
  );

  return (
    <div className="mt-4 p-6 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-xl shadow-lg">
      <div className="mb-8">
        <div className="flex items-center justify-between" >
          <div className="flex items-center space-x-3 mb-6">
          <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg shadow-lg">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Gedung & Bangunan
          </h2>

          </div>

          <div className="flex items-center text-[30px] gap-3 text-blue-500">
            <div>
              <MdCalendarMonth />
            </div>

            <h1>{activeMonth}</h1>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="space-y-6">
            <FormSection
              title="TANGGAPASIEN"
              isOpen={viewTanggaPasien}
              onToggle={() => setTanggaPasien(!viewTanggaPasien)}
              colorClass="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
            >
              <FormTanggaPasien
                activeMonth={activeMonth}
                dataInputGedungBangunan={dataInputGedungBangunan}
                result={resultTanggaPasien}
                dataPoa={dataPoa}
              />
            </FormSection>

            <FormSection
              title="PENAMBAHANAKSESTANGGA"
              isOpen={viewPenambahanAksesTangga}
              onToggle={() => setPenambahanAksesTangga(!viewPenambahanAksesTangga)}
              colorClass="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
            >
              <FormPenambahanAksesTangga
                activeMonth={activeMonth}
                dataInputGedungBangunan={dataInputGedungBangunan}
                result={resultPenambahanAksesTangga}
                dataPoa={dataPoa}
              />
            </FormSection>

           

            

           



          </div>
        )}
      </div>
    </div>
  );
};

export default FormGedungBangunan;
