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