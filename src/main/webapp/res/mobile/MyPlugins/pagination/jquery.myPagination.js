; (function($) {

    var MobilePagination = function(ele, opt) {
        this.$element = ele,
        this.$element.removeClass();
        this.$element.html('');
        this.defaults = {
            pageNumber: 1,
            pageSize: 10,
            totalNumber: 0,
            onSelectPage: function(pageNumber, pageSize) {},
        },
        this.options = $.extend({},
        this.defaults, opt);
        this.options.totalPage = Math.ceil(this.options.totalNumber / this.options.pageSize);
    };

    MobilePagination.prototype = {
        createPagination: function() {
            var content = '<div class="pagination_nextPage"><span>' + '1 / ' + this.options.totalPage + '下一页</span><ul><li></li></ul></div>';
            content += '<div class="pagination_loading" style="display:none;">加载中...</div>';
            if (this.options.pageNumber < this.options.totalPage) {
                this.$element.addClass('myPagination');
                this.$element.html(content);
            }

            this.$element.find('.pagination_nextPage').off("click");
            this.$element.find('.pagination_nextPage').on("click", this,
            function(event) {
                event.data.$element.find('.pagination_nextPage').css('display', 'none');
                event.data.$element.find('.pagination_loading').css('display', 'block');
                event.data.options.onSelectPage(event.data.options.pageNumber+1, event.data.options.pageSize);
            });
        },

        nextPage: function() {
            this.options.pageNumber++;
            if (this.options.pageNumber >= this.options.totalPage) {
                this.dispose();
            } else {
                this.$element.find('.pagination_nextPage').css('display', 'block');
                this.$element.find('.pagination_nextPage span').text(this.options.pageNumber + ' / ' + this.options.totalPage + ' 下一页');
                this.$element.find('.pagination_loading').css('display', 'none');
            }
        },

        setTotalNumber: function(totalNumber) {
            this.options.pageNumber = 1;
            this.options.totalNumber = totalNumber;
            this.options.totalPage = Math.ceil(this.options.totalNumber / this.options.pageSize);
            this.createPagination();
        },

        dispose: function(){
           this.$element.html('');
           this.$element.removeData("paginationObj");
           this.$element.removeClass();
        }

    };

    $.fn.mobilePagination = function(opt) {
        var paginationObj = new MobilePagination(this, opt);
        paginationObj.createPagination();
        this.data('paginationObj', paginationObj);
    };

})(jQuery);