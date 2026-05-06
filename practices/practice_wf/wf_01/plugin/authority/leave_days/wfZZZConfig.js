var oResult = new Object();

function init(request) {

    Debug.console(request);

    var returnObject = {
        "extensionPointId": request.extensionPointId,
        "pluginId": request.pluginId,
        "parameter": request.pluginName,
        "pluginName": "ZZZ_Authority",
        "displayName": "ZZZ_Authority",
        "targetDate": request.targetDate,
        "targetType": "",
        "targetCode": ""
    };

    oResult.returnObject = ImJson.toJSONString([returnObject]);

    oResult.parentCallBackFunction = request.callBackFunction;
}
