// DataTable.jsx
const DataTable = ({ data, activeMonth, type }) => {
    return (
      <div className="overflow-x-auto py-6">
        <table className="min-w-full bg-white shadow-lg rounded-lg border-collapse">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="py-3 px-4 text-left">Tanggal</th>
              <th className="py-3 px-4 text-left">Keterangan</th>
              <th className="py-3 px-4 text-left">Jumlah {type}</th>
            </tr>
          </thead>
          <tbody>
            {data
              .filter((item) => item.bulan === activeMonth && item.type === type)
              .map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-100">
                  <td className="py-3 px-4 text-left">
                    {item?.createAt
                      ?.toDate()
                      .toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                  </td>
                  <td className="py-3 px-4 text-left">
                    {item.keterangan}
                  </td>
                  <td className="py-3 px-4 text-left">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(item.jumlahThr)}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default DataTable;