var SIGN_REGEXP = /([yMdhsm])(\1*)/g;
var DEFAULT_PATTERN = 'yyyy-MM-dd';
var MOBILE_PATTERN = /^1(3|4|5|7|8)\d{9}$/;
var INTEGER_PATTERN = /^[0-9]+$/;
var VALIDINPUT = /(?:[\0-\x08\x0E-\x1F!-\/:-@\[-`\{-\x9F\xA1-\u167F\u1681-\u1FFF\u200B-\u2027\u202A-\u202E\u2030-\u205E\u2060-\u2FFF\u3001-\u33FF\u4DB6-\u4DFF\u9FF0-\uD7FF\uE000-\uFA0D\uFA10\uFA12\uFA15-\uFA1E\uFA20\uFA22\uFA25\uFA26\uFA2A-\uFEFE\uFF00-\uFFFF]|[\uD800-\uD83F\uD87B-\uDBFF][\uDC00-\uDFFF]|\uD869[\uDED7-\uDEFF]|\uD86D[\uDF35-\uDF3F]|\uD86E[\uDC1E\uDC1F]|\uD873[\uDEA2-\uDEAF]|\uD87A[\uDFE1-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/;

function padding(s, len) {
    var len = len - (s + '').length;
    for (var i = 0; i < len; i++) { s = '0' + s; }
    return s;
};

function getParam(param, key, encode) {
    if (param == null) return '';
    var paramStr = '';
    var t = typeof (param);
    if (t == 'string' || t == 'number' || t == 'boolean') {
        paramStr += '&' + key + '=' + ((encode == null || encode) ? encodeURIComponent(param) : param);
    } else {
        for (var i in param) {
            var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
            paramStr += getParam(param[i], k, encode);
        }
    }
    return paramStr;
}

function colorRGBA(sColor,value,aValue) {
    //十六进制颜色值的正则表达式
    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    // 如果是16进制颜色
    if (sColor && reg.test(sColor)) {
        if (sColor.length === 4) {
            var sColorNew = "#";
            for (var i = 1; i < 4; i += 1) {
                sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
            }
            sColor = sColorNew;
        }
        //处理六位的颜色值
        var sColorChange = [];
        for (var i = 1; i < 7; i += 2) {
            sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
        }
        if(aValue){
            return "RGBA(" + sColorChange[0]+","+sColorChange[1]+","+ (sColorChange[2]-value) + "," + aValue + ")";
        }else{
            return "RGB(" + sColorChange[0]+","+sColorChange[1]+","+ (sColorChange[2]-value)+ ")";
        }
    }
    return sColor;
}

let urlParamsFormart= function(param, key, encode) {
    if (param == null) return '';
    let paramStr = '';
    let t = typeof (param);
    if (t == 'string' || t == 'number' || t == 'boolean') {
        paramStr += '&' + key + '=' + ((encode == null || encode) ? encodeURIComponent(param) : param);
    } else {
        for (var i in param) {
            var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
            paramStr += this.urlParamsFormart(param[i], k, encode);
        }
    }
    return paramStr;
}


export default {
    isProd(){
        return process.env.NODE_ENV != 'development';
    },
    formartParams:function(passDate){
        let selectDate = []
        if(passDate.selectDate && passDate.selectDate.length > 0 ){
            passDate.selectDate.forEach(date=>{
                let dateStr = this.formatDate.format(new Date(date),'yyyy-MM-dd');
                selectDate.push(dateStr)
            })
        }
        Object.assign(passDate,{selectDate:selectDate});
        return this.urlParamsFormart(passDate);
    },
    formartGetParams:function(Object){
        let selectDate = []
        if(!Object.selectDate){
            let vo= {type:Object.type}
            return this.urlParamsFormart(vo);
        }
        Object.selectDate.forEach(date=>{
            let dateStr = this.formatDate.format(date,'yyyy-MM-dd');
            selectDate.push(dateStr)
        })
        let vo= {type:Object.type,selectDate:selectDate}
        return this.urlParamsFormart(vo);

    },
    getFloat:function (num) { //数字保留两位小数
        var result = parseFloat(num);
        if (isNaN(result)) {
            return false;
        }
        result = Math.round(num * 100) / 100;
        var s_x = result.toString();
        var pos_decimal = s_x.indexOf('.');
        if (pos_decimal < 0) {
            pos_decimal = s_x.length;
            s_x += '.';
        }
        while (s_x.length <= pos_decimal + 2) {
            s_x += '0';
        }
        return s_x;
    },
    getCurrentDate : function () {
        return new Date();
    },
    getCurrentWeek:function () { // 获取本周起止时间
        var startStop = new Array();
        var currentDate = new Date();
        var week = currentDate.getDay();
        var month = currentDate.getDate();
        var millisecond = 1000 * 60 * 60 * 24;

        var minusDay = week != 0 ? week - 1 : 6;
        var monday = new Date(currentDate.getTime() - (minusDay * millisecond));
        var sunday = new Date(monday.getTime() + (6 * millisecond));
        startStop.push(monday);
        startStop.push(sunday);
        return startStop;
    },
    getCurrentMonth:function(){  //获取本月起止时间
        var startStop = new Array();
        var currentDate = new Date();
        var currentMonth = currentDate.getMonth();
        var currentYear = currentDate.getFullYear();
        var firstDay = new Date(currentYear, currentMonth, 1);
        if (currentMonth == 11) {
            currentYear++;
            currentMonth = 0;
        } else {
            currentMonth++;
        }
        var millisecond = 1000 * 60 * 60 * 24;
        var nextMonthDayOne = new Date(currentYear, currentMonth, 1);
        var lastDay = new Date(nextMonthDayOne.getTime() - millisecond);
        startStop.push(firstDay);
        startStop.push(lastDay);
        return startStop;
    },
    getQuarterSeasonStartMonth : function (month) {
        var quarterMonthStart = 0;
        var spring = 0; //春
        var summer = 3; //夏
        var fall = 6;   //秋
        var winter = 9; //冬
        //月份从0-11
        if (month < 3) {
            return spring;
        }

        if (month < 6) {
            return summer;
        }

        if (month < 9) {
            return fall;
        }

        return winter;
    },
    getLastDay:function (day) { //获取前多少天截止时间
        var startStop = new Array();
        var endDate = new Date();
        var dateTime = new Date(endDate.getFullYear(),endDate.getMonth(),endDate.getDate()).getTime();
        var last90DateTime = dateTime - (24*60*60*1000*day);
        var startDate = new Date(last90DateTime)
        startStop.push(startDate);
        startStop.push(endDate);
        return startStop;
    },
    getCurrentSeason:function () { //获得本季度的起止日期
        //起止日期数组
        var startStop = new Array();
        //获取当前时间
        var currentDate = this.getCurrentDate();
        //获得当前月份0-11
        var currentMonth = currentDate.getMonth();
        //获得当前年份4位年
        var currentYear = currentDate.getFullYear();
        //获得本季度开始月份
        var quarterSeasonStartMonth = this.getQuarterSeasonStartMonth(currentMonth);
        //获得本季度结束月份
        var quarterSeasonEndMonth = quarterSeasonStartMonth + 2;

        //获得本季度开始的日期
        var quarterSeasonStartDate = new Date(currentYear, quarterSeasonStartMonth, 1);
        //获得本季度结束的日期
        var quarterSeasonEndDate = new Date(currentYear, quarterSeasonEndMonth, this.getMonthDays(currentYear, quarterSeasonEndMonth));
        //加入数组返回
        startStop.push(quarterSeasonStartDate);
        startStop.push(quarterSeasonEndDate);
        //返回
        return startStop;
    },
    getCurrentYear:function(){ //获取本年起止时间
        var startStop = new Array();
        var currentDate = new Date();
        var currentYear = currentDate.getFullYear();
        var currentYearFirstDate = new Date(currentYear, 0, 1);
        var currentYearLastDate = new Date(currentYear, 11, 31);
        startStop.push(currentYearFirstDate);
        startStop.push(currentYearLastDate);
        return startStop;
    },
    getMonthDays:function (year, month) {
        var relativeDate = new Date(year, month, 1);
        var relativeMonth = relativeDate.getMonth();
        var relativeYear = relativeDate.getFullYear();
        if (relativeMonth == 11) {
            relativeYear++;
            relativeMonth = 0;
        } else {
            relativeMonth++;
        }
        var millisecond = 1000 * 60 * 60 * 24;
        var nextMonthDayOne = new Date(relativeYear, relativeMonth, 1);
        return new Date(nextMonthDayOne.getTime() - millisecond).getDate();
    },
    getPriorMonthFirstDay:function (year, month) {
        if (month == 0) {
            month = 11;
            year--;
            return new Date(year, month, 1);
        }
        month--;
        return new Date(year, month, 1); ;
    },
    getMonthBetween:function(start,end){
        var result = [];
        var s = start.split("-");
        var e = end.split("-");
        var min = new Date();
        var max = new Date();
        min.setFullYear(s[0],s[1]);
        max.setFullYear(e[0],e[1]);
        console.log(e[0]+"---- "+e[1]);
        var curr = min;
        while(curr <= max){
            var month = curr.getMonth();
            //month=month==0?12:month;
            console.log(month);
            var str=curr.getFullYear()+"-"+(month);
            var s=curr.getFullYear()+"-0";
            if(str==s){
                console.log('str='+str+'s='+s);
                str=(curr.getFullYear())-1+"-12";
            }
            var dateYear = str.split("-")[0];
            var dateMonth = str.split("-")[1];
            if(dateMonth < 10){
                str = dateYear + "-0" + dateMonth;
            }else{
                str = dateYear + "-" + dateMonth;
            }
            result.push(str);
            curr.setMonth(month+1);
        }
        return result;
    },
    getPreviousMonth:function () { //获得上一月的起止日期
        var startStop = new Array();
        var currentDate = new Date();
        var currentMonth = currentDate.getMonth();
        var currentYear = currentDate.getFullYear();
        var priorMonthFirstDay = this.getPriorMonthFirstDay(currentYear, currentMonth);
        var priorMonthLastDay = new Date(priorMonthFirstDay.getFullYear(), priorMonthFirstDay.getMonth(), this.getMonthDays(priorMonthFirstDay.getFullYear(), priorMonthFirstDay.getMonth()));
        startStop.push(priorMonthFirstDay);
        startStop.push(priorMonthLastDay);
        return startStop;
    },
    paddNum:function(num,length){
        if(num != null && num.length > 0){
            num += "";
            var finalstring =[];
            for(var i = num.length - 1;i >= 0 ;i--){
                finalstring.push(num[i]);
            }

            for(var i = 0;i<length - num.length ;i++){
                finalstring.push('0');
            }
            finalstring.reverse();
            return finalstring.join('');
        }
        return "";
    },
    showMessage(result,obj){ //result 验证对象  obj  vue对象
        let i = 0;
        for(let key in result){
            if(i == 0){
                obj.$message.warning(result[key][0].message)
            }
            i++;
        }
    },
    fileTypeFromExtension:function(filename){
        var regexp = /\.(\w+)$/;
        var picext = "jpg,jpeg,gif,png";
        var fileext = "txt,rar,zip,doc,docx,xls,xlsx,swf,wmv,avi,wma,mp3,mid,vsd,pdf,ppt,pptx,msg,log";
        var ext = regexp.exec(filename)[1];
        if(fileext.indexOf(ext) >= 0){
            return 'file';
        }else{
            return 'pic';
        }
    },
    getQueryStringByName: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        var context = "";
        if (r != null)
            context = r[2];
        reg = null;
        r = null;
        return context == null || context == "" || context == "undefined" ? "" : context;
    },
    vad: {
        containsinValidInputCharacter:function(str){
            return VALIDINPUT.test(str);
        },
        isBlank: function(str) {
            if(null != str && '' != str) {
                return false;
            }
            return true;
        },
        isValidNum: function(str){
            if(str == null || str == ''){
                return true;
            }
            return /^\d+(\.\d{1,2})?$/.test(str);
        },
        isValidMobile:function(str){
            if(str == null || str == ''){
                return true;
            }
            return MOBILE_PATTERN.test(str);
        },
        isValidInteger:function(str){
            if(str == null || str == ''){
                return true;
            }
            return INTEGER_PATTERN.test(str);
        },
        isDemicalLengthValid:function(str,len){
            var temp = str + '';
            if(temp.indexOf(".") < 0){
                if(temp.length > len){
                    return "integer"
                }
                return "ok";
            }else{
                var str = temp.split(".");
                if(str[0].length > len){
                    return "integer"
                }else if(str[1].length > 2){
                    return "double"
                }else{
                    return "ok"
                }
            }
        },
        islengthValid:function(str,len){
            //把数字转换成字符串
            var temp = str + '';
            if(temp.length > len){
                return false;
            }else{
                return true;
            }
        },
        isAllSpace:function(str){
            return /^\s+$/.test(str);
        },
        isAllNum:function(str){
            return /^\d+$/.test(str);
        }
    },
    commafyback:function (num) {
        var x = num.split(',');
        return parseFloat(x.join(""));
    },
    formatDateValue:function (value,format) { //日期格式化
        if(value == null || value == '' || value == undefined){
            return "";
        }
        if(value=='~'){
            return "~"
        }
        var date = new Date(value)
        var paddNum = function(num){
            num += "";
            return num.replace(/^(\d)$/,"0$1");
        }
        //指定格式字符
        var cfg = {
            yyyy : date.getFullYear() //年 : 4位
            ,yy : date.getFullYear().toString().substring(2)//年 : 2位
            ,M  : date.getMonth() + 1  //月 : 如果1位的时候不补0
            ,MM : paddNum(date.getMonth() + 1) //月 : 如果1位的时候补0
            ,d  : date.getDate()   //日 : 如果1位的时候不补0
            ,dd : paddNum(date.getDate())//日 : 如果1位的时候补0
            ,hh : date.getHours()  //时
            ,mm : paddNum(date.getMinutes()) //分
            ,ss : date.getSeconds() //秒
        }
        format || (format = "yyyy-MM-dd hh:mm:ss");
        return format.replace(/([a-z])(\1)*/ig,function(m){return cfg[m];});
    },
    currencyDisplay:function(val,unit){//增加千分位
        if(unit == undefined){
            unit = "";
        }
        if(val == undefined){
            return "";
        }
        if(parseFloat(val) == 0){
            return "0.00"+unit;
        }
        if(val != undefined && val != null){
            val = (val+"").replace(/,/g,"");
            if(!parseFloat(val)){
                return '';
            }
            val = parseFloat(val).toFixed(2);
            val = val.replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
            var lastIndex = val.substring(val.indexOf(".")+1);
            if(val.indexOf(".")==-1 && val != '' && val != null){
                val +=".00";
            }else if(lastIndex.length == 1){
                val += "0";
            }else{
                val = val.substring(0,val.indexOf(".")+3);
            }
            if(val == ".00" || val ==".0"){
                return '';
            }
            return val+unit;;
        }
        return val+unit;;
    },
    formatDate: {
        format: function (date, pattern) {
            pattern = pattern || DEFAULT_PATTERN;
            return pattern.replace(SIGN_REGEXP, function ($0) {
                switch ($0.charAt(0)) {
                    case 'y': return padding(date.getFullYear(), $0.length);
                    case 'M': return padding(date.getMonth() + 1, $0.length);
                    case 'd': return padding(date.getDate(), $0.length);
                    case 'w': return date.getDay() + 1;
                    case 'h': return padding(date.getHours(), $0.length);
                    case 'm': return padding(date.getMinutes(), $0.length);
                    case 's': return padding(date.getSeconds(), $0.length);
                }
            });
        },
        parse: function (dateString, pattern) {
            var matchs1 = pattern.match(SIGN_REGEXP);
            var matchs2 = dateString.match(/(\d)+/g);
            if (matchs1.length == matchs2.length) {
                var _date = new Date(1970, 0, 1);
                for (var i = 0; i < matchs1.length; i++) {
                    var _int = parseInt(matchs2[i]);
                    var sign = matchs1[i];
                    switch (sign.charAt(0)) {
                        case 'y': _date.setFullYear(_int); break;
                        case 'M': _date.setMonth(_int - 1); break;
                        case 'd': _date.setDate(_int); break;
                        case 'h': _date.setHours(_int); break;
                        case 'm': _date.setMinutes(_int); break;
                        case 's': _date.setSeconds(_int); break;
                    }
                }
                return _date;
            }
            return null;
        },
    },
    camelCase(string){//驼峰字段转下划线
        return string.replace( /([A-Z])/g, function( all, letter ) {
            return "_"+letter.toLowerCase();
        });
    },
    replaseEnding(string){//去掉表格排序值 ending
        return string.replace('ending', "");
    },
    datedifference(sDate1, sDate2) {    //sDate1和sDate2是2006-12-18格式 计算两个日期相差天数
        var dateSpan,
            tempDate,
            iDays;
        if(!sDate1){
            throw Error("第一个参数不能空")
        }
        if(!sDate2){
            throw Error("第二个参数不能空")
        }
        sDate1 = Date.parse(sDate1);
        sDate2 = Date.parse(sDate2);
        dateSpan = sDate2 - sDate1;
        dateSpan = Math.abs(dateSpan);
        iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
        return iDays
    },
    datediffNow(sDate2) {    //sDate1和sDate2是2006-12-18格式 传入日期与当前日期相差天数,大于当前天数显示正数  小于当前天数为负数
        var dateSpan,
            tempDate,
            iDays;
        let sDate1 = new Date();
        if(sDate2){
            sDate2 = Date.parse(sDate2);
        }else{
            sDate2 = new Date();
        }
        dateSpan = sDate2 - sDate1;
        dateSpan = dateSpan;
        iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
        return iDays
    },
    getParam:getParam,
    colorRGBA:colorRGBA,
    urlParamsFormart:urlParamsFormart,

}
