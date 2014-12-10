module.exports = function(grunt) {

  'use strict';

  grunt.initConfig({
    
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*!\n' +
            ' * Random version <%= pkg.version %>\n' +
            ' * Copyright 2014-Preset\n' +
            ' * Author: <%= pkg.author %>\n' +
            ' * Licensed under <%= pkg.license %>\n' +
            ' */\n',


    /**
     * ------------------------------------------------------------
     * Clean up distribution directory
     * ------------------------------------------------------------
     */
    
    clean: {
      css: 'src/css',
      dev: 'dev',
      dist: 'dist'
    },


    /**
     * ------------------------------------------------------------
     * SASS / SCSS
     * ------------------------------------------------------------
     */
    
    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: 'src/scss',
          src: ['**/*.scss'],
          dest: 'src/css',
          ext: '.css'
        }]
      }
    },


    /**
     * ------------------------------------------------------------
     * Concat
     * ------------------------------------------------------------
     */
    
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: false
      },
      js: {
        src: ['src/js/**/*.js'],
        dest: 'dist/<%= pkg.name %>.js'
      },
      css: {
        src: ['src/css/**/*.css'],
        dest: 'dist/<%= pkg.name %>.css'
      }
    },


    /**
     * ------------------------------------------------------------
     * Watch
     * ------------------------------------------------------------
     */
    
    watch: {
      js: {
        files: [
          'src/js/**/*.js'
        ],
        tasks: ['concat:js']
      },
      scss: {
        files: [
          'src/scss/**/*.scss'
        ],
        tasks: ['newer:sass', 'concat:css']
      }
    },


    /**
     * ------------------------------------------------------------
     * JSHint (http://www.jshint.com/docs/options)
     * ------------------------------------------------------------
     */

    jshint: {
      dist: {
        options: {
          jshintrc: '.jshintrc',
          reporter: require('jshint-stylish')
        },
        grunt: 'Gruntfile.js',
        src: 'src/js/**/*.js'
      }
    },


    /**
     * ------------------------------------------------------------
     * CSSLINT
     * ------------------------------------------------------------
     */
    
    csslint: {
      options: {
        csslintrc: '.csslintrc'
      },
      src: 'src/css/**/*.css'
    },


    /**
     * ------------------------------------------------------------
     * Copy files
     * ------------------------------------------------------------
     */

    // copy: {
    //   javascripts: {
    //     files: [{
    //       expand: true,
    //       cwd: 'src',
    //       src: ['js/**/*.js'],
    //       dest: 'dev'
    //     }
    //   }
    // },
    

    /**
     * ------------------------------------------------------------
     * uglify
     * ------------------------------------------------------------
     */

    uglify: {
      options: {
        banner: '<%= banner %>',
        sourceMap: false
      },
      files: {
        src: 'dist/<%= pkg.name %>.js',
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },


    /**
     * ------------------------------------------------------------
     * cssmin
     * ------------------------------------------------------------
     */

    cssmin: {
      options: {
        banner: '<%= banner %>',
        keepSpecialComments: 0
      },
      files: {
        src: 'dist/<%= pkg.name %>.css',
        dest: 'dist/<%= pkg.name %>.min.css'
      }
    }


  });
  

  // https://github.com/gruntjs/grunt-contrib-clean
  grunt.loadNpmTasks('grunt-contrib-clean');

  // https://github.com/gruntjs/grunt-contrib-concat
  grunt.loadNpmTasks('grunt-contrib-concat');

  // https://github.com/tschaub/grunt-newer
  grunt.loadNpmTasks('grunt-newer');

  // https://github.com/gruntjs/grunt-contrib-watch
  grunt.loadNpmTasks('grunt-contrib-watch');

  // https://github.com/gruntjs/grunt-contrib-watch
  // grunt.loadNpmTasks('grunt-contrib-copy');

  // https://github.com/gruntjs/grunt-contrib-sass
  grunt.loadNpmTasks('grunt-contrib-sass');

  // https://github.com/gruntjs/grunt-contrib-jshint
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // https://github.com/gruntjs/grunt-contrib-csslint
  grunt.loadNpmTasks('grunt-contrib-csslint');

  // https://github.com/gruntjs/grunt-contrib-uglify
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // https://github.com/gruntjs/grunt-contrib-cssmin
  grunt.loadNpmTasks('grunt-contrib-cssmin');


  grunt.registerTask('default', ['jshint', 'csslint', 'clean:css', 'sass']);
  grunt.registerTask('dev', ['default', 'watch']);
  grunt.registerTask('dist', ['clean', 'default', 'concat', 'uglify', 'cssmin']);

};
