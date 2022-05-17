import mongoose from 'mongoose';
import {Schema} from 'mongoose';
const KabkotSchema = new mongoose.Schema({
    province: { type: Schema.Types.ObjectId, ref: 'Province' },
    id: String,
    id_province: String,
    nama: String,
    dapil: Array,
    foundDesa: Boolean,
  });
export const Kabkot = mongoose.model<any>('Kabkot', KabkotSchema)