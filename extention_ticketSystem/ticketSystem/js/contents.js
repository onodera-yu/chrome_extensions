console.log("contents.js は読み込まれています。");

var ticketNumValue = "";
var ticketList = [];

/**チケット番号と、チケット情報を配列で取得するメソッド　 */
function getInfo() {
    //チケット番号（li要素）を取得　複数ある場合はリストで取得される
    ticketNumValue = document.getElementById("ticketNumSample").getElementsByTagName("li");
    //デバッグ用
    console.log(ticketNumValue);

    for(var i = 0; i < ticketNumValue.length; i++) {
        ticketList.push(ticketNumValue[i].textContent);
        console.log("ticketNumValue" + i + "：" + ticketNumValue[i].textContent);
    }

    
    //上の処理でチケット情報を取得したので、この情報をbackground.jsへ渡せれば良い
    /*「message passing API」を使用して変数sendをメッセージで送る*/
    chrome.runtime.sendMessage({
        //送り先で使用する名前： 送るもの（オブジェクトなど）
        ticketList: ticketList
    });
}
getInfo();

console.log(ticketList);

/*「storage API」を使用して変数をセットする
chrome.storage.local.set({"ticketNumValue": ticketNumValue}, function() {
    console.log("value is set to " + ticketNumValue);
});*/
