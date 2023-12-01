import { BranchSeq } from '../../models';
import { queryBuilderGetList } from './query-builder'
import { listInitOptions } from '../../utils/paginate'


async function findById(id) {
  return BranchSeq.findByPk(id)
}

async function findOne(query) {
  return BranchSeq.findOne({
    where: {
      ...query
    }
  });
}

async function create(body) {
  try {
    const createdBranch = await BranchSeq.create(body);
    return createdBranch.get({ plain: true });
  } catch (error) {
    console.error(`Error creating branch: ${error.message}`);
    throw error; // Rethrow the error for the calling function to handle, if needed
  }
}


async function updateOne(query, body) {
  return BranchSeq.update(body, { where: { ...query } })
}

const findAll = async (request) => {
  const condition = queryBuilderGetList(request)
  const option = listInitOptions(request)
  option.raw = undefined
  return BranchSeq.findAndCountAll({
    where: condition,
    ...option,
    order: [['BranchName', 'ASC']],
    attributes:
    {
      exclude: request.excludes,
      include: request.includes
    }
  })
}


// const findAll = async (request) => {
//   return BranchSeq.findAndCountAll({
//     order: [['BranchName', 'ASC']],
//     attributes:
//     {
//       exclude: request.excludes,
//       include: request.includes
//     }
//   })
// }


async function countDocuments(query) {
  return BranchSeq.count(query)
}

const destroy = async (id) => {
  return BranchSeq.destroy({ where: { Id: id } })
}


export default {
  findById,
  findAll,
  create,
  findOne,
  updateOne,
  countDocuments,
  destroy
}
