import { Schema, model } from 'mongoose';

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      url: String,
      public_id: String,
    },
    phone: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    favorite: {
      type: Boolean,
      required: true,
      default: false,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

const ContactModel = model('Contact', contactSchema);
export default ContactModel;
