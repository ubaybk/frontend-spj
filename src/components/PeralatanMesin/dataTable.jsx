import { TiDelete } from "react-icons/ti";
// import { handleDelete as deleteData } from "../../poaUtilsPeralatanMesin";
import { handleDeletePeralatanMesin as deleteData } from "../../poaUtilsPeralatanMesin";

const DataTable = ({ data, activeMonth, type, setResult }) => {
  const handleDelete = async (item) => {
    const deletedItem = await deleteData(item.id, item);
    if (deletedItem) {
      // Perbarui result dengan menambahkan jumlah dari data yang dihapus
      setResult((prevResult) => prevResult + deletedItem.jumlah);

      // Hapus item dari data lokal
      const updatedData = data.filter((dataItem) => dataItem.id !== item.id);
      console.log("Data setelah dihapus:", updatedData);
      alert(`Item dengan keterangan "${item.keterangan}" telah dihapus.`);
    }
  };

  return (
    <div className="overflow-x-auto py-6">
      <table className="min-w-full bg-white shadow-lg rounded-lg border-collapse">
        <thead>
          <tr className="bg-blue-600 text-white">
            <th className="py-3 px-4 text-left">Tanggal</th>
            <th className="py-3 px-4 text-left">Keterangan</th>
            <th className="py-3 px-4 text-left">Jumlah {type}</th>
            <th className="py-3 px-4 text-left">Hapus</th>
          </tr>
        </thead>
        <tbody>
          {data
            .filter((item) => item.bulan === activeMonth && item.type === type)
            .map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-100">
                <td className="py-3 px-4 text-left">
                  {item?.createAt?.toDate().toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </td>
                <td className="py-3 px-4 text-left">{item.keterangan}</td>
                <td className="py-3 px-4 text-left">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(item.jumlah)}
                </td>
                <td className="py-3 px-4 text-left">
                  <div
                    className="text-[30px] hover:cursor-pointer text-red-600"
                    onClick={() => handleDelete(item)}
                  >
                    <TiDelete />
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
