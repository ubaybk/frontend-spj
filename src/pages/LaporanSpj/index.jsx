import { useContext, useState } from "react";
import Header from "../../components/header";
import * as XLSX from "xlsx";
import { rukDataContext } from "../../context/RukDataContextProvider";

const LaporanSpj = () => {
  const { dataRuk } = useContext(rukDataContext);
  const [startDate, setStartDate] = useState(""); // State untuk rentang awal
  const [endDate, setEndDate] = useState(""); // State untuk rentang akhir
  const [filteredData, setFilteredData] = useState([]); // State untuk data yang sudah difilter

  // Fungsi untuk mengonversi nama bulan ke angka (1-12)
  const getMonthNumber = (monthName) => {
    const months = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];
    return months.indexOf(monthName) + 1; // Mengembalikan angka bulan (1-12)
  };

  // Fungsi untuk melakukan filter berdasarkan rentang bulan
  const handleFilter = () => {
    if (!startDate && !endDate) {
      alert("Silakan pilih rentang bulan terlebih dahulu.");
      return;
    }

    const filtered = dataRuk.filter((item) => {
      const itemMonthNumber = getMonthNumber(item.bulanPelaksanaan); // Konversi nama bulan ke angka
      const startMonthNumber = startDate ? getMonthNumber(startDate) : null;
      const endMonthNumber = endDate ? getMonthNumber(endDate) : null;

      if (startMonthNumber && endMonthNumber) {
        return itemMonthNumber >= startMonthNumber && itemMonthNumber <= endMonthNumber;
      } else if (startMonthNumber) {
        return itemMonthNumber >= startMonthNumber;
      } else if (endMonthNumber) {
        return itemMonthNumber <= endMonthNumber;
      }
      return true; // Jika tidak ada filter, tampilkan semua data
    });

    setFilteredData(filtered); // Simpan hasil filter ke state
  };

  // Fungsi untuk mendownload data sebagai file Excel
  const handleDownloadExcel = () => {
    if (filteredData.length === 0) {
      alert("Tidak ada data yang dapat diunduh.");
      return;
    }

    // Siapkan data untuk Excel
    const formattedData = filteredData.map((item, index) => ({
      No: index + 1,
      Tempat_Tugas: item.tempatTugas || "-",
      Pokja: item.pokja || "-",
      Bulan_Pelaksanaan: item.bulanPelaksanaan || "-",
      Kegiatan: item.kegiatan || "-",
      Sub_Kegiatan: item.subKegiatan || "-",
      Aktivitas: item.aktivitas || "-",
      Tujuan: item.tujuan || "-",
      Sasaran: item.sasaran || "-",
      Target_Sasaran: item.targetSasaran || "-",
      PJ: item.pj || "-",
      Lokasi_Kegiatan: item.lokasiKegiatan || "-",
      Komponen: Array.isArray(item.komponen)
        ? item.komponen.join(", ")
        : "-",
      Anggaran: item.anggaran || "-",
      Indikator_Kinerja: item.indikatorKinerja || "-",
      Sumber_Pembiayaan: item.sumberPembiayaan || "-",
    }));

    // Buat worksheet
    const worksheet = XLSX.utils.json_to_sheet(formattedData);

    // Buat workbook dan tambahkan worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Laporan SPJ");

    // Export file Excel
    XLSX.writeFile(workbook, "Laporan_SPJ.xlsx");
  };

  return (
    <>
      <div className="flex w-full gap-3">
        <div>
          <Header />
        </div>
        <div>
          <h1 className="text-xl font-bold mb-4">Laporan SPJ</h1>

          {/* Input Filter Rentang Bulan */}
          <div className="mb-4">
            <label className="mr-2">Rentang Bulan:</label>
            <select
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border border-gray-300 p-1 mr-2"
            >
              <option value="">Pilih Bulan Awal</option>
              <option value="Januari">Januari</option>
              <option value="Februari">Februari</option>
              <option value="Maret">Maret</option>
              <option value="April">April</option>
              <option value="Mei">Mei</option>
              <option value="Juni">Juni</option>
              <option value="Juli">Juli</option>
              <option value="Agustus">Agustus</option>
              <option value="September">September</option>
              <option value="Oktober">Oktober</option>
              <option value="November">November</option>
              <option value="Desember">Desember</option>
            </select>
            <span className="mx-2">sampai</span>
            <select
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border border-gray-300 p-1"
            >
              <option value="">Pilih Bulan Akhir</option>
              <option value="Januari">Januari</option>
              <option value="Februari">Februari</option>
              <option value="Maret">Maret</option>
              <option value="April">April</option>
              <option value="Mei">Mei</option>
              <option value="Juni">Juni</option>
              <option value="Juli">Juli</option>
              <option value="Agustus">Agustus</option>
              <option value="September">September</option>
              <option value="Oktober">Oktober</option>
              <option value="November">November</option>
              <option value="Desember">Desember</option>
            </select>
            <button
              onClick={handleFilter}
              className="bg-green-500 text-white px-4 py-2 rounded ml-2"
            >
              Filter
            </button>
          </div>

          {/* Tombol Download */}
          <button
            onClick={handleDownloadExcel}
            className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
          >
            Download Excel
          </button>

          {/* Tampilkan data dalam tabel */}
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">No.</th>
                <th className="border border-gray-300 p-2">Tempat Tugas</th>
                <th className="border border-gray-300 p-2">Pokja</th>
                <th className="border border-gray-300 p-2">Bulan Pelaksanaan</th>
                <th className="border border-gray-300 p-2">Kegiatan</th>
                <th className="border border-gray-300 p-2">Sub Kegiatan</th>
                <th className="border border-gray-300 p-2">Aktivitas</th>
                <th className="border border-gray-300 p-2">Tujuan</th>
                <th className="border border-gray-300 p-2">Sasaran</th>
                <th className="border border-gray-300 p-2">Target Sasaran</th>
                <th className="border border-gray-300 p-2">PJ</th>
                <th className="border border-gray-300 p-2">Lokasi Kegiatan</th>
                <th className="border border-gray-300 p-2">Komponen</th>
                <th className="border border-gray-300 p-2">Anggaran</th>
                <th className="border border-gray-300 p-2">Indikator Kinerja</th>
                <th className="border border-gray-300 p-2">Sumber Pembiayaan</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 p-2 text-center">{index + 1}</td>
                    <td className="border border-gray-300 p-2">{item.tempatTugas || "-"}</td>
                    <td className="border border-gray-300 p-2">{item.pokja || "-"}</td>
                    <td className="border border-gray-300 p-2">{item.bulanPelaksanaan || "-"}</td>
                    <td className="border border-gray-300 p-2">{item.kegiatan || "-"}</td>
                    <td className="border border-gray-300 p-2">{item.subKegiatan || "-"}</td>
                    <td className="border border-gray-300 p-2">{item.aktivitas || "-"}</td>
                    <td className="border border-gray-300 p-2">{item.tujuan || "-"}</td>
                    <td className="border border-gray-300 p-2">{item.sasaran || "-"}</td>
                    <td className="border border-gray-300 p-2">{item.targetSasaran || "-"}</td>
                    <td className="border border-gray-300 p-2">{item.pj || "-"}</td>
                    <td className="border border-gray-300 p-2">{item.lokasiKegiatan || "-"}</td>
                    <td className="border border-gray-300 p-2">
                      {Array.isArray(item.komponen)
                        ? item.komponen.join(", ")
                        : "-"}
                    </td>
                    <td className="border border-gray-300 p-2">{item.anggaran || "-"}</td>
                    <td className="border border-gray-300 p-2">{item.indikatorKinerja || "-"}</td>
                    <td className="border border-gray-300 p-2">{item.sumberPembiayaan || "-"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="17" className="border border-gray-300 p-2 text-center">
                    {filteredData.length === 0 && startDate && endDate
                      ? "Data tidak tersedia untuk rentang bulan ini."
                      : "Silakan pilih rentang bulan dan klik Filter."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default LaporanSpj;