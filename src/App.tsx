import { type ChangeEvent, useEffect, useState } from "react";
import { api } from "./utils/axios";
import type {
  Option,
  NationResponse,
  BarangResponse,
  BarangOption,
} from "./types";
import Form from "./components/Form";
import shipImg from "./assets/ships.png";

function App() {
  const [negara, setNegara] = useState<number | null>(null);
  const [pelabuhan, setPelabuhan] = useState<number | null>(null);
  const [barang, setBarang] = useState<number | null>(null);
  const [desc, setDesc] = useState<string>("");
  const [harga, setHarga] = useState<number>(0);
  const [diskon, setDiskon] = useState<number>(0);
  const [negaraOptions, setNegaraOptions] = useState<Option[]>([]);
  const [pelabuhanOptions, setPelabuhanOptions] = useState<Option[]>([]);
  const [barangOptions, setBarangOptions] = useState<BarangOption[]>([]);
  const [error, setError] = useState<string>();

  const resetForm = () => {
    setPelabuhan(null);
    setBarang(null);
    setDesc("");
    setHarga(0);
    setDiskon(0);
  };
  const resetBarang = () => {
    setBarang(null);
    setDesc("");
    setHarga(0);
    setDiskon(0);
  };

  const fetchOptions = <T,>(
    url: string,
    mapFn: (item: any) => T
  ): Promise<T[]> =>
    api
      .get(url)
      .then((data) => (data as any[]).map(mapFn))
      .catch((err) => {
        setError(err instanceof Error ? err.message : "Failed to fetch");
        return [];
      });

  useEffect(() => {
    fetchOptions<Option>("/negaras", (item: NationResponse) => ({
      label: `${item.kode_negara} - ${item.nama_negara}`,
      value: Number(item.id_negara),
    })).then(setNegaraOptions);
  }, []);

  useEffect(() => {
    if (negara) {
      setError(undefined);
      fetchOptions<Option>(
        `/pelabuhans?filter=${encodeURIComponent(
          JSON.stringify({ where: { id_negara: String(negara) } })
        )}`,
        (item: any) => ({
          label: item.nama_pelabuhan,
          value: Number(item.id_pelabuhan),
        })
      ).then(setPelabuhanOptions);
    } else {
      setPelabuhanOptions([]);
    }
  }, [negara]);

  useEffect(() => {
    if (pelabuhan) {
      setError(undefined);
      fetchOptions<BarangOption>(
        `/barangs?filter=${encodeURIComponent(
          JSON.stringify({ where: { id_pelabuhan: String(pelabuhan) } })
        )}`,
        (item: BarangResponse) => ({
          label: `${item.id_barang} - ${item.nama_barang}`,
          value: item.id_barang,
          description: item.description || "",
          harga: item.harga || 0,
          diskon: item.diskon || 0,
        })
      ).then(setBarangOptions);
    } else {
      setBarangOptions([]);
    }
  }, [pelabuhan]);

  const handleNegaraChange = (value: number | null) => {
    setNegara(value);
    resetForm();
    setError(undefined);
  };

  const handlePelabuhanChange = (value: number | null) => {
    setPelabuhan(value);
    resetBarang();
    setError(undefined);
  };

  const handleBarangChange = (value: number | null) => {
    setBarang(value);
    const selected = barangOptions.find((b) => b.value === value);
    setDesc(selected?.description || "");
    setHarga(selected?.harga || 0);
    setDiskon(selected?.diskon || 0);
  };

  const handleHargaChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setHarga(Number(value));
  };

  const handleDiskonChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    const numValue = Number(value);
    if (numValue >= 0 && numValue <= 100) {
      setDiskon(numValue);
    }
  };

  const handleDescChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDesc(e.target.value);
  };

  const total = Math.round(harga * (1 - (diskon || 0) / 100));

  return (
    <div className="w-screen min-h-screen flex flex-col md:flex-row">
      <div className="md:w-1/3 w-full md:min-h-full bg-teal-700 flex flex-col p-0 relative overflow-hidden">
        <img
          src={shipImg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="absolute inset-0 bg-teal-800/20 z-10" />
        <div className="relative z-20 flex flex-col h-full justify-end items-start p-10">
          <h1 className="text-3xl md:text-4xl 2xl:text-6xl font-bold text-white mb-4 drop-shadow-lg bg-teal-700 p-4 rounded-md 2xl:leading-20">
            Shipping Details
          </h1>
          <p className="text-md md:text-lg 2xl:text-xl text-white font-medium drop-shadow-lg bg-teal-700 p-4 rounded-md">
            Complete the form to input your shipping information. All fields are
            required.
          </p>
        </div>
      </div>
      <div className="flex-1 min-h-2/3 md:min-h-full flex items-center justify-center bg-white p-6 md:p-20">
        <Form
          negara={negara}
          pelabuhan={pelabuhan}
          barang={barang}
          negaraOptions={negaraOptions}
          pelabuhanOptions={pelabuhanOptions}
          barangOptions={barangOptions}
          desc={desc}
          harga={harga}
          diskon={diskon}
          total={total}
          error={error}
          onNegaraChange={handleNegaraChange}
          onPelabuhanChange={handlePelabuhanChange}
          onBarangChange={handleBarangChange}
          onDiskonChange={handleDiskonChange}
          onHargaChange={handleHargaChange}
          onDescChange={handleDescChange}
        />
      </div>
    </div>
  );
}

export default App;
