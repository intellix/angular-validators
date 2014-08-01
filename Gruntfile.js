module.exports = function(grunt) {
  grunt.initConfig({

    clean: ['dist'],

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
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['jshint']);
};
