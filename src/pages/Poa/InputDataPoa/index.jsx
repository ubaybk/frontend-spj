import { useState, useContext } from "react";
import Header from "../../../components/header";
import { poaContext } from "../../../context/PoaContextProvider";
import { ChevronDown, ChevronUp } from "lucide-react";
import FormInputBarjas from "../../../components/formInputBarjas";
import FormInputPeralatanMesin from "../../../components/formPeralatanMesin";

const InputDataPoa = () => {
  const { dataPoa } = useContext(poaContext);
  const [viewDataPoa, setViewDataPoa] = useState(false);
  const [activeMonth, setActiveMonth] = useState(null);
  const [activeSection, setActiveSection] = useState(null);
  

  const handleMonthClick = (month) => {
    setActiveMonth(activeMonth === month ? null : month); // set active month
  };

  const handleSectionClick = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };

  const renderInputFields = () => {
    if (activeSection === "barangJasa") {
      return <FormInputBarjas activeMonth={activeMonth} />; // kirim activeMonth sebagai props
    }
    if (activeSection === "peralatanMesin") {
      return <FormInputPeralatanMesin activeMonth={activeMonth} />; // kirim activeMonth sebagai props
    }
    return null;
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div>
        <Header />
      </div>

      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">
            Input Monitoring dan Evaluasi POA
          </h1>

          {dataPoa.map((item) => (
            <div
              key={item.id}
              className="mb-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200"
            >
              <div className="bg-emerald-50 p-4 rounded-t-xl">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-emerald-700">
                    Data POA Tahun {item.tahun}
                  </h2>
                  <button
                    className="p-2 rounded-lg hover:bg-emerald-100 transition-colors"
                    onClick={() => setViewDataPoa(!viewDataPoa)}
                  >
                    {viewDataPoa ? (
                      <ChevronUp className="h-6 w-6 text-emerald-600" />
                    ) : (
                      <ChevronDown className="h-6 w-6 text-emerald-600" />
                    )}
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-amber-50 p-6 rounded-xl shadow-md">
                    <h3 className="font-semibold text-amber-700 mb-2">
                      Barang dan Jasa
                    </h3>
                    <p className="text-lg text-amber-900">
                      {formatCurrency(item.totalBarangJasa)}
                    </p>
                  </div>

                  <div className="bg-amber-50 p-6 rounded-xl shadow-md">
                    <h3 className="font-semibold text-amber-700 mb-2">
                      Modal Peralatan dan Mesin
                    </h3>
                    <p className="text-lg text-amber-900">
                      {formatCurrency(item.totalModalPeralatanMesin)}
                    </p>
                  </div>

                  <div className="bg-amber-50 p-6 rounded-xl shadow-md">
                    <h3 className="font-semibold text-amber-700 mb-2">
                      Modal Gedung dan Bangunan
                    </h3>
                    <p className="text-lg text-amber-900">
                      {formatCurrency(item.totalModalGedungBangunan)}
                    </p>
                  </div>
                </div>

                {viewDataPoa && (
                  <div className="mt-8 space-y-6">
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                      {[
                        "JAN",
                        "FEB",
                        "MAR",
                        "APR",
                        "MEI",
                        "JUN",
                        "JUL",
                        "AGT",
                        "SEP",
                        "OKT",
                        "NOV",
                        "DES",
                      ].map((month) => (
                        <button
                          key={month}
                          className={`p-3 rounded-lg font-medium transition-colors ${
                            activeMonth === month
                              ? "bg-blue-600 text-white hover:bg-blue-700"
                              : "bg-gray-100 hover:bg-gray-200"
                          }`}
                          onClick={() => handleMonthClick(month)}
                        >
                          {month}
                        </button>
                      ))}
                    </div>

                    {activeMonth && (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <button
                            className={`p-4 text-left rounded-xl border font-medium transition-colors ${
                              activeSection === "barangJasa"
                                ? "bg-amber-100 border-amber-300 text-amber-800"
                                : "bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100"
                            }`}
                            onClick={() => handleSectionClick("barangJasa")}
                          >
                            Barang dan Jasa
                          </button>
                          <button  className={`p-4 text-left rounded-xl border font-medium transition-colors ${
                              activeSection === "peralatanMesin"
                                ? "bg-amber-100 border-amber-300 text-amber-800"
                                : "bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100"
                            }`}
                            onClick={() => handleSectionClick("peralatanMesin")}
                          >
                            Peralatan Mesin
                          </button>
                          <button className="p-4 text-left bg-amber-50 hover:bg-amber-100 text-amber-700 rounded-xl border border-amber-200 font-medium transition-colors">
                            Gedung Bangunan
                          </button>
                        </div>

                        {renderInputFields()}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default InputDataPoa;
