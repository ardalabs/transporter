import mongoose from 'mongoose';
import { Schema } from 'mongoose';
const DapilprovSchema = new mongoose.Schema({
  province: { type: Schema.Types.ObjectId, ref: 'Province' },
  id_province: String,
  id: String,
  nama: String,
  wilayah: [{ type: Schema.Types.ObjectId, ref: 'Kabkot' }],
  wilayahKec: [{ type: Schema.Types.ObjectId, ref: 'Kecamatan' }],
  jml_kursi: Number,
  idVersi: String,
  noDapil: String,
  statusCoterminous: Boolean
});
export const Dapilprov = mongoose.model<any>('Dapilprov', DapilprovSchema);
