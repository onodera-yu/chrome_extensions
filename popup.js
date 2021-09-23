/**popup.js
 * background.jsからメッセージを受信
 * popup.htmlへの表示
 * HTML画面で選択された値を取得し、対応する値を返す
 */

let ticketLists;

//受け取るときにエラー処理必要

/**「message passing API」でcontents.jsからbackground.jsに受け取っていたメッセージをpopup.jsで受け取る処理 */
ticketLists = chrome.extension.getBackgroundPage().sendTicketInfo;
console.log(ticketLists);

/**取得したチケットリストをHTMLにボタンとして表示させるメソッド */
let inputTicketList = (function() {
    //HTMLのボタンを追加する場所を取得
    let inputArea = document.getElementById("ticketNumCopy");
    //リスト分ボタンを作成し、要素を追加
    for(let i = 0; i < Object.keys(ticketLists).length; i++) {
        let newBtn = document.createElement("input");
        let attributes = ["type", "value", "id"];
        let attributesValue = ["button", Object.keys(ticketLists)[i], "btn"];
        for(let q = 0; q < attributes.length; q++) {
            newBtn.setAttribute(attributes[q], attributesValue[q]);
        }
        inputArea.appendChild(newBtn);
    }
}());

inputTicketList;

let btns = document.querySelectorAll("#btn");
for(let i = 0; i <btns.length; i++) {
    btns[i].addEventListener("click", function() {
        if(btns[i].value == Object.keys(ticketLists)[i]) {
            console.log(Object.values(ticketLists)[i]);
            copyTextToClipboard(Object.values(ticketLists)[i]);
        }
    }, false)
}

let copyTextToClipboard = function(textVal){
    // テキストエリアを用意する
    let copyFrom = document.createElement("textarea");
    // テキストエリアへ値をセット
    copyFrom.textContent = textVal;
   
    // bodyタグの要素を取得
    let bodyElm = document.getElementsByTagName("body")[0];
    // 子要素にテキストエリアを配置
    bodyElm.appendChild(copyFrom);
   
    // テキストエリアの値を選択
    copyFrom.select();
    // コピーコマンド発行
    let retVal = document.execCommand('copy');
    // 追加テキストエリアを削除
    bodyElm.removeChild(copyFrom);
    // 処理結果を返却
    return retVal;
}