function callAjax(url, iTarget, iCallBack, iCallBackParam, iPost, iParams, iLoading) {
    var aPost = iPost ? 'POST': 'GET';
    var aParams = iParams ? iParams: '';
    var aTarget = iTarget ? '#' + iTarget: iTarget;
    $(iLoading).css('display', 'block');
    $.ajax({
        type: aPost,
        url: url,
        data: aParams,
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
},
        complete: function(data) {
            $(iLoading).css('display', 'none');
        }
    });
}

(function (doc, win) {
        var docEl = doc.documentElement,
            resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
            recalc = function () {
                var clientWidth = docEl.clientWidth;
                if (!clientWidth) return;
                if(clientWidth>=640){
                    docEl.style.fontSize = '100px';
                }else{
                    docEl.style.fontSize = 100 * (clientWidth / 640) + 'px';
                }
            };

        if (!doc.addEventListener) return;
        win.addEventListener(resizeEvt, recalc, false);
        doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);