;
(function(global) {
    var _common = {};
    _common.getCookie = function(name) {
        var _start, _end;
        if (document.cookie.length > 0) {
            _start = document.cookie.indexOf(name + "=");
            if (_start != -1) {
                _start = _start + name.length + 1;
                _end = document.cookie.indexOf(";", _start);
                if (_end == -1) {
                    _end = document.cookie.length;
                }
                return unescape(document.cookie.substring(_start, _end));
            }
        }
        return "";
    }
    _common.setCookie = function(name, value, daysToLive) {
        var _cookie = name + "=" + encodeURIComponent(value);
        var _nowDate = new Date();
        if (typeof daysToLive === "number") {
            _cookie += ";max-age=" + (daysToLive * 60 * 60 * 24);
        } else {
            _nowDate.setHours(23);
            _nowDate.setMinutes(59);
            _nowDate.setSeconds(59);
            _cookie += ";expires=" + _nowDate.toUTCString();
        }
        document.cookie = _cookie;
    }
    _common.formatLeftTimer = function(left) {
        var days = parseInt(left / 60 / 60 / 24, 10);
        var hours = parseInt(left / 60 / 60 % 24, 10);
        var minutes = parseInt(left / 60 % 60, 10);
        var seconds = parseInt(left % 60, 10);
        var res = '';
        res += (days > 0 ? days + "d" : '');
        res += (hours > 0 ? hours + "h" : '');
        res += (minutes > 0 ? minutes + "m" : '');
        res += seconds + "s";
        return res;
    }
    _common.getUrlParam = function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
    _common.replaceUrlParam = function(orgUrl, obj) {
        var reg;
        for (var paramName in obj) {
            var replaceWith = obj[paramName]
            reg = new RegExp('(' + paramName + '=)([^&]*)', 'gi'), has = orgUrl.indexOf(paramName);
            if (has <= 0) {
                var hasQuestion = orgUrl.indexOf("?");
                if (hasQuestion > 0) {
                    orgUrl = orgUrl + "&" + (paramName + '=' + replaceWith);
                } else {
                    orgUrl = orgUrl + "?" + (paramName + '=' + replaceWith);
                }
            } else {
                orgUrl = orgUrl.replace(reg, paramName + '=' + replaceWith);
            }
        }
        return orgUrl;
    }
    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = _common;
    } else if (typeof define === "function" && define.amd) {
        define(function() {
            return _common;
        });
    } else if (typeof define === "function" && define.cmd) {
        define(function() {
            return _common;
        });
    } else {
        global.Common = _common;
    }
})((typeof window !== "undefined" ? window : global));