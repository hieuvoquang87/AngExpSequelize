'use strict';

var paths = {
    js: ['!node_modules/**', '!bower_components/**', 'packages/**/*.js'],
    components: [
        "components/js/jquery.js",
        "components/js/persistent-models.js",
        "components/js/angular.js",
        "components/js/angular-route.js",
        "components/js/angular-resource.js",
        "components/js/angular-ui-router.js",
        "components/js/angular-sanitize.js",
        "components/js/bootstrap.js",
        "components/js/ui-grid.js"],
    less: ['packages/**/assets/less/*.less'],
    css: ['components/js/*.css']
};

module.exports = function(grunt) {

    // Project Configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: ['**/dist/'],
        uglify: {
            models: {
                options: {
                    compress: false,
                    mangle: false,
                    beautify: true,
                    preserveComments: false
                }

            },
            debug: {
                options: {
                    compress: false,
                    mangle: false,
                    beautify: true
                },
                files: {
                    "dist/dist.min.js": paths.js
                }
            },
            release: {
                options: {
                    compress: true,
                    mangle: true,
                    beautify: false
                },
                files: {
                    "dist/dist.min.js": paths.js
                }
            },
            components: {
                options: {
                    compress: true,
                    mangle: true,
                    beautify: false
                },
                files: {
                    "dist/components.min.js": paths.components
                }
            }
        },
        less: {
            debug: {
                options: {
                    compress: false,
                    yuicompress: true,
                    optimization: 2
                },
                files: {
                    "dist/dist.css": paths.less
                }
            },
            release: {
                options: {
                    compress: true,
                    yuicompress: true,
                    optimization: 2
                },
                files: {
                    "dist/articles.css": paths.less
                }
            }
        }
    });

    //Load NPM tasks
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');

    grunt.registerTask('build-debug', ['less:debug', 'uglify:debug']);

};
