function footTabChange(obj, url){
    $(obj).siblings().removeClass('bottomTab');
    $(obj).addClass('bottomTab');
    $('#mainContent').load('mobileView/'+url);
}

function login() {
    var sid = $('#sid').val();
    var password = $('#password').val();
    if (sid == '' || password == '')
        $('#errorShow').text('用户名或密码不可以为空');
    else{
        var parameter = 'sid='+sid+'&password='+password
        callAjax('/websiteService/login', '', 'loginCallback', '', '', parameter, '');
    }
}

function loginCallback(data){
    if (data.status == "ok") {
        var user = {
            "id" : data.callBackData.sid,
            "name" : data.callBackData.name,
            "roleId": data.callBackData.roleId,
        }
        Cookies.set("user", user, { expires: 1 });
        window.location = '/mindex.html';
    }else{
        $('#errorShow').text(data.prompt);
    }

}

function logout(){
    Cookies.remove("user");
}

function getAlertWord(){
    callAjax('/websiteService/getAlertWords', '', 'getAlertWordsCallback', '', '', '', '');
}
function getAlertWordsCallback(data) {
    if (data.status == "ok" && data.callBackData.length>0) {
        $('.mainAlert').html('');
        var items = data.callBackData;
        var template = '<div>';
        for (var i = 0; i < items.length; i++) {
            template += '<p >' + items[i].content + '</p>';
        }
        template += '</div>';
        $('.mainAlert').html(template);
        $('.mainAlert div').css('height', (0.5 * 4) + 'rem');

        rollAlertWord(0.5, 0, items.length-1);

    }
}
function rollAlertWord(height, cur, max) {
    var position = "-" + (cur * height) + "rem";
    if (cur == max) {
        cur = 0;
    } else {
        cur++;
    }
    $('.mainAlert div').animate({
        top: position
    },
    1000,
    function() {
        setTimeout(function() {
            rollAlertWord(height, cur, max)
        },
        5000);
    });
}

function getEventsTotalCountByDate(){
    var date = $('#eventCalendar').calendar('options').current;
    if(!date){
        date = new Date();
    }
    var month = date.getMonth()+1;
    var day = date.getDate();
    var dateString = date.getFullYear() + "-" + (month<10?"0"+month:month) + "-" + (day<10?"0"+day:day);
    var param = 'date='+dateString;
    callAjax('/websiteService/getEventsTotalCount', '', 'getEventsTotalCountByDateCallback', '', '', param, '', false);
}
function getEventsTotalCountByDateCallback(data){
    if (data.status == "ok") {
        $('#mainEvent_pagination').mobilePagination({
            totalNumber: data.callBackData,
            onSelectPage: getEventsByDate,
        });
    }
}
function getEventsByDate(pageNumber, pageSize){
    var date = $('#eventCalendar').calendar('options').current;
    if(!date){
        date = new Date();
    }
    var month = date.getMonth()+1;
    var day = date.getDate();
    var dateString = date.getFullYear() + "-" + (month<10?"0"+month:month) + "-" + (day<10?"0"+day:day);
    var param = 'date='+dateString+'&pageNumber='+pageNumber+'&pageSize='+pageSize;
    if(pageNumber===1){
        $('.mainEventView').html('');
    }
    callAjax('/websiteService/getEvents', '', 'getEventsByDateCallback', '', '', param, '');
}
function getEventsByDateCallback(data){
    if (data.status == "ok" && data.callBackData.length>0){
        var items = data.callBackData;
        var template = '';
        for(var index = 0 ; index < items.length ; index++){
            var item = items[index];
            template += '<div style="width:100%;height:auto;padding:0.1rem;border-bottom: 1px dashed #4682B4;">';
            template += '<div class="left" style="width:70%"><a href="mobileView/eventShow.html?eventId=' + item.id + '" target="_blank"><p style="text-overflow:ellipsis;width:100%;overflow:hidden;white-space:nowrap;">' + item.title + '</p></a></div>';
            template += '<div class="right" style="width:30%;text-align:right;">' + item.date + '</div>';
            template += '<div class="clear"></div></div>';
        }
        $('.mainEventView').html($('.mainEventView').html()+template);
        if($('#mainEvent_pagination').data('paginationObj')){
            $('#mainEvent_pagination').data('paginationObj').nextPage();
        }
    } else{
        $('.mainEventView').html('');
    }
}

function getEventById(eventId){
    callAjax('/websiteService/getEventById', '', 'getEventByIdCallback', '', '', eventId, '');
}
function getEventByIdCallback(data){
    if (data.status == "ok") {
        var item = data.callBackData;
        var style = '<style>.notificationStyle{background-color:white;border-radius:0.1rem;} .notificationStyle h1{text-align:center;font-size: 0.4rem;padding:0.1rem;} .notificationStyle p, .notificationStyle span, .notificationStyle div{font-size:0.24rem;padding:0.1rem;} </style>';
        var wrapperPrefix = '<div class="notificationStyle">';
        var wrapperSuffix = '</div>';
        var title = '<h1>'+item.title+'</h1>';
        var author = '<p style="text-align:center;font-size: 0.2rem;padding:0;">编辑: '+item.creator+'</p>';
        author += '<p style="text-align:center;font-size: 0.2rem;padding:0;">时间: '+item.date+'</p>';
        var content = item.content;
        var split = '<div class="splitLine"></div>';
        var others = '<p style="text-align:left;font-size: 0.2rem;padding:0;">分类: '+item.category+'</p>';;
        others += '<p style="text-align:left;font-size: 0.2rem;padding:0;">地点: '+item.location+'</p>';;
        others += '<p style="text-align:left;font-size: 0.2rem;padding:0;">相关股票: '+item.stockCode+'</p>';;
        others += '<p style="text-align:left;font-size: 0.2rem;padding:0;">标签: '+item.tag+'</p>';;
        $('#mainDiv').html(style+wrapperPrefix+title+author+content+split+others+wrapperSuffix);
    }
}

function bsSelect(obj, param) {
    $('.sc_bs div').removeClass('sc_bsSelected');
    $(obj).addClass('sc_bsSelected');
    if (param == 'sell') {
        $('#initPrice').css('display', 'block');
    } else {
        $('#initPrice').css('display', 'none');
    }
}

function calculate() {
    var market = $('.sc_tabSelected').text();
    var deal = $('.sc_bsSelected').text();
    var price = parseFloat($('#priceTxt').val());
    var quantity = parseFloat($('#quantityTxt').val());
    var amount = parseFloat((price * quantity).toFixed(2));
    var sxfl = parseFloat($('#sxflTxt').val());
    var ghsl = parseFloat($('#ghslTxt').val());
    var yssl = parseFloat($('#ysslTxt').val());
    var commission = parseFloat((amount * sxfl).toFixed(2));

    if (commission < 5) {
        commission = 5;
    }
    var ghTax = 0;
    var stockTax = 0;
    var finalAmount = 0;
    if (market == '沪市') {
        ghTax = parseFloat((amount * ghsl).toFixed(2));
    }
    if (deal == '卖') {
        stockTax = parseFloat((amount * yssl).toFixed(2));
        finalAmount = amount - ghTax - stockTax - commission;
    } else {
        finalAmount = amount + ghTax + stockTax + commission;
    }
    finalAmount = parseFloat(finalAmount.toFixed(2));
    var template = '';
    template += '<div style="width:100%"><div class="left" style="width:30%">股票金额:</div><div class="left" style="width:70%">' + amount + '</div><div class="clear"></div></div>';
    template += '<div style="width:100%"><div class="left" style="width:30%">手续费:</div><div class="left" style="width:70%">' + commission + '</div><div class="clear"></div></div>';
    template += '<div style="width:100%"><div class="left" style="width:30%">印花税:</div><div class="left" style="width:70%">' + stockTax + '</div><div class="clear"></div></div>';
    template += '<div style="width:100%"><div class="left" style="width:30%">过户费:</div><div class="left" style="width:70%">' + ghTax + '</div><div class="clear"></div></div>';
    template += '<div style="width:100%"><div class="left" style="width:30%">成交金额:</div><div class="left" style="width:70%">' + finalAmount + '</div><div class="clear"></div></div>';
    if (deal == '买') {
        var sellPrice = 0;
        if (market == '沪市') {
            sellPrice = parseFloat((finalAmount / (quantity * (1 - sxfl - yssl - ghsl))).toFixed(2));
            if (sellPrice * quantity * sxfl < 5) {
                sellPrice = parseFloat(((finalAmount + 5) / (quantity * (1 - yssl - ghsl))).toFixed(2));
            }
        } else {
            sellPrice = parseFloat((finalAmount / (quantity * (1 - sxfl - yssl))).toFixed(2));
            if (sellPrice * quantity * sxfl < 5) {
                sellPrice = parseFloat(((finalAmount + 5) / (quantity * (1 - yssl))).toFixed(2));
            }
        }
        template += '<div style="width:100%"><div class="left" style="width:30%">保本价格:</div><div class="left" style="width:70%">' + sellPrice + '</div><div class="clear"></div></div>';
    } else {
        var profit = 0;
        var initPrice = 0;
        if ($('#initPriceTxt').val()) {
            initPrice = parseFloat($('#initPriceTxt').val());
        }
        var sxf = initPrice * quantity * sxfl;
        if (sxf < 5) {
            sxf = 5;
        }
        if (market == '沪市') {
            profit = (finalAmount - sxf - (initPrice * quantity * (1 + ghsl))).toFixed(2);
        } else {
            profit = (finalAmount - sxf - initPrice * quantity).toFixed(2);
        }
        if (profit < 0) {
            template += '<div style="width:100%"><div class="left" style="width:30%">盈亏金额:</div><div class="left" style="width:70%;color:green;">' + profit + '</div><div class="clear"></div></div>';
        } else {
            template += '<div style="width:100%"><div class="left" style="width:30%">盈亏金额:</div><div class="left" style="width:70%;color:red;">' + profit + '</div><div class="clear"></div></div>';
        }
    }

    $('.sc_result').html(template);
}

function volatilityAnalyse() {
    if($('#stockCodeTxt').val() === '')
        return;
    var param = 'stockCode=' + $('#stockCodeTxt').val() + '&volatility=' + $('#volatilityTxt').val() + '&month=' + $('#monthTxt').val() + '&startDate=' + $('#startDateTxt').val() + '&endDate=' + $('#endDateTxt').val();
    callAjax('/websiteService/getStocksByVolatilityByMonth', '', 'getStocksByVolatilityByMonthCallback', '', '', param, '');
}

function getStocksByVolatilityByMonthCallback(data) {
    var item = data.callBackData;
    var units = item.stockDateDataUnitList;
    var sortedUnits = units.sort(function(a, b) {
        var day1 = a.date.split('-')[2];
        var day2 = b.date.split('-')[2];
        if (day1 > day2) {
            return 1;
        } else if (day1 < day2) {
            return - 1;
        } else {
            return 0;
        }
    });

    var positive = 0;
    var negative = 0;
    var volatility = 0;
    var color = 'color:red;';
    var backgroundColor = 'background-color: white;';
    var hasBackgroundColor = true;
    var unitTemplate = '';
    for (var i = 0; i < sortedUnits.length; i++) {
        var unit = sortedUnits[i];
        if (unit.pchg > 0) {
            color = 'color:red;';
            positive++;
        } else {
            color = 'color:green;';
            negative++;
        }
        volatility += parseFloat(unit.pchg);
        if (i > 0) {
            var preUnit = sortedUnits[i - 1];
            if (preUnit.date.split('-')[2] != unit.date.split('-')[2]) {
                if (hasBackgroundColor) {
                    backgroundColor = ';';
                    hasBackgroundColor = false;
                } else {
                    backgroundColor = 'background-color: white;';
                    hasBackgroundColor = true;
                }
            }
        }
        unitTemplate += '<div style="width:100%;text-align:right;' + backgroundColor + '">';
        unitTemplate += '<div class="left" style="width:25%;text-align:left;">' + unit.date + '(' + showWeekDay(unit.date) + ')</div>';
        unitTemplate += '<div class="left" style="width:20%;' + color + '">' + parseFloat(unit.topen).toFixed(2) + '</div>';
        unitTemplate += '<div class="left" style="width:20%;' + color + '">' + parseFloat(unit.tclose).toFixed(2) + '</div>';
        unitTemplate += '<div class="left" style="width:17%;' + color + '">' + parseFloat(unit.pchg).toFixed(2) + '%</div>';
        unitTemplate += '<div class="left" style="width:18%;' + color + '">' + parseFloat(unit.chg).toFixed(2) + '</div>';
        unitTemplate += '<div class="clear"></div></div>';
    }
    var template = '<div>分析结果为:</div>';
    template += '<div>' + item.stockCode + '在历史的' + $('#monthTxt').val() + '月份里:</div>';
    template += '<div>共有<span style="color:red;">' + positive + '</span>次涨幅大于 ' + $('#volatilityTxt').val() + '%</div>';
    template += '<div>共有<span style="color:green;">' + negative + '</span>次跌幅大于-' + $('#volatilityTxt').val() + '%</div>';
    template += '<div>总体涨幅为: <span style="color:' + (volatility > 0 ? 'red': 'green') + ';">' + parseFloat(volatility).toFixed(2) + '%</span></div>';
    template += unitTemplate;
    $('#result').html(template);
}

function topPriceAnalyse(){
    var param = 'stockCode=' + $('#stockCodeTxt').val();
    callAjax('/websiteService/topPriceAnalyse', '', 'topPriceAnalyseCallback', '', '', param, '');
}
function topPriceAnalyseCallback(data){
    var item = data.callBackData;
    var sortedUnits = item.stockDateDataUnitList;
    var positive = 0;
    var negative = 0;
    var color = 'color:red;';
    var unitTemplate = '';
    for (var i = 0; i < sortedUnits.length; i++) {
        var unit = sortedUnits[i];
        if (unit.pchg > 0) {
            color = 'color:red;';
            positive++;
        } else {
            color = 'color:green;';
            negative++;
        }
        unitTemplate += '<div style="width:100%;text-align:right;' + (i%2==0?'background-color: white;':'') + '">';
        unitTemplate += '<div class="left" style="width:25%;text-align:left;">' + unit.date + '</div>';
        unitTemplate += '<div class="left" style="width:20%;' + color + '">' + parseFloat(unit.topen).toFixed(2) + '</div>';
        unitTemplate += '<div class="left" style="width:20%;' + color + '">' + parseFloat(unit.tclose).toFixed(2) + '</div>';
        unitTemplate += '<div class="left" style="width:17%;' + color + '">' + parseFloat(unit.pchg).toFixed(2) + '%</div>';
        unitTemplate += '<div class="left" style="width:18%;' + color + '">' + parseFloat(unit.chg).toFixed(2) + '</div>';
        unitTemplate += '<div class="clear"></div></div>';
    }
    var template = '<div>分析结果为:</div>';
    template += '<div>' + item.stockCode + '在历史上</div>';
    template += '<div>共有<span style="color:red;">' + positive + '</span>次涨停</div>';
    template += '<div>共有<span style="color:green;">' + negative + '</span>次跌停</div>';
    template += unitTemplate;
    $('#result').html(template);
}