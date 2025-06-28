import fs from 'node:fs/promises';
import cloudinary from '../utils/cloudinary.js';
import ContactModel from '../models/contactModel.js';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';

//Todo: GET | /api/contacts/getContacts?page=${pageNumber}  | private
const getContacts = asyncHandler(async (req, res) => {
  const author = req.user._id;
  const page = parseInt(req.query.page) || 1;
  const limit = 10;

  const skip = (page - 1) * limit;
  const totalDocs = await ContactModel.find().countDocuments({ author });

  const contacts = await ContactModel.find({ author })
    .sort({ updatedAt: -1 })
    .limit(limit)
    .skip(skip)
    .select('-__v')
    .populate('author', 'name email _id');

  res.status(200).json({
    contacts,
    currentPage: page,
    totalPage: Math.ceil(totalDocs / limit),
    totalDocCount: totalDocs,
    limit,
  });
});

//Todo: GET | /api/contacts/getContact | private
const getContact = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const contact = await ContactModel.findById({ _id: id }).populate(
    'author',
    'name email _id'
  );

  if (!contact) {
    return next(new ApiError('Contact Not Found!', 404));
  }

  res.status(200).json(contact);
});

//Todo: POST | /api/contacts/createContact | private
const createContact = asyncHandler(async (req, res, next) => {
  const author = req.user._id;
  const { name, phone, category, favorite } = req.body;

  if (!req.file) {
    return next(new ApiError('Please upload an image.', 400));
  }

  const path = req.file?.path;

  const uploadedImage = await cloudinary.uploader.upload(path, {
    folder: 'contacts',
    resource_type: 'image',
  });

  await fs.unlink(path);

  const image = {
    url: uploadedImage.secure_url,
    public_id: uploadedImage.public_id,
  };

  const contact = await ContactModel.create({
    name,
    phone,
    category,
    image,
    favorite,
    author,
  });

  if (!contact) {
    return next(new ApiError('Contact not created.', 401));
  }

  res.status(201).json(contact);
});

//Todo: POST | /api/contacts/searchContact | private
const searchContact = asyncHandler(async (req, res, next) => {
  const { name } = req.body;
  const pattern = new RegExp('^' + name, 'igm');

  const contacts = await ContactModel.find({
    author: req.user._id,
    name: { $regex: pattern },
  }).select('_id name');

  if (!contacts || contacts.length === 0) {
    return next(new ApiError('No contacts found with that name.', 404));
  }

  res.status(200).json(contacts);
});

//Todo: PUT | /api/contacts/updateContact | private
const updateContact = asyncHandler(async (req, res, next) => {
  let image = {};

  const { id } = req.params;
  const author = req.user._id;
  const { name, phone, category, favorite, publicId } = req.body;
  const path = req?.file?.path;

  //if image is provided delete old and upload the new one
  if (publicId) {
    // deleteimg
    await cloudinary.uploader.destroy(publicId, {
      folder: 'contacts',
      resource_type: 'image',
    });

    // upload img
    if (path) {
      const uploadedImage = await cloudinary.uploader.upload(path, {
        folder: 'contacts',
        resource_type: 'image',
      });

      // remove temp image file
      await fs.unlink(path);

      // use uploaded image
      image = {
        url: uploadedImage.secure_url,
        public_id: uploadedImage.public_id,
      };
    }
  }

  //structure fields to update
  const updateFields = {
    name,
    phone,
    category,
    favorite,
  };

  // check if image is provided
  if (publicId && image?.url && image?.public_id) {
    updateFields.image = image;
  }

  const updatedContact = await ContactModel.findOneAndUpdate(
    { _id: id, author },
    updateFields,
    { new: true }
  );

  if (!updatedContact) {
    return next(new ApiError('Contact not updated.'));
  }

  res.status(200).json(updatedContact);
});

//Todo: DELETE | /api/contacts/deleteContact | private
const deleteContact = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { publicId } = req.body;

  if (publicId && publicId !== 'no-image') {
    // delete image from cloudinary
    await cloudinary.uploader.destroy(publicId, {
      folder: 'contacts',
      resource_type: 'image',
    });
  }

  const deletedContact = await ContactModel.findByIdAndDelete(id);

  if (!deletedContact) {
    return next(new ApiError('Contact not deleted.', 400));
  }
  res.status(200).json(deletedContact);
});

export {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
  searchContact,
};
