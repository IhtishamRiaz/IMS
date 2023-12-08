import { Account } from '../models/accountModel.js';
import mongoose from 'mongoose';

const updateExistingDocuments = async () => {
   try {
      // Update all documents to set the balance property if it doesn't exist
      const result = await Account.updateMany(
         { balance: { $exists: false } }, // Update documents where balance doesn't exist
         { $set: { balance: 0 } } // Set the default value for the balance property
      );

      console.log(`Updated ${result.nModified} documents.`);
   } catch (error) {
      console.error(error);
   }
};

export default updateExistingDocuments;