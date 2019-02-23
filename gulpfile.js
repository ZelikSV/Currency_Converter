const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const plumber = require('gulp-plumber');
const minifycss = require('gulp-minify-css');
const babel = require('gulp-babel');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const htmlreplace = require('gulp-html-replace');

const path = {
  build: {
    html: 'build/',
    js: 'build/js/',
    css: 'build/css/',
    img: 'build/img/'
  },
  src: {
    html: 'src/index.html',
    js: 'src/js/**/*.js',
    style: 'src/scss/style.scss',
    img: 'src/img/**/*.{jpg,jpeg,png}'

  }
};

gulp.task('index', function() {
  gulp.src(path.src.html)
    .pipe(htmlreplace({
        'css': 'css/style.css',
        'js': 'js/index.js'
    }))
    .pipe(gulp.dest(path.build.html));
});

gulp.task('script', function() {
  return gulp.src(['src/js/index.js', 'src/js/app/services.js', 'src/js/app/controllers.js'])
    .pipe(concat('index.js'))
    .pipe(plumber())
    .pipe(gulp.dest(path.build.js));
});

gulp.task('script:build', function() {
  return gulp.src(['src/js/app/services.js', 'src/js/app/controllers.js', 'src/js/index.js'])
    .pipe(concat('index.js'))
    .pipe(babel({
      presets: ['env']
      }))
    .pipe(uglify())
    .pipe(gulp.dest(path.build.js));
});


gulp.task('style', function() {
  gulp.src(path.src.style)
  .pipe(plumber())
  .pipe(sass())
  .pipe(gulp.dest(path.build.css));
});

gulp.task('style:build', function() {
  gulp.src(path.src.style)
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(minifycss(''))
    .pipe(gulp.dest(path.build.css));
});

gulp.task('image', function() {
  gulp.src(path.src.img)
    .pipe(imagemin({
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest(path.build.img))
});

gulp.task('server', ['index', 'script', 'style'], function(done) {
  browserSync.init({
    server: {
      baseDir: './build/'
    },
    host: 'localhost',
    files: [path.build.html, path.build.js, path.build.css]
  });
  done();
});

gulp.task('watch', function() {
  gulp.watch(path.src.html, ['index']);
  gulp.watch(path.src.style, ['style']);
  gulp.watch(path.src.js, ['script']);
});


gulp.task('default', ['watch', 'server']);
gulp.task('build', ['index', 'script:build', 'style:build', 'image']);