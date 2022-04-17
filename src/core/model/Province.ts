import mongoose from 'mongoose';
const ProvinceSchema = new mongoose.Schema({
    id: String,
    nama: String,
    dapil: Array,
  });
export const Province = mongoose.model<any>('Province', ProvinceSchema)