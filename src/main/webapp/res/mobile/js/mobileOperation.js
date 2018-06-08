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
    callAjax('/websiteService/getAlertWord', '', 'getAlertWordCallback', '', '', '', '');
}
function getAlertWordCallback(data){
    if (data.status == "ok") {
        var items = data.callBackData;
        if(items.length > 0){
            $('.mainAlert').html('');
        }

    }
}