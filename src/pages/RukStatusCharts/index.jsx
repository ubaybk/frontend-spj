import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const RukStatusCharts = ({ rukData = [] }) => {
  // Definisi data untuk setiap chart
  const charts = [
    {
      title: 'Total Data RUK',
      data: [
        { status: 'Total RUK', jumlah: rukData.length }
      ]
    },
    {
      title: 'Proses Pengadaan',
      data: [
        { status: 'Terima Pengadaan', jumlah: rukData.filter(ruk => ruk.status === "Terima Pengadaan").length },
        { status: 'Tolak/Tanpa Status', jumlah: rukData.filter(ruk => !ruk.status || ruk.status === "Tolak Pengadaan").length },
        { status: 'Perbaikan', jumlah: rukData.filter(ruk => ruk.statusVerifikator === "Tolak Verifikator").length }
      ]
    },
    {
      title: 'Proses Verifikator',
      data: [
        { status: 'Terima Verifikator', jumlah: rukData.filter(ruk => ruk.statusVerifikator === "Terima Verifikator").length },
        { status: 'Tolak Verifikator', jumlah: rukData.filter(ruk => !ruk.statusVerifikator || ruk.statusVerifikator === "Tolak Verifikator").length },
        { status: 'Menunggu Tindak Lanjut', jumlah: rukData.filter(ruk => ruk.statusKapusKaTu === "Belum TTD").length }
      ]
    },
    {
      title: 'Proses Persetujuan (Kapus/Katu)',
      data: [
        { status: 'Sudah TTD', jumlah: rukData.filter(ruk => ruk.statusKapusKaTu === "Sudah TTD").length },
        { status: 'Belum TTD', jumlah: rukData.filter(ruk => !ruk.statusKapusKaTu || ruk.statusKapusKaTu === "Belum TTD").length },
        { status: 'Menunggu Scan', jumlah: rukData.filter(ruk => ruk.statusScann === "Belum Scann").length }
      ]
    },
    {
      title: 'Proses Scanning',
      data: [
        { status: 'Sudah Scan', jumlah: rukData.filter(ruk => ruk.statusScann === "Sudah Scann").length },
        { status: 'Belum Scan', jumlah: rukData.filter(ruk => !ruk.statusScann || ruk.statusScann === "Belum Scann").length }
      ]
    },
    {
      title: 'Proses Pembayaran',
      data: [
        { status: 'Sudah Dibayar', jumlah: rukData.filter(ruk => ruk.statusBendahara === "Sudah Dibayar").length },
        { status: 'Belum Dibayar', jumlah: rukData.filter(ruk => !ruk.statusBendahara || ruk.statusBendahara === "Belum Dibayar").length }
      ]
    },
    {
      title: 'Status Penyelesaian',
      data: [
        { status: 'Sudah Selesai', jumlah: rukData.filter(ruk => 
          ruk.statusBendahara === "Sudah Dibayar" && 
          ruk.statusScann === "Sudah Scann" && 
          ruk.status === "Terima Pengadaan" && 
          ruk.statusVerifikator === "Terima Verifikator" && 
          ruk.statusKapusKaTu === "Sudah TTD"
        ).length },
        { status: 'Belum Selesai', jumlah: rukData.length - rukData.filter(ruk => 
          ruk.statusBendahara === "Sudah Dibayar" && 
          ruk.statusScann === "Sudah Scann" && 
          ruk.status === "Terima Pengadaan" && 
          ruk.statusVerifikator === "Terima Verifikator" && 
          ruk.statusKapusKaTu === "Sudah TTD"
        ).length }
      ]
    }
  ];

  // Warna untuk setiap chart
  const chartColors = [
    '#8884d8', // Ungu
    '#82ca9d', // Hijau
    '#ffc658', // Kuning
    '#ff7300', // Oranye
    '#ff4d4d', // Merah
    '#4299e1', // Biru
    '#48bb78'  // Hijau muda
  ];

  // Komponen Chart Individual
  const RenderChart = ({ title, data, color }) => {
    if (!data || data.length === 0) {
      return (
        <div className="w-full h-[300px] flex items-center justify-center">
          <p className="text-gray-500">Tidak ada data untuk {title}</p>
        </div>
      );
    }

    return (
      <div className="w-full h-[350px] bg-white rounded-lg shadow-md p-4 mb-4">
        <h2 className="text-lg font-semibold mb-2 text-center">{title}</h2>
        <ResponsiveContainer width="100%" height="90%">
          <BarChart 
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="status" angle={-45} textAnchor="end" />
            <YAxis allowDecimals={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#f9f9f9' }}
              formatter={(value) => [value, 'Jumlah']}
            />
            <Bar 
              dataKey="jumlah" 
              fill={color}
              name="Jumlah"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  };

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {charts.map((chart, index) => (
        <RenderChart 
          key={chart.title} 
          title={chart.title} 
          data={chart.data} 
          color={chartColors[index % chartColors.length]} 
        />
      ))}
    </div>
  );
};

export default RukStatusCharts;