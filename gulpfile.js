var gulp      = require('gulp'), // Подключаем Gulp
    sass        = require('gulp-sass'), //Подключаем Sass пакет,
    browserSync = require('browser-sync'), // Подключаем Browser Sync
    concat      = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
    uglify      = require('gulp-uglifyjs'), // Подключаем gulp-uglifyjs (для сжатия JS)
    cssnano     = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
    rename      = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
    del         = require('del'), // Подключаем библиотеку для удаления файлов и папок
	imagemin    = require('gulp-imagemin'), // Подключаем библиотеку для работы с изображениями
    pngquant    = require('imagemin-pngquant'), // Подключаем библиотеку для работы с png   
    cache       = require('gulp-cache'), // Подключаем библиотеку кеширования 
    autoprefixer = require('gulp-autoprefixer'),// Подключаем библиотеку для автоматического добавления префиксов
    spritesmith  = require('gulp.spritesmith'),// Подключаем библиотеку для сборки спрайтов
    pug          = require('gulp-pug'),// Подключаем библиотеку для сборки pug файлов
    //pug          = require('pug'),// Подключаем библиотеку для сборки pug файлов
    plumber 	 = require('gulp-plumber'),
    notify 		 = require("gulp-notify");

gulp.task('sprite', function() {
    var spriteData = 
        gulp.src('app/libs/sprites/*.*') // путь, откуда берем картинки для спрайта
            .pipe(spritesmith({
                imgName: 'sprite.png',
                cssName: 'sprite.scss',
                cssFormat: 'scss',
                algorithm: 'binary-tree',
                padding: 10,
                cssTemplate: 'scss.template.handlebars'
            }));

    spriteData.img.pipe(gulp.dest('app/images/icons/')); // путь, куда сохраняем картинку
    spriteData.css.pipe(gulp.dest('app/scss/')); // путь, куда сохраняем стили
    spriteData.pipe(browserSync.reload({stream: true})); // Обновляем CSS на странице при изменении
});    


    gulp.task('pug', function buildHTML() {
        return gulp.src('app/pug/*.pug')
        .pipe(plumber({
          errorHandler: notify.onError()
      	}))
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('app'))						
        .pipe(browserSync.reload({stream: true}));
    });

gulp.task('sass', function(){
	return gulp.src(["app/scss/**/*.scss", '!app/scss/blocks/*.scss', '!app/scss/style.scss']) // Берем источник
    // gulp.src(['css/*.css', '!css/file.css'])
	.pipe(plumber({
          errorHandler: notify.onError()
    }))
	.pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
	.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
	//.pipe(sass({outputStyle: 'compressed'})) // Преобразуем Sass в CSS посредством gulp-sass
	.pipe(gulp.dest("app/css")) // Выгружаем результата в папку app/css
	.pipe(browserSync.reload({stream: true})); // Обновляем CSS на странице при изменении
});

gulp.task('scripts', function(){
	return gulp.src([
        'app/libs/jquery/dist/jquery.min.js',
        'app/libs/slick/slick.min.js',
        'app/libs/swiper-4.2.0/dist/js/swiper.min.js',
		'app/libs/magnific-popup/dist/jquery.magnific-popup.js',
        'app/libs/jquery.sticky-kit.min.js',
        //'app/libs/vivus/vivus.min.js',
        'app/libs/validator.min.js',
        'app/libs/perfect-scrollbar-master/dist/perfect-scrollbar.min.js',
        //'app/libs/hammer/hammer.min.js',
        //'app/libs/jquery.panzoom-master/dist/jquery.panzoom.min.js',
        'app/libs/zoom-master/jquery.zoom.min.js',
        // 'app/libs/PhotoSwipe-4.1.2/dist/photoswipe.min.js',
        // 'app/libs/PhotoSwipe-4.1.2/dist/photoswipe-ui-default.min.js',
				'app/libs/jquery.mask.js',
        'app/libs/select2/select2.js'
	])
	.pipe(concat('libs.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('app/js'));
});

gulp.task('css-libs', ['sass', 'sprite'], function(){
	return gulp.src('app/css/libs.css')
	.pipe(cssnano())
	.pipe(rename({suffix: ".min"}))
	.pipe(gulp.dest('app/css'));
});


gulp.task('browser-sync', function(){
	browserSync({
		server: {
			baseDir: "app"
		},
		notify: false
	});
});

gulp.task('clean', function(){
	return del.sync('dist');
});

gulp.task('clear', function(){
	return cache.clearAll();
});

gulp.task('img', function() {
    return gulp.src('app/images/**/*') // Берем все изображения из app
        .pipe(cache(imagemin({ // Сжимаем их с наилучшими настройками
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('dist/images')); // Выгружаем на продакшен
});


//метод watch
    gulp.task('watch', ['pug', 'css-libs', 'scripts', 'browser-sync'], function() {
        gulp.watch('app/scss/**/*.scss', ['sass']); // Наблюдение за sass файлами
        gulp.watch('app/*.html', browserSync.reload); // автоперезагрузка html
        gulp.watch('app/js/**/*.js', browserSync.reload); // автоперезагрузка js
        gulp.watch('app/pug/**/*.pug', ['pug'], browserSync.reload); // автоперезагрузка pug  
        gulp.watch('app/images/sprites/**/*.png', browserSync.reload); // автоперезагрузка png 
    });

gulp.task('build', ['clean', 'img', 'sass', 'scripts'], function(){

	var buildCss = gulp.src([
		'app/css/main.css',
		'app/css/libs.min.css',
	])
		.pipe(gulp.dest('dist/css'));

	var buildFonts = gulp.src('app/fonts/**/*')
		.pipe(gulp.dest('dist/fonts'));

	var buildJs = gulp.src('app/js/**/*')
		.pipe(gulp.dest('dist/js'));

	var buildHtml = gulp.src('app/*.html')
		.pipe(gulp.dest('dist'));	

	var buildFavicon = gulp.src('app/*.ico')
		.pipe(gulp.dest('dist'));	

	var buildHtaccess = gulp.src('app/*.htaccess')
		.pipe(gulp.dest('dist'));	

});

gulp.task('default', ['watch']);




/*
gulp.task('mytask', function () {
	//console.log("Первый таск"); вывод таска
	
	//базовая команда gulp, sourse-files - взяли файлы
	//.pipe() - вызов команды плагина
	//.pipe(plugin())
	//.pipe(gulp.dest('folder')) выгрузить в папку
	/*
	return gulp.src('sourse-files') - берем файл
	.pipe(plugin()) - выполняем действие с ним
	.pipe(gulp.dest('folder')) - выводим результат
	
	return gulp.src('sourse-files')
	.pipe(plugin())
	.pipe(gulp.dest('folder'))
	
});

gulp.task('sass', function(){
	return gulp.src("app/sass/style.scss")
	.pipe(sass())
	.pipe(gulp.dest("app/css"))
});

Наблюдение за изменениями в файлах
gulp.watch('watch-files', ['task1', 'task2']);

в [] - указывается массив тасков которые мы будем выполнять

    gulp.task('browser-sync', function() { // Создаем таск browser-sync
        browserSync({ // Выполняем browser Sync
            server: { // Определяем параметры сервера
                baseDir: 'app' // Директория для сервера - app
            },
            notify: false // Отключаем уведомления
        });
    });

*/
