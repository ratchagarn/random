module.exports = function(grunt) {

  'use strict';

  var _config = grunt.file.readJSON('config.json');


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
      sass_cache: 'src/scss/.sass-cache',
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
      options: {
        compass: false,
        sourcemap: 'file',
        style: 'expanded',
        cacheLocation: 'src/scss/.sass-cache'
      },
      main: {
        files: [{
          expand: true,
          cwd: 'src/scss',
          src: ['main.scss', 'test.scss'],
          dest: 'src/css',
          ext: '.css'
        }]
      }
    },


    /**
     * ------------------------------------------------------------
     * Auto prefix
     * ------------------------------------------------------------
     */
    
    autoprefixer: {
      options: {},
      main: {
        files: [{
          expand: true,
          cwd: 'src/css',
          src: ['main.css', 'test.css'],
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
        src: _config.sources.js,
        dest: 'dist/<%= pkg.name %>.js'
      },
      css: {
        src: ['src/css/main.css'],
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
        tasks: ['jshint']
      },
      scss: {
        files: [
          'src/scss/**/*.scss'
        ],
        tasks: ['sass', 'autoprefixer', 'csslint']
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
      src: 'src/css/main.css'
    },


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
        src: 'src/css/main.css',
        dest: 'dist/<%= pkg.name %>.min.css'
      }
    }


  });
  

  /**
   * ------------------------------------------------------------
   * Load grunt task
   * ------------------------------------------------------------
   */

  require('load-grunt-tasks')(grunt, { scope: 'devDependencies' });


  /**
   * ------------------------------------------------------------
   * Define grunt task
   * ------------------------------------------------------------
   */

  grunt.registerTask('default', ['clean', 'sass', 'autoprefixer', 'jshint', 'csslint']);
  grunt.registerTask('dev', ['default', 'watch']);
  grunt.registerTask('dist', ['default', 'concat', 'uglify', 'cssmin']);

};
