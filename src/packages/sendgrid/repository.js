

// // import { sendmailseq } from '../../models';
// // import { queryBuilderGetList } from './query-builder';
// // import { listInitOptions } from '../../utils/paginate';
// // import { Sequelize } from 'sequelize';
// // import sgMail from '@sendgrid/mail';
// // import axios from 'axios';
// // import pdf from 'html-pdf';
// // import fs from 'fs/promises';


// // // Set your SendGrid API token directly
// // const sendgridApiKey = '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';
// // sgMail.setApiKey(sendgridApiKey);

// // async function create(body, subject,Text,html) {
// //   try {
// //     // Log the body data
// //     console.log('Data before creating the record:', body);

// //     // Create the record using sendmailseq.create
// //     const createdRecord = await sendmailseq.create(body,subject,Text,html);

// //     // Send an email using SendGrid
// //     const msg = {
// //       to: '', // Change this to the recipient's email
// //       from: 'berel2@brightenmail.com', // Change this to your verified sender email
// //       subject: subject,
// //       text: Text,
// //       html: html,
// //     };

// //     // Send the email
// //     const response = await sgMail.send(msg);

// //     // Log the response from SendGrid
// //     console.log('SendGrid Response:', response);

// //     return createdRecord;
// //   } catch (error) {
// //     // Handle any errors that might occur during record creation
// //     console.error('Error creating record:', error);
// //     throw error; // Re-throw the error to be caught by the caller
// //   }
// // }

// // // async function createbyid(id) {
// // //   try {
// // //     // Fetch data from the report based on the given ID
// // //     const reportData = await report.findById(id); // Adjust this based on your actual report model

// // //     // Log the data from the report
// // //     console.log('Data from the report:', reportData);

// // //     // Create the record using sendmailseq.create
// // //     const createdRecord = await sendmailseq.create(reportData);

// // //     // Send an email using SendGrid
// // //     const msg = {
// // //       to: 'recipient@example.com', // Change this to the recipient's email
// // //       from: 'berel2@brightenmail.com', // Change this to your verified sender email
// // //       subject: reportData.subject, // Assuming subject is a property in your report data
// // //       text: reportData.text, // Assuming text is a property in your report data
// // //       html: reportData.html, // Assuming html is a property in your report data
// // //     };

// // //     // Send the email
// // //     const response = await sgMail.send(msg);

// // //     // Log the response from SendGrid
// // //     console.log('SendGrid Response:', response);

// // //     return createdRecord;
// // //   } catch (error) {
// // //     // Handle any errors that might occur during record creation or sending email
// // //     console.error('Error:', error);
// // //     throw error; // Re-throw the error to be caught by the caller
// // //   }
// // // }

// // // Promisify the html-pdf's toBuffer method
// // const toBufferPromise = promisify(pdf.create().toBuffer);

// // // Function to fetch data by ID from the API
// // const fetchDataById = async (id) => {
// //   try {
// //     const response = await axios.get(`http://18.192.51.153:4002/api/v1/dashboard/report/${id}`);
// //     return response.data; // Assuming the API response contains the data you need
// //   } catch (error) {
// //     console.error('Error fetching data:', error);
// //     throw error;
// //   }
// // };

// // // Function to generate HTML content from the fetched data
// // function generateHtmlContent(data) {
// //   // Process the data and generate HTML content
// //   // You can customize this part based on your data structure and how you want the HTML to look
// //   // For example, you might use a template engine like Handlebars or a simple string concatenation
// //   let html = '<html><body>';
// //   // Add content based on the fetched data
// //   // Example: Iterate over the data and add each item to the HTML
// //   html += `<p>${data.someField} - ${data.anotherField}</p>`;
// //   // Add other fields as needed
// //   html += '</body></html>';
// //   return html;
// // }

// // // Function to create and send an email with HTML content and PDF attachment
// // async function createbyid(id) {
// //   try {
// //     // Fetch data by ID from the API
// //     const result = await fetchDataById(id);

// //     // Process the result and generate HTML content
// //     const html = generateHtmlContent(result);

// //     // Create a PDF from the HTML content
// //     const pdfBuffer = await toBufferPromise(html);

// //     // Save the PDF to a temporary file (you may want to handle this differently in production)
// //     const pdfFilePath = 'temp_report.pdf';
// //     await fs.writeFile(pdfFilePath, pdfBuffer);

// //     // Create the record using sendmailseq.create
// //     // Note: Replace the placeholders with your actual Sequelize model and fields
// //     const createdRecord = await sendmailseq.create(/* pass appropriate parameters */);

// //     // Send an email using SendGrid with the generated HTML content and PDF attachment
// //     const msg = {
// //       to: 'recipient@example.com', // Replace with the recipient's email
// //       from: 'berel2@brightenmail.com', // Change this to your verified sender email
// //       subject: `Your Subject - ${result.someField}`, // Modify the subject as needed
// //       html: html,
// //       attachments: [
// //         {
// //           content: pdfBuffer.toString('base64'),
// //           filename: 'report.pdf',
// //           type: 'application/pdf',
// //           disposition: 'attachment',
// //         },
// //       ],
// //     };

// //     // Send the email
// //     const response = await sgMail.send(msg);

// //     // Log the response from SendGrid
// //     console.log('SendGrid Response:', response);

// //     // Remove the temporary PDF file
// //     await fs.unlink(pdfFilePath);

// //     return createdRecord;
// //   } catch (error) {
// //     // Handle errors
// //     console.error('Error:', error);
// //     throw error;
// //   }
// // }




// // export default {
// //   create,
// //   createbyid
// // };

// //              // can also use that //
// // // import { sendmailseq } from '../../models';
// // // import sgMail from '@sendgrid/mail';
// // // import express from 'express';

// // // const router = express.Router();

// // // // Set your SendGrid API token directly
// // // const sendgridApiKey = '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 ';
// // // sgMail.setApiKey(sendgridApiKey);

// // // router.post('/send-email', async (req, res) => {
// // //   const { to, from, subject, text, html } = req.body;

// // //   try {
// // //     // Create the record using sendmailseq.create
// // //     const createdRecord = await sendmailseq.create(req.body);

// // //     // Send an email using SendGrid
// // //     const msg = {
// // //       to: to,       // Recipient's email
// // //       from: from,   // Sender's email
// // //       subject: subject,
// // //       text: text,
// // //       html: html,
// // //     };

// // //     // Send the email
// // //     const response = await sgMail.send(msg);

// // //     // Log the response from SendGrid
// // //     console.log('SendGrid Response:', response);

// // //     return res.status(200).json({ message: 'Email sent successfully' });
// // //   } catch (error) {
// // //     // Handle any errors that might occur during record creation or email sending
// // //     console.error('Error:', error);
// // //     return res.status(500).json({ error: 'An error occurred' });
// // //   }
// // // });

// // // export default router;

// // Define the Symbol.dispose if it doesn't already exist



           // Working Properly ///

// import sgMail from '@sendgrid/mail';
// import axios from 'axios';
// import pdf from 'html-pdf';
// import fs from 'fs/promises';
// // Add this line to import PhantomJS
// import phantomPath from 'phantomjs-prebuilt';

// // Function to fetch data by ID from the API
// const fetchDataById = async (id) => {
//   try {
//     const response = await axios.get(`http://18.192.51.153:4002/api/v1/dashboard/report/${id}`);
//     return response.data; // Assuming the API response contains the data you need
  
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     throw error;
//   }
// };

// const generateHtmlContent = (data) => {
//   // Parse the JSON data
//   const dataArray = typeof data === 'string' ? JSON.parse(data) : data;
// const html=`
// <html>
//       <head>
//         <style>
//           body {
//             font-family: 'Arial', sans-serif;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             height: 100vh;
//             margin: 0;
//             background-color: #f4f4f4;
//           }

//           .wrapper {
//             display: flex;
//             max-width: 1200px;
//             width: 100%;
//           }

//           .details-container {
//             flex: 1;
//             padding: 20px;
//             box-sizing: border-box;
//             background-color: white;
//           }

//           .image-container {
//             flex: 1;
//             padding: 20px;
//             box-sizing: border-box;
//             display: flex;
//             justify-content: center;
//             align-items: center;
//             flex-direction: column;
//             background-color: white;
//           }

//           label {
//             display: block;
//             margin-top: 15px;
           
//           }

//           input {
//             width: 100%;
//             padding: 10px;
//             margin-top: 5px;
//             box-sizing: border-box;
//             border: 1px solid #ccc;
//             border-radius: 4px;
//           }

//           button {
//             background-color: #4CAF50;
//             color: white;
//             padding: 10px 15px;
//             border: none;
//             border-radius: 4px;
//             cursor: pointer;
//           }

//           img {
//             max-width: 100%;
//             max-height: 100%;
//             object-fit: cover;
//             border-radius: 4px;
//           }

//           h2 {
//             color: #333;
//           }

//           p {
//             color: #555;
//           }
//           #p1{
//             font-size: 12px;
//           }
//           #p2{
//             padding-top: 15px;
//             font-size: 13px;
//           }
//           #p3{
//             font-size: 12px;
//           }

//           .p4{
//             font-size: 12px;
//           }

//           .Quality{
//             color: rgb(90, 157, 175);
//             font-weight: 500;
//           }

//           .CLEANING{
//             font-size: 12px;
//           }

//           .QC{
//             line-height: 5px;

//           }

//           .item-containet{
//             line-height: 1px;
//             margin-top: 30px;
//             font-size: 14px;
//           }

//           .Audit-Report{
//                text-align: right;
//                font-weight: 300;
//                color: #555;
//           }

//           @media only screen and (max-width: 360px) {
//             .wrapper {
//                 border-radius: 0;
//             }

//             .details-container,
//             .image-container {

//                 width: 60%;

//             }

//             .Audit-Report {
//                 font-size: 13px;
//                 font-weight: 500;
//             }

//             .sirmadam {
//                 font-size: 12px;
//             }

//             #p1 {
//                 font-size: 10px;
//             }

//             #p2 {
//                 font-size: 10px;
//             }

//             #p3 {
//                 font-size: 10px;
//             }

//             .p4 {
//                 font-size: 10px;
//             }

//             .item-containet {
//                 line-height: 2px;
//                 font-size: 7px;
//                 font-weight: bold;
//                 line-height: 1px;
//             }

//             .Quality {
//                 font-size: 12px;
//             }

//             .CLEANING {
//                 padding: 0px;
//                 font-size: 6px;

//             }
//             .img{
//                 height: 100%;
//                 width: 100%;

//             }
//             body{
//                 margin: 0px;
//             }


//         }

        
//         </style>
//       </head>
//       <body>
//         <div class="wrapper">
//           <div class="details-container">
//             <h2 class="Audit-Report">Audit-Report</h2>
//             <p>Sir/Madam</p>
//             <p id="p1">The Report of the Quality control carried out of the location below is ready</p>
//             <form>
//             ${dataArray.map(item => `
//     <div class="item-container">

//         <label for="${item.AuditCode}">
//             <p>AuditCode:
//                 <span id="${item.AuditCode}" readonly>${item.AuditCode}</span>
//             </p><br>
//             <p>FirstName:
//                 <span id="${item.AuditCode}" readonly>${item.FirstName}</span>
//             </p><br>

//             <p>LastName:
//                 <span id="${item.AuditCode}" readonly>${item.LastName}</span>
//             </p><br>

//             <p>Date:
//                 <span id="${item.AuditCode}" readonly>${item.Date}</span>
//             </p><br>

//             <p>CompanyName:
//                 <span id="${item.AuditCode}" readonly>${item.CompanyName}</span>
//             </p><br>

//             <p>ContactPerson:
//                 <span id="${item.AuditCode}" readonly>${item.ContactPerson}</span>
//             </p><br>

//             <p>BranchName:
//                 <span id="${item.AuditCode}" readonly>${item.BranchName}</span>
//             </p><br>

//             <p>Location:
//                 <span id="${item.AuditCode}" readonly>${item.Location}</span>
//             </p><br>
//             <!-- Add more input fields as needed -->
//         </label>
//     </div>
// `).join('')}

//             </form>
//             <p id="p2">select the link to open the dashboard</p>
//             <p id="p2"><a href="https://backend-quality.iccaadvies.eu/">https://backend-quality.iccaadvies.eu/</a></p>
//             <p id="p3">If You have any questions please do not hestitate to Contact us</p>
//             <p class="p4"> Yours Sincerely</p>
//             <p class="p4">The Quality Team</p>

            
//           </div>
//           <div class="image-container">
//             <div class="QC">
//           <h1 class="Quality">QUALITY CHECK</h1>
//           <p class="CLEANING">CLEANING MAINTENANCE CONTROL SYSTEM<p>
//           </div>

//             <img src="https://client-logoo.s3.eu-central-1.amazonaws.com/1701413010215.png" alt="Your Image">
            
//           </div>
//         </div>
//       </body>
//     </html>
// `
// return html
 
// };

// // Function to create and send an email with HTML content and PDF attachment
// async function createbyid(id) {
//   try {
//     // Fetch data by ID from the API
//     const result = await fetchDataById(id);
//     let auditCode;

//     // Check if result.data is an object with 'data' property and has at least one element
// if (result.data && result.data.length > 0) {
//   auditCode = result.data[0].AuditCode;
// }
// console.log("AuditCode:", auditCode);


//     // Process the result and generate HTML content
//     const html = generateHtmlContent(result.data);
//     console.log("html data is",html)

//     // Generate PDF from HTML content using html-pdf
//     const pdfBuffer = await new Promise((resolve, reject) => {
//       pdf.create(html, { phantomPath: phantomPath.path }).toBuffer((err, buffer) => {
//         if (err) {
//           reject(err);
//         } else {
//           resolve(buffer);
//         }
//       });
//     });

    
//     // Save the PDF to a temporary file
//     const pdfFilePath = 'temp_report.pdf';
//     await fs.writeFile(pdfFilePath, pdfBuffer);

//     // Set your SendGrid API key
//     sgMail.setApiKey('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');

//     // Send an email using SendGrid with the generated HTML content and PDF attachment
//     const msg = {
//       to: 'harshal.coderfarm@gmail.com', // Replace with the recipient's email
//       from: 'harshalpawar013@gmail.com', // Change this to your verified sender email
//       subject: `AuditCode - ${auditCode}`, // Use the variable here
//       html: html,

//       attachments: [
//         {
//           content: pdfBuffer.toString('base64'),
//           filename: 'report.pdf',
//           type: 'application/pdf',
//           disposition: 'attachment',
//         },
//       ],
//     };

//     // Send the email
//     const response = await sgMail.send(msg);

//     // Log the response from SendGrid
//     console.log('SendGrid Response:', response);

//     // Remove the temporary PDF file
//     await fs.unlink(pdfFilePath);

//   } catch (error) {
//     // Handle errors
//     console.error('Error:', error);
//     throw error;
//   }
// }



// export default {
//   createbyid
// };


             // Working


// import sgMail from '@sendgrid/mail';
// import axios from 'axios';
// import pdf from 'html-pdf';
// import fs from 'fs/promises';

// // Function to fetch data by ID from the API
// const fetchDataById = async (id) => {
//   try {
//     const response = await axios.get(`http://18.192.51.153:4002/api/v1/dashboard/report/${id}`);
//     // console.log("response data is",response.data)
//     return response.data; // Assuming the API response contains the data you need
  
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     throw error;
//   }
// };

// // Function to generate HTML content from the fetched data
// const generateHtmlContent = (data) => {
//   // Implement your HTML generation logic based on the data
//   return `<html><body>${JSON.stringify(data)}</body></html>`;
// };

// // Function to create and send an email with HTML content and PDF attachment
// async function createbyid(id) {
//   try {
//     // Fetch data by ID from the API
//     const result = await fetchDataById(id);
//     // console.log("Result data:", result);
//     let auditCode;

// // Check if result.data is an object with 'data' property and has at least one element
// if (result.data && result.data.data && Array.isArray(result.data.data) && result.data.data.length > 0) {
//   auditCode = result.data.data[0].AuditCode;
//   console.log("AuditCode:", auditCode);}


//     // Process the result and generate HTML content
//     const html = generateHtmlContent(result);

//     // Generate PDF from HTML content using html-pdf
//     const pdfBuffer = await new Promise((resolve, reject) => {
//       pdf.create(html).toBuffer((err, buffer) => {
//         if (err) {
//           reject(err);
//         } else {
//           resolve(buffer);
//         }
//       });
//     });

//     // Save the PDF to a temporary file
//     const pdfFilePath = 'temp_report.pdf';
//     await fs.writeFile(pdfFilePath, pdfBuffer);

//     // Set your SendGrid API key
//     sgMail.setApiKey('SG.jRpacgWtT9ip8NDTLpmZLQ.n1W7FLXvGWz9_a0s6F8TEmN5OecJOoELJ5FZFGF79M');

//     // Send an email using SendGrid with the generated HTML content and PDF attachment
//     const msg = {
//       to: 'harshal.coderfarm@gmail.com', // Replace with the recipient's email
//       from: 'harshalpawar013@gmail.com', // Change this to your verified sender email
//       subject: `AuditCode - ${result.data.AuditCode}`, // Modify the subject as needed
//       html: html,
//       attachments: [
//         {
//           content: pdfBuffer.toString('base64'),
//           filename: 'report.pdf',
//           type: 'application/pdf',
//           disposition: 'attachment',
//         },
//       ],
//     };

//     // Send the email
//     const response = await sgMail.send(msg);

//     // Log the response from SendGrid
//     console.log('SendGrid Response:', response);

//     // Remove the temporary PDF file
//     await fs.unlink(pdfFilePath);

//   } catch (error) {
//     // Handle errors
//     console.error('Error:', error);
//     throw error;
//   }
// }

// export default {
//   createbyid
// };


import sgMail from '@sendgrid/mail';
import axios from 'axios';
import * as fs from 'fs';
import pdf from 'html-pdf';


// Function to fetch data by ID from the API
const fetchDataById = async (id) => {
  try {
    const response = await axios.get(`http://18.192.51.153:4002/api/v1/dashboard/report/${id}`);
    return response.data; // Assuming the API response contains the data you need
  
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

const generateHtmlContent = (data) => {
  // Parse the JSON data
  const dataArray = typeof data === 'string' ? JSON.parse(data) : data;
const html=`
<html>
      <head>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            margin: 0;
            background-color: #f4f4f4;
          }

          .wrapper {
            display: flex;
            max-width: 1200px;
            width: 100%;
          }

          .details-container {
            flex: 1;
            padding: 20px;
            box-sizing: border-box;
            background-color: white;
          }

          .image-container {
            flex: 1;
            padding: 20px;
            box-sizing: border-box;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            background-color: white;
          }

          label {
            display: block;
            margin-top: 15px;
           
          }

          input {
            width: 100%;
            padding: 10px;
            margin-top: 5px;
            box-sizing: border-box;
            border: 1px solid #ccc;
            border-radius: 4px;
          }

          button {
            background-color: #4CAF50;
            color: white;
            padding: 10px 15px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
          }

          img {
            max-width: 100%;
            max-height: 100%;
            object-fit: cover;
            border-radius: 4px;
          }

          h2 {
            color: #333;
          }

          p {
            color: #555;
          }
          #p1{
            font-size: 12px;
          }
          #p2{
            padding-top: 15px;
            font-size: 13px;
          }
          #p3{
            font-size: 12px;
          }

          .p4{
            font-size: 12px;
          }

          .Quality{
            color: rgb(90, 157, 175);
            font-weight: 500;
          }

          .CLEANING{
            font-size: 12px;
          }

          .QC{
            line-height: 5px;

          }

          .item-containet{
            line-height: 1px;
            margin-top: 30px;
            font-size: 14px;
          }

          .Audit-Report{
               text-align: right;
               font-weight: 300;
               color: #555;
          }

          @media only screen and (max-width: 360px) {
            .wrapper {
                border-radius: 0;
            }

            .details-container,
            .image-container {

                width: 60%;

            }

            .Audit-Report {
                font-size: 13px;
                font-weight: 500;
            }

            .sirmadam {
                font-size: 12px;
            }

            #p1 {
                font-size: 10px;
            }

            #p2 {
                font-size: 10px;
            }

            #p3 {
                font-size: 10px;
            }

            .p4 {
                font-size: 10px;
            }

            .item-containet {
                line-height: 2px;
                font-size: 7px;
                font-weight: bold;
                line-height: 1px;
            }

            .Quality {
                font-size: 12px;
            }

            .CLEANING {
                padding: 0px;
                font-size: 6px;

            }
            .img{
                height: 100%;
                width: 100%;

            }
            body{
                margin: 0px;
            }


        }

        
        </style>
      </head>
      <body>
        <div class="wrapper">
          <div class="details-container">
            <h2 class="Audit-Report">Audit-Report</h2>
            <p>Sir/Madam</p>
            <p id="p1">The Report of the Quality control carried out of the location below is ready</p>
            <form>
            ${dataArray.map(item => `
    <div class="item-container">

        <label for="${item.AuditCode}">
            <p>AuditCode:
                <span id="${item.AuditCode}" readonly>${item.AuditCode}</span>
            </p><br>
            <p>FirstName:
                <span id="${item.AuditCode}" readonly>${item.FirstName}</span>
            </p><br>

            <p>LastName:
                <span id="${item.AuditCode}" readonly>${item.LastName}</span>
            </p><br>

            <p>Date:
                <span id="${item.AuditCode}" readonly>${item.Date}</span>
            </p><br>

            <p>CompanyName:
                <span id="${item.AuditCode}" readonly>${item.CompanyName}</span>
            </p><br>

            <p>ContactPerson:
                <span id="${item.AuditCode}" readonly>${item.ContactPerson}</span>
            </p><br>

            <p>BranchName:
                <span id="${item.AuditCode}" readonly>${item.BranchName}</span>
            </p><br>

            <p>Location:
                <span id="${item.AuditCode}" readonly>${item.Location}</span>
            </p><br>
            <!-- Add more input fields as needed -->
        </label>
    </div>
`).join('')}

            </form>
            <p id="p2">select the link to open the dashboard</p>
            <p id="p2"><a href="https://backend-quality.iccaadvies.eu/">https://backend-quality.iccaadvies.eu/</a></p>
            <p id="p3">If You have any questions please do not hestitate to Contact us</p>
            <p class="p4"> Yours Sincerely</p>
            <p class="p4">The Quality Team</p>

            
          </div>
          <div class="image-container">
            <div class="QC">
          <h1 class="Quality">QUALITY CHECK</h1>
          <p class="CLEANING">CLEANING MAINTENANCE CONTROL SYSTEM<p>
          </div>

            <img src="https://client-logoo.s3.eu-central-1.amazonaws.com/1701413010215.png" alt="Your Image">
            
          </div>
        </div>
      </body>
    </html>
`
return html
 
};



// Function to generate PDF from HTML content
function toPDF(html, options, output) {
  return new Promise(function (resolve, reject) {
    pdf.create(html, options).toFile(output, function (error, response) {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
  });
}

// Function to create and send an email with HTML content and PDF attachment
async function createbyid(id) {
  try {
    // Fetch data by ID from the API
    const result = await fetchDataById(id);
    let auditCode;

    // Check if result.data is an object with 'data' property and has at least one element
    if (result.data && result.data.length > 0) {
      auditCode = result.data[0].AuditCode;
    }
    console.log('AuditCode:', auditCode);

    // Process the result and generate HTML content
    const html = generateHtmlContent(result.data);
    console.log('HTML data is', html);

    // Generate PDF from HTML content using toPDF function
    const pdfOptions = { /* Add your PDF options if needed */ };
    const pdfFilePath = 'temp_report.pdf';
    await toPDF(html, pdfOptions, pdfFilePath);

    // Set your SendGrid API key
    sgMail.setApiKey('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');

    // Send an email using SendGrid with the generated HTML content and PDF attachment
    const msg = {
      to: 'harshalpawar667@gmail.com', // Replace with the recipient's email
      from: 'harshalpawar013@gmail.com', // Change this to your verified sender email
      subject: `AuditCode - ${auditCode}`, // Use the variable here
      html: html,

      attachments: [
        {
          content: fs.readFileSync(pdfFilePath, 'base64'),
          filename: 'report.pdf',
          type: 'application/pdf',
          disposition: 'attachment',
        },
      ],
    };

    // Send the email
    const response = await sgMail.send(msg);

    // Log the response from SendGrid
    console.log('SendGrid Response:', response);

    // Remove the temporary PDF file
    fs.unlinkSync(pdfFilePath);

  } catch (error) {
    // Handle errors
    console.error('Error:', error);
    throw error;
  }
}




export default {
  createbyid
};

