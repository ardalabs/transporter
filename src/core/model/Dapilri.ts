import mongoose from 'mongoose';
const DapilriSchema = new mongoose.Schema({
    id: String, 
    nama: String, 
    wilayah: Array,
    jml_kursi: Number,
    idVersi: String,
    noDapil: String,
    statusCoterminous:Boolean,
});
export const Dapilri = mongoose.model<any>('Dapilri', DapilriSchema)