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
            "companyId" : data.callBackData.companyId,
            "companyName" : data.callBackData.companyName,
            "roleId": data.callBackData.roleId,
            "roleName": data.callBackData.roleName,
        }
        Cookies.set("user", user, { expires: 1 });
        window.location = '/mobileIndex.html';
    }else{
        $('#errorShow').text(data.prompt);
    }

}

function logout(){
    Cookies.remove("user");
}

function changeFootTabColor(child, parentId){
    $(parentId).removeClass('bottomTab');
    $(child).addClass('bottomTab');
}

function loadPageToMain(page){
    $('#mainContent').load(page);
}
function footTabChange(child, parentId, page){
    var mobileViewUrl = 'mobileView/';
    loadPageToMain(mobileViewUrl+page);
    changeFootTabColor(child, parentId);
}

//notification start
function getTopNotification(number){
    callAjax('/websiteService/loadNotificationList', '', 'getTopNotificationCallBack', '', '', 'title=&pageNumber=1&pageSize='+number, '');
}
function getTopNotificationCallBack(data) {
    $('#notificationView').html('');
    if (data.status == "ok" && data.callBackData.length > 0) {
        var notificationTemp = '<ul style="background:rgb(255, 255, 255);border-radius:0.2rem">';
        for (var i = 0; i < data.callBackData.length; i++) {
            var item = data.callBackData[i];
            var template = '<li style="border-bottom: 1px dashed #95B8E7;padding:0.1rem;width:100%">';
            template += '<div class="left" style="width:70%"><a href="mobileView/showDocument.html?page=notification&id=' + item.id + '" target="_blank"><p style="text-overflow:ellipsis;width:100%;overflow:hidden;white-space:nowrap;">' + item.title + '</p></a></div>';
            template += '<div class="right" style="width:30%;text-align:right;">' + item.date + '</div>';
            template += '<div class="clear"></div>';
            template += '</li>';

            notificationTemp += template;
        }

        notificationTemp += '</ul>';
        $('#notificationView').html(notificationTemp);
    }
}

function loadNotificationById(id){
    callAjax('/websiteService/loadNotificationById', '', 'loadNotificationByIdCallback', '', '', id, '');
}

function loadNotificationByIdCallback(data){
    if (data.status == "ok") {
        var item = data.callBackData;
        var style = '<style>.notificationStyle{background-color:white;border-radius:0.1rem;} .notificationStyle h1{text-align:center;font-size: 0.4rem;padding:0.1rem;} .notificationStyle p, .notificationStyle span, .notificationStyle div{font-size:0.24rem;padding:0.1rem;} </style>';
        var wrapperPrefix = '<div class="notificationStyle">';
        var wrapperSuffix = '</div>';
        var title = '<h1>'+item.title+'</h1>';
        var author = '<p style="text-align:center;font-size: 0.2rem;padding:0;">编辑: '+item.creator+'</p>';
        author += '<p style="text-align:center;font-size: 0.2rem;padding:0;">时间: '+item.date+'</p>';
        var content = item.content;
        $('#mainDiv').html(style+wrapperPrefix+title+author+content+wrapperSuffix);
    }
}
//notification end

//Wiki start
function changeWikiCategoryTabColor(item){
    $('#wikiCategorySudoku table div').css('background-color','grey');
    $(item).css('background-color','blue');
}

function getAllWikiByType(typeId){
    var parameter = "typeId="+typeId;
    callAjax('/websiteService/loadWikiList', '', 'loadWikiListCallback', '', '', parameter, '');
}
function loadWikiListCallback(data) {
    $('#wikiView').html('');
    if (data.status == "ok" && data.callBackData.length > 0) {
        var wikiTemp = '<ul style="background:rgb(255, 255, 255);border-radius:0.2rem">';
        for (var i = 0; i < data.callBackData.length; i++) {
            var item = data.callBackData[i];
            var template = '<li style="border-bottom: 1px dashed #95B8E7;padding:0.1rem;width:100%">';
            template += '<div class="left" style="width:70%"><a href="mobileView/showDocument.html?page=wiki&id=' + item.id + '" target="_blank"><p style="text-overflow:ellipsis;width:100%;overflow:hidden;white-space:nowrap;">' + item.title + '</p></a></div>';
            template += '<div class="right" style="width:30%;text-align:right;">' + item.date + '</div>';
            template += '<div class="clear"></div>';
            template += '</li>';

            wikiTemp += template;
        }

        wikiTemp += '</ul>';
        $('#wikiView').html(wikiTemp);
    }else{
        $('#wikiView').html('<p style="padding:0.1rem;color:red;">此分类暂无任何信息</p>');
    }
}

function loadWikiById(WikiId){
    callAjax('/websiteService/loadWikiById', '', 'loadWikiByIdCallback', '', '', WikiId, '');
}

function loadWikiByIdCallback(data){
    if (data.status == "ok") {
        var item = data.callBackData;
        var style = '<style>.wikiStyle{background-color:white;border-radius:0.1rem;} .wikiStyle h1{text-align:center;font-size: 0.4rem;padding:0.1rem;} .wikiStyle p, .wikiStyle span, .wikiStyle div{font-size:0.24rem;padding:0.1rem;} </style>';
        var wrapperPrefix = '<div class="wikiStyle">';
        var wrapperSuffix = '</div>';
        var title = '<h1>'+item.title+'</h1>';
        var author = '<p style="text-align:center;font-size: 0.2rem;padding:0;">编辑: '+item.creator+'</p>';
       author += '<p style="text-align:center;font-size: 0.2rem;padding:0;">时间: '+item.date+'</p>';
        var content = item.content;
        $('#mainDiv').html(style+wrapperPrefix+title+author+content+wrapperSuffix);
    }
}
//Wiki end

//tug start
function getTugTotalCount(){
    callAjax('/websiteService/loadShipTotalCount', '', 'getTugTotalCountCallback', '', '', "name=" + $('#tugNameTxt').val(), '');
}

function getTugTotalCountCallback(data){
    if (data.status == "ok") {
        $('#tug_pagination').pagination({
            totalNumber: data.callBackData,
            onSelectPage: getTugByName,
        });
    }
}

function getTugByName(pageNumber, pageSize){
    var param = "name=" + $('#tugNameTxt').val()+"&pageNumber="+pageNumber+"&pageSize="+pageSize;
    if(pageNumber===1){
        $('#tugView').html('');
    }
    callAjax('/websiteService/loadShipList', '', 'getShipBasesByNameCallback', '', '', param, '');
}
function getShipBasesByNameCallback(data){
    if (data.status == "ok" && data.callBackData.length > 0) {
        var template = '';
        for (var i = 0; i < data.callBackData.length; i++) {
            var compObj = data.callBackData[i];
            var imgPath = "'" + compObj.img + "'";
            var id = "'" + compObj.id + "'";
            template += '<div style="width:100%;height:auto;padding:0.1rem;border-bottom: 1px dashed #4682B4;">';
            template += '<div class="left" style="width:96px;height:96px;background:url(' + imgPath + ') no-repeat center; background-size: 96px 96px; border: 1px solid #4A708B" />';
            template += '<div class="left" style="margin-left:0.2rem;width:60%">';
            template += '<div style="text-overflow:ellipsis;overflow:hidden;white-space:nowrap;">船舶名称: ' + compObj.name + '</div>';
            template += '<div style="text-overflow:ellipsis;overflow:hidden;white-space:nowrap;">所属公司: ' + compObj.companyName + '</div>';
            template += '<div style="text-overflow:ellipsis;overflow:hidden;white-space:nowrap;">甲板型号: ' + compObj.jbxh + '</div>';

            template += '<div style="text-overflow:ellipsis;overflow:hidden;white-space:nowrap;">主机型号: ' + compObj.zjxh + '</div>';
            template += '<div style="text-overflow:ellipsis;overflow:hidden;white-space:nowrap;">船舶功率(KW): ' + compObj.zgl + '</div>';
            template += '</div>'
            template += '<div class="clear"></div>';
            template += '<div class="left" style="text-overflow:ellipsis;overflow:hidden;white-space:nowrap;width:50%">舵桨型号: ' + compObj.djxh + '</div>';
            template += '<div class="left" style="text-overflow:ellipsis;overflow:hidden;white-space:nowrap;width:50%">消防设备: ' + compObj.xfxh + '</div>';
            template += '<div class="clear"></div>';

            template += '<div class="left" style="text-overflow:ellipsis;overflow:hidden;white-space:nowrap;width:33%">船型: ' + compObj.categoryName + '</div>';
            template += '<div class="left" style="text-overflow:ellipsis;overflow:hidden;white-space:nowrap;width:33%">长度(米): ' + compObj.width + '</div>';
            template += '<div class="left" style="text-overflow:ellipsis;overflow:hidden;white-space:nowrap;width:33%">宽度(米): ' + compObj.height + '</div>';
            template += '<div class="clear"></div>';
            template += '</div><div class="clear"></div>';
        }
        $('#tugView').html($('#tugView').html()+template);
        if($('#tug_pagination').data('paginationObj')){
            $('#tug_pagination').data('paginationObj').nextPage();
        }


    }else {
        $('#tugView').html('<p style="padding:0.1rem;color:red;">此查询暂无任何结果</p>');
    }
}
//tug end

//biz ship start
function getBizShipTotalCount(){
    callAjax('/websiteService/loadBizShipTotalCount', '', 'getBizShipTotalCountCallback', '', '', "name=" + $('#bizShipNameTxt').val(), '');
}

function getBizShipTotalCountCallback(data){
    if (data.status == "ok") {
        $('#bizShip_pagination').pagination({
            totalNumber: data.callBackData,
            onSelectPage: getBizShipByName,
        });
    }
}

function getBizShipByName(pageNumber, pageSize){
    var param = "name=" + $('#bizShipNameTxt').val()+"&pageNumber="+pageNumber+"&pageSize="+pageSize;
    if(pageNumber===1){
        $('#bizShipView').html('');
    }
    callAjax('/websiteService/loadBizShipList', '', 'getBizShipByNameCallback', '', '', param, '');
}
function getBizShipByNameCallback(data){
    if (data.status == "ok" && data.callBackData.length > 0) {
        var template = '';
        for (var i = 0; i < data.callBackData.length; i++) {
            var compObj = data.callBackData[i];
            var imgPath = "'" + compObj.img + "'";
            var id = "'" + compObj.id + "'";
            template += '<div style="width:100%;height:auto;padding:0.1rem;border-bottom: 1px dashed #4682B4;">';
            template += '<div class="left" style="width:96px;height:96px;background:url(' + imgPath + ') no-repeat center; background-size: 96px 96px; border: 1px solid #4A708B" />';
            template += '<div class="left" style="margin-left:0.2rem;width:60%">';
            template += '<div style="text-overflow:ellipsis;overflow:hidden;white-space:nowrap;">大船名称: ' + compObj.name + '</div>';
            template += '<div style="text-overflow:ellipsis;overflow:hidden;white-space:nowrap;">大船船东: ' + compObj.shipOwner + '</div>';
            template += '<div style="text-overflow:ellipsis;overflow:hidden;white-space:nowrap;">大船国籍: ' + compObj.nationality + '</div>';

            template += '<div style="text-overflow:ellipsis;overflow:hidden;white-space:nowrap;">MMSI: ' + compObj.mmsi + '</div>';
            template += '<div style="text-overflow:ellipsis;overflow:hidden;white-space:nowrap;">IMO: ' + compObj.imo + '</div>';
            template += '</div>'
            template += '<div class="clear"></div>';
            template += '<div class="left" style="text-overflow:ellipsis;overflow:hidden;white-space:nowrap;width:50%">大船吃水(吨): ' + compObj.draught + '</div>';
            template += '<div class="left" style="text-overflow:ellipsis;overflow:hidden;white-space:nowrap;width:50%">大船吨位(吨): ' + compObj.tonnage + '</div>';
            template += '<div class="clear"></div>';

            template += '<div class="left" style="text-overflow:ellipsis;overflow:hidden;white-space:nowrap;width:33%">船型: ' + compObj.categoryName + '</div>';
            template += '<div class="left" style="text-overflow:ellipsis;overflow:hidden;white-space:nowrap;width:33%">长度(米): ' + compObj.width + '</div>';
            template += '<div class="left" style="text-overflow:ellipsis;overflow:hidden;white-space:nowrap;width:33%">宽度(米): ' + compObj.height + '</div>';
            template += '<div class="clear"></div>';
            template += '</div><div class="clear"></div>';
        }
        $('#bizShipView').html($('#bizShipView').html()+template);
        if($('#bizShip_pagination').data('paginationObj')){
            $('#bizShip_pagination').data('paginationObj').nextPage();
        }
    }else {
        $('#bizShipView').html('<p style="padding:0.1rem;color:red;">此查询暂无任何结果</p>');
    }
}
//biz ship end

//component start
function getComponentTotalCount(){
    callAjax('/websiteService/loadLoanComponentTotalCount', '', 'getComponentTotalCountCallback', '', '', "name=" + $('#componentNameTxt').val(), '');
}

function getComponentTotalCountCallback(data){
    if (data.status == "ok") {
        $('#component_pagination').pagination({
            totalNumber: data.callBackData,
            onSelectPage: getComponentByName,
        });
    }
}

function getComponentByName(pageNumber, pageSize){
    var param = "name=" + $('#componentNameTxt').val()+"&pageNumber="+pageNumber+"&pageSize="+pageSize;
    if(pageNumber===1){
        $('#componentView').html('');
    }
    callAjax('/websiteService/loadComponentList', '', 'getComponentByNameCallback', '', '', name, '');
}
function getComponentByNameCallback(data){
    $('#componentView').html('');
    if (data.status == "ok" && data.callBackData.length > 0) {
        var template = '';
        for (var i = 0; i < data.callBackData.length; i++) {
            var compObj = data.callBackData[i];
            var imgPath = "'" + compObj.img + "'";
            var id = "'" + compObj.id + "'";
            template += '<div style="width:100%;height:auto;padding:0.1rem;border-bottom: 1px dashed #4682B4;">';
            template += '<div class="left" style="width:96px;height:96px;background:url(' + imgPath + ') no-repeat center; background-size: 96px 96px; border: 1px solid #4A708B" />';
            template += '<div class="left" style="margin-left:0.2rem;width:60%">';
            template += '<div style="text-overflow:ellipsis;overflow:hidden;white-space:nowrap;">备件编号: ' + compObj.sid + '</div>';
            template += '<div style="text-overflow:ellipsis;overflow:hidden;white-space:nowrap;">备件名称: ' + compObj.name + '</div>';
            template += '<div style="text-overflow:ellipsis;overflow:hidden;white-space:nowrap;">所属公司: ' + compObj.companyName + '</div>';

            template += '<div style="text-overflow:ellipsis;overflow:hidden;white-space:nowrap;">备件规格: ' + compObj.specification + '</div>';
            template += '<div style="text-overflow:ellipsis;overflow:hidden;white-space:nowrap;">发布时间: ' + compObj.pubDate + '</div>';
            template += '</div>'
            template += '<div class="clear"></div>';
            template += '<div class="left" style="text-overflow:ellipsis;overflow:hidden;white-space:nowrap;width:50%">备件品牌: ' + compObj.brand + '</div>';
            template += '<div class="left" style="text-overflow:ellipsis;overflow:hidden;white-space:nowrap;width:50%">库存数量: ' + compObj.inventory + '</div>';
            template += '<div class="clear"></div>';
            template += '</div><div class="clear"></div>';
        }
        $('#componentView').html($('#componentView').html()+template);
        if($('#component_pagination').data('paginationObj')){
            $('#component_pagination').data('paginationObj').nextPage();
        }
    }else {
        $('#componentView').html('<p style="padding:0.1rem;color:red;">此查询暂无任何结果</p>');
    }
}
//component ent

//about start
function jumpToAboutPage(obj, param){
    $('#aboutSudoku table div').css('background-color','grey');
    $(obj).css('background-color','blue');
    $('#aboutView').html('');
    callAjax('/websiteService/getAboutByName', '', 'getAboutByNameToViewCallback', '', '', 'name='+param, '');
}

function getAboutByNameToViewCallback(data){
    if(data.status == "ok"){
        $('#aboutView').html(data.callBackData);
    }
}
//about end

//meeting start
function getAllRegisterMeetingsByCompanyId(companyId){
    callAjax('/websiteService/getAllRegisterMeetingsByCompanyId', '', 'getAllRegisterMeetingsByCompanyIdCallback', '', '', "companyId="+companyId, '');
}
function getAllRegisterMeetingsByCompanyIdCallback(data){
    $('#meetingView').html('');
    if (data.status == "ok" && data.callBackData.length > 0) {
        var meetingTemp = '<ul style="background:rgb(255, 255, 255);border-radius:0.1rem">';
        for (var i = 0; i < data.callBackData.length; i++) {
            var meeting = data.callBackData[i];
            var register = meeting.registers[0];
            var template = '<li style="border-bottom: 1px dashed #95B8E7;padding:0.1rem;width:100%">';
            template += '<div class="left" style="width:70%"><a href="mobileView/showDocument.html?page=meeting&registerId=' + register.id + '" target="_blank"><p style="text-overflow:ellipsis;width:100%;overflow:hidden;white-space:nowrap;">' + meeting.title + '</p></a></div>';
            template += '<div class="right" style="width:30%;text-align:right;">' + meeting.date + '</div>';
            template += '<div class="clear"></div>';
            template += '</li>';

            meetingTemp += template;
        }

        meetingTemp += '</ul>';
        $('#meetingView').html(meetingTemp);
    }else{
        $('#meetingView').html('<p style="padding:0.1rem;color:red;">此分类暂无任何信息</p>');
    }
}

function getMeetingRegisterFullInfoById(id){
    callAjax('/websiteService/getMeetingRegisterFullInfoById', '', 'getMeetingRegisterFullInfoByIdCallback', '', '', id, '');
}

function getMeetingRegisterFullInfoByIdCallback(data){
    $('#mainDiv').html('');
    if (data.status == "ok") {
        var register = data.callBackData;
        var meeting = register.meeting;
        var template = "";
        template += '<div style="width:100%;text-align:center;font-size: 0.4rem;padding:0.1rem;">'+meeting.title+'</div>';
        template += '<div>参会人员: '+(register.participants.length>0?'':'无')+'</div>';
        for(var i = 0 ; i < register.participants.length ; i++){
            template += '<div>';
            template += '<div class="left">'+register.participants[i].name+'</div>';
            template += '<div class="right">'+register.participants[i].identityId+'</div>';
            template += '<div class="clear"></div>';
            template += '</div>';
        }
        template += '<div class="splitLine"></div>';
        template += '<div>航班/车次信息: '+(register.traffics.length>0?'':'无')+'</div>';
        for(var i = 0 ; i < register.traffics.length ; i++){
            template += '<div>';
            template += '<div class="left">'+register.traffics[i].traffic+'</div>';
            template += '<div class="right" style="margin-left:0.2rem;">'+register.traffics[i].action+'</div>';
            template += '<div class="right">'+register.traffics[i].dateTime+'</div>';
            template += '<div class="clear"></div>';
            template += '</div>';
        }
        template += '<div class="splitLine"></div>';
        template += '<div>住宿信息: '+(register.hotels.length>0?'':'无')+'</div>';
        for(var i = 0 ; i < register.hotels.length ; i++){
            template += '<div>';
            template += '<div class="left">'+register.hotels[i].count+' '+register.hotels[i].type+'</div>';
            template += '<div class="right" style="margin-left:0.2rem;">'+register.hotels[i].endTime+'</div>';
            template += '<div class="right">'+register.hotels[i].startTime+'</div>';
            template += '<div class="clear"></div>';
            template += '</div>';
        }
        template += '<div class="splitLine"></div>';
        template += '<div>备注: </div>';
        template += '<div style="width:100%;height:auto;">'+register.comment+'</div>';
        template += '<div class="splitLine"></div>';
        template += '<div>会议正文: </div>';
        template += '<div style="width:100%;height:auto;">'+meeting.content+'</div>';

        $('#mainDiv').html(template);
    }
}
//meeting end

//report start
function changeReportCategoryTabColor(item){
    $('#reportCategorySudoku table div').css('background-color','grey');
    $(item).css('background-color','blue');
}

function getHistoryProdMonthRpt(){
    var user = jQuery.parseJSON(Cookies.get("user"));
    callAjax('/rptWebsiteService/getHistoryProdMonthRpt', '', 'getHistoryProdRptCallback', 'page=reportMonth&registerId=', '', 'companyId='+user.companyId, '');
}
function getHistoryProdYearRpt(){
    var user = jQuery.parseJSON(Cookies.get("user"));
    callAjax('/rptWebsiteService/getHistoryProdYearRpt', '', 'getHistoryProdRptCallback', 'page=reportYear&registerId=', '', 'companyId='+user.companyId, '');
}
function getHistoryProdRptCallback(param, data){
    $('#reportView').html('');
    if (data.status == "ok" && data.callBackData.length > 0) {
        var reportTemp = '<ul style="background:rgb(255, 255, 255);border-radius:0.1rem">';
        for (var i = 0; i < data.callBackData.length; i++) {
            var report = data.callBackData[i];
            var register = report.registers[0];
            var template = '<li style="border-bottom: 1px dashed #95B8E7;padding:0.1rem;width:100%">';
            template += '<div class="left" style="width:70%"><a href="mobileView/showDocument.html?' + param + register.id + '" target="_blank"><p style="text-overflow:ellipsis;width:100%;overflow:hidden;white-space:nowrap;">' + report.title + '</p></a></div>';
            template += '<div class="right" style="width:30%;text-align:right;">' + report.date + ' ' + report.type +'</div>';
            template += '<div class="clear"></div>';
            template += '</li>';
            reportTemp += template;
        }

        reportTemp += '</ul>';
        $('#reportView').html(reportTemp);
    }else{
        $('#reportView').html('<p style="padding:0.1rem;color:red;">此分类暂无任何信息</p>');
    }
}

function getProdMonthRptAvg(){
    var user = jQuery.parseJSON(Cookies.get("user"));
    callAjax('/rptWebsiteService/getProdMonthRptAvg', '', 'getHistoryProdRptAvgCallback', 'page=reportAvgMonth&avgRegisterId=', '', 'companyId='+user.companyId, '');
}
function getProdYearRptAvg(){
    var user = jQuery.parseJSON(Cookies.get("user"));
    callAjax('/rptWebsiteService/getProdYearRptAvg', '', 'getHistoryProdRptAvgCallback', 'page=reportAvgYear&avgRegisterId=', '', 'companyId='+user.companyId, '');
}
function getHistoryProdRptAvgCallback(param, data){
    $('#reportView').html('');
    if (data.status == "ok" && data.callBackData.length > 0) {
        var reportTemp = '<ul style="background:rgb(255, 255, 255);border-radius:0.1rem">';
        for (var i = 0; i < data.callBackData.length; i++) {
            var report = data.callBackData[i];
            var register = report.avg_registers[0];
            var template = '<li style="border-bottom: 1px dashed #95B8E7;padding:0.1rem;width:100%">';
            template += '<div class="left" style="width:65%"><a href="mobileView/showDocument.html?' + param + register.id + '" target="_blank"><p style="text-overflow:ellipsis;width:100%;overflow:hidden;white-space:nowrap;">' + report.title + '</p></a></div>';
            template += '<div class="right" style="width:35%;text-align:right;">' + report.date + ' ' + report.type +'</div>';
            template += '<div class="clear"></div>';
            template += '</li>';
            reportTemp += template;
        }

        reportTemp += '</ul>';
        $('#reportView').html(reportTemp);
    }else{
        $('#reportView').html('<p style="padding:0.1rem;color:red;">此分类暂无任何信息</p>');
    }
}


function getCurrentProdMonthRptRegisterById(param){
    callAjax('/rptWebsiteService/getCurrentProdMonthRptRegisterById', '', 'getCurrentProdMonthRptRegisterByIdCallback', '',  '', param, '');
}
function getCurrentProdMonthRptRegisterByIdCallback(data){
    $('#mainDiv').html('');
    if (data.status == "ok") {
        var register = data.callBackData;
        var report = register.reportItem;
        var template = '';
        template += '<div style="width:100%;text-align:center;font-size: 0.4rem;padding:0.1rem;">'+report.title+'</div>';
        template += generateMonthReportTable(register.rpt_Month_Data);
        $('#mainDiv').html(template);
    }
}

function getCurrentProdYearRptRegisterById(param){
    callAjax('/rptWebsiteService/getCurrentProdYearRptRegisterById', '', 'getCurrentProdYearRptRegisterByIdCallback', '',  '', param, '');
}
function getCurrentProdYearRptRegisterByIdCallback(data){
    $('#mainDiv').html('');
    if (data.status == "ok") {
        var register = data.callBackData;
        var report = register.reportItem;
        var template = '';
        template += '<div style="width:100%;text-align:center;font-size: 0.4rem;padding:0.1rem;">'+report.title+'</div>';
        template += generateYearReportTable(register.rpt_Year_Data);
        $('#mainDiv').html(template);
    }
}

function getProdMonthRptAvgByAvgRegisterId(param){
    callAjax('/rptWebsiteService/getProdMonthRptAvgByAvgRegisterId', '', 'getProdMonthRptAvgByAvgRegisterIdCallback', '',  '', param, '');
}
function getProdMonthRptAvgByAvgRegisterIdCallback(data){
    $('#mainDiv').html('');
    if (data.status == "ok") {
        var avg_data = data.callBackData;
        var report = avg_data.reportItem;
        var template = '';
        template += '<div style="width:100%;text-align:center;font-size: 0.4rem;padding:0.1rem;">'+report.title+'</div>';
        template += generateMonthReportTable(avg_data);
        $('#mainDiv').html(template);
    }
}

function getProdYearRptAvgByAvgRegisterId(param){
    callAjax('/rptWebsiteService/getProdYearRptAvgByAvgRegisterId', '', 'getProdYearRptAvgByAvgRegisterIdCallback', '',  '', param, '');
}
function getProdYearRptAvgByAvgRegisterIdCallback(data){
    $('#mainDiv').html('');
    if (data.status == "ok") {
        var avg_data = data.callBackData;
        var report = avg_data.reportItem;
        var template = '';
        template += '<div style="width:100%;text-align:center;font-size: 0.4rem;padding:0.1rem;">'+report.title+'</div>';
        template += generateYearReportTable(avg_data);
        $('#mainDiv').html(template);
    }
}

function generateMonthReportTable(data){
    var template = '';
    template += '<table style="border-collapse: collapse;">';
    template += '   <thead><tr style=";background-color:#2E68AA;"><td style="width:240px;color:white;">分项内容</td><td style="width:80px;color:white;">单位</td><td style="width:70px;color:white;">数据</td></tr></thead>';
    template += '   <tbody>';
    template += '       <tr style="border-bottom: 1px dashed #2E68AA;"><td style="padding: 0.1rem 0;">使用拖轮的大船艘次: 集滚客</td><td>艘次</td><td>' + data.sydcscjgk + '</td></tr>';
    template += '       <tr style="border-bottom: 1px dashed #2E68AA;"><td style="padding: 0.1rem 0;">使用拖轮的大船艘次: 油化液</td><td>艘次</td><td>' + data.sydcscyyh + '</td></tr>';
    template += '       <tr style="border-bottom: 1px dashed #2E68AA;"><td style="padding: 0.1rem 0;">使用拖轮的大船艘次: 散杂其它</td><td>艘次</td><td>' + data.sydcscszqt + '</td></tr>';
    template += '       <tr style="border-bottom: 1px dashed #2E68AA;"><td style="padding: 0.1rem 0;">拖轮港作作业艘次</td><td>艘次</td><td>' + data.tlzysc + '</td></tr>';
    template += '       <tr style="border-bottom: 1px dashed #2E68AA;"><td style="padding: 0.1rem 0;">拖轮伴监护航艘次</td><td>艘次</td><td>' + data.tlhhsc + '</td></tr>';
    template += '       <tr style="border-bottom: 1px dashed #2E68AA;"><td style="padding: 0.1rem 0;">拖轮港作作业平均艘时</td><td>小时</td><td>' + data.tlzypjsc + '</td></tr>';
    template += '       <tr style="border-bottom: 1px dashed #2E68AA;"><td style="padding: 0.1rem 0;">拖轮港作作业收入</td><td>万元</td><td>' + data.tlzysr + '</td></tr>';
    template += '       <tr style="border-bottom: 1px dashed #2E68AA;"><td style="padding: 0.1rem 0;">拖轮使用率</td><td>百分比</td><td>' + data.tlsyl + '</td></tr>';
    template += '       <tr style="border-bottom: 1px dashed #2E68AA;"><td style="padding: 0.1rem 0;">港作拖轮数量</td><td>艘</td><td>' + data.tlsl + '</td></tr>';
    template += '       <tr style="border-bottom: 1px dashed #2E68AA;"><td style="padding: 0.1rem 0;">港作拖轮总功率</td><td>千瓦</td><td>' + data.tlzgl + '</td></tr>';
    template += '       <tr style="border-bottom: 1px dashed #2E68AA;"><td style="padding: 0.1rem 0;">港作拖轮燃油消耗总量</td><td>吨</td><td>' + data.tlryxhzl + '</td></tr>';
    template += '       <tr style="border-bottom: 1px dashed #2E68AA;"><td style="padding: 0.1rem 0;">拖轮总功率小时单耗</td><td>克/千瓦·时</td><td>' + data.tlzglxsdh + '</td></tr>';
    template += '       <tr style="border-bottom: 1px dashed #2E68AA;"><td style="padding: 0.1rem 0;">拖轮平均月度完好时</td><td>小时</td><td>' + data.tlpjydwhs + '</td></tr>';
    template += '       <tr style="border-bottom: 1px dashed #2E68AA;"><td style="padding: 0.1rem 0;">拖轮平均修理时间</td><td>小时</td><td>' + data.tlpjxlsj + '</td></tr>';
    template += '       <tr style="border-bottom: 1px dashed #2E68AA;"><td style="padding: 0.1rem 0;">月度修费</td><td>万元</td><td>' + data.ydxf + '</td></tr>';
    template += '   </tbody>';
    template += '</table>';
    return template;
}
function generateYearReportTable(data){
    var template = '';
    template += '<table style="border-collapse: collapse;">';
    template += '   <thead><tr style="background-color:#2E68AA;"><td style="width:200px;color:white;">分项内容(薪资单位:元/人·年)</td><td style="width:100px;color:white;">税前平均薪资</td><td style="width:100px;color:white;">税后平均薪资</td></tr></thead>';
    template += '   <tbody>';
    template += '       <tr style="border-bottom: 1px dashed #2E68AA;"><td style="padding: 0.1rem 0;">职工人均薪资</td><td>' + data.zgrjxz_be + '</td><td>' + data.zgrjxz_af + '</td></tr>';
    template += '       <tr style="border-bottom: 1px dashed #2E68AA;"><td style="padding: 0.1rem 0;">船长平均薪资</td><td>' + data.czpjxz_be + '</td><td>' + data.czpjxz_af + '</td></tr>';
    template += '       <tr style="border-bottom: 1px dashed #2E68AA;"><td style="padding: 0.1rem 0;">轮机长平均薪资</td><td>' + data.ljzpjxz_be + '</td><td>' + data.ljzpjxz_af + '</td></tr>';
    template += '       <tr style="border-bottom: 1px dashed #2E68AA;"><td style="padding: 0.1rem 0;">驾驶员平均薪资</td><td>' + data.jsypjxz_be + '</td><td>' + data.jsypjxz_af + '</td></tr>';
    template += '       <tr style="border-bottom: 1px dashed #2E68AA;"><td style="padding: 0.1rem 0;">轮机员平均薪资</td><td>' + data.ljypjxz_be + '</td><td>' + data.ljypjxz_af + '</td></tr>';
    template += '       <tr style="border-bottom: 1px dashed #2E68AA;"><td style="padding: 0.1rem 0;">水手平均薪资</td><td>' + data.sspjxz_be + '</td><td>' + data.sspjxz_af + '</td></tr>';
    template += '       <tr style="border-bottom: 1px dashed #2E68AA;"><td style="padding: 0.1rem 0;">机工平均薪资</td><td>' + data.jgpjxz_be + '</td><td>' + data.jgpjxz_af + '</td></tr>';
    template += '   </tbody>';
    template += '</table>';
    return template;
}

//report end