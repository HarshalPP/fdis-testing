import { handleResponse } from '../../utils/handle-response';
import to from '../../utils/to';
import service from './service';

const create = async (req, res) => {
  const [error, data] = await to(service.create(req.body)); // Ensure req.body is being passed
  handleResponse(error, data, req, res);
}

async function createbyid(req, res) {
  try {
    const [error, result] = await to(service.createbyid(req.params.id));
    handleResponse(error, result, req, res);
  } catch (error) {
    // Handle unexpected errors (e.g., syntax errors, etc.)
    console.error('Unexpected error:', error);
    res.status(500).json({
      error: 'An unexpected error occurred while processing the request',
    });
  }
}
export default {
  create,
  createbyid
};
