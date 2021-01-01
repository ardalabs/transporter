import mongoose from 'mongoose';

export interface IUser {
  _id?: mongoose.Types.ObjectId;
  emails: string;
  isDeleted: boolean;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type MaillerLogDocument = mongoose.Document & {
  _id?: mongoose.Types.ObjectId;
  payload: mongoose.Schema.Types.Mixed;
  email: string;
  name: string;
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

const mailOperationLogSchema = new mongoose.Schema({
  emails: {
    type: String,
    required: true,
    unique: true
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  name: String,
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() }
});

mailOperationLogSchema.pre('update', function update() {
  this.update(
    {},
    {
      $set: {
        updatedAt: Date.now()
      }
    }
  );
});

mailOperationLogSchema.pre('findOneAndUpdate', function () {
  this.update(
    {},
    {
      $set: {
        updatedAt: Date.now()
      }
    }
  );
});
export const User = mongoose.model<IUser & mongoose.Document>(
  'User',
  mailOperationLogSchema
);
