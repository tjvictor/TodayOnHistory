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
    var month = date.getMonth()+1;
    var day = date.getDate();
    var dateString = date.getFullYear() + "-" + (month<10?"0"+month:month) + "-" + (day<10?"0"+day:day);
    var param = 'date='+dateString;
    callAjax('/websiteService/getEventsTotalCountByDate', '', 'getEventsTotalCountByDateCallback', '', '', param, '');
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
    var month = date.getMonth()+1;
    var day = date.getDate();
    var dateString = date.getFullYear() + "-" + (month<10?"0"+month:month) + "-" + (day<10?"0"+day:day);
    var param = 'date='+dateString+'&pageNumber='+pageNumber+'&pageSize='+pageSize;
    if(pageNumber===1){
        $('.mainEventView').html('');
    }
    callAjax('/websiteService/getEventsByDate', '', 'getEventsByDateCallback', '', '', param, '');
}
function getEventsByDateCallback(data){
    if (data.status == "ok" && data.callBackData.length>0){
        var items = data.callBackData;
        var template = '';
        for(var index = 0 ; index < items.length ; index++){
            var item = items[index];
            template += '<div style="width:100%;height:auto;padding:0.1rem;border-bottom: 1px dashed #4682B4;">';
            template += '<div class="left" style="width:70%"><a href="mobileView/showDocument.html?page=wiki&id=' + item.id + '" target="_blank"><p style="text-overflow:ellipsis;width:100%;overflow:hidden;white-space:nowrap;">' + item.title + '</p></a></div>';
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