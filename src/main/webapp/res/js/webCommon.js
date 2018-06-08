function callAjax(url, iTarget, iCallBack, iCallBackParam, iPost, iParams, iLoading) {
    callAjax(url, iTarget, iCallBack, iCallBackParam, iPost, iParams, iLoading, true);
}

function callAjax(url, iTarget, iCallBack, iCallBackParam, iPost, iParams, iLoading, async) {
    var aPost = iPost ? 'POST' : 'GET';
    var usid = user ? user.sid : '';
    if(aPost == 'GET')
        if(iParams)
            iParams = iParams+'&usid='+usid;
        else
            iParams = 'usid='+usid;
    else{
        if(!iParams)
            iParams = {};
        iParams.usid = usid;
    }
    var aTarget = iTarget ? '#' + iTarget: iTarget;
    $(iLoading).css('display', 'block');
    $.ajax({
        async: async,
        type: aPost,
        url: url,
        data: iParams,
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        success: function(data, textStatus, jqXHR) {
            if (aTarget) {
                $(aTarget).html(data);
            }
            if (iCallBack) {
                if (iCallBackParam) {
                    eval(iCallBack)(iCallBackParam, data);
                } else {
                    eval(iCallBack)(data);
                }
            }
        },
        error: function(xhr, textStatus) {
            alert(xhr.responseText);
        },
        complete: function(data) {
            $(iLoading).css('display', 'none');
        }
    });
}

function showToday() {
    var enabled = 0;
    today = new Date();
    var day;
    var date;
    if (today.getDay() == 0) day = " 星期日";
    if (today.getDay() == 1) day = " 星期一";
    if (today.getDay() == 2) day = " 星期二";
    if (today.getDay() == 3) day = " 星期三";
    if (today.getDay() == 4) day = " 星期四";
    if (today.getDay() == 5) day = " 星期五";
    if (today.getDay() == 6) day = " 星期六";

    date = (today.getFullYear()) + "年" + (today.getMonth() + 1) + "月" + today.getDate() + "日" + day + "";

    return date;
}

