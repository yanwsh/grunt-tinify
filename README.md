# grunt-tinify

> compress your png and jpg files remotely

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-tinify --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-tinify');
```

## Get TinyPng API KEY

please go to [tinyPNG](https://tinypng.com/developers) website and register an API key.

## The "tinify" task

### Overview
In your project's Gruntfile, add a section named `tinify` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  tinify: {
    options: {
      key: 'YOUR_TINYPNG_API_KEY',
      tmpfile: 'tmp.file' 
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.key
Type: `String`
Default value: `' '`

A string value that is your tinyPNG key.

#### options.tmpfile
Type: `String`
Default value: `'record.json'`

In order for better performance, tinify need a place to save each image files' hash key. 
A string value that is used to save hash value.

### Usage Examples

#### Default Options
In this example, the default options are used to compress images in place.

```js
grunt.initConfig({
  tinify: {
    options: {
        key: 'YOUR_TINYPNG_API_KEY',
    },
    files: {
      src: ['_public/**/*.png', '_public/**/*.jpg'],
    },
  },
});
```

#### Custom Options
In this example, custom options are used to compress images in other directory.

```js
grunt.initConfig({
  tinify: {
    options: {
      key: 'YOUR_TINYPNG_API_KEY',
      tmpfile: 'tmp.file'         
    },
    files: {
      src: ['_public/**/*.png', '_public/**/*.jpg'],
      dest: 'output/'
    },
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
0.1.0 Initial Version
