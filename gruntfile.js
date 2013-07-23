module.exports = function (grunt) {

    // Loading external tasks
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-karma');

    // Default task.
    grunt.registerTask('default', ['jshint', 'karma:unit']);
    grunt.registerTask('build', ['concat:tmp', 'clean:rm_tmp', 'uglify']);
    grunt.registerTask('server', ['karma:start']);


    var testConfig = function(configFile, customOptions) {
        var options = { configFile: configFile, singleRun: true };
        return grunt.util._.extend(options, customOptions, travisOptions);
    };

    // Project configuration.
    grunt.initConfig({
        dist : 'components/angular-fileuploader',
        pkg: grunt.file.readJSON('package.json'),
        meta: {
            banner: ['/**',
                ' * <%= pkg.name %> - <%= pkg.description %>',
                ' * @version v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>',
                ' * @link <%= pkg.homepage %>',
                ' * @license <%= pkg.license %>',
                ' */',
                ''].join('\n'),
            view : {
                humaName : "Fileuploader",
                repoName : "fileuploader"
            },
            destName : '<%= dist %>/build/<%= meta.view.repoName %>'
        },
        watch: {
            karma: {
                files: ['modules/**/*.js'],
                tasks: ['karma:unit:run'] //NOTE the :run flag
            }
        },
        karma: {
            unit: testConfig('test/karma.conf.js'),
            start: {configFile: 'test/karma.conf.js'}
        },
        concat: {
            tmp: {
                files: {  'tmp/dep.js': [ 'src/*.js']}
            }
        },
        uglify: {
            options: {banner: '<%= meta.banner %>'},
            build: {
                files: {
                    '<%= meta.destName %>.min.js': ['<%= meta.destName %>.js']
                }
            }
        },
        clean: {
            rm_tmp: {src: ['tmp']}
        },
        jshint: {
            files:['src/*.js', 'gruntFile.js', 'test/**/*Spec.js', 'demo/**/*.js'],
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                boss: true,
                eqnull: true,
                globals: {}
            }
        }
    });

};