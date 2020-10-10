$(function() {

    // ローカルストレージにデータを保存する関数。
    let saveStorage = function(key,val) {
        localStorage.setItem(key, JSON.stringify(val));
    };
    // ローカルストレージからデータを取得する関数。   
    let getStorage = function(key){
		let obj = localStorage.getItem(key);
		return JSON.parse(obj);
    };
    
    // cssNumberが2ならばパステルのデザインを適用。それ以外(1)ならばモノトーンのデザイン(初期設定はこっち)を適用。
    // デザインはsettingのページで変更可能。モノトーンを選んだら1、パステルを選んだら2をローカルストレージに保存(キーはCNkey)。      
    let cssNumber = getStorage('CNkey');
    if(cssNumber == 2){
        $('#css').attr('href','css/home2.css');
        $('#addCss').attr('href','css/add2.css');
        $('#homeShift').attr('src','images-color2/home.jpg');
        $('#calendarShift').attr('src','images-color2/calendar.jpg');
        $('#analysisShift').attr('src','images-color2/analysis.jpg');
        $('#settingShift').attr('src','images-color2/setting.jpg');
    }
     

    // 1. #homeList の表示・追加・削除
    // 現金、銀行口座などのアカウントのリストで、homeの最初に表示される。初期設定ではアカウントがなく、homeには追加ボタンだけが表示されている。
    // ユーザーがadd.htmlのフォーム(+ボタンからadd.htmlに飛ぶ)よりアカウントを登録し、ページ読み込み時に登録したアカウントのhtmlがhome.htmlの#homeListに追加される。
    // 各アカウントのデータ(タイプ、名前、初期残高)はadd.htmlのフォーム(#addForm)より取得し、HLArr(homeList Arrayの略)という配列に入れられ、ローカルストレージに保存される。
    // HLArrにデータを追加・削除することでアカウントが追加・削除される。

    // 1-1. HLArrを作成
    let HLArr = [];
    let HLkey = 'HLkey';

    // 1-2. #homeListを表示

    // #homeListを表示させるための最初の関数。home.htmlを開くと実行される。
    // ローカルストレージからHLArrを取得し、そこからHLData(homeList Dataの略)を取得。HLDataを引数にしてaddHLを実行。
    let readHL = function() {
        let HLA = getStorage(HLkey);
        if(HLA == null) {return;}
        for(let i = 0; i < HLA.length; i++) {
            let HLData = HLA[i];
            let type = HLData.type;
            let newname = HLData.newname;
            let firstmoney = HLData.firstmoney;
            let firstmoney2 = HLData.firstmoney2;
            HLData = {
                type : type,
                newname : newname,
                firstmoney : firstmoney,
                firstmoney2 : firstmoney2
            };
            HLArr.push(HLData);
            addHL(type,newname,firstmoney,firstmoney2,i);
        }
    };
    // #homeListにhtmlを追加する関数。追加するhtmlのフォーマット(acount)があり、そこにHLDataを代入して#homeListに追加。
    // その後、addTChoiceを実行する。
    let addHL = function(type,newname,firstmoney,firstmoney2,i) {
        let acount ='<ul class="acount" id="HL%" style="list-style: none;">' +
                    '<li class="acountPlate"><input type="image" src="A" alt="ボタン" class="changeOpenEit1" value=% >' +
                    '<button class="openeit" id="openeit1%" value=%>C円(D円)</button>' +
                    '<button class="openeit" id="openeit2%" style="display: none;" value=%>B</button>' +
                    '<button class="active" value=%>V</button><button class="remove" value=%>-</button></li>' +

                    '<li><ul class="input" id="input%" style="display: none;">' +
                    '<li class="expexp"><button class="exp" value=%>支出</button><ul id="explist%" style="display: none;">' +
                    '<select id="expenditure-type%" size=2><option value="食費">食費</option>' + 
                    '<option value="交通費">交通費</option><option value="日用品">日用品</option>' +
                    '<option value="水道・光熱費">水道・光熱費</option><option value="通信費">通信費</option>' +
                    '<option value="家賃">家賃</option><option value="自動車">自動車</option>' +
                    '<option value="衣類">衣類</option><option value="医療費">医療費</option>' +
                    '<option value="美容費・理髪">美容費・理髪</option>' +
                    '<option value="教育費">教育費</option><option value="書籍">書籍</option>' +
                    '<option value="旅行">旅行</option>' +
                    '<option value="遊び">遊び</option><option value="謎の損失">謎の損失</option>' +
                    '<option value="その他">その他</option></select>' +
                    '<input type="date" id="expenditure-date%">' +
                    '<label><input type="number" id="expenditure-amount%" placeholder="金額">円</label>' +
                    '<input type="text" class="expmemo" id="expenditure-memo%" maxlength="25" placeholder="メモ 25文字まで">' +
                    '<button class="E-button" value=%>保存</button></ul></li>' +

                    '<li class="incinc"><button class="inc" value=%>収入</button>' +
                    '<ul id="inclist%" style="display: none;"><select id="income-type%" size=2><option value="給与">給与</option>' + 
                    '<option value="仕送り">仕送り</option><option value="謎の収入">謎の収入</option>' +
                    '<option value="その他">その他</option></select>' +
                    '<input type="date" id="income-date%">' +
                    '<label><input type="number" id="income-amount%" placeholder="金額">円</label>' +
                    '<input type="text" class="incmemo" id="income-memo%" maxlength="25" placeholder="メモ 25文字まで">' +
                    '<button class="I-button" value=%>保存</button></ul></li>' +

                    '<li class="trstrs"><button class="trs" value=%>振替</button>' +
                    '<ul id="trslist%" style="display: none;"><select id="transfer-to%" size=2> </select>' +
                    '<input type="date" id="transfer-date%">' +
                    '<label><input type="number" id="transfer-amount%" placeholder="金額">円</label>' +
                    '<label><input type="number" class="trsfee" id="transfer-fee%" placeholder="手数料">円</label>' +
                    '<input type="text" class="trsmemo" id="transfer-memo%" maxlength="25" placeholder="メモ 25文字まで">' +
                    '<button class="T-button" value=%>保存</button></ul></li>' +

                    '<li class="lndlnd"><button class="lnd" value=%>貸した</button>' +
                    '<ul id="lndlist%" style="display: none;"><input type="date" id="lend-date%">' +
                    '<label><input type="number" id="lend-amount%" placeholder="金額">円</label>' +
                    '<input type="text" class="lndmemo" id="lend-memo%" maxlength="15" placeholder="メモ 15文字まで">' +
                    '<button class="L-button" value=%>保存</button></ul></li>' +

                    '<li class="brwbrw"><button class="brw" value=%>借りた</button>' +
                    '<ul id="brwlist%" style="display: none;"><input type="date" id="borrow-date%">' +
                    '<label><input type="number" id="borrow-amount%" placeholder="金額">円</label>' +
                    '<input type="text" class="brwmemo" id="borrow-memo%" maxlength="15" placeholder="メモ 15文字まで">' +
                    '<button class="B-button" value=%>保存</button></ul></li>' +
                    '</ul></li></ul>';
        acount = acount.replace('B',newname).replace('C',firstmoney).replace('D',firstmoney2);

        // フォーマット内の％全てをiに変える。
        let reAcount = acount.replace('%',i);
        while(acount !== reAcount) {
            acount = acount.replace('%',i);
            reAcount = reAcount.replace('%',i);
        }

        // デザインがモノトーンならimage-color1ファイル内の画像を使用し、パステルならimage-color2ファイル内の画像を使用する。
        if(cssNumber == 2) {
            if(type === '現金') {
                acount = acount.replace('A', 'images-color2/cash.jpg');
            } else if(type === '銀行') {
                acount = acount.replace('A', 'images-color2/bank.jpg');
            } else if(type === 'クレジット') {
                acount = acount.replace('A', 'images-color2/credit.jpg');
            } else if(type === '電子マネー') {
                acount = acount.replace('A', 'images-color2/emoney.jpg');
            } else if(type === 'その他') {
                acount = acount.replace('A', 'images-color2/others.jpg');
            }
    
        }else {
            if(type === '現金') {
                acount = acount.replace('A', 'images-color1/cash.jpg');
            } else if(type === '銀行') {
                acount = acount.replace('A', 'images-color1/bank.jpg');
            } else if(type === 'クレジット') {
                acount = acount.replace('A', 'images-color1/credit.jpg');
            } else if(type === '電子マネー') {
                acount = acount.replace('A', 'images-color1/emoney.jpg');
            } else if(type === 'その他') {
                acount = acount.replace('A', 'images-color1/others.jpg');
            }
    
        }        
        $('#homeList').append(acount);
        addTChoice(i);
       };   
    // アカウントの振替フォームの振替先選択欄に振り替え先の選択肢を追加する関数。
    let addTChoice = function(i) {
        let HLA = getStorage(HLkey);
        if (HLA == null) {return;}
        let tfchoicese;
        for(let j = 0; j < HLA.length; j++) {
            if(j === i) continue;
            let HLData = HLA[j];
            let acountname = HLData.newname;
            let tfchoice = '<option value="D">E</option>';
            tfchoice = tfchoice.replace('D', j).replace('E', acountname);
            tfchoicese = tfchoicese + tfchoice;
        }
        $('#transfer-to' + i).append(tfchoicese);
    };
    readHL();

    // 1-3.#homeListにアカウントを追加

    // 引数の3つをHLDataにいれ、それをHLArrに入れる関数。
    let saveHLData = function(type,newname,firstmoney) {
        let firstmoney2 = firstmoney;
        let HLData = {
            type : type,
            newname : newname,
            firstmoney : firstmoney,
            firstmoney2 : firstmoney2
        };
        HLArr.push(HLData);
        saveStorage(HLkey,HLArr);
        location.href = 'home.html';
    };
    // add.htmlのフォームの保存ボタン(#keepAcount)をclickするとき実行される関数。
    // フォームに入力されたデータ(タイプ、名前、初期残高)を取得し、それを引数にしてsaveHLDataを実行する。
    // このとき、フォームの名前の欄が空欄だったり、初期残高の欄に半角数字以外を入力するとsaveHLDataは実行されず、正しく入力されていないフォーム欄が赤く囲われる。
    $('#keepAcount').click(function() {
        let type = $('#type').val();
        let newname = $('#newname').val();
        let firstmoney = $('#firstmoney').val();
        if(newname == "") {
            let x = document.getElementById('newname');
            x.style.borderColor = "red";
        }else if(firstmoney == ""){
            let y = document.getElementById('firstmoney');
            y.style.borderColor = "red";
        }else{
            saveHLData(type,newname,firstmoney);
        }
    })

    // 1-4.#homeListのアカウントを削除

    // HLArrから、i番目のデータを削除する関数。
    let removeHLData = function(i) {
        HLArr.splice(i,1);
        saveStorage(HLkey,HLArr);
        eitArr.splice(i,1);
        saveStorage(eitkey,eitArr);
        lbArr.splice(i,1);
        saveStorage(lbkey,lbArr);
        $('#homeList').empty();
    };
    // アカウントの削除ボタン( - ボタン,remove)をclickしたときに実行される関数。
    // 削除ボタンを押したアカウントの番号(i)を取得し、それを引数にremoveHLDataを実行する。
    $('.remove').click(function() {
        let result = window.confirm('このアカウントに関する全ての収支データも削除されます。\n本当に削除しますか？');
        if(result) {
            let i = $(this).val();
            removeHLData(i);
            location.reload();
        }
    })
    
   
    // 2.#eitList(expenditure,income,transfer,Listの略)の追加・削除・表示
    // 各アカウントに入力した支出、収入、振替データ(eitData)をリストにして表示する。home.htmlの#eitListにeitDataのhtmlが追加される。
    // 通常#eitListは非表示の状態だが、表示ボタン(残金/講座の名前が表示してあるボタン、.openeit)をclickすると表示され、代わりにその他のhtmlが非表示になる(一見、ページが遷移したように見える)。
    // eitDataはhomeListの各アカウントのhtmlにあるフォームから取得し、eitArrに入れられ、ローカルストレージに保存される。

    // 2-1.eitArr(expenditure,income,transfer,Array)を作成

    // eitArrを定義
    let eitArr = [];
    let eitkey = 'eitkey';
    // makeEitArrは、HLArrの数(アカウントの数)だけeitArr内に子配列を作成する関数。eitArrは配列内に各アカウントに応じた子配列を保持し、各子配列にそのアカウントについてのeitDataが入れられる。
    // イメージ) eitArr = [ [アカウント1用の子配列],[アカウント2用の子配列],[アカウント3用の子配列],...]
    //                            ^                    ^                    ^
    //                     eitData1,eitData2,..  eitData1,eitData2,..  eitData1,eitData2,..
    // rememberEitArrは、これまで保存されてきたeitDataを含むeitArrをローカルストレージから取得し、makeEitArrで作ったeitArrの各子配列と置き換える。
    let makeEitArr = function() {
        let HLA = getStorage(HLkey);
        for(let i = 0; i < HLA.length; i++) {
            let eit = new Array();
            eitArr.push(eit);   
        }
        rememberEitArr();
        saveStorage(eitkey,eitArr);
    };
    let rememberEitArr = function() {
        let rEitArr = getStorage(eitkey);
        if(rEitArr == undefined) {return;}
        for(let i = 0; i < rEitArr.length; i++) {
            let rEit = rEitArr[i];
            eitArr.splice(i,1,rEit);
        }
    };
　　makeEitArr();

    // 2-2.#eitListを表示

    // 引数よりi番目のアカウントのeitDataをeitArrより全て取り出し、各eitDataを引数にaddEitListを実行する関数。
    let readEitList = function(i) {
        let eitx = eitArr[i];
        if(eitx == null) {return;}
        for(let j = 0; j < eitx.length; j++) {
            let eitData = eitx[j];
            let type1  = eitData.type1;
            let type2  = eitData.type2;
            let date   = eitData.date;
            let amount = eitData.amount;
            let fee    = eitData.fee;
            let memo   = eitData.memo;
            addEitList(type1,type2,date,amount,fee,memo,i,j);
        } 
        $('#eitList').append('<p class="space"></p>');
    };
    // 引数のeitDataを代入したeitTagのhtmlをhome.htmlの#eitListに追加する関数。
    let addEitList = function(type1,type2,date,amount,fee,memo,i,j) {
        let eitTag = '<li class="eit" id="eitL" value=J><p class="eitdate" >D</p><p class="eittype1">E:</p><p class="eittype2">F</p>' +
                      '<p class="eitamount">G円H</p><p class="eitmemo">メモ:I</p><button class="eitrem" value=K></button></li>';
        eitTag = eitTag.replace('D',date).replace('E',type1).replace('F',type2).replace('G',amount).replace('H',fee).replace('I',memo).replace('J',i).replace('K',j).replace('L',j);
        $('#eitList').append(eitTag);
    };
    // 残金/講座の名前が表示してあるボタン(.openeit)をclickした時、#homeList/#addAcount/#lbListを非表示にする。
    // その後clickしたボタンから何番目のアカウントであるかをiで取得し、それを引数にしてreadEitListを実行。
     $('.openeit').on('click',function() {
        document.getElementById('homeList').style.display = 'none';
        document.getElementById('addAcount').style.display = 'none';
        document.getElementById('lbList').style.display = 'none';
        let i = $(this).val();
        readEitList(i);       
    })

    // 2-3.eitDataを追加
   
    // 支出(expenditure)入力フォームから支出データを取得し、それらを引数にしてsaveEitDataを実行する関数。saveEitDataを実行するとともに、アカウントの残高から入力された金額分を引く。
    // もし、支出入力フォームに適切に入力が行われていなければ(タイプ未選択、日付未選択、金額未入力/半角数字でない)saveEitDataは実行されず、正しく入力されていない欄が赤枠で囲われる。
    let getEData = function(i) {
        let k = '';
        let fe = '';
        let type1  = '支出';
        let type2  = $('#expenditure-type' + i).val();
        let date   = $('#expenditure-date' + i).val();
        let realdate = new Date(date);
        let month = realdate.getMonth();
        let amount = $('#expenditure-amount' + i).val();
        let fee    = '';
        let memo   = $('#expenditure-memo' + i).val();
        let search = '';
        if(type2 == null) {
            let x = document.getElementById('expenditure-type'+ i);
            x.style.borderColor = 'red';
        }else if(date == "") {
            let x = document.getElementById('expenditure-type'+ i);
            x.style.borderColor = '#FFFFFF';
            let y = document.getElementById('expenditure-date'+ i);
            y.style.borderColor = 'red';
        }else if(amount == "") {
            let x = document.getElementById('expenditure-type'+ i);
            x.style.borderColor = '#FFFFFF';
            let y = document.getElementById('expenditure-date'+ i);
            y.style.borderColor = '#FFFFFF';
            let z = document.getElementById('expenditure-amount'+ i);
            z.style.borderColor = 'red';
        }else{
        saveEitData(fe,type1,type2,date,month,amount,fee,memo,i,k,search);
        // 引き算
        let HLA = getStorage(HLkey);
        let HLData = HLA[i];
        HLData.firstmoney = HLData.firstmoney - amount;
        HLData.firstmoney2 = HLData.firstmoney2 - amount;
        saveStorage(HLkey,HLA);

        alert('保存しました');
        location.reload();
        }     
    };
    // 収入(income)入力フォームから収入データを取得し、それらを引数にしてsaveEitDataを実行する関数。saveEitDataを実行するとともに、アカウントの残高に入力された金額分を足す。
    // もし、収入入力フォームに適切に入力が行われていなければ(タイプ未選択、日付未選択、金額未入力/半角数字でない)saveEitDataは実行されず、正しく入力されていない欄が赤枠で囲われる。
    let getIData = function(i) {
        let k = '';
        let fe ='';
        let type1  = '収入';
        let type2  = $('#income-type' + i).val();
        let date   = $('#income-date' + i).val();
        let realdate = new Date(date);
        let month = realdate.getMonth();
        let amount = $('#income-amount' + i).val();
        let fee    = '';
        let memo   = $('#income-memo' + i).val();
        let search = '';
        if(type2 == null) {
            let x = document.getElementById('income-type'+ i);
            x.style.borderColor = 'red';
        }else if(date == "") {
            let x = document.getElementById('income-type'+ i);
            x.style.borderColor = '#FFFFFF';
            let y = document.getElementById('income-date'+ i);
            y.style.borderColor = 'red';
        }else if(amount == "") {
            let x = document.getElementById('income-type'+ i);
            x.style.borderColor = '#FFFFFF';
            let y = document.getElementById('income-date'+ i);
            y.style.borderColor = '#FFFFFF';
            let z = document.getElementById('income-amount'+ i);
            z.style.borderColor = 'red';
        }else{
            saveEitData(fe,type1,type2,date,month,amount,fee,memo,i,k,search);
        // 足し算
        let HLA = getStorage(HLkey);
        let HLData = HLA[i];
        HLData.firstmoney = Number(HLData.firstmoney) + Number(amount);
        HLData.firstmoney2 = Number(HLData.firstmoney2) + Number(amount);
        saveStorage(HLkey,HLA);
        alert('保存しました');
        location.reload();
        }
    };
    // 振替(transfer)入力フォームから振替データを取得し、それらを引数にしてsaveEitDataを実行する関数。saveEitDataを実行するとともに、アカウントの残高から入力された金額分を引く。
    // さらに、振替先のアカウントにも振替データを追加し、振替先のアカウントの残高に入力された金額分を足す。
    // もし、振替入力フォームに適切に入力が行われていなければ(タイプ未選択、日付未選択、金額未入力/半角数字でない、手数料未入力/半角数字でない)saveEitDataは実行されず、正しく入力されていない欄が赤枠で囲われる。
    let getTData = function(i) {
        let fe = $('#transfer-fee' + i).val();
        let type1  = '振替ました';
        let selected = $('#transfer-to' + i).children('option:selected');
        let type2 = selected.text();
        let k = selected.val();
        let date   = $('#transfer-date' + i).val();
        let realdate = new Date(date);
        let month = realdate.getMonth();
        let amount = $('#transfer-amount' + i).val();
        let fee    = '(手数料:' + fe + '円）';
        let memo   = $('#transfer-memo' + i).val();
        let random = Math.random();
        let search = random + date;
        if(type2 == null) {
            let x = document.getElementById('transfer-to'+ i);
            x.style.borderColor = 'red';
        }else if(date == "") {
            let x = document.getElementById('transfer-to'+ i);
            x.style.borderColor = '#FFFFFF';
            let y = document.getElementById('transfer-date'+ i);
            y.style.borderColor = 'red';
        }else if(amount == "") {
            let x = document.getElementById('transfer-to'+ i);
            x.style.borderColor = '#FFFFFF';
            let y = document.getElementById('transfer-date'+ i);
            y.style.borderColor = '#FFFFFF';
            let z = document.getElementById('transfer-amount'+ i);
            z.style.borderColor = 'red';
        }else if(fe == "") {
            let x = document.getElementById('transfer-to'+ i);
            x.style.borderColor = '#FFFFFF';
            let y = document.getElementById('transfer-date'+ i);
            y.style.borderColor = '#FFFFFF';
            let z = document.getElementById('transfer-amount'+ i);
            z.style.borderColor = '#FFFFFF';
            let v = document.getElementById('transfer-fee'+ i);
            v.style.borderColor = 'red';
        }else{
        saveEitData(fe,type1,type2,date,month,amount,fee,memo,i,k,search);
        // 振替先のアカウントにもデータを追加
        let HLA = getStorage(HLkey);
        let HLData1 = HLA[i];
        let type3 = HLData1.newname + 'から';
        let type4 = '振替を受けました';
        let eitData = {
            k : i,
            fe : fe,
            type1 : type4,
            type2 : type3,
            date : date,
            amount : amount,
            fee : '',
            memo : memo,
            search : search
        };
        let eitx = eitArr[k];  
        eitx.push(eitData);
        eitx.sort(function(a,b) {
            return new Date(b.date) - new Date(a.date);
        });
        saveStorage(eitkey,eitArr);
        // 引き算
        let tamount = Number(amount) + Number(fe);
        HLData1.firstmoney = HLData1.firstmoney - tamount;
        HLData1.firstmoney2 = HLData1.firstmoney2 - tamount;
        // 足し算
        let HLData2 = HLA[k];
        HLData2.firstmoney = Number(HLData2.firstmoney) + Number(amount);
        HLData2.firstmoney2 = Number(HLData2.firstmoney2) + Number(amount);
        saveStorage(HLkey,HLA);
        alert('保存しました');
        location.reload(); 
        }
    };
    // 引数であるフォームに入力されたデータ達をeitDataに入れ、それをeitArr内の対応するアカウントの子配列に入れてローカルストレージに保存する関数。
    // このとき、eitArrの子配列に入れられたeitData達を日付順に並び替えている。
    let saveEitData = function(fe,type1,type2,date,month,amount,fee,memo,i,k,search) {
        let eitData = {
            k : k,
            fe : fe,
            type1 : type1,
            type2 : type2,
            date : date,
            month : month,
            amount : amount,
            fee : fee,
            memo : memo,
            search : search
        };
        let eitx = eitArr[i];
        eitx.push(eitData);
        // eit配列を日付順に並び替え
        eitx.sort(function(a,b) {
            return new Date(b.date) - new Date(a.date);
        });

        saveStorage(eitkey,eitArr);
    };
    // アカウントの支出入力欄の保存ボタン(.Ebutton)をclickした時、何番目のアカウントであるかをiで取得し、iを引数にgetEDataを実行。
    // 収入入力欄、振替入力欄についても同様。
    // これらの入力欄は通常、非表示になっているが展開ボタン(v ボタン,.active)をクリックすると表示される。＊そのコードはhome2.jsに書いてある
    $('.E-button').on('click',function() {
    let i = $(this).val();
    getEData(i);
})
    $('.I-button').on('click',function() {
    let i = $(this).val();
    getIData(i);
})
    $('.T-button').on('click',function() {
    let i = $(this).val();
    getTData(i); 
})

    // 2-4.eitDataを削除

    // eitTagにある削除ボタン(付箋の端みたいになっている所)をclickした時、それが何番目の子配列の(i)、何番目のeitDataか(j)を取得し、そのeitDataを削除する。
    // 振替えの場合、振替え先/振替え元も特定し、削除する。削除したのが支出データならそのアカウントの残高に削除した金額分を足し算、収入データなら引き算、振替えデータなら振替え元は足し算/振替え先は引き算をする。
    $(document).on('click','.eitrem',function() {
        let result = window.confirm('本当に削除しますか？');
        if(result) {
            let j = $(this).val();
            let i = $(this).parent().val();
            let eitx = eitArr[i];
            let eitData = eitx[j];
            let type1 = eitData.type1
            let HLA = getStorage(HLkey);
            let HLData = HLA[i];
            $('#eit' + j).remove();
            if(type1 === '支出') {
                HLData.firstmoney = Number(HLData.firstmoney) + Number(eitData.amount);
                HLData.firstmoney2 = Number(HLData.firstmoney2) + Number(eitData.amount);
                saveStorage(HLkey,HLA);
            } else if (type1 === '収入') {
                HLData.firstmoney = HLData.firstmoney - eitData.amount;
                HLData.firstmoney2 = HLData.firstmoney2 - eitData.amount;
                saveStorage(HLkey,HLA);
            // 振替先から削除
            } else if (type1 === '振替を受けました') {
                HLData.firstmoney = HLData.firstmoney - eitData.amount;
                HLData.firstmoney2 = HLData.firstmoney2 - eitData.amount;
                // eitDataのiは振替元の番号
                let k = eitData.k;
                let HLData2 = HLA[k];
                HLData2.firstmoney = Number(HLData2.firstmoney) + Number(eitData.amount) + Number(eitData.fe);
                HLData2.firstmoney2 = Number(HLData2.firstmoney2) + Number(eitData.amount) + Number(eitData.fe);
                saveStorage(HLkey,HLA);
                let eity = eitArr[k];
                let l = eity.findIndex(({search}) => search === eitData.search);
                eity.splice(l,1);
            // 振替元から削除
            } else if (type1 === '振替ました') {
                let tamount = Number(eitData.amount) + Number(eitData.fe);
                HLData.firstmoney = HLData.firstmoney + tamount;
                HLData.firstmoney2 = HLData.firstmoney2 + tamount;
                // eitDataのkは振替先の番号
                let k = eitData.k;
                console.log(k);
                let HLData2 = HLA[k];
                HLData2.firstmoney = HLData2.firstmoney - eitData.amount;
                HLData2.firstmoney2 = HLData2.firstmoney2 - eitData.amount;
                saveStorage(HLkey,HLA);
                let eity = eitArr[k];
                let l = eity.findIndex(({search}) => search === eitData.search);
                eity.splice(l,1);
            }
            eitx.splice(j,1);
            saveStorage(eitkey,eitArr);
            alert('削除しました');
        }
    })


    // 3.#lbList(lend,borrow,Listの略)の追加・削除・表示
    // #eitListのコードと殆ど変わらないが、#lbListはボタンをクリックしなくてもホームに表示されている、アカウントごとではなく全てのlbTagが表示される、などの違いがある。
    
    // 3-1.lbArr(lend,borrow,Array)の作成

    let lbArr = [];
    let lbkey = 'lbkey';
    let makeLbArr = function() {
        let HLA = getStorage(HLkey);
        for(let i = 0; i < HLA.length; i++) {
            let lb = new Array();
            lbArr.push(lb);   
        }
        rememberLbArr();
        saveStorage(lbkey,lbArr);
    };
    let rememberLbArr = function() {
        let rLbArr = getStorage(lbkey);
        if(rLbArr == undefined) {return;}
        for(let i = 0; i < rLbArr.length; i++) {
            let rLb = rLbArr[i];
            lbArr.splice(i,1,rLb);
        }
    };
　　makeLbArr();
  
    // 3-2.#lbListを表示

    let readLbList = function() {
        for(let i = 0; i < lbArr.length; i++) {
            let lb = lbArr[i];
            for(let j = 0; j < lb.length; j++) {
                let lbData = lb[j];
                let type = lbData.type;
                let date = lbData.date;
                let amount = lbData.amount;
                let memo = lbData.memo;
                addLbList(i,j,type,date,amount,memo);
            }
        }
    }
    let addLbList = function(i,j,type,date,amount,memo) {
        let lbTag = '<li class="lb" id="lbArr" value="B"><p class="lbdate">E</p><p class="lbamount">F円D</p>' +
                     '<p class="lbmemo">G</p><button class="lbrem" value="C"></button></li>';
        lbTag = lbTag.replace('A',j).replace('B',i).replace('C',j).replace('D',type).replace('E',date).replace('F',amount).replace('G',memo);
        $('#lbList').append(lbTag);
    }
    readLbList();
 
    // 3-3.lbDataを追加

    let getLData = function(i) {
        let type = "貸した";
        let date = $('#lend-date' + i).val();
        let amount = $('#lend-amount' + i).val();
        let memo = $('#lend-memo' + i).val();
        if(date == "") {
            let x = document.getElementById('lend-date'+ i);
            x.style.borderColor = 'red';
        }else if(amount == "") {
            let x = document.getElementById('lend-date'+ i);
            x.style.borderColor = '#FFFFFF';
            let y = document.getElementById('lend-amount'+ i);
            y.style.borderColor = 'red';
        }else{
        saveLbData(i,type,date,amount,memo);
        let HLA = getStorage(HLkey);
        let HLData = HLA[i];
        HLData.firstmoney2 = HLData.firstmoney2 - amount;
        console.log(HLData.firstmoney2);
        saveStorage(HLkey,HLA);
        alert('保存しました');
        location.reload();
        }
    }
    let getBData = function(i) {
        let type = "借りた";
        let date = $('#borrow-date' + i).val();
        let amount = $('#borrow-amount' + i).val();
        let memo = $('#borrow-memo' + i).val();
        if(date == "") {
            let x = document.getElementById('borrow-date'+ i);
            x.style.borderColor = 'red';
        }else if(amount == "") {
            let x = document.getElementById('borrow-date'+ i);
            x.style.borderColor = '#FFFFFF';
            let y = document.getElementById('borrow-amount'+ i);
            y.style.borderColor = 'red';
        }else{
        saveLbData(i,type,date,amount,memo);
        let HLA = getStorage(HLkey);
        let HLData = HLA[i];
        HLData.firstmoney2 = Number(HLData.firstmoney2) + Number(amount);
        saveStorage(HLkey,HLA);
        alert('保存しました');
        location.reload();  
        }
    }
    let saveLbData = function(i,type,date,amount,memo) {
        let lbData = {
            type :type,
            date : date,
            amount : amount,
            memo : memo,
        };
        let lb = lbArr[i];
        lb.push(lbData);
        lb.sort(function(a,b) {
            return new Date(b.date) - new Date(a.date);
        });
        saveStorage(lbkey,lbArr);
    }
    $('.L-button').on('click',function() {
        let i = $(this).val();
        getLData(i);  
    })
    $('.B-button').on('click',function() {
        let i = $(this).val();
        getBData(i);
    })
    
    // 3-4.lbDataを削除

    $(document).on('click','.lbrem',function() {
        let result = window.confirm('完了しますか？');
        if(result) {
            let j = $(this).val();
            let i = $(this).parent().val();
            let lb = lbArr[i];
            let lbData = lb[j];
            let type = lbData.type;
            let amount = lbData.amount;
            let HLA = getStorage(HLkey);
            let HLData = HLA[i];
           
            if(type === '貸した') {
                HLData.firstmoney2 = Number(HLData.firstmoney2) + Number(amount);
            }else{
                HLData.firstmoney2 = HLData.firstmoney2 - amount;
            }
            saveStorage(HLkey,HLA);
    
            lb.splice(j,1);
            saveStorage(lbkey,lbArr);
    
            if(type === '貸した') {
                alert('返ってきました');
            }else{
                alert('返しました');
            }
    
            location.reload();
        }
    })

})
