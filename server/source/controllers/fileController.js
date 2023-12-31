// import axios from 'axios'

// import fs from 'fs'
// import path from 'path'

// import { fileURLToPath } from 'url'

// import { sendDownloadLinkEmail } from '../utils/emailSender.js'
// import pool from '../connection.cjs' 

// import logger from '../logger.js'

// const __filename = fileURLToPath(import.meta.url);
// const OUTPUT_FILES_DIR = path.join(path.dirname(__filename), '../../..', 'Files', 'outputs');


// const processFile = async (req, res) => {
//   const file = req.file;
//   const fileName = file.filename;
//   const { walletAddress } = req.Wallet;
//   logger.info(`Wallet Address: ${walletAddress}; uploaded: ${fileName}`);

//   try {
    

//     // Call the Python API
//     const response = await axios.post(`http://localhost:2000/transcribe`, //x.pdf/docx/html
//     {
//       'fileName': fileName,
//       'outputFormat': req.body.outputFormat, //{'pdf', 'docx', 'html'}

//     });

//     // Insert into database
//     await pool.query(`INSERT INTO TRANSCRIPTIONS (wallet_address, transcribed_file_name, transcription_time) 
//     VALUES ($1, $2, $3)`, [walletAddress, response.data.fileName, new Date()]);

//     // Generate download link
//     const downloadLink = `http://localhost:4000/download?file=${encodeURIComponent(response.data.fileName)}`;
//     await sendDownloadLinkEmail(req.body.email, downloadLink);

//     // Delete the original uploaded file
//     fs.unlinkSync(file.path);

//     // Send a response with the download link
//     res.status(200).json({ 'downloadLink': downloadLink });

//   } catch (error) {
//     logger.error('Error processing file:', error);

//     res.status(500).send('An error occurred during file processing');
//   }
// };

// const downloadFile = async (req, res) => {
//   const requestedFileName = req.query.file;
//   if (!requestedFileName) {
//     return res.status(400).send('No file specified');
//   }

//   try {
//     // Decode and sanitize the input to prevent directory traversal
//     const safeFileName = path.basename(decodeURIComponent(requestedFileName));

//     // Construct the full file path
//     const filePath = path.join(OUTPUT_FILES_DIR, safeFileName);

//     // Check if the file exists and is a file, not a directory
//     if (!fs.existsSync(filePath) || !fs.lstatSync(filePath).isFile()) {
//       return res.status(404).send('File not found');
//     }

//     // Send the file
//     return res.download(filePath, safeFileName, (err) => {
//       if (err) {
//         logger.error('Error downloading file:', err);
//         return res.status(500).send('An error occurred during file processing');
//       }
//     });
//   } catch (error) {
//     logger.error('Error:', error);
//     return res.status(400).send('Invalid request');
//   }
// };


// const transcriptionHistory = async (req,res) => {
//   const { walletAddress } = req.Wallet;
//   try {
//     const result = await pool.query(`SELECT transcribed_file_name, transcription_time FROM TRANSCRIPTIONS WHERE wallet_address = $1`, [walletAddress]);
//     return res.status(200).json(result.rows);
//   } catch (error) {
//     logger.error('Error retrieving transcription history:', error);
//     return res.status(500).send('An error occurred while retrieving transcription history');
//   }
// }



// export { processFile, downloadFile, transcriptionHistory };
