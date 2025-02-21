import React, { useState, useContext, useEffect } from "react";
import { poaContext } from "../context/PoaContextProvider";
import { inputBarjasContext } from "../context/InputBarjasContextProvider";

import FormGaji13 from "./BarjasInput/formGaji13";
import FormThr from "./BarjasInput/formThr";
import FormTkdPpppk from "./BarjasInput/formTkdPpppk";
import FormArtKebersihan from "./BarjasInput/formArtKebersihan";
import FormAtk from "./BarjasInput/formAtk";
import FormCetakan from "./BarjasInput/formCetakan";
import FormBahanMentah from "./BarjasInput/formBahanMentah";
import FormAlkesPakaiHabis from "./BarjasInput/formAlkesPakaiHabis";
import FormAlatLaboratorium from "./BarjasInput/formAlatLaboratorium";
import FormObat from "./BarjasInput/formObat";
import FormDesinfectan from "./BarjasInput/formDesinfectan";
import FormLarvasida from "./BarjasInput/formLarvasida";
import FormGajiPjlp from "./BarjasInput/formGajiPjlp";
import FormRme from "./BarjasInput/formRme";
import FormRetribusiSampah from "./BarjasInput/formRetribusiSampah";
import FormTelepon from "./BarjasInput/formTelepon";
import FormAir from "./BarjasInput/formAir";
import FormListrik from "./BarjasInput/formListrik";
import FormInternet from "./BarjasInput/formInternet";
import FormDiklat from "./BarjasInput/formDiklat";
import FormBpjsKesehatan from "./BarjasInput/formBpjsKesehatan";
import FormBpjsKetenagakerjaan from "./BarjasInput/formBpjsKetenagakerjaan";
import FormPakaianDinas from "./BarjasInput/formPakaianDinas";
import FormJasaPeriksaSampleKesling from "./BarjasInput/formJasaPeriksaSampleKesling";
import FormCateringPasienRb from "./BarjasInput/formCateringPasienRb";
import FormSewaMesinFc from "./BarjasInput/formSewaMesinFc";
import FormKerjaSamaPemeriksaanLab from "./BarjasInput/formKerjaSamaPemeriksaanLab";
import FormJasaHygneService from "./BarjasInput/formJasaHygneService";
import FormBbmFogging from "./BarjasInput/formBbmFogging";
import FormMutu from "./BarjasInput/formMutu";










import { fetchPoaData } from "../poaUtils";
import { MdCalendarMonth } from "react-icons/md";


const FormInputBarjas = ({ activeMonth }) => {
  const [viewThr, setViewThr] = useState(false);
  const [viewGaji13, setViewGaji13] = useState(false);
  const [viewTkdPpppk, setViewTkdPpppk] = useState(false);
  const [viewArtKebersihan, setArtKebersihan] = useState(false);
  const [viewAtk, setAtk] = useState(false);
  const [viewCetakan, setCetakan] = useState(false);
  const [viewBahanMentah, setBahanMentah] = useState(false);
  const [viewAlkesPakaiHabis, setAlkesPakaiHabis] = useState(false)
  const [viewAlatLaboratorium, setAlatLaboratorium] = useState(false)
  const [viewObat, setObat] = useState(false)
  const [viewDesinfectan, setDesinfectan] = useState(false)
  const [viewLarvasida, setLarvasida] = useState(false)
  const [viewGajiPjlp, setGajiPjlp] = useState(false)
  const [viewRme, setRme] = useState(false)
  const [viewRetribusiSampah, setRetribusiSampah] = useState(false)
  const [viewTelepon, setTelepon] = useState(false)
  const [viewAir, setAir] = useState(false)
  const [viewListrik, setListrik] = useState(false)
  const [viewInternet, setInternet] = useState(false)
  const [viewDiklat, setDiklat] = useState(false)
  const [viewBpjsKesehatan, setBpjsKesehatan] = useState(false)
  const [viewBpjsKetenagakerjaan, setBpjsKetenagakerjaan] = useState(false)
  const [viewPakaianDinas, setPakaianDinas] = useState(false)
  const [viewJasaPeriksaSampleKesling, setJasaPeriksaSampleKesling] = useState(false)
  const [viewCateringPasienRb, setCateringPasienRb] = useState(false)
  const [viewSewaMesinFc, setSewaMesinFc] = useState(false)
  const [viewKerjaSamaPemeriksaanLab, setKerjaSamaPemeriksaanLab] = useState(false)
  const [viewJasaHygineService, setJasaHygineService] = useState(false)
  const [viewBbmFogging, setBbmFogging] = useState(false)
  const [viewMutu, setMutu] = useState(false)

  const { dataPoa } = useContext(poaContext);
  const { dataInputBarjas } = useContext(inputBarjasContext);
  const [resultThr, setResultThr] = useState(null);
  const [resultGaji13, setResultGaji13] = useState(null);
  const [resultTkdPpppk, setResultTkdPpppk] = useState(null);
  const [resultArtKebersihan, setResultArtKebersihan] = useState(null);
  const [resultAtk, setResultAtk] = useState(null);
  const [resultCetakan, setResultCetakan] = useState(null);
  const [resultBahanMentah, setResultBahanMentah] = useState(null);
  const [resultAlkesPakaiHabis, setResultAlkesPakaiHabis] = useState(null)
  const [resultAlatLaboratorium, setResultAlatLaboratorium] = useState(null)
  const [resultObat, setResultObat] = useState(null)
  const [resultDesinfectan, setResultDesinfectan] = useState(null)
  const [resultLarvasida, setResultLarvasida] = useState(null)
  const [resultGajiPjlp, setResultGajiPjlp] = useState(null)
  const [resultRme, setResultRme] = useState(null)
  const [resultRetribusiSampah, setResultRetribusiSampah] = useState(null)
  const [resultTelepon, setResultTelepon] = useState(null)
  const [resultAir, setResultAir] = useState(null)
  const [resultListrik, setResultListrik] = useState(null)
  const [resultInternet, setResultInternet] = useState(null)
  const [resultDiklat, setResultDiklat] = useState(null)
  const [resultBpjsKesehatan, setResultBpjsKesehatan] = useState(null)
  const [resultBpjsKetenagakerjaan, setResultBpjsKetenagakerjaan] = useState(null)
  const [resultPakaianDinas, setResultPakaianDinas] = useState(null)
  const [resultJasaPeriksaSampleKesling, setResultJasaPeriksaSampleKesling] = useState(null)
  const [resultCateringPasienRb, setResultCateringPasienRb] = useState(null)
  const [resultSewaMesinFc, setResultSewaMesinFc] = useState(null)
  const [resultKerjaSamaPemeriksaanLab, setResultKerjaSamaPemeriksaanLab] = useState(null)
  const [resultJasaHygineService, setResultJasaHygineService] = useState(null)
  const [resultBbmFogging, setResultBbmFogging] = useState(null)
  const [resultMutu, setResultMutu] = useState(null)
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getPoaData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchPoaData(dataPoa?.[0]?.tahun);
        if (data) {
          setResultThr(data.thrNonPns);
          setResultGaji13(data.gaji13NonPns);
          setResultTkdPpppk(data.tkdPPPPK)
          setResultArtKebersihan(data.artDanAlatKebersihan)
          setResultAtk(data.atk)
          setResultCetakan(data.cetakan)
          setResultBahanMentah(data.bahanMentah)
          setResultAlkesPakaiHabis(data.alkesPakaiHabis)
          setResultAlatLaboratorium(data.alatLaboratorium)
          setResultObat(data.obat)
          setResultDesinfectan(data.pengadaanDesinfectan)
          setResultLarvasida(data.pengadaanLarvasida)
          setResultGajiPjlp(data.gajiPjlp)
          setResultRme(data.jasaRekamMedik)
          setResultRetribusiSampah(data.retribusiSampah)
          setResultTelepon(data.telpon)
          setResultAir(data.air)
          setResultListrik(data.listrik)
          setResultInternet(data.internet)
          setResultDiklat(data.diklat)
          setResultBpjsKesehatan(data.bpjsKesehatan)
          setResultBpjsKetenagakerjaan(data.bpjsKetenagakerjaan)
          setResultPakaianDinas(data.pakaianDinas)
          setResultJasaPeriksaSampleKesling(data.jasaPeriksaSampleKesling)
          setResultCateringPasienRb(data.cateringPasienRb)
          setResultSewaMesinFc(data.sewaMesinFc)
          setResultKerjaSamaPemeriksaanLab(data.kerjaSamaPemeriksaanLab)
          setResultJasaHygineService(data.jasaHygineService)
          setResultBbmFogging(data.bbmFogging)
          setResultMutu(data.mutu)

        }
      } catch (error) {
        console.error("Error fetching POA data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getPoaData();
  }, [dataPoa, dataInputBarjas]);

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
            Input Barang dan Jasa
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
              title="THR NON PNS"
              isOpen={viewThr}
              onToggle={() => setViewThr(!viewThr)}
              colorClass="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
            >
              <FormThr
                activeMonth={activeMonth}
                dataInputBarjas={dataInputBarjas}
                result={resultThr}
                dataPoa={dataPoa}
              />
            </FormSection>

            <FormSection
              title="GAJI 13 NON PNS"
              isOpen={viewGaji13}
              onToggle={() => setViewGaji13(!viewGaji13)}
              colorClass="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
            >
              <FormGaji13
                activeMonth={activeMonth}
                dataInputBarjas={dataInputBarjas}
                result={resultGaji13}
                dataPoa={dataPoa}
              />
            </FormSection>

            <FormSection
              title="TKD PPPPK"
              isOpen={viewTkdPpppk}
              onToggle={() => setViewTkdPpppk(!viewTkdPpppk)}
              colorClass="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
            >
              <FormTkdPpppk
                activeMonth={activeMonth}
                dataInputBarjas={dataInputBarjas}
                result={resultTkdPpppk}
                dataPoa={dataPoa}
              />
            </FormSection>

            <FormSection
              title="ART dan Alat Kebersihan"
              isOpen={viewArtKebersihan}
              onToggle={() => setArtKebersihan(!viewArtKebersihan)}
              colorClass="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
            >
              <FormArtKebersihan
                activeMonth={activeMonth}
                dataInputBarjas={dataInputBarjas}
                result={resultArtKebersihan}
                dataPoa={dataPoa}
              />
            </FormSection>

            <FormSection
              title="ATK"
              isOpen={viewAtk}
              onToggle={() => setAtk(!viewAtk)}
              colorClass="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
            >
              <FormAtk
                activeMonth={activeMonth}
                dataInputBarjas={dataInputBarjas}
                result={resultAtk}
                dataPoa={dataPoa}
              />
            </FormSection>
            
            <FormSection
              title="CETAKAN"
              isOpen={viewCetakan}
              onToggle={() => setCetakan(!viewCetakan)}
              colorClass="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
            >
              <FormCetakan
                activeMonth={activeMonth}
                dataInputBarjas={dataInputBarjas}
                result={resultCetakan}
                dataPoa={dataPoa}
              />
            </FormSection>

            <FormSection
              title="BAHAN MENTAH"
              isOpen={viewBahanMentah}
              onToggle={() => setBahanMentah(!viewBahanMentah)}
              colorClass="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
            >
              <FormBahanMentah
                activeMonth={activeMonth}
                dataInputBarjas={dataInputBarjas}
                result={resultBahanMentah}
                dataPoa={dataPoa}
              />
            </FormSection>

            <FormSection
              title="ALKES PAKAI HABIS"
              isOpen={viewAlkesPakaiHabis}
              onToggle={() => setAlkesPakaiHabis(!viewAlkesPakaiHabis)}
              colorClass="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
            >
              <FormAlkesPakaiHabis
                activeMonth={activeMonth}
                dataInputBarjas={dataInputBarjas}
                result={resultAlkesPakaiHabis}
                dataPoa={dataPoa}
              />
            </FormSection>
            
            <FormSection
              title="ALAT LABORATORIUM"
              isOpen={viewAlatLaboratorium}
              onToggle={() => setAlatLaboratorium(!viewAlatLaboratorium)}
              colorClass="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
            >
              <FormAlatLaboratorium
                activeMonth={activeMonth}
                dataInputBarjas={dataInputBarjas}
                result={resultAlatLaboratorium}
                dataPoa={dataPoa}
              />
            </FormSection>
            
            <FormSection
              title="OBAT"
              isOpen={viewObat}
              onToggle={() => setObat(!viewObat)}
              colorClass="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
            >
              <FormObat
                activeMonth={activeMonth}
                dataInputBarjas={dataInputBarjas}
                result={resultObat}
                dataPoa={dataPoa}
              />
            </FormSection>
            
            <FormSection
              title="DESINFECTAN"
              isOpen={viewDesinfectan}
              onToggle={() => setDesinfectan(!viewDesinfectan)}
              colorClass="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
            >
              <FormDesinfectan
                activeMonth={activeMonth}
                dataInputBarjas={dataInputBarjas}
                result={resultDesinfectan}
                dataPoa={dataPoa}
              />
            </FormSection>
            
            <FormSection
              title="LARVASIDA"
              isOpen={viewLarvasida}
              onToggle={() => setLarvasida(!viewLarvasida)}
              colorClass="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
            >
              <FormLarvasida
                activeMonth={activeMonth}
                dataInputBarjas={dataInputBarjas}
                result={resultLarvasida}
                dataPoa={dataPoa}
              />
            </FormSection>
            
            <FormSection
              title="GAJI PJLP"
              isOpen={viewGajiPjlp}
              onToggle={() => setGajiPjlp(!viewGajiPjlp)}
              colorClass="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
            >
              <FormGajiPjlp
                activeMonth={activeMonth}
                dataInputBarjas={dataInputBarjas}
                result={resultGajiPjlp}
                dataPoa={dataPoa}
              />
            </FormSection>

            <FormSection
              title="RME"
              isOpen={viewRme}
              onToggle={() => setRme(!viewRme)}
              colorClass="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
            >
              <FormRme
                activeMonth={activeMonth}
                dataInputBarjas={dataInputBarjas}
                result={resultRme}
                dataPoa={dataPoa}
              />
            </FormSection>

            <FormSection
              title="RETRIBUSI SAMPAH"
              isOpen={viewRetribusiSampah}
              onToggle={() => setRetribusiSampah(!viewRetribusiSampah)}
              colorClass="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
            >
              <FormRetribusiSampah
                activeMonth={activeMonth}
                dataInputBarjas={dataInputBarjas}
                result={resultRetribusiSampah}
                dataPoa={dataPoa}
              />
            </FormSection>
            
            <FormSection
              title="TELEPON"
              isOpen={viewTelepon}
              onToggle={() => setTelepon(!viewTelepon)}
              colorClass="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
            >
              <FormTelepon
                activeMonth={activeMonth}
                dataInputBarjas={dataInputBarjas}
                result={resultTelepon}
                dataPoa={dataPoa}
              />
            </FormSection>

            <FormSection
              title="AIR"
              isOpen={viewAir}
              onToggle={() => setAir(!viewAir)}
              colorClass="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
            >
              <FormAir
                activeMonth={activeMonth}
                dataInputBarjas={dataInputBarjas}
                result={resultAir}
                dataPoa={dataPoa}
              />
            </FormSection>

            <FormSection
              title="LISTRIK"
              isOpen={viewListrik}
              onToggle={() => setListrik(!viewListrik)}
              colorClass="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
            >
              <FormListrik
                activeMonth={activeMonth}
                dataInputBarjas={dataInputBarjas}
                result={resultListrik}
                dataPoa={dataPoa}
              />
            </FormSection>
            
            <FormSection
              title="INTERNET"
              isOpen={viewInternet}
              onToggle={() => setInternet(!viewInternet)}
              colorClass="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
            >
              <FormInternet
                activeMonth={activeMonth}
                dataInputBarjas={dataInputBarjas}
                result={resultInternet}
                dataPoa={dataPoa}
              />
            </FormSection>
            
            <FormSection
              title="DIKLAT"
              isOpen={viewDiklat}
              onToggle={() => setDiklat(!viewDiklat)}
              colorClass="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
            >
              <FormDiklat
                activeMonth={activeMonth}
                dataInputBarjas={dataInputBarjas}
                result={resultDiklat}
                dataPoa={dataPoa}
              />
            </FormSection>

            <FormSection
              title="BPJSKESEHATAN"
              isOpen={viewBpjsKesehatan}
              onToggle={() => setBpjsKesehatan(!viewBpjsKesehatan)}
              colorClass="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
            >
              <FormBpjsKesehatan
                activeMonth={activeMonth}
                dataInputBarjas={dataInputBarjas}
                result={resultBpjsKesehatan}
                dataPoa={dataPoa}
              />
            </FormSection>
            
            <FormSection
              title="BPJSKETENAGAKERJAAN"
              isOpen={viewBpjsKetenagakerjaan}
              onToggle={() => setBpjsKetenagakerjaan(!viewBpjsKetenagakerjaan)}
              colorClass="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
            >
              <FormBpjsKetenagakerjaan
                activeMonth={activeMonth}
                dataInputBarjas={dataInputBarjas}
                result={resultBpjsKetenagakerjaan}
                dataPoa={dataPoa}
              />
            </FormSection>
            
            <FormSection
              title="PAKAIANDINAS"
              isOpen={viewPakaianDinas}
              onToggle={() => setPakaianDinas(!viewPakaianDinas)}
              colorClass="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
            >
              <FormPakaianDinas
                activeMonth={activeMonth}
                dataInputBarjas={dataInputBarjas}
                result={resultPakaianDinas}
                dataPoa={dataPoa}
              />
            </FormSection>

            <FormSection
              title="JASAPERIKSASAMPLEKESLING"
              isOpen={viewJasaPeriksaSampleKesling}
              onToggle={() => setJasaPeriksaSampleKesling(!viewJasaPeriksaSampleKesling)}
              colorClass="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
            >
              <FormJasaPeriksaSampleKesling
                activeMonth={activeMonth}
                dataInputBarjas={dataInputBarjas}
                result={resultJasaPeriksaSampleKesling}
                dataPoa={dataPoa}
              />
            </FormSection>

            <FormSection
              title="CATERINGPASIENRB"
              isOpen={viewCateringPasienRb}
              onToggle={() => setCateringPasienRb(!viewCateringPasienRb)}
              colorClass="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
            >
              <FormCateringPasienRb
                activeMonth={activeMonth}
                dataInputBarjas={dataInputBarjas}
                result={resultCateringPasienRb}
                dataPoa={dataPoa}
              />
            </FormSection>
           
            <FormSection
              title="SEWAMESINFC"
              isOpen={viewSewaMesinFc}
              onToggle={() => setSewaMesinFc(!viewSewaMesinFc)}
              colorClass="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
            >
              <FormSewaMesinFc
                activeMonth={activeMonth}
                dataInputBarjas={dataInputBarjas}
                result={resultSewaMesinFc}
                dataPoa={dataPoa}
              />
            </FormSection>
            
            <FormSection
              title="KERJASAMAPEMERIKSAANLAB"
              isOpen={viewKerjaSamaPemeriksaanLab}
              onToggle={() => setKerjaSamaPemeriksaanLab(!viewKerjaSamaPemeriksaanLab)}
              colorClass="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
            >
              <FormKerjaSamaPemeriksaanLab
                activeMonth={activeMonth}
                dataInputBarjas={dataInputBarjas}
                result={resultKerjaSamaPemeriksaanLab}
                dataPoa={dataPoa}
              />
            </FormSection>

            <FormSection
              title="JASAHYGINESERVICE"
              isOpen={viewJasaHygineService}
              onToggle={() => setJasaHygineService(!viewJasaHygineService)}
              colorClass="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
            >
              <FormJasaHygneService
                activeMonth={activeMonth}
                dataInputBarjas={dataInputBarjas}
                result={resultJasaHygineService}
                dataPoa={dataPoa}
              />
            </FormSection>

            <FormSection
              title="BBMFOGGING"
              isOpen={viewBbmFogging}
              onToggle={() => setBbmFogging(!viewBbmFogging)}
              colorClass="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
            >
              <FormBbmFogging
                activeMonth={activeMonth}
                dataInputBarjas={dataInputBarjas}
                result={resultBbmFogging}
                dataPoa={dataPoa}
              />
            </FormSection>

            <FormSection
              title="MUTU"
              isOpen={viewMutu}
              onToggle={() => setMutu(!viewMutu)}
              colorClass="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
            >
              <FormMutu
                activeMonth={activeMonth}
                dataInputBarjas={dataInputBarjas}
                result={resultMutu}
                dataPoa={dataPoa}
              />
            </FormSection>



          </div>
        )}
      </div>
    </div>
  );
};

export default FormInputBarjas;
