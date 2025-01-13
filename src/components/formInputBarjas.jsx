const FormInputBarjas = () => {
  return (
    <>
      <div className="mt-4 space-y-4 bg-white p-6 rounded-xl shadow-sm">
        <h4 className="font-semibold text-gray-700 mb-4">
          Input Barang dan Jasa
        </h4>
        <div>
          <label className="block text-sm font-medium text-gray-700">THR</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Keterangan"
              />
            </div>
            <div className="space-y-2">
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Rp,..."
              />
            </div>
            <div className="space-y-2">
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Tanggal input"
              />
            </div>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            GAJI
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Keterangan"
              />
            </div>
            <div className="space-y-2">
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Rp,..."
              />
            </div>
            <div className="space-y-2">
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Tanggal input"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Simpan
          </button>
        </div>
      </div>
    </>
  );
};

export default FormInputBarjas;
