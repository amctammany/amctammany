var gulp = require('gulp'),
    path = require('path'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    plugins = gulpLoadPlugins();

var paths = {
  test: ['src/**/*.js', 'test/spec/**/*.js'],
};

gulp.task('test', function () {
  return gulp.src(paths.test)
    .pipe(plugins.karma({
      configFile: 'karma.conf.js',
      action: 'run'
    }))
    .on('error', function (err) {
      throw err;
    });
});
gulp.task('minify', function () {
  gulp.src('src/**/*.js')
    .pipe(plugins.uglify())
    .pipe(plugins.concat('plexi.js'))
    .pipe(gulp.dest('dist'))
});

gulp.task('stylus', function () {
  gulp.src('app/styles/**/*.styl')
    .pipe(plugins.stylus())
    .pipe(plugins.concat('app.css'))
    .pipe(gulp.dest('app/styles/'))
});

gulp.task('clean', function () {
  gulp.src('dist/**/*.*', {read: false})
    .pipe(plugins.clean());
});

gulp.task('jshint', function () {
  gulp.src('src/**/*.js')
    //.pipe(plugins.jshint()

});
gulp.task('usemin', function () {
  gulp.src('app/views/**/*.html')
    .pipe(plugins.usemin({
      css: [plugins.minifyCss(), 'concat'],
      //html: [plugins.minifyHtml({empty: true})],
      js: [plugins.uglify()]
    }))
    .pipe(gulp.dest('dist/'))
})

gulp.task('build', ['clean', 'stylus', 'jshint', 'test'], function () {
  // Copy over HTML
  gulp.src('app/views/**/*.html')
    .pipe(plugins.usemin({
      css: [plugins.minifyCss(), 'concat'],
      js: [plugins.uglify()]
    }))
    .pipe(gulp.dest('dist/views'));
  gulp.src('app/bower_components/bootstrap/dist/fonts/*.*')
    .pipe(gulp.dest('dist/fonts'))
    //.pipe(gulp.dest('dist/views'))

});

gulp.task('jsdoc', function () {
  gulp.src('doc/**/*.*', {read: false})
    .pipe(plugins.clean());
  gulp.src('./src/**/*.js')
    .pipe(plugins.jsdoc('./doc'));
});

gulp.task('server', ['stylus'], function () {
  process.env.NODE_ENV = 'development';
  require('./app').listen(3000);
  gulp.watch('app/styles/**/*.styl', ['stylus']);

  gulp.src(['app/scripts/**/*.js', 'app/views/**/*.html', 'app/styles/app.css', 'src/**/*.js'])
    .pipe(plugins.watch())
    .pipe(plugins.livereload())

});
