import mongoose from 'mongoose';
import {Schema} from 'mongoose';
const DapilkabkotSchema = new mongoose.Schema({
    province: { type: Schema.Types.ObjectId, ref: 'Kabkot' },
    id_province: String, 
    id: String, 
    nama: String, 
    wilayah: Array,
    jml_kursi: Number
});
export const Dapilkabkot = mongoose.model<any>('Dapilkabkot', DapilkabkotSchema)