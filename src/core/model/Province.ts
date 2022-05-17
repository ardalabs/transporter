import mongoose from 'mongoose';
const ProvinceSchema = new mongoose.Schema({
    id: String,
    nama: String,
    dapil: Array,
    foundDesa: Boolean,
  });
export const Province = mongoose.model<any>('Province', ProvinceSchema)