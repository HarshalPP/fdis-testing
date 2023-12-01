import repo from './repository';

async function create(body) {
  const { subject,Text,html } = body; // Extract subject from the body
  return repo.create(body, subject,Text,html); // Pass both body and subject to the repository
}

async function createbyid(id) {
  try {
    const result = await repo.createbyid(id);
    return result;
  } catch (error) {
    console.error('Error in createbyid:', error);
    throw error;
  }
}
export default {
  create,
  createbyid
}
