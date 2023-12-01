import { pick } from 'lodash'
import { handleResponse } from '../../utils/handle-response'
import to from '../../utils/to'
import service from './service'
import config from './config'


async function  uploadImage(req, res) {
  const [error, result] = await to(service.uploadImage(req.file,req.body))
  return handleResponse(error, result, req, res)
}



async function ekaSignature(req, res) {
  try {
    const [error, result] = await to(service.ekaSignature(req.params.id));

    if (error) {
      console.error('Error in ekaSignature:', error);
      res.status(500).json({ error: 'An error occurred while processing the request' });
    } else {
      // Successful result
      handleResponse(null, result, req, res);
    }
  } catch (unexpectedError) {
    // Handle unexpected errors (e.g., syntax errors, etc.)
    console.error('Unexpected error:', unexpectedError);
    res.status(500).json({
      error: 'An unexpected error occurred while processing the request',
    });
  }
}






async function  updateImage(req, res) {
  const [error, result] = await to(service.updateImage(req.params.Id,req.file,req.body))
  return handleResponse(error, result, req, res)
}



export default {
  
  uploadImage,
   updateImage,
   ekaSignature
}
