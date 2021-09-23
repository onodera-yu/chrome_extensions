/**background.js
 * contents.jsからメッセージを受信
 * popup.jsへ整形したメッセージを送信する
 */

var sendTicketInfo = {};

//contents.jsからの値を受信
let receiveMassage = (function() {
    chrome.runtime.onMessage.addListener(
        function (request, sender, sendResponse) {
            for(let i = 0; i < request.name_ticketList.length; i++) {
                sendTicketInfo[request.name_ticketList[i]] = request.name_ticektListInfo[i];
            }
        }
    );
}());

receiveMassage;
console.log(sendTicketInfo);