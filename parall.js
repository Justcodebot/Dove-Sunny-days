    var parallaxPage = {

        initialize: function(){
            this.config = {
                mainarea: $('#mainarea'),
                slides: $('.slide'),
                animationTime: 500,
                slideCount: 0,
                rangeSlide: $('.range_slider'),
                slidesLength: function(){
                    return $('.slide').length;
                }
            };

            this.setSlideHeight();
            this.setMarginContent();
            this.bindEvents();
        },

        bindEvents: function(){
            var self = this;

            $(window).on('resize', function(){
                self.setSlideHeight();
                self.setMarginContent();
            });

            // events
            $('.nextSlide').on('click', $.proxy(this.nextSlide, this));

            $(window).on('mousewheel DOMMouseScroll', $.proxy(this.moveScroll, this));

            this.addSlider();
        },

        setMarginContent: function(){
            var slides = this.config.slides;

            for(var i = 0, length = slides.length; i < length; i++){
                var slide = $(slides[i]),
                    slideHeight = slide.height() / 2,
                    hederHeight = $('.header_slide', slide).height(),
                    middleSlide = $('.content_slide', slide);

                var contentMargin = slideHeight - hederHeight - (middleSlide.height() / 2);

                if( contentMargin < 0 ){
                    middleSlide.css('margin-top', 0);
                }else{
                    middleSlide.css('margin-top', contentMargin);
                }
            }
        },

        setSlideHeight: function(){
            var config = this.config,
                slides = config.slides,
                windowHeight = $(window).height();

            for(var i = 0, length = slides.length; i < length; i++){
                var headerSlide = $('.header_slide', slides[i]),
                    contentSlide = $('.content_slide', slides[i]),
                    footerSlide = $('.footer_slide', slides[i]);

                var slideContentHeight = headerSlide.outerHeight(true) + contentSlide.outerHeight(true) + footerSlide.outerHeight(true);
                $(slides[i]).height(windowHeight);
            }
        },

        moveSlide: function(){
            if (animation) return;

            animation = true;

            var config = this.config,
                currentSlide = config.slides.eq( config.slideCount ),
                shift = $(window).height() * config.slideCount;

            config.slides.eq(0).animate({
                'margin-top': -shift
            }, config.animationTime, function() { animation = false });
        },

        nextSlide: function(event){
            var config = this.config;

            config.slideCount++;
            this.moveSlide();
        },

        moveScroll: function(event){
            if (animation) return;

            var self = this,
                config = self.config;

            var delta = event.originalEvent.deltaY != undefined ? event.originalEvent.deltaY : event.originalEvent.wheelDeltaY * -1;

            if (delta < 0 && self.config.slideCount == 1) {
                // scroll up
                if( self.config.slideCount == 0 || config.slides.eq(config.slideCount).scrollTop() != 0 ) return;
                self.config.slideCount--;
                self.moveSlide();
            }
            else if (delta > 0 && self.config.slideCount == 0) {
                // scroll down
                if( self.config.slideCount == self.config.slidesLength()-1 ) return;
                self.config.slideCount++;
                self.moveSlide();
            }
        },

        addSlider: function(){
            var config = this.config;

            config.rangeSlide.slider({
                max: 5,
                stop: function( event, ui ){
                    var value = ui.value;
                    setSun(value);
                }
            });
        }
    };

    parallaxPage.initialize();