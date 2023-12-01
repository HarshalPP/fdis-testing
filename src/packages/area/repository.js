import { FormSeq, CategorySeq, FloorSeq } from '../../models';
import { queryBuilderGetList } from './query-builder'
import { listInitOptions } from '../../utils/paginate'


async function findById(id) {
  return FormSeq.findByPk(id, {
    include: ['Auditdata', 'Categories', 'Floors', 'AreaDescriptions']
  });
}




async function findOne(query) {
  return FormSeq.findOne({
    where: {
      ...query
    },
  });
}

// async function create(body) {
//   console.log("body is " , body)
//   return (await FormSeq.create(body)).get({ plain: true })
// }

async function create(body) {
  try {
    console.log("body is ", body);

    // Fetch additional data from FloorSeq based on FloorId
    const floorData = await FloorSeq.findOne({
      raw: true,
      where: {
        Id: body.FloorId,
      },
    });

    // Fetch additional data from CategorySeq based on CategoryId
    const categoryData = await CategorySeq.findOne({
      raw: true,
      where: {
        Id: body.CategoryId,
      },
    });

    // Combine data from FloorSeq and CategorySeq and add it to Comments
    if (floorData && categoryData) {
      body.Comments = `${floorData.FloorName} - ${categoryData.CategoryNameAbv}`;
    } else {
      // Handle the case where either FloorSeq or CategorySeq data is not found
      console.error('Error: FloorSeq or CategorySeq data not found');
      // You may throw an error or handle it in a way that makes sense for your application
    }

    // Create a new record in FormSeq with the updated body
    const createdRecord = await FormSeq.create(body);

    // Return the plain object representation of the created record
    return createdRecord.get({ plain: true });
  } catch (error) {
    console.error('Error creating record:', error);
    throw error; // Handle or log the error as needed
  }
}



async function updateOne(query, body) {
  return FormSeq.update(body, { where: { ...query } })
}

const findAll = async (request) => {
  const condition = queryBuilderGetList(request)
  const option = listInitOptions(request)
  option.raw = undefined
  return FormSeq.findAndCountAll({
    where: condition,
    ...option,
    attributes:
    {
      exclude: request.excludes,
      include: request.includes
    },
    include: ['Auditdata', 'Categories', 'Floors', 'AreaDescriptions']
  })
}

async function countDocuments(query) {
  return FormSeq.count(query)
}

const destroy = async (id) => {
  return FormSeq.destroy({ where: { Id: id } })
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
