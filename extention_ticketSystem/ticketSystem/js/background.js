console.log("background.js は読み込まれています");

var ticketList;
//contents.jsからの値を取得

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        //上記は受け取る側のおまじない
        ticketList = request;
        console.log(ticketList);
    }
);

/**「storage API」を使用してcontents.jsで保存した変数と受け取る処理 
chrome.storage.local.get(["ticketNumvalue"], function(result) {
    ticketNumvalue = result.ticketNumvalue;
    console.log("value currently is " + result.ticketNumvalue);
});*/
