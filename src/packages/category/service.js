/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import _ from 'lodash'
import repo from './repository'
import { commonLocale } from '../../locales'
import * as userClientModule from '../userClient/index'
import { CategorySeq } from '../../models';
import { Sequelize } from 'sequelize';
import { func } from 'joi';




// Working api //
async function create(body,query) {
  const category = await repo.findOne({
    CategoryName: body.CategoryName.toLowerCase().trim(),
  })
  if (category) {
    throw new Error(JSON.stringify(commonLocale.dataAlreadyExisted))
  }
  if (body.UserClientIds && body.UserClientIds.length) {
    const created = await repo.create(body)

    Promise.all(body.UserClientIds.map(async (m) => {
      const cate = await userClientModule.service.show(m)
      if (cate) { cate.addCategory(created) }
      return true
    }))

    return created
  }

  return repo.create(body,query)
}


// async function create(body) {
//       // Insert data into the "Modules" table
//       const raw = `INSERT INTO [dbo].[cat-list] (MinimunSizeRange, MaximunSizeRange , ApprovedLimit)
//       VALUES ('${body.MinimunSizeRange}', '${body.MaximunSizeRange}' , '${body.ApprovedLimit}')`;
// console.log("raw data is show", raw)

// await CategorySeq.sequelize.query(raw, {
// replacements: [''],
// type: Sequelize.QueryTypes.INSERT,
// });

//   const category = await repo.findOne({
//     CategoryName: body.CategoryName.toLowerCase().trim(),
//   });

//   if (category) {
//     throw new Error(JSON.stringify(commonLocale.dataAlreadyExisted));
//   }

//   if (body.UserClientIds && body.UserClientIds.length) {
//     const created = await repo.create(body);


//     Promise.all(body.UserClientIds.map(async (m) => {
//       const cate = await userClientModule.service.show(m);
//       if (cate) {
//         cate.addCategory(created);
//       }
//       return true;
//     }));

//     return created;
//   }

//   // Your existing code for creating records in the main table (repo.create(body)) goes here

//   return repo.create(body);
// }



async function update(id, body) {
  await repo.updateOne({ ID: id }, body)

  if (body.UserClientIds) {
    const data = await repo.findById(id)
    const areaIds = data.UserClient ? data.UserClient.map(m => m.Id) : []
    const add = _.difference(body.UserClientIds, areaIds)
    const rem = _.difference(areaIds, body.UserClientIds)
    if (add.length) {
      Promise.all(add.map(async (m) => {
        const cate = await userClientModule.service.show(m)
        return cate.addCategory(data)
      }))
    }
    if (rem.length) {
      Promise.all(rem.map(async (m) => {
        const cate = await userClientModule.service.show(m)
        return cate.removeCategory(data)
      }))
    }
    return data
  }

  return show(id)
}

// async function update(ID, body) {
//   try {
//     const data = await repo.findById(ID);
//     console.log("data is ", data);
//     if (!data) {
//       return null;
//     }
//     data.setUserClient([]);
//     await repo.updateOne({ ID: ID }, body);

//     if (body.UserClientIds) {
//       const add = body.UserClientIds;
//       if (add.length) {
//         await Promise.all(
//           add.map(async (m) => {
//             const cate = await userClientModule.service.show(m);
//             console.log("Fetched 'cate' record:", cate);
//             await cate.addCategory(data);
//             console.log("Added new data", cate);
//           })
//         );
//       }
//     }
//     return data;
//   } catch (error) {
//     console.error("Error updating data:", error);
//     throw error;
//   }
// }





async function updatecount(id, body) {
  await repo.updateOne({ ID: id }, body)
}



async function index(query) {
  return repo.findAll(query)
}

async function show(id) {
  return repo.findById(id)
}

async function show1(id) {
  return repo.findById1(id)
}

async function destroy(id) {
  const elementType = await repo.findById(id)
  if (elementType && elementType.UserClient && elementType.UserClient.length) {
    elementType.UserClient.map(m => m.removeCategory(elementType))
  }
  return repo.destroy(id)
}

export default {
  create,
  index,
  show,
  show1,
  update,
  destroy,
  updatecount
}
