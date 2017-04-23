function Ajax() {
    this.xhr = function (onSuccessCallback, onErrorCallback) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState < 4) {
                // 請求尚未完成，不做任何動作
                return;
            }
            if (xhr.status !== 200) {
                onErrorCallback(xhr.statusText); // the HTTP status code is not OK
                return;
            }
            try {
                onSuccessCallback(JSON.parse(xhr.responseText));
            } catch (err) {
                onErrorCallback(err);
            }
        };
        return xhr;
    };
    
    
    
    this.encodeQueryData = function (data) {
        var ret = [];
        for (var d in data)
            ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
        return ret.join('&');
    };
    
    
    
    this.xhrGet = function (url, data, onSuccessCallback, onErrorCallback) {
        var xhr = this.xhr(onSuccessCallback, onErrorCallback);
        xhr.open('GET', url + '?' + this.encodeQueryData(data), true);
        xhr.send();
    };
    
    
    
    this.xhrPost = function (url, data, onSuccessCallback, onErrorCallback) {
        var xhr = this.xhr(onSuccessCallback, onErrorCallback);
        xhr.open('POST', url, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(this.encodeQueryData(data));
    };
    
    
    
}
var ajax = new Ajax();
