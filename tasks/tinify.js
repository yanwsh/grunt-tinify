/*
 * grunt-tinify
 * https://github.com/wensheng.yan/grunt-tinify
 *
 * Copyright (c) 2016 Wensheng Yan
 * Licensed under the MIT license.
 */

'use strict';
var tinify = require("tinify"),
    path = require("path"),
    util = require('util'),
    crypto = require('crypto'),
    async = require("async");

module.exports = function(grunt) {

  grunt.registerMultiTask('tinify', 'compress your png and jpg files  remotely', function() {
    var options = this.options({
      key: '',
      tmpfile: 'record.json'
    });
    var done = this.async();
    tinify.key = options.key;

    var fileInfo = {};
    if(grunt.file.exists(options.tmpfile)){
      fileInfo = grunt.file.readJSON(options.tmpfile);
    }

    var files = [];
    this.files.forEach(function(file) {
      var cwd = file.cwd || '';
      files = files.concat(file.src.map(function(src) {
        var s = path.join(cwd, src),
            d = (cwd||file.src.length>1) ? ((file.dest||'')+src) : ((file.dest||'')+src) || src;
        return {src: s, dest: d};
      }));
    });

    //skip directories
    files = files.filter(function(file) {
      return !grunt.file.isDir(file.src);
    });


    async.series([function(callback){
      files.forEach(function(f, index){
        var src = f.src;
        var buffer = grunt.file.read(src);
        var md5 = crypto.createHash('md5');
        md5.update(buffer);
        var md5Hash = md5.digest('hex');
        var isSame = false;
        if(fileInfo[src]){
          var compareHash = fileInfo[src];
          if(md5Hash === compareHash){
            isSame = true;
          }
        }

        var samePlace = (f.src === f.dest);

        if(!isSame){
          if(!samePlace){
            fileInfo[src] = md5Hash;
          }
          grunt.log.writeln("Compressing File: " + src);
          var source = tinify.fromFile(src);
          source.toBuffer(function(err, resultData) {
            if (err) {
              grunt.log.writeln(err.message);
              callback(err.message);
            }
            if(samePlace){
              var save_md5 = crypto.createHash('md5');
              save_md5.update(resultData);
              var save_md5Hash = save_md5.digest('hex');
              fileInfo[src] = save_md5Hash;
            }

            grunt.file.write(f.dest, resultData);
            if(index === (files.length - 1)){
              callback(null);
            }
          });
        }else{
          if(index === (files.length - 1)){
            callback(null);
          }
        }
      });
    }], function(err){
      if(err){
        grunt.fail.warn(err);
        return done(false);
      }
      grunt.file.write(options.tmpfile, JSON.stringify(fileInfo, null, 2));
      done();
    });
  });

};
