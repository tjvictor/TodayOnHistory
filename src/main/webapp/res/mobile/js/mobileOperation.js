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