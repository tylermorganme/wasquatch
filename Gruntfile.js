// This shows a full config file!
module.exports = function (grunt) {
    grunt.initConfig({
        watch: {
            files: "sass/**/*.scss",
            tasks: ['compass']
        },
        compass: {
            dist: {
                options: {
                    sassDir: 'sass',
                    cssDir: 'stylesheets',
                    outputStyle: 'nested'
                }
            }
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src : 'stylesheets/*.css'
                },
                options: {
                    proxy: "server.dev",
                    watchTask: true // < VERY important
                }
            }
        }
    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    require('load-grunt-tasks')(grunt);
    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('w', ["browserSync", "watch"]);
    grunt.registerTask('default', ['copy', 'processhtml:dev', 'concat','uglify','imagemin', 'autoprefixer', 'cssmin', 'clean']);
};