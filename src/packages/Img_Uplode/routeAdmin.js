// import express from 'express'
// import controller from './controller'
// const fs = require('fs')
// const util = require('util')
// const unlinkFile = util.promisify(fs.unlink)
// const multer = require('multer')
// const router = express.Router()
// const upload = multer({ dest: 'uploads/' })
// const { uploadFile, getFileStream } = require('./imgUplode')

// router.post('/images', upload.single('image'), async (req, res) => {
//     const file = req.file
//     const result = await uploadFile(file)
//     await unlinkFile(file.path)
//     console.log(result)
//     const description = req.body.description
//     res.send({imagePath:`/images/${result.Key}`})
//   })
//   router.post('/uplode',upload.single('image'),controller.uploadImage)
//   router.post('/update/:Id',upload.single('image'),controller.updateImage )

//   export default router


import express from 'express';
import multer from 'multer';
import controller from './controller';
import AWS from 'aws-sdk';
import { ImgSeq } from '../../models';
import dotenv from 'dotenv';

const router = express.Router();
dotenv.config();

// Configure AWS
AWS.config.update({
  region: 'eu-central-1',
  accessKeyId: 'AKIASHWNAZJVCZMVS7OV',
    secretAccessKey: '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',
});
const S3 = new AWS.S3();

// Configure Multer
const upload = multer({
  limits: {
    fileSize: 1024 * 1024 * 5, // Limit file size to 5MB
  },
  fileFilter: (req, file, done) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (allowedMimeTypes.includes(file.mimetype)) {
      done(null, true);
    } else {
      done(new Error('Unsupported file format. Only JPEG, PNG, and JPG formats are allowed.'), false);
    }
  },
});

// Function to upload to S3
const uploadToS3 = (fileData) => {
  const params = {
    Bucket: 'client-logoo',
    Key: `${Date.now().toString()}.png`,
    Body: fileData,
  };

  return new Promise((resolve, reject) => {
    S3.upload(params, (err, data) => {
      if (err) {
        console.error('Error uploading image to S3:', err);
        reject(err);
      } else {
        console.log('S3 Upload Result:', data);
        resolve(data);
      }
    });
  });
};

// Route to handle image upload and data insertion
router.post('/SignatureUpload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Image not provided' });
    }

    const s3UploadResult = await uploadToS3(req.file.buffer);


    const userClientData = {
      AuditId: req.body.AuditId,
      image: s3UploadResult.Location,
    };

    await ImgSeq.create(userClientData); // Use .create() to insert data
    res.status(200).json({
      message: 'File uploaded and data inserted successfully',
      image: s3UploadResult.Location,
      data: userClientData,
    });
    return userClientData;
  } catch (error) {
    console.error('Error uploading image and creating data:', error);
    res.status(500).json({
      error: 'An error occurred while processing the request',
    });
  }
});


router.get('/ekaSignature/:id', controller.ekaSignature)

export default router





