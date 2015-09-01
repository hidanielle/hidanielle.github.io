module.exports = function(grunt) {
  var port = grunt.option('port') || 8000;
  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    uglify: {
      build: {
        src: ['scripts/app.js'],
        dest: 'scripts/build/app.min.js'
      }
    },

    sass: {
      dist: {                            // Target
        options: {                       // Target options
          style: 'compressed'
        },
        files: {                         // Dictionary of files
          'styles/site.css': 'styles/sass/site.scss'       // 'destination': 'source'
        }
      }
    },

    autoprefixer: {
      // prefix the specified file
      single_file: {
        options: {
          
        },
        src: 'styles/site.css',
        dest: 'styles/build/site.css'
      },
    },

    connect: {
      server: {
        options: {
          port: port,
          base: '.',
                    livereload: true,
                    open: true
        }
      }
    },

    watch: {
      options: { livereload: true },
      scripts: {
        files: ['scripts/libs/*.js', 'scripts/app.js'],
        tasks: ['uglify']
      }, //script
      css: {
        files: ['styles/sass/*.scss'],
        tasks: ['sass']
      } //sass
    } //watch

  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['css', 'js']);

  // JS task
  grunt.registerTask( 'js', ['uglify'] );

  // All CSS
  grunt.registerTask( 'css', [ 'sass', 'autoprefixer' ] );

  // Serve presentation locally
  grunt.registerTask( 'serve', [ 'connect', 'watch' ] );
 

};