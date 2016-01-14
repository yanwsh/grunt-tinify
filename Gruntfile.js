/*
 * grunt-tinify
 * https://github.com/wensheng.yan/grunt-tinify
 *
 * Copyright (c) 2016 Wensheng Yan
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  var tmpFile = ".pngTinify";
  var keyFile = '_key.json';
  if(!grunt.file.exists(keyFile)){
    grunt.fail.warn("Please go to https://tinypng.com/developers and register an API key, rename " + keyFile +".debug to " + keyFile +", then put your personal API key in it.");
  }
  // Project configuration.
  grunt.initConfig({
    release: {
      options: {
        npm: true,
        npmtag: false,
        indentation: '\t',
        tagName: 'v<%= version %>'
      }
    },

    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp', tmpFile]
    },

    // Configuration to be run (and then tested).
    tinify: {
      options: {
        tmpfile: tmpFile,
        key: grunt.file.readJSON(keyFile).key
      },
      default_options: {
        src: ['test/**/*.png','test/**/*.jpg'],
        dest: 'tmp/'
      }
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-release');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'tinify']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint' ,'test']);

};
