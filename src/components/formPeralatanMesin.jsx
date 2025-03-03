import React, { useState, useContext, useEffect } from "react";
import { poaContext } from "../context/PoaContextProvider";

import { inputPeralatanMesinContext } from "../context/InputPeralatanMesinContextProvider";


import FormKomputer from "./PeralatanMesin/formKomputer";
import FormLaptop from "./PeralatanMesin/formLaptop";
import FormAc2Pk from "./PeralatanMesin/formAc2Pk";
import FormAc1Pk from "./PeralatanMesin/formAc1Pk";
import FormEkg from "./PeralatanMesin/formEkg";
import FormDentalUnit from "./PeralatanMesin/formDentalUnit";
import FormPeakflowMeter from "./PeralatanMesin/formPeakflowMeter";
import FormMotor from "./PeralatanMesin/formMotor";









import { fetchPoaData } from "../poaUtilsPeralatanMesin";
import { MdCalendarMonth } from "react-icons/md";


const FormPeralatanMesin = ({ activeMonth }) => {
  const [viewKomputer, setKomputer] = useState(false);
  const [viewLaptop, setLaptop] = useState(false);
  const [viewAc2Pk, setAc2Pk] = useState(false);
  const [viewAc1Pk, setAc1Pk] = useState(false);
  const [viewEkg, setEkg] = useState(false);
  const [viewDentalUnit, setDentalUnit] = useState(false);
  const [viewPeakflowMeter, setPeakflowMeter] = useState(false);
  const [viewMotor, setMotor] = useState(false);
  


  const { dataPoa } = useContext(poaContext);
  const { dataInputPeralatanMesin } = useContext(inputPeralatanMesinContext);
  const [resultKomputer, setResultKomputer] = useState(null);
  const [resultLaptop, setResultLaptop] = useState(null);
  const [resultAc2Pk, setResultAc2Pk] = useState(null);
  const [resultAc1Pk, setResultAc1Pk] = useState(null);
  const [resultEkg, setResultEkg] = useState(null);
  const [resultDentalUnit, setResultDentalUnit] = useState(null);
  const [resultPeakflowMeter, setResultPeakflowMeter] = useState(null);
  const [resultMotor, setResultMotor] = useState(null);
  
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getPoaData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchPoaData(dataPoa?.[0]?.tahun);
        if (data) {
          setResultKomputer(data.komputer);
          setResultLaptop(data.laptop);
          setResultAc2Pk(data.ac2Pk);
          setResultAc1Pk(data.ac1Pk);
          setResultEkg(data.ekg);
          setResultDentalUnit(data.dentalUnit);
          setResultPeakflowMeter(data.peakflowMeter);
          setResultMotor(data.motor);
          


        }
      } catch (error) {
        console.error("Error fetching POA data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getPoaData();
  }, [dataPoa, dataInputPeralatanMesin]);

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
            Peralatan Mesin
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
              title="KOMPUTER"
              isOpen={viewKomputer}
              onToggle={() => setKomputer(!viewKomputer)}
              colorClass="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
            >
              <FormKomputer
                activeMonth={activeMonth}
                dataInputPeralatanMesin={dataInputPeralatanMesin}
                result={resultKomputer}
                dataPoa={dataPoa}
              />
            </FormSection>

            <FormSection
              title="LAPTOP"
              isOpen={viewLaptop}
              onToggle={() => setLaptop(!viewLaptop)}
              colorClass="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
            >
              <FormLaptop
                activeMonth={activeMonth}
                dataInputPeralatanMesin={dataInputPeralatanMesin}
                result={resultLaptop}
                dataPoa={dataPoa}
              />
            </FormSection>

            <FormSection
              title="AC2PK"
              isOpen={viewAc2Pk}
              onToggle={() => setAc2Pk(!viewAc2Pk)}
              colorClass="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
            >
              <FormAc2Pk
                activeMonth={activeMonth}
                dataInputPeralatanMesin={dataInputPeralatanMesin}
                result={resultAc2Pk}
                dataPoa={dataPoa}
              />
            </FormSection>

            <FormSection
              title="AC1PK"
              isOpen={viewAc1Pk}
              onToggle={() => setAc1Pk(!viewAc1Pk)}
              colorClass="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
            >
              <FormAc1Pk
                activeMonth={activeMonth}
                dataInputPeralatanMesin={dataInputPeralatanMesin}
                result={resultAc1Pk}
                dataPoa={dataPoa}
              />
            </FormSection>

            <FormSection
              title="EKG"
              isOpen={viewEkg}
              onToggle={() => setEkg(!viewEkg)}
              colorClass="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
            >
              <FormEkg
                activeMonth={activeMonth}
                dataInputPeralatanMesin={dataInputPeralatanMesin}
                result={resultEkg}
                dataPoa={dataPoa}
              />
            </FormSection>

            <FormSection
              title="DENTALUNIT"
              isOpen={viewDentalUnit}
              onToggle={() => setDentalUnit(!viewDentalUnit)}
              colorClass="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
            >
              <FormDentalUnit
                activeMonth={activeMonth}
                dataInputPeralatanMesin={dataInputPeralatanMesin}
                result={resultDentalUnit}
                dataPoa={dataPoa}
              />
            </FormSection>

            <FormSection
              title="PEAKFLOWMETER"
              isOpen={viewPeakflowMeter}
              onToggle={() => setPeakflowMeter(!viewPeakflowMeter)}
              colorClass="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
            >
              <FormPeakflowMeter
                activeMonth={activeMonth}
                dataInputPeralatanMesin={dataInputPeralatanMesin}
                result={resultPeakflowMeter}
                dataPoa={dataPoa}
              />
            </FormSection>
            
            <FormSection
              title="MOTOR"
              isOpen={viewMotor}
              onToggle={() => setMotor(!viewMotor)}
              colorClass="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
            >
              <FormMotor
                activeMonth={activeMonth}
                dataInputPeralatanMesin={dataInputPeralatanMesin}
                result={resultMotor}
                dataPoa={dataPoa}
              />
            </FormSection>

           



          </div>
        )}
      </div>
    </div>
  );
};

export default FormPeralatanMesin;
