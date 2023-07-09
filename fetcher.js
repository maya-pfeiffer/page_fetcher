const request = require('request');
const fs = require('fs');

const url = process.argv[2];
const filePath = process.argv[3];

request(url, (error, response, body) => {
  if (error) {
    console.error(`An error occurred while downloading the file: ${error.message}`);
    return;
  }

  if (response.statusCode !== 200) {
    console.error(`Request failed with status code ${response.statusCode}`);
    return;
  }

  fs.writeFile(filePath, body, (error) => {
    if (error) {
      console.error(`An error occurred while saving the file: ${error.message}`);
      return;
    }

    const fileSize = Buffer.byteLength(body);
    console.log(`Downloaded and saved ${fileSize} bytes to ${filePath}`);
  });
});
