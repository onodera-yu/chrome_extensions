/**contents.js
 * 開いているページから要素を取得
 * background.jsへのメッセージを送信する
 */

/**contens.jsのクラス
 * コンストラクタ、ゲッター、セッターを用意
 */
class contents {
    constructor(ticektNum, ticketInfo) {
        this.ticketNum = ticektNum;
        this.ticketInfo = ticketInfo;
    }
    getTicketNum() {
        return this.ticketNum;
    }
    getTicketInfo() {
        return this.ticketInfo;
    }
    setTicketNum(value) {
        this.ticektNum = value;
    }
    setTicketInfo(value) {
        this.ticketInfo = value;
    }
}

/**チケット番号を取得するメソッド
 * 引数：なし
 * 戻り値：チケット番号一覧のリスト
 */
let getNumbers = (function() {
    let ticketList = [];
    //親チケット番号の取得
    ticketList.push(document.querySelector(".parentNumber").innerText);
    //子チケット番号の取得
    for(let i = 0; i < document.querySelector('.childNumber').getElementsByTagName("li").length; i++) {
        ticketList.push(document.querySelector('.childNumber').getElementsByTagName("li")[i].textContent);
    }
    return ticketList;
}());

/**チケット情報の取得メソッド 
 * 引数：チケット番号リスト
 * 戻り値：チケット情報のリスト
 */
let getInfo = function(ticketNums) {
    let infoList = [];
    let startPosition = 0;
    let endPosition = 0;
    let str = document.querySelector('.ticket_info').textContent;   //取得範囲の設定
    startPosition = str.indexOf("＜チケット情報＞", str);
    endPosition = str.indexOf("}}", startPosition);
    for(let i = 0; i < ticketNums.length; i++) { //チケットの配列分繰り返し
        infoList.push(str.substring(startPosition, endPosition));
        startPosition = str.indexOf("＜チケット情報＞", endPosition);
        endPosition = str.indexOf("}}", startPosition);
    }
    return infoList;
};

/**background.jsへのメッセージ送信メソッド
 * 引数：チケット番号のリスト、チケット情報のリスト
 * 戻り値：なし
 */
let sendBackground = function(ticketList, ticketList_info) {
    chrome.runtime.sendMessage({
        name_ticketList: ticketList,
        name_ticketListInfo: ticketList_info
    });
    console.log(ticketList);
    console.log(ticketList_info);
};

/**controllerメソッド
 * contents.jsでの操作はこのメソッドで一括して行う
 */
(function controller() {
    let cs = new contents(getNumbers);
    cs.setTicketInfo(getInfo(cs.getTicketNum()));
    //background.js へ送信
    sendBackground(cs.getTicketNum(), cs.getTicketInfo());
}());