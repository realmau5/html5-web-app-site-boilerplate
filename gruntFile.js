module.exports = function(grunt) {

    /**========================================
     * Grunt config
    ===========================================**/

    grunt.initConfig({

        //get config from package.json file
        pkg: grunt.file.readJSON('package.json'),

        copy: {
            js: {
                expand: true,
                cwd: 'app/js',
                src: [
                    '**/zoom.js'
                ],
                dest: 'build/js/'
            },
            fontsbuild: {
                expand: true,
                cwd: 'app/fonts',
                src: ['**'],
                dest: 'build/fonts'
            },
            images: {
                expand: true,
                cwd: 'app/images',
                src: ['**'],
                dest: 'build/images'
            },
            ico: {
                expand: true,
                cwd: 'app/',
                src: ['**/favicon.ico'],
                dest: 'build/'
            },
            assets: {
                expand: true,
                cwd: 'app/assets',
                src: ['**'],
                dest: 'build/assets'
            },
            // css: {
            //     expand: true,
            //     cwd: 'app/css',
            //     src: ['**'],
            //     dest: 'build/css'
            // }
        },

        // uglify to minify the files
        uglify: {
            options: {
                /**in dev*/
                beautify: true,
                compress: false,
                /**in live*/
                // compress: {
                //     drop_console: true
                // },
                // sourceMap: true,
            },

            // when task run's, it will minify all js files to build folder accordingly
            build: {
                files: {
                    'build/js/all.min.js': ['app/js/main.js'],
                    'build/js/jquery.libs.min.js': ['app/library/jquery-2.1.0.min.js', 'app/library/jquery-ui-1.10.4.min.js','app/library/jquery.nanoscroller.min.js','app/library/jquery.easing.1.3.js', 'app/library/bootstrap.min.js', 'app/library/jquery.booklet.latest.js','app/library/modernizr.min.js','app/library/enquire.min.js'],
                }
            }
        },

        sass: {
            dist: {
                options: {
                    style: 'expanded',
                    lineNumbers: true, // 1
                },
                files: {
                    'app/css/main.css': 'app/sass/main.scss'
                }
            }
        },
        // To minify css
        cssmin: {
            options: {
                sourceMap: true,
                banner: '/* <%= grunt.template.date() %> */\n' //add date to top of file
            },
            target: {
                files: {
                    'build/css/all.min.css': ['app/css/compass-homestyle.css','app/css/jquery.booklet.latest.css','app/css/main.css','app/css/bootstrap.min.css']
                }
            }
        },

        //html concat
        includes: {
            options: {
                debug: false
            },
            includePathtwo: {
                src: ['app/includes/popup.html'],
                dest: 'build/popup.html',
                options: {
                    includePath: 'app/includes'
                }
            },
            includePath: {
                src: ['app/includes/index.html'],
                dest: 'app/index.html',
                options: {
                    includePath: 'app/includes'
                }
            }
        },
        // To Clean files
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        'build/*'
                    ]
                }]
            }
        },

        prettify: {
            options: {
                "indent": 2,
                "indent_char": " ",
                "indent_scripts": "normal",
                "wrap_line_length": 0,
                "brace_style": "collapse",
                "preserve_newlines": true,
                "max_preserve_newlines": 1,
            },
            one: {
                src: 'app/index.html',
                dest: 'build/index.html'
            }
        },

        // To watch file change and do uglify and minify on the changed file
        watch: {
            scripts: {
                files: ['app/js/*.js', 'app/js/**/*.js'],
                tasks: ['uglify'],
                options: {
                    spawn: false,
                },
            },
            css: {
                files: ['app/css/*.css', 'app/css/**/*.css'],
                tasks: ['copy:css']
            },
            sass: {
              files: ['app/sass/*.scss'],
              tasks: ['sass']
            },
            html: {
                files: ['app/*.html', 'app/**/*.html'],
                tasks: ['includes','prettify']
            },
            copy: {
                files: ['app/*.ico', 'app/**/*.jpeg','app/**/*.gif','app/**/*.png','app/**/*.pdf'],
                tasks: ['copy']
            }
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src: [
                        'build/css/*.css',
                        'build/*.html',
                        'build/js/*.js'
                    ]
                },
                options: {
                    watchTask: true,
                    server: './build'
                }
            }
        }
    });

    /**========================================
     * Grunt default command to run all task
    ===========================================**/

    // grunt.registerTask('default', ['concat','copy','sass','cssmin','uglify','browserSync','watch']);
    grunt.registerTask('default', ['includes','sass','copy','cssmin','uglify','prettify','browserSync', 'watch']);
    grunt.registerTask('sasslocal', ['sass', 'browserSync', 'watch']);
    grunt.registerTask('clean', ['clean:dist']);
    grunt.registerTask('watch', ['watch']);
    grunt.registerTask('htmlconcat', ['includes']);


    /**========================================
     * Grunt Plugins
    ===========================================**/

    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-includes');
    grunt.loadNpmTasks('grunt-prettify');
};
