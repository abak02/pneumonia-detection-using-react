const express = require('express');
const path = require('path');
const multer = require('multer');
const { spawn } = require('child_process');

const app = express();
app.use(express.static(path.join(__dirname,'dist')));
const upload = multer({ dest: 'uploads/' });


app.get('/', (req, res) => {
    res.sendFile(__dirname,'dist','index.html');
});

app.post('/upload', upload.single('image'), (req, res) => {
    const imagePath = req.file.path;
    console.log(imagePath);
    
    const pythonProcess = spawn('python',['./test.py',imagePath]);

    let responseSent = false;

    pythonProcess.stdout.on('data',(data)=>{
        const result = data.toString().trim();
        console.log('Python script result:', result);
        if (!responseSent) {
            // Send the result as a JSON response
            res.json({ result });
            responseSent = true; // Set the flag to true after sending the response
          }
    });
    pythonProcess.stderr.on('data', (data) => {
        const error = data.toString().trim();
  console.error('Error executing Python script:', error);
        if (!responseSent) {
            // Handle any errors that occur during the Python script execution
            // You can send an error response or perform other error handling here
            res.status(500).json({ error: 'An error occurred during script execution' });
            responseSent = true; // Set the flag to true after sending the response
          }
      });

  });
  
app.listen(5000,()=>{
    console.log("Server on 5000");
})