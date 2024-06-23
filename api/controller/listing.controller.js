import Listing from "../models/Listing.model.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, "Listing not found"));
  }
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, "You can only delete your own listing"));
  }
  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json("Listing has been deleted");
  } catch (error) {
    next(error);
  }
};

// export const updateListing = async (req, res, next) => {
//   const listing = await Listing.findById(req.params.id);
//   if (!listing) {
//     return next(errorHandler(404, "Listing not found"));
//   }
//   if (req.user.id !== listing.userRef) {
//     return next(errorHandler(401, "You can only delete your own listing"));
//   }
//   try {
//     const updatedListing = Listing.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });
//     res.status(200).json(updatedListing);
//   } catch (error) {
//     next(error);
//   }
// };

export const updateListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, "Listing not found"));
    }
    if (req.user.id !== listing.userRef.toString()) {
      return next(errorHandler(401, "You can only update your own listing"));
    }

    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true, // Ensures that validations are run on the updated data
      }
    );

    if (!updatedListing) {
      return next(errorHandler(404, "Listing not found after update"));
    }

    res.status(200).json({ success: true, data: updatedListing });
  } catch (error) {
    next(error);
  }
};
