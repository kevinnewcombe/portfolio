module.exports = function(grunt) {
  // All configuration goes here 
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: { // https://github.com/gruntjs/grunt-contrib-sass
      dist: {
        files: {
          'static/css/style.css': 'source/css/style.scss',
          'layouts/style.mmark': 'source/css/style.scss'

        },
        options: {
          sourcemap: 'none',
          style: 'compressed' // nested, compact, compressed, expanded
        }
      }
    },

    /* ************** */
    /*                */
    /*     images     */
    /*                */
    /* ************** */
    responsive_images: {
      resize: {
        options: {
          sizes: [{
              width: 300
            },{
              width: 400
            },{
              width: 500
            },{
              width: 600
            },{
              width: 700
            },{
              width: 800
            },{
              width: 900
            },{
              width: 1000
            },{
              width: 1100
            },{
              width: 1200
            }
          ],
          quality: 100
       },
       files: [{
         expand: true,
         src: ['**/*.{jpg,gif,png}'],
         cwd: 'source/images/projects/originals/',
         custom_dest: 'source/images/projects/{%= width %}/{%= path %}'
       }]
     }
   },


    imagemin: {
      dynamic: { 
        files: [{
          expand: true,
          cwd: 'source/images', 
          src: ['**/*.{png,jpg,gif}'], 
          dest: 'static/images/' // rebrand files
        }]
      }
    },

    cwebp: {
     dynamic: {
       options: {
         q: 50
       },
       files: [{
         expand: true,
         cwd: 'source/images/', 
         src: ['**/*.{png,jpg,gif}'],
         dest: 'static/images/'
       }]
     }
    },

    svgmin: { 
      options: { 
        plugins: [{
          removeViewBox: false
        }, {
          removeUselessStrokeAndFill: true,
        }, {
          convertPathData: {
            straightCurves: true 
          }
        }]
      },
      dist: { 
        files: [{ 
          expand: true, 
          cwd: 'source/images/', // Src matches are relative to this path.
          src: ['**/*.svg'], // Actual pattern(s) to match.
          dest: 'static/images/' // Destination path prefix.
        }]
      }
    },
    /* 
    uglify: {
      options: {
        beautify : false,
        compress: {
          global_defs: {
            "DEBUG": false
          },
          dead_code: true
        }
      },
      build: {
        src: [
          'source/js/app/forms.js',
          'source/js/app/scroll.js',
          'source/js/libs/modernizr.js',
        ],
        dest: 'static/js/production.js'
      }, 
    },
    */
    htmlmin: {                                     // Task
      dist: {                                      // Target
        options: {                                 // Target options
          removeComments: true,
          collapseWhitespace: true
        },
        files: {                                   // Dictionary of files
          '../../public/index.html': '../../public/index.min.html',     // 'destination': 'source'
        }
      }        
    },

    compress: {
      svg: 
        {
        options: {
          mode: 'gzip'
        },
        files: [
          {
            expand: true,
            cwd : 'static/images/',
            src: '**/*.svg',
            dest: 'static/images/',
            ext: '.svg.gz'
          }
        ]
      },
      /* 
      js: 
        {
        options: {
          mode: 'gzip'
        },
        files: [
          {
            expand: true,
            cwd : 'js',
            src: 'static/production.js',
            dest: 'js/',
            ext: '.js.gz'
          },{
            expand: true,
            cwd : 'js',
            src: 'static/owl.js',
            dest: 'js/',
            ext: '.js.gz'
          }
        ]
      },
      */

      css: {
        options: {
          mode: 'gzip'
        },
        files: [
          {
            expand: true,
            cwd : '',
            src: 'static/css/style.css',
            dest: '',
            ext: '.css.gz'
          },
          
        ]
      }
    },

    watch: {
      sass: {
        files: ['source/css/**/*.scss'],
        tasks: ['sass','compress:css'],
        options: {
          spawn: false
        }
      },
      /* 
      scripts: {
        files: ['source/js/app/*.js', 'source/js/libs/*.js','source/js/plugins/*.js', 'source/js/fka/*.js'],
        tasks: ['uglify', 'compress:js'],
        options: {
          spawn: false,
        },
      },
      */
      images: {
        files: ['source/images/**/*.png', 'source/images/**/*.jpg', 'source/images/**/*.gif'],
        tasks: ['imagemin'],
        options: {
          spawn: false
        }
      },

      svg: {
        files: 'static/images/**/*.svg',
        tasks: ['svgmin', 'compress:svg'],
        options: {
          spawn: false
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-responsive-images');
  grunt.loadNpmTasks('grunt-cwebp');

  grunt.loadNpmTasks('grunt-svgmin');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  
  grunt.loadNpmTasks('grunt-contrib-watch');

  // grunt tasks
  grunt.registerTask('images', ['responsive_images', 'imagemin', 'svgmin', 'cwebp', 'compress:svg']);
  grunt.registerTask('default', [ 'sass', 'compress', 'images', 'watch']);
};