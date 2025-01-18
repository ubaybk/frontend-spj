import { useState, useContext, useEffect } from "react";
import { poaContext } from "../context/PoaContextProvider";
import { inputBarjasContext } from "../context/InputBarjasContextProvider";

import FormGaji13 from "./BarjasInput/formGaji13";
import FormThr from "./BarjasInput/formThr";
import { fetchPoaData } from "../poaUtils";



const FormInputBarjas = ({ activeMonth }) => {
  const [viewThr, setViewThr] = useState(false);
  const [viewGaji13, setViewGaji13] = useState(false);
  const { dataPoa } = useContext(poaContext);
  const { dataInputBarjas } = useContext(inputBarjasContext);
  const [resultThr, setResultThr] = useState(null);
  const [resultGaji13, setResultGaji13] = useState(null);

  useEffect(() => {
    const getPoaData = async () => {
      const data = await fetchPoaData(dataPoa?.[0]?.tahun);
      if (data) {
        setResultThr(data.thrNonPns);
        setResultGaji13(data.gaji13NonPns);
      }
    };
    getPoaData();
  }, [dataPoa, dataInputBarjas]);

  return (
    <div className="mt-4 space-y-4 bg-white p-6 rounded-xl shadow-sm">
      <h4 className="font-semibold text-gray-700 mb-4">
        Input Barang dan Jasa
      </h4>

      {/* THR */}
      <div>
        <label
          onClick={() => setViewThr(!viewThr)}
          className="block text-sm font-medium text-gray-700 cursor-pointer"
        >
          THR NON PNS
        </label>
        {viewThr && (
          <FormThr 
            activeMonth={activeMonth}
            dataInputBarjas={dataInputBarjas}
            result={resultThr}
            dataPoa={dataPoa}
          />
        )}
      </div>

      {/* Gaji 13 */}
      <div>
        <label
          onClick={() => setViewGaji13(!viewGaji13)}
          className="block text-sm font-medium text-gray-700 cursor-pointer"
        >
          GAJI 13 NON PNS
        </label>
        {viewGaji13 && (
          <FormGaji13
            activeMonth={activeMonth}
            dataInputBarjas={dataInputBarjas}
            result={resultGaji13}
            dataPoa={dataPoa}
          />
        )}
      </div>
    </div>
  );
};

export default FormInputBarjas;