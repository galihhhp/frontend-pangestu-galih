import type { ChangeEvent } from "react";
import Input from "./Input";
import Textarea from "./Textarea";
import Label from "./Label";
import Dropdown from "./Dropdown";
import type { Option, BarangOption } from "../types";

type FormProps = {
  negara: number | null;
  pelabuhan: number | null;
  barang: number | null;
  negaraOptions: Option[];
  pelabuhanOptions: Option[];
  barangOptions: BarangOption[];
  desc: string;
  harga: number;
  diskon: number;
  total: number;
  error?: string;
  onNegaraChange: (value: number | null) => void;
  onPelabuhanChange: (value: number | null) => void;
  onBarangChange: (value: number | null) => void;
  onDiskonChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onHargaChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onDescChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
};

const formatRupiah = (num: number) => {
  return `Rp. ${num.toLocaleString("id-ID")}`;
};

export default function Form({
  negara,
  pelabuhan,
  barang,
  negaraOptions,
  pelabuhanOptions,
  barangOptions,
  desc,
  harga,
  diskon,
  total,
  error,
  onNegaraChange,
  onPelabuhanChange,
  onBarangChange,
  onDiskonChange,
  onHargaChange,
  onDescChange,
}: FormProps) {
  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-2">
      <form className="bg-white shadow-xl rounded-xl p-8 w-full max-w-xl flex flex-col gap-6 border">
        {error && (
          <div className="bg-red-50 text-red-500 p-4 rounded-lg text-sm">
            {error}
          </div>
        )}
        <div className="grid grid-cols-12 items-center gap-2">
          <Label>NEGARA</Label>
          <span className="col-span-1 text-neutral-700">:</span>
          <div className="col-span-7">
            <Dropdown
              items={negaraOptions}
              value={negara}
              onSelect={onNegaraChange}
              placeholder="Pilih negara..."
              clearable
            />
          </div>
        </div>
        <div className="grid grid-cols-12 items-center gap-2">
          <Label>PELABUHAN</Label>
          <span className="col-span-1 text-neutral-700">:</span>
          <div className="col-span-7">
            <Dropdown
              items={pelabuhanOptions}
              value={pelabuhan}
              onSelect={onPelabuhanChange}
              placeholder="Pilih pelabuhan..."
              clearable
            />
          </div>
        </div>
        <div className="grid grid-cols-12 items-center gap-2">
          <Label>BARANG</Label>
          <span className="col-span-1 text-neutral-700">:</span>
          <div className="col-span-7">
            <Dropdown
              items={barangOptions}
              value={barang}
              onSelect={onBarangChange}
              placeholder="Pilih barang..."
              clearable
            />
          </div>
        </div>
        <div className="grid grid-cols-12 items-start gap-2">
          <Label className="pt-2">&nbsp;</Label>
          <span className="col-span-1"></span>
          <div className="col-span-7">
            <Textarea
              value={desc}
              onChange={onDescChange}
              className="resize-none"
              rows={8}
              placeholder="Deskripsi barang..."
            />
          </div>
        </div>
        <div className="grid grid-cols-12 items-center gap-2">
          <Label>DISCOUNT</Label>
          <span className="col-span-1 text-neutral-700">:</span>
          <div className="col-span-7 flex items-center gap-2">
            <Input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={diskon}
              onChange={onDiskonChange}
              className="w-20 text-right"
              placeholder="0"
            />
            <span className="text-neutral-700">%</span>
          </div>
        </div>
        <div className="grid grid-cols-12 items-center gap-2">
          <Label>HARGA</Label>
          <span className="col-span-1 text-neutral-700">:</span>
          <div className="col-span-7">
            <Input
              value={harga ? formatRupiah(harga) : ""}
              onChange={onHargaChange}
              className="text-right"
              placeholder="Harga barang"
            />
          </div>
        </div>
        <div className="grid grid-cols-12 items-center gap-2">
          <Label>TOTAL</Label>
          <span className="col-span-1 text-neutral-700">:</span>
          <div className="col-span-7">
            <Input
              value={total ? formatRupiah(total) : ""}
              readOnly
              className="bg-neutral-100 text-neutral-700 text-right font-semibold"
              placeholder="Total"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
