# metalsmith-clean-html-files

## Introduction

A replacement for the default Metalsmith `clean()` task, which removes *only*  HTML files from the destination directory instead of removing everything from the destination directory.

It maybe that your destination directory also contains compiled styles, scripts and images as well as your compiled templates and you might not want everything to be deleted every time you run your Metalsmith build task.

This plugin looks through the destination directory and deletes any files with the file extension `.html` or `.htm`. It will also check the contents of the files to see if it sees `<html` and `</html>` and remove those files also, incase you've removed the file extension to [serve from S3](https://stackoverflow.com/questions/23463679/s3-static-pages-without-html-extension).

## Usage

Firstly install:

```sh
npm install metalsmith-clean-html-files
```

And then, in your Metalsmith build:

```javascript
const Metalsmith = require('metalsmith');
const cleanFiles = require('metalsmith-clean-html-files');

const ms = Metalsmith(__dirname)
  .clean(false)
  .use(cleanFiles());
```

Firstly, make sure to not use the standard Metalsmith clean task (`.clean(false)`) and then use this one (`.use(cleanFiles())`);

## Issues/Contributing/Discussion

If you find a bug in metalsmith-clean-html-files, please add it to [the issue tracker](https://github.com/area17/metalsmith-clean-html-files/issues) or fork it, fix it and submit a pull request for it (👍).

The development script is `lib/index.js`. Tabs are 2 spaces, functions are commented, variables are camel case and its preferred that its easier to read than outright file size being the smallest possible.
