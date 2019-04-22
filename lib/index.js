'use strict';

const fs = require('fs');
const path = require('path');

/**
 * A Metalsmith plugin that removes HTML files from the destination directory
 *
 */

function plugin() {

  return function (files, metalsmith, done) {
    let destination = metalsmith.destination();
    files = fs.readdirSync(destination);
    // loop and decide
    files.forEach(function(file) {
      var filePath = path.join(destination, file);
      var stat = fs.statSync(filePath);
      if (stat.isFile()) {
        let deleteFile = false;
        let extension = path.extname(filePath).toLowerCase();
        // first checking the file extension,
        // as thats a dead give away
        if (extension === '.html' || extension === '.htm') {
          deleteFile = true;
        }
        // your HTML files might not have a file extension
        // for example, if they're going to live on S3
        // so, read the file to check if it looks like a HTML file
        if (!deleteFile) {
          let fileContents = fs.readFileSync(filePath, 'utf8');
          if (fileContents.indexOf('<html') > -1 && fileContents.indexOf('</html>') > -1) {
            deleteFile = true;
          }
        }
        // lets delete if matched
        if (deleteFile) {
          try {
            fs.unlinkSync(filePath)
          } catch(err) {
            console.error(err)
          }
        }
      }
    });
    // hand back over to main metalsmith task
    done();
  }
}

module.exports = plugin
