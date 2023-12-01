/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import repo from './repository'
import { commonLocale } from '../../locales'


async function uploadImage(file) {
  return repo.uplode(file)
}

async function updateImage(Id,file) {
  return repo.updateImage(Id,file)
}


async function ekaSignature(id) {
  try {
    const result = await repo.ekaSignature(id);
    return result;
  } catch (error) {
    console.error('Error in ekaSignature:', error);
    throw error; // Re-throw the error to handle it in the calling function
  }
}




export default {
  uploadImage,
  updateImage,
  ekaSignature
  
}
