
// import express from 'express';
// import multer from 'multer';
// import controller from './controller';
// import AWS from 'aws-sdk';
// import { UserClientSeq } from '../../models';
// import dotenv from 'dotenv';

// const router = express.Router();
// dotenv.config();

// // Configure AWS
// AWS.config.update({
//   region: 'eu-west-1',
//   accessKeyId: 'AKIA45VFOWZYOPCIOJG2',
//   secretAccessKey: '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',
// });
// const S3 = new AWS.S3();

// // Configure Multer
// const upload = multer({
//   limits: {
//     fileSize: 1024 * 1024 * 5, // Limit file size to 5MB
//   },
//   fileFilter: (req, file, done) => {
//     const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
//     if (allowedMimeTypes.includes(file.mimetype)) {
//       done(null, true);
//     } else {
//       done(new Error('Unsupported file format. Only JPEG, PNG, and JPG formats are allowed.'), false);
//     }
//   },
// });

// // Function to upload to S3
// const uploadToS3 = (fileData) => {
//   const params = {
//     Bucket: 'client-logo',
//     Key: `${Date.now().toString()}.png`,
//     Body: fileData,
//   };

//   return new Promise((resolve, reject) => {
//     S3.upload(params, (err, data) => {
//       if (err) {
//         console.error('Error uploading image to S3:', err);
//         reject(err);
//       } else {
//         console.log('S3 Upload Result:', data);
//         resolve(data);
//       }
//     });
//   });
// };

// // Route to handle image upload and data insertion
// router.post('/upload', upload.single('image'), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: 'Image not provided' });
//     }

//     const s3UploadResult = await uploadToS3(req.file.buffer);

//     const userClientData = {
//       CompanyName: req.body.CompanyName,
//       ContactPerson: req.body.ContactPerson,
//       Phone: req.body.Phone,
//       Mobile: req.body.Mobile,
//       Fax: req.body.Fax,
//       StreetName: req.body.StreetName,
//       ZipCode: req.body.ZipCode,
//       City: req.body.City,
//       Password: req.body.Password,
//       State: req.body.State,
//       CountryId: req.body.CountryId,
//       Branch_Id: req.body.Branch_Id,
//       User_Id: req.body.User_Id,
//       ClientId: req.body.ClientId,
//       Module_Id: req.body.Module_Id,
//       URLClientPortal: req.body.URLClientPortal,
//       ReportType: req.body.ReportType,
//       ImageUrl: s3UploadResult.Location,
//     };

//     const newUserClient = new UserClientSeq(userClientData);
//     await newUserClient.save();

//     res.status(200).json({
//       message: 'File uploaded and data inserted successfully',
//       imageUrl: s3UploadResult.Location,
//     });
//   } catch (error) {
//     console.error('Error uploading image and creating data:', error);
//     res.status(500).json({
//       error: 'An error occurred while processing the request',
//     });
//   }
// });

              // Working data //              

// import express from 'express';
// import multer from 'multer';
// import controller from './controller';
// import AWS from 'aws-sdk';
// import { UserClientSeq } from '../../models';
// import dotenv from 'dotenv';

// const router = express.Router();
// dotenv.config();

// // Configure AWS
// AWS.config.update({
//   region: 'eu-west-1',
//   accessKeyId: 'AKIA45VFOWZYOPCIOJG2',
//     secretAccessKey: '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',
// });
// const S3 = new AWS.S3();

// // Configure Multer
// const upload = multer({
//   limits: {
//     fileSize: 1024 * 1024 * 5, // Limit file size to 5MB
//   },
//   fileFilter: (req, file, done) => {
//     const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
//     if (allowedMimeTypes.includes(file.mimetype)) {
//       done(null, true);
//     } else {
//       done(new Error('Unsupported file format. Only JPEG, PNG, and JPG formats are allowed.'), false);
//     }
//   },
// });

// // Function to upload to S3
// const uploadToS3 = (fileData) => {
//   const params = {
//     Bucket: 'client-logo',
//     Key: `${Date.now().toString()}.png`,
//     Body: fileData,
//   };

//   return new Promise((resolve, reject) => {
//     S3.upload(params, (err, data) => {
//       if (err) {
//         console.error('Error uploading image to S3:', err);
//         reject(err);
//       } else {
//         console.log('S3 Upload Result:', data);
//         resolve(data);
//       }
//     });
//   });
// };

// // Route to handle image upload and data insertion
// router.post('/upload', upload.single('image'), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: 'Image not provided' });
//     }

//     const s3UploadResult = await uploadToS3(req.file.buffer);

//     const userClientData = {
//       CompanyName: req.body.CompanyName,
//       ContactPerson: req.body.ContactPerson,
//       Phone: req.body.Phone,
//       Mobile: req.body.Mobile,
//       Fax: req.body.Fax,
//       StreetName: req.body.StreetName,
//       ZipCode: req.body.ZipCode,
//       City: req.body.City,
//       Password: req.body.Password,
//       State: req.body.State,
//       CountryId: req.body.CountryId,
//       Branch_Id: req.body.Branch_Id,
//       User_Id: req.body.User_Id,
//       ClientId: req.body.ClientId,
//       Module_Id: req.body.Module_Id,
//       URLClientPortal: req.body.URLClientPortal,
//       ReportType: req.body.ReportType,
//       ImageUrl: s3UploadResult.Location,
//     };

//     await UserClientSeq.create(userClientData); // Use .create() to insert data
//     res.status(200).json({
//       message: 'File uploaded and data inserted successfully',
//     });
//     return userClientData;
//   } catch (error) {
//     console.error('Error uploading image and creating data:', error);
//     res.status(500).json({
//       error: 'An error occurred while processing the request',
//     });
//   }
// });

import express from 'express';
import multer from 'multer';
import controller from './controller';
import AWS from 'aws-sdk';
import { UserClientSeq } from '../../models';
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
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Image not provided' });
    }

    const s3UploadResult = await uploadToS3(req.file.buffer);

    // Check if the CompanyName already exists in the database
    const existingCompany = await UserClientSeq.findOne({
      where: { CompanyName: req.body.CompanyName },
    });

    if (existingCompany) {
      return res.status(400).json({ message: 'Company name already exists' });
      
    }

    const userClientData = {
      CompanyName: req.body.CompanyName,
      ContactPerson: req.body.ContactPerson,
      Phone: req.body.Phone,
      Mobile: req.body.Mobile,
      Fax: req.body.Fax,
      StreetName: req.body.StreetName,
      ZipCode: req.body.ZipCode,
      City: req.body.City,
      Password: req.body.Password,
      State: req.body.State,
      CountryId: req.body.CountryId,
      Branch_Id: req.body.Branch_Id,
      User_Id: req.body.User_Id,
      ClientId: req.body.ClientId,
      Module_Id: req.body.Module_Id,
      URLClientPortal: req.body.URLClientPortal,
      ReportType: req.body.ReportType,
      Active:req.body.Active,
      image: s3UploadResult.Location,
      Email:req.body.Email
    };

    await UserClientSeq.create(userClientData); // Use .create() to insert data
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






 // router.post('/load', upload.single("image"),(req,res)=>{
  // console.log(req.file)
  // if(req.file){
  //   uploadToS3(req.file.buffer).then((result)=>{
  //     return res.json({
  //       msg:"upload succesfully",
  //       imageUrl:result.Location
  //     })
  //   }) .catch((err)=>{
  //     console.log("Not uploaded")
  //   })
  // }
  // })


  
// Assuming newperformerseq is correctly imported
// router.patch('/UserClient/:id', upload.single('image'), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: 'Image not provided' });
//     }

//     console.log('Request Body:', req.body);

//     // Find the existing performer based on the provided ID
//     const existingPerformer = await UserClientSeq.findByPk(req.params.id);

//     if (!existingPerformer) {
//       // If performer with the given ID is not found, return an error response
//       return res.status(404).json({ error: 'Adminstrator not found' });
//     }

//     // Check if there is an uploaded image
//     if (req.file) {
//       try {
//         // Upload the new image to S3
//         const s3UploadResult = await uploadToS3(req.file.buffer);

//         console.log("S3 Upload Result:", s3UploadResult);

//         // Update the ProfileImage field in the existing performer with the new S3 upload location
//         existingPerformer.image = s3UploadResult.Location;
//       } catch (s3UploadError) {
//         console.error('Error uploading image to S3:', s3UploadError.message);
//         return res.status(500).json({
//           error: 'An error occurred while uploading image to S3.',
//         });
//       }
//     }
//     // Update all other fields based on the data provided in req.body
//     for (const key in req.body) {
//       // Exclude image from being updated again
//       if (key !== 'image') {
//         existingPerformer[key] = req.body[key];
//       }
//     }

//     // Save the updated performer to the database
//     const result = await existingPerformer.save();

//     console.log("Update result:", result);
//     return res.status(200).json({
//       message: 'Client updated successfully',
//       updatedPerformer: result,
//     });

//   } catch (error) {
//     console.error('Error updating Client:', error);
//     return res.status(500).json({
//       error: 'An error occurred while updating the Client.',
//     });
//   }
// });


                             // Update the Api //

router.patch('/UserClient/:id', upload.single('image'), async (req, res) => {
  try {

    // Find the existing performer based on the provided ID
    const existingPerformer = await UserClientSeq.findByPk(req.params.id);

    if (!existingPerformer) {
      return res.status(404).json({ error: 'Adminstrator not found' });
    }

    // Check if there is an uploaded image
    let s3UploadResult;
    if (req.file) {
      try {
        // Upload the new image to S3
        s3UploadResult = await uploadToS3(req.file.buffer);
        console.log("S3 Upload Result:", s3UploadResult);
      } catch (s3UploadError) {
        console.error('Error uploading image to S3:', s3UploadError.message);
        return res.status(500).json({
          error: 'An error occurred while uploading image to S3.',
        });
      }
    }

    // Build the update object based on req.body and uploaded image (if any)
    const updateObject = {
      ...(s3UploadResult && { image: s3UploadResult.Location }),
      ...req.body,
    };

    // Use the update method to update the performer in the database
    const result = await existingPerformer.update(updateObject);

    console.log("Update result:", result);

    return res.status(200).json({
      message: 'Client updated successfully',
      updatedPerformer: result,
    });

  } catch (error) {
    console.error('Error updating Client:', error);
    return res.status(500).json({
      error: 'An error occurred while updating the Client.',
    });
  }
});







  
router.post('/',controller.create)
router.patch('/:id', controller.update)
router.get('/', controller.index)
router.get('/index', controller.indexx)
router.get('/:id', controller.show)
router.delete('/:id', controller.deleteRecord)
router.patch('/Password/:id', controller.UpdatePass)

export default router


