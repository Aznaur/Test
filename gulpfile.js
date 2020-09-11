"use strict";

/* jshint node: true */

const { src, dest, parallel, series, watch } = require('gulp');
const sass = require('gulp-sass');
const server = require('browser-sync').create();
const plumber = require('gulp-plumber');
const csso = require('gulp-csso');
const rename = require('gulp-rename');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const sprite = require('gulp-svgstore');
const posthtml = require('gulp-posthtml');
const include = require('posthtml-include');
const del = require('del');



function css () {
  return src('source/scss/style.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(postcss([
      autoprefixer()
    ]))
    // .pipe(csso())
    // .pipe(rename('style.min.css'))
    .pipe(sourcemaps.write("."))
    .pipe(dest('source/css/'))
    .pipe(server.stream());
}

function browsersynnc () {
  server.init({
    server: 'source/',
    notify: false,
    online: true,
    open: true,
    cors: true,
    ui: false
  });

  watch('source/scss/**/*.{scss,sass}', series('css'));
  // watch('source/img/icon-*.svg', series('sprite', 'html', 'refresh'));
  // watch('source/*.html', series('html', 'refresh'));
  watch('source/*.html', series(refresh));
}

function images () {
  return src('source/img/**/*.{png,jpg,svg}')
    .pipe(imagemin([
      imagemin.mozjpeg({quality: 75, progressive: true}),
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.svgo()
    ]))

    .pipe(dest('source/img'));
}

function html () {
  return src('source/*.html')
  .pipe(posthtml([
    include()
  ]))
  .pipe(dest('build'));
}

function webpImages () {
  return src('source/img/**/*.{png,jpg}')
  .pipe(webp({quality: 75}))
  .pipe(dest('source/img'));
}

function refresh (done) {
  server.reload();
  done();
}

function svgSprite () {
  return src('source/img/{icone-*}.svg')
    .pipe(sprite({ inlineSvg: true }))
    .pipe(rename('sprite_auto.svg'))
    .pipe(dest('build/img'));
}

function copy () {
  return src([
    'source/fonts/**/*.{woff,woff2}',
    'source/img/**',
    'source/js/**',
    'source//*.ico'
    ], {
      base: 'source'
    })
    .pipe(dest('build'));
}

function delfile () {
  return del('build');
}

exports.browsersynnc = browsersynnc;
exports.css = css;
exports.images = images;
exports.webp = webpImages;
exports.sprite = svgSprite;
exports.html = html;
exports.copy = copy;
exports.delfile = delfile;
exports.start = series(css, browsersynnc);
