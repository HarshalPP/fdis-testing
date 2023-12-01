import { CategorySeq } from '../../models';
import { queryBuilderGetList } from './query-builder'
import { listInitOptions } from '../../utils/paginate'
import { Sequelize } from 'sequelize';
import { func } from 'joi';



//         // Working Api //
// async function findById(id) {
//   return CategorySeq.findByPk(id, {
//     include: ['UserClient']
//   })
// }


async function findById1(CategoryId) {
  try {
    const category = await CategorySeq.findByPk(CategoryId, {
      include: ['UserClient'],
    });

    if (!category) {
      // Handle the case where no category is found
      return null;
    }

    const raw = `
      SELECT
        [MinimunSizeRange] AS minimum_size_range,
        [MinimunSizeRange1] AS minimum_size_range1,
        [MinimunSizeRange2] AS minimum_size_range2,
        [MaximunSizeRange] AS maximum_size_range,
        [MaximunSizeRange1] AS maximum_size_range1,
        [MaximunSizeRange2] AS maximum_size_range2,
        [ApprovedLimit] AS approved_limit,
        [ApprovedLimit1] AS approved_limit1,
        [ApprovedLimit2] AS approved_limit2
      FROM [fdis].[dbo].[cat-list] AS cc
      LEFT JOIN [fdis].[dbo].[Categories] AS c ON c.Id = cc.CategoryId
      WHERE cc.CategoryId = :CategoryId
    `;

    const results = await CategorySeq.sequelize.query(raw, {
      replacements: { CategoryId },
      type: Sequelize.QueryTypes.SELECT,
    });

    // Combine category and results into a single object
    const combinedData = {
      category: category.toJSON(), // Convert category to a plain object
      results: results,
    };

    console.log("result data is", combinedData);

    return combinedData;
  } catch (error) {
    throw error;
  }
}








async function findById(CategoryId) {
  try {
    const category = await CategorySeq.findByPk(CategoryId, {
      include: ['UserClient'], // Include associations as needed
    });
    if (!category) {
      throw new Error(`Category with CategoryId ${CategoryId} not found`);
    }
    return category;
  } catch (error) {
    throw error;
  }
}




async function findOne(query) {
  return CategorySeq.findOne({
    where: {
      ...query
    },
    include: ['UserClient']
  });
}



async function create(body) {
  console.log("body data is",body)
  try {
    // Insert data into the "cat-list" table without specifying "CategoryId"
    const raw = `
    INSERT INTO [fdis].[dbo].[cat-list] (CategoryId, MinimunSizeRange, MaximunSizeRange, ApprovedLimit,MinimunSizeRange1,MinimunSizeRange2,MaximunSizeRange1,MaximunSizeRange2,ApprovedLimit1,ApprovedLimit2)
    VALUES (:categoryId, :minSizeRange, :minSizeRange1, :minSizeRange2, :maxSizeRange, :maxSizeRange1, :maxSizeRange2, :approvedLimit, :approvedLimit1, :approvedLimit2)
  `;

    console.log("raw data is" ,raw)

    // Create a new category record and get the result
    const newCategory = await CategorySeq.create(body);
    console.log("newCategory is",newCategory)

    const replacements = {
      categoryId: newCategory.ID, // Use the ID of the newly created category
      minSizeRange: body.MinimunSizeRange ,
      minSizeRange1: body.MinimunSizeRange1 ,
      minSizeRange2: body.MinimunSizeRange2 ,
      maxSizeRange: body.MaximunSizeRange,
      maxSizeRange1: body.MaximunSizeRange1,
      maxSizeRange2: body.MaximunSizeRange2,
      approvedLimit: body.ApprovedLimit ,
      approvedLimit1: body.ApprovedLimit1,
      approvedLimit2: body.ApprovedLimit2
    };

    console.log("replacement data is",replacements)

    // Insert the data into the "cat-list" table
    await CategorySeq.sequelize.query(raw, {
      replacements,
      type: Sequelize.QueryTypes.INSERT,
    });

    // Return the created "cat-list" record
    return newCategory;
  } catch (error) {
    throw error;
  }
}




async function updateOne(query, body) {
  console.log("Query data is", query);
  
  // Define the raw SQL query
  const raw = `
   UPDATE [fdis].[dbo].[cat-list]
   SET MinimunSizeRange='${body.MinimunSizeRange}',
   MinimunSizeRange1='${body.MinimunSizeRange1}',
   MinimunSizeRange2='${body.MinimunSizeRange2}',
   MaximunSizeRange='${body.MaximunSizeRange}',
   MaximunSizeRange1='${body.MaximunSizeRange1}',
   MaximunSizeRange2='${body.MaximunSizeRange2}',
   ApprovedLimit='${body.ApprovedLimit}',
   ApprovedLimit1='${body.ApprovedLimit1}',
   ApprovedLimit2='${body.ApprovedLimit2}'
   WHERE [fdis].[dbo].[cat-list].CategoryId='${query.ID}'
  `;

  console.log("raw data is", raw);

  // Define the replacements for the query
  const replacements = {
    MinimunSizeRange: body.MinimunSizeRange,
    MinimunSizeRange1: body.MinimunSizeRange1,
    MinimunSizeRange2: body.MinimunSizeRange2,
    MaximunSizeRange: body.MaximunSizeRange,
    MaximunSizeRange1: body.MaximunSizeRange1,
    MaximunSizeRange2: body.MaximunSizeRange2,
    ApprovedLimit: body.ApprovedLimit,
    ApprovedLimit1: body.ApprovedLimit1,
    ApprovedLimit2: body.ApprovedLimit2,
    CategoryId: query.ID,
  };

  console.log("replacement data is ", replacements);
  
  // Use Sequelize raw query to update the record
  await CategorySeq.sequelize.query(raw, {
    replacements,
    type: Sequelize.QueryTypes.UPDATE,
  });

  // Use Sequelize ORM update method to update the record (optional)
   await CategorySeq.update(body, { where: { ...query } });

  // Return the updated data (you can choose to return the result of the Sequelize update method or body, depending on your needs)
  return body;
}


async function updateOne(query, body) {
  console.log("Query data is", query);
  
  // Use Sequelize ORM update method to update the record (optional)
  await CategorySeq.update(body, { where: { ...query } });

  // Return the updated data (you can choose to return the result of the Sequelize update method or body, depending on your needs)
  return body;
}



const updatecount= async(id,body)=>{

  const raw=`UPDATE cat-list
  SET MinimunSizeRange='${body.MinimunSizeRange}',MinimunSizeRange1='${body.MinimunSizeRange1}',MinimunSizeRange2='${body.MinimunSizeRange2}', 
  MaximunSizeRange='${body.MaximunSizeRange}',MaximunSizeRange1='${body.MaximunSizeRange1}',MaximunSizeRange2='${body.MaximunSizeRange2}',
   ApprovedLimit='${body.ApprovedLimit}',ApprovedLimit1='${body.ApprovedLimit1}',ApprovedLimit2='${body.ApprovedLimit2}'
  WHERE cat-list.CategoryId='${id}'`;

  await CategorySeq.sequelize.query(raw,{
    replacements:[''],
    type:Sequelize.QueryTypes.UPDATE,
  });

  return body

}




const findAll = async (request) => {
  return CategorySeq.findAndCountAll({
    include: ['UserClient']
  })
}

async function countDocuments(query) {
  return CategorySeq.count(query)
}
       
            // Delete Api // 
// const destroy = async (id) => {
//   return CategorySeq.destroy({ where: { ID: id } })
// }


// const destroy = async (id) => {
//   const raw=`DELETE [cat-list] WHERE CategoryId ='${id}'`
//  return CategorySeq.sequelize.query(raw,{
//   replacements:[{ID:id}],
//   type:Sequelize.QueryTypes.DELETE
//  })
//  return CategorySeq.destroy({ where: { ID: id } })
// }


const destroy = async (id) => {
  try {
    // Destroy the record using Sequelize
    const data = await CategorySeq.destroy({ where: { Id: id } });

    // Define the raw SQL query
    const raw = `DELETE FROM [cat-list] WHERE CategoryId = :id`;

    // Execute the raw SQL query using Sequelize
    const result = await CategorySeq.sequelize.query(raw, {
      replacements: { id }, // Use id as a replacement
      type: Sequelize.QueryTypes.DELETE,
    });

    // Return both the data from CategorySeq.destroy and the raw query result
    return { data ,result};
  } catch (error) {
    throw error;
  }
};


export default {
  findById,
  findById1,
  findAll,
  create,
  findOne,
  updateOne,
  countDocuments,
  destroy,
  updatecount
}
