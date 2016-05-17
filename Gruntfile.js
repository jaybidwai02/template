module.exports = function(grunt){
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {
			dist:{
				option: {
					style: 'expanded'
				},
				files: {
					'css/main.css': 'sass/main.scss'
				}
			}
		},
		watch: {
			css: {
				files: 'sass/**/*.scss',
				tasks: 's'
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	//grunt.loadNpmTasks('grunt-contrib-sass');

	//grunt.registerTask('s',['sassTocss']);
	grunt.registerTask('s','sass');
	grunt.registerTask('w','watch');
};