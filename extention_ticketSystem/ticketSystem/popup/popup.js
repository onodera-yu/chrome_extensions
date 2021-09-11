console.log("popup.jsデバック用");

var ticketLists = [];

/**「message passing API」でcontents.jsからbackground.jsに受け取っていたメッセージをpopup.jsで受け取る処理 */
ticketLists = chrome.extension.getBackgroundPage().ticketList;
/*for(var i = 0; i < ticketLists.ticketList.length; i++) {
    ticketLists = ticketLists.ticketList[i];
}*/

console.log(ticketLists.ticketList);

/**「storage API」を使用してcontents.jsで保存した変数と受け取る処理 
chrome.storage.local.get(["ticketNumvalue"], function(result) {
    ticketNumvalue = result.ticketNumvalue;
    console.log("value currently is " + result.ticketNumvalue);
});*/

/**取得したチケットリストをHTMLにボタンとして表示させるメソッド */
function inputTicketList() {
    //HTMLのボタンを追加する場所を取得
    var inputArea = document.getElementById("ticketNumCopy");
    //リスト分ボタンを作成し、要素を追加
    for(var i = 0; i < ticketLists.ticketList.length; i++) {
        var newBtn = document.createElement("button");
        newBtn.setAttribute("id", "btn" + i);
        newBtn.innerHTML = (ticketLists.ticketList[i]);
        inputArea.appendChild(newBtn);
    }
}

inputTicketList();