const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const plumber = require('gulp-plumber');
const minifycss = require('gulp-minify-css');
const babel = require('gulp-babel');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();

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

  },
  watch: {
    html: 'src/**/*.html',
    js: 'src/js/**/*.js',
    style: 'src/scss/**/*.{scss,css}',
    img: 'src/img/**/*.*'
  }
};

gulp.task('html', function() {
  gulp.src(path.src.html)
    .pipe(gulp.dest(path.build.html));
});

gulp.task('script', function() {
  gulp.src(path.src.js)
    .pipe(plumber())
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


gulp.task('server', ['html', 'script', 'style'], function(done) {
  browserSync.init({
    server: {
      baseDir: './build/'
    },
    host: 'localhost',
    files: ['./build/index.html', './build/js/*.js', './build/css/*.css']
  });
  done();
});

gulp.task('watch', function() {
  gulp.watch(path.src.html, ['html']);
  gulp.watch(path.src.style, ['style']);
  gulp.watch(path.src.js, ['script']);
});


gulp.task('default', ['watch', 'server']);