import {ImgSeq} from '../../models';
import {Sequelize}from 'sequelize'
import method from './method'
import { commonLocale } from '../../locales'
const jwt = require('jsonwebtoken');
const multer = require('multer')
import UplodeImg from './imgUplode'
import sequelize from 'sequelize';
const fs = require('fs')
const path = require('path');
const { uploadFile, getFileStream } = require('./imgUplode')

const uplode = async(file)=>{
   const fileStream = fs.createReadStream(file.path)
   const file_original = file.originalname
   const Extention=path.extname(file_original);
   const Mimetype=file.mimetype;
   const ImageDataLocation=file.filename+`${Extention}`
   const uplode = await uploadFile(file)
   const raw=`INSERT INTO [dbo].[Images]([ImageDataLocation],[ImageMimeType])VALUES
    ('${ImageDataLocation}','${Mimetype}')`;
   const resoonse =  await ImgSeq.sequelize.query(raw, {
    replacements:[''],
    type: Sequelize.QueryTypes.INSERT
   })

   const select=`SELECT ImageId FROM [dbo].[Images] WHERE [ImageDataLocation]='${ImageDataLocation}'`
   const result =  await ImgSeq.sequelize.query(select, {
    replacements:[ImageDataLocation],
    type: Sequelize.QueryTypes.SELECT
   })
   return result[0].ImageId;
}


const updateImage = async(Id,file)=> {
    const fileStream = fs.createReadStream(file.path)
    const file_original = file.originalname
    const Extention=path.extname(file_original);
    const Mimetype=file.mimetype;
    const ImageDataLocation=file.filename+`${Extention}`
    const uplode = await uploadFile(file)

  const raw = `update Images set ImageDataLocation='${ImageDataLocation}',ImageMimeType='${Mimetype}'
  from Images as I inner join Users as U on U.ProfileImage =I.ImageId where U.Id ='${Id}'`;
  const req =  await ImgSeq.sequelize.query(raw, {
    replacements:['Id'],
     type: Sequelize.QueryTypes.INSERT
     })

  };

  const ekaSignature = async (id) => {
    try {
      const clientId = id;
      const raw = `
        SELECT
          Id,
          AuditId,  -- Assuming AuditId is a column in the AuditRemarks table
          image
        FROM
          AuditRemarks
        WHERE
          AuditId = :clientId`;
  
      const result = await ImgSeq.sequelize.query(raw, {
        type: Sequelize.QueryTypes.SELECT,
        replacements: { clientId }, // Parameterized query
      });
  
      return result;
    } catch (error) {
      console.error('Error in ekaSignature:', error);
      throw error; // Re-throw the error to handle it in the calling function
    }
  };
  
  
  
  




export default {
  uplode,
  updateImage,
  ekaSignature
}
