export type Option = {
  label: string;
  value: number;
};

export type NationResponse = {
  id_negara: string;
  kode_negara: string;
  nama_negara: string;
};

export type PelabuhanResponse = {
  id_pelabuhan: string;
  nama_pelabuhan: string;
  id_negara: string;
};

export type BarangResponse = {
  id_barang: number;
  nama_barang: string;
  id_pelabuhan: number;
  description: string;
  harga: number;
  diskon: number;
};

export type BarangOption = Option & {
  description: string;
  harga: number;
  diskon: number;
};
