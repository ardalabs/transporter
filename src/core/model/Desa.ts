import mongoose from 'mongoose';
import {Schema} from 'mongoose';
const DesaSchema = new mongoose.Schema({
    kecamatan: { type: Schema.Types.ObjectId, ref: 'Kecamatan' },
    id: String,
    id_kecamatan: String,
    nama: String,
    dapil: Array,
  });
export const Desa = mongoose.model<any>('Desa', DesaSchema)