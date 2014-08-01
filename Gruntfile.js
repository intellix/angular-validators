module.exports = function(grunt) {
  grunt.initConfig({

    clean: ['dist'],

    copy: {
      prod: {
        expand: true,
        cwd: 'src',
        dest: 'dist',
        src: [
          '*.js',
          '!*.spec.js'
        ]
      }
    },

    jshint: {
      files: ['Gruntfile.js','src/**/*.js', 'test/validator_spec.js'],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    watch: {
      scripts: {
        files: ['src/**/*', 'test/**/*_spec.js'],
        tasks: ['default']
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('build', ['jshint', 'copy:prod']);
};
