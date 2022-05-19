import mongoose, {Schema} from 'mongoose';
const DapilriSchema = new mongoose.Schema({
    province: { type: Schema.Types.ObjectId, ref: 'Province' },
    id: String, 
    nama: String, 
    wilayah: Array,
    jml_kursi: Number,
    idVersi: String,
    noDapil: String,
    statusCoterminous:Boolean,
});
export const Dapilri = mongoose.model<any>('Dapilri', DapilriSchema)