var user;

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
            "id" : data.callBackData.id,
            "sid": data.callBackData.sid,
            "name" : data.callBackData.name,
            "companyId" : data.callBackData.companyId,
            "companyName" : data.callBackData.companyName,
            "roleId": data.callBackData.roleId,
            "roleName": data.callBackData.roleName,
        }
        Cookies.set("user", user, { expires: 1 });
        window.location = '/index.html';
    }else{
        $('#errorShow').text(data.prompt);
    }

}

function logout(){
    Cookies.remove("user");
    callAjax('/websiteService/logout', '', '', '', '', '', '', false);
    window.location = 'view/login.html';
}

function resetPwd(){
    var left = $('#resetPwd').position().left;
    var width = $('#resetPwdPanel').width()/2-20;
    $('#resetPwdPanel').css('left', left-width);
    $('#oldPwdTxt').val('');
    $('#newPwdTxt').val('');
    $('#reNewPwdTxt').val('');
    $('#pwdReminder').text('');
    $('#pwdReminder').css('color','red');
    $('#resetPwdPanel').css('display','block');
}

function resetPwdBtn(){
    var oldPwd = $('#oldPwdTxt').val();
    var newPwd = $('#newPwdTxt').val();
    var reNewPwd = $('#reNewPwdTxt').val();
    if(oldPwdTxt=='' || newPwd=='' || reNewPwd==''){
        $('#pwdReminder').text('密码不能为空!');
        return;
    }
    if(newPwd != reNewPwd){
        $('#pwdReminder').text('新密码不一致!');
        return;
    }
    var user = jQuery.parseJSON(Cookies.get("user"));
    var parameter = "id="+user.id+"&oldPwd="+oldPwd+"&newPwd="+newPwd;
    callAjax('/websiteService/resetPwd', '', 'resetPwdCallback', '', '', parameter, '');
}

function resetPwdCallback(data){
    if (data.status == "ok") {
        setTimeout(function(){$('#resetPwdPanel').css('display','none');}, 3000);
        $('#pwdReminder').css('color','green');
        $('#pwdReminder').text(data.prompt);
    }else{
        $('#pwdReminder').text(data.prompt);
    }
}

function closeResetPwdBtn(){
    $('#resetPwdPanel').css('display','none');
}

function garbage(){
    $('#iframefordownload').nextAll().remove();
}

var bannerSlider;
function navSelect(obj, url){
    if(bannerSlider){
        clearTimeout(bannerSlider);
    }
    $('.navMenuSelected').removeClass('navMenuSelected');
    $(obj).addClass('navMenuSelected');
    garbage();
    $('#mainDiv').load(url);
}

//Management Operation
function jumpToManagementPage(obj, url, callback){
    $('.divselected').removeClass('divselected');
    $(obj).addClass('divselected');
    garbage();
    $('#manageView').load(url, callback);
}

var fileUploadType;
function setFileUploadType(type){
    fileUploadType = type;
}

function kindeditorFileUploading(fileElementId, kindeditorId) {
    $('.window-page-mask').css('display', 'block');
    $.ajaxFileUpload({
        url: '/websiteService/fileUpload/' + fileElementId + '/' + fileUploadType,
        secureuri: false,
        dataType: 'json',
        fileElementId: fileElementId,
        success: function(data, status) {
            if (data.status == "ok") {
                if(kindeditorId){
                    if (data.callBackData.fileType == 'image') {
                        kindeditorId.insertHtml('<p><img src="' + data.callBackData.fileUrl + '" style="max-width:100%" /></p>');
                    } else if (data.callBackData.fileType == 'audio') {
                        kindeditorId.insertHtml('<p><audio src="' + data.callBackData.fileUrl + '" style="max-width:100%" controls="controls" style="max-width:100%;max-height:100%;">您的浏览器不支持此音频，请使用Chrome浏览观看</audio></p>');
                    } else if (data.callBackData.fileType == 'video') {
                        kindeditorId.insertHtml('<p><video src="' + data.callBackData.fileUrl + '" style="max-width:100%" controls="controls" style="max-width:100%;max-height:100%;">您的浏览器不支持此视频，请使用Chrome浏览观看</video></p>');
                    } else if (data.callBackData.fileType == 'file') {
                        kindeditorId.insertHtml('<a class="ke-insertfile" href="' + data.callBackData.fileUrl + '" target="_blank">' + data.callBackData.fileName +'</a>');
                    }

                }
            }
        },
        error: function(data, status, e) {
            alert(e);
        },
        complete: function(data) {
            $('#' + fileElementId).val('');
            $('.window-page-mask').css('display', 'none');
        }
    });
}

function fileUploading(fileElementId, imgControlId) {
    $('.window-page-mask').css('display', 'block');
    $.ajaxFileUpload({
        url: '/websiteService/fileUpload/' + fileElementId + '/image',
        secureuri: false,
        dataType: 'json',
        fileElementId: fileElementId,
        success: function(data, status) {
            if (data.status == "ok") {
                $('#'+imgControlId).attr('src', data.callBackData.fileUrl);
            }
        },
        error: function(data, status, e) {
            alert(e);
        },
        complete: function(data) {
            $('#' + fileElementId).val('');
            $('.window-page-mask').css('display', 'none');
        }
    });
}

function imgFormatter(value,row,index){
    var defaultImg = "this.src='../res/img/default_cp_bg.png'";
    return '<img id="avatarViewObj" src="'+row.img+'" onerror="'+defaultImg+'" style="width:48px;height:48px;">';
}

function bannerFormatter(value,row,index){
    var defaultImg = "this.src='../res/img/default_banner.jpg'";
    return '<img id="avatarViewObj" src="'+row.img+'?'+Math.random()+'" onerror="'+defaultImg+'" style="width:200px;height:40px;">';
}
//Management Operation