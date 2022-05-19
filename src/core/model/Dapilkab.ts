import mongoose from 'mongoose';
import {Schema} from 'mongoose';
const DapilkabkotSchema = new mongoose.Schema({
    province: { type: Schema.Types.ObjectId, ref: 'Province' },
    kabkot: { type: Schema.Types.ObjectId, ref: 'Kabkot' },
    id_province: String, 
    id_kabkot: String, 
    id: String, 
    nama: String, 
    wilayah: Array,
    jml_kursi: Number,
    idVersi: String,
    noDapil: String,
    statusCoterminous:Boolean,
});
export const Dapilkabkot = mongoose.model<any>('Dapilkabkot', DapilkabkotSchema)