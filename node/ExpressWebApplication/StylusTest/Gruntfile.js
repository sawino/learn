/**
 * Created by yangsaw on 7/8/2014.
 */

var grunt = require('grunt');

grunt.initConfig({
    //pkg: grunt.file.readJSON('package.json'),
    stylus: {
        compile: {
            files: {
                'public/stylesheets/mss.css': ['public/stylus/mss.styl']
            }
        }
    }
});

grunt.loadNpmTasks("grunt-contrib-stylus");
grunt.registerTask('default', ['stylus']);
