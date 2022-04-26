import mongoose from 'mongoose';
import {Schema} from 'mongoose';
const KecamatanSchema = new mongoose.Schema({
    kabkot: { type: Schema.Types.ObjectId, ref: 'Kabkot' },
    id: String,
    id_kabkot: String,
    nama: String,
    dapil: Array,
  });
export const Kecamatan = mongoose.model<any>('Kecamatan', KecamatanSchema)