/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import repo from './repository'
import { commonLocale } from '../../locales'

async function create(body) {
  const data = await repo.findOne({
    CompanyName: body.CompanyName,
  })
  if (data) {
    throw new Error(JSON.stringify(commonLocale.dataAlreadyExisted))
  }

  return repo.create(body)
}


async function update(id, body) {
  await repo.updateOne({ Id: id }, body)

  return show(id)
}

async function index(query) {
  return repo.rawQueryList(query)
}

async function show(id) {
  return repo.findById(id)
}

async function show1(id) {
  return repo.findById1(id)
}

async function index1(query) {
  return repo.rawQueryList1(query)
}

async function create1(body) {
  return repo.create1(body)
}

async function destroy(id) {
  return repo.destroy(id)
}

async function showbyid(id)
{
  return repo.findAllByRole(id)
}
export default {
  create,
  index,
  index1,
  show,
  update,
  destroy,
  showbyid,
  create1,
  show1
}
