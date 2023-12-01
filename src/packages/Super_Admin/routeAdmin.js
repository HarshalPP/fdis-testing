import express from 'express';
import multer from 'multer';
import controller from './controller';
import AWS from 'aws-sdk';
import { SuperAdminSeq } from '../../models';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt'
import repository  from './repository'

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
router.post('/Administrator', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Image not provided' });
    }
    const hashedPassword = await bcrypt.hash(req.body.Password, 10);
    const hashedPasswordSalt = await bcrypt.hash(req.body.PasswordSalt, 10);
    const s3UploadResult = await uploadToS3(req.file.buffer);

    const userClientData = {
        UserName: req.body.UserName,
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Email: req.body.Email,
        LoweredEmail: req.body.LoweredEmail,
        IsAnonymous: req.body.IsAnonymous,
        IsApproved: req.body.IsApproved,
        IsLockedOut: req.body.IsLockedOut,
        Verified:req.body.Verified,
        Description:req.body.Description,
        RoleName:'',
        LoweredRoleName:'',
        Password: hashedPassword,
        PasswordSalt: hashedPasswordSalt,
        CreateDate: new Date().toISOString(),
        ApplicationId: '04B61B6C-DB3B-49DB-B854-42F3654AD0D2',
        RoleId:'6BF066DD-C1CF-4F0B-B982-7555DE280212',
        ProfileImage: s3UploadResult.Location,

    };

    await SuperAdminSeq.create(userClientData); // Use .create() to insert data
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



// Assuming newperformerseq is correctly imported
// router.patch('/Admin/:id', upload.single('image'), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: 'Image not provided' });
//     }

//     console.log('Request Body:', req.body);

//     // Find the existing performer based on the provided ID
//     const existingPerformer = await SuperAdminSeq.findByPk(req.params.id);

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
//         existingPerformer.ProfileImage = s3UploadResult.Location;

//         // Save the updated performer to the database
//         const result = await existingPerformer.save();

//         console.log("Update result:", result);
//         return res.status(200).json({
//           message: 'Adminstrator updated successfully',
//           updatedPerformer: result,
//         });
//       } catch (s3UploadError) {
//         console.error('Error uploading image to S3:', s3UploadError.message);
//         return res.status(500).json({
//           error: 'An error occurred while uploading image to S3.',
//         });
//       }
//     }

//     // If no image update is needed, you can just return the existing performer
//     return res.status(200).json({
//       message: 'Adminsrator updated successfully',
//       updatedPerformer: existingPerformer,
//     });
//   } catch (error) {
//     console.error('Error updating Adminsrator:', error);
//     return res.status(500).json({
//       error: 'An error occurred while updating the Adminsrator.',
//     });
//   }
// });


router.patch('/Admin/:id', upload.single('image'), async (req, res) => {
  try {

    const saltRounds = 10;  // Define saltRounds here

    // Find the existing performer based on the provided ID
    const existingPerformer = await SuperAdminSeq.findByPk(req.params.id);

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

    // Hash the Password and PasswordSalt fields if they exist in req.body
    if (req.body.Password) {
      const hashedPassword = await bcrypt.hash(req.body.Password, saltRounds);
      req.body.Password = hashedPassword;
    }

    if (req.body.PasswordSalt) {
      const hashedSalt = await bcrypt.hash(req.body.PasswordSalt, saltRounds);
      req.body.PasswordSalt = hashedSalt;
    }

    // Build the update object based on req.body and uploaded image (if any)
    const updateObject = {
      ...(s3UploadResult && { ProfileImage: s3UploadResult.Location }),
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




router.post('/logout', async (req, res) => {
  const token = req.headers['x-access-token']; // Extract token from request headers

  if (!token) {
    const response = {
      code: 400,
      Message: 'Token is missing in the request headers',
    };
    return res.status(400).json(response);
  }

  try {
    const logoutResponse = await repository.logout(token); // Call the logout function

    return res.status(logoutResponse.code).json(logoutResponse);
  } catch (error) {
    console.error('Logout error:', error);

    const response = {
      code: 500,
      Message: 'Internal server error',
    };
    return res.status(500).json(response);
  }
});


router.get('/Administrator',controller.indexxx)
router.get('/Administrator/:id',controller.showww)
router.patch('/Administrator/:id', controller.updatedata)
router.patch('/Administrator/Password/:id' , controller.UpdatePass)
router.delete('/Administrator/:id',controller.deleteRecorddata)
router.post('/', controller.create)
router.patch('/:id', controller.update)
router.get('/', controller.index)
router.get('/:id', controller.show)
router.delete('/:id', controller.deleteRecord)
router.get('/get',controller.indexfind)
router.post('/login',controller.auth)


export default router
