$(function() {

    // ローカルストレージからデータを取得する関数。
    let getStorage = function(key){
		let obj = localStorage.getItem(key);
		return JSON.parse(obj);
    };

    // cssNumberが2ならばパステルのデザインを適用。それ以外(1)ならばモノトーンのデザイン(初期設定はこっち)を適用。
    // デザインはsettingのページで変更可能。モノトーンを選んだら1、パステルを選んだら2をローカルストレージに保存(キーはCNkey)。
    let cssNumber = getStorage('CNkey');
    if(cssNumber == 2){
        $('#css').attr('href','css/calendar2.css');
        $('#homeShift').attr('src','images-color2/home.jpg');
        $('#calendarShift').attr('src','images-color2/calendar.jpg');
        $('#analysisShift').attr('src','images-color2/analysis.jpg');
        $('#settingShift').attr('src','images-color2/setting.jpg');
    }


    // 1.カレンダー作成

    // 1-1.カレンダー作成に必要なデータの取得(今日の日付を取得し、日付より年、月、曜日を取得)、必要なデータを定義。
    let myDate = new Date();
    let myWeekTbl = new Array("日","月","火","水","木","金","土");
    let myMonthTbl = new Array(31,28,31,30,31,30,31,31,30,31,30,31);
    let myYear = myDate.getFullYear();
    if(((myYear%4)==0 &&(myYear%100)!=0) || (myYear%400)==0){myMonthTbl[1] = 29;} // うるう年かどうか判定。うるう年なら2月を29日までにする。
    let myMonth = myDate.getMonth(); 
    myDate.setDate(1);
    let myWeek = myDate.getDay(); 
    // カレンダーの行数を計算。
    let myTblLine = Math.ceil((myWeek+myMonthTbl[myMonth])/7);
    // カレンダーの行数×７の配列を作成。
    let myTable = new Array(7*myTblLine);
    // 配列の各データの中身を空にする。  
    for(let i=0; i<7*myTblLine; i++){myTable[i] = " ";}
    // 配列の各データに日付を入れていく。
    for(let i=0; i<myMonthTbl[myMonth]; i++){myTable[i+myWeek]=i+1;}

    // 1-2.これまでのデータを用いてカレンダーを作成する。
    // カレンダーを作成する関数。
    let makeCalender = function() {
        // カレンダータイトルを作る。
        let Cname = "<tr><th colspan='7'>" + myYear + "年" + (myMonth+1) + "月</th></tr>";
        $("#calendar > table").append(Cname);
        // カレンダーのはじめの行(first row)日、月、火、水、木、金、土と表記される部分を作る。
        let FRow = "<tr>";
        for(let i=0; i<7; i++){
            let FRCell = "<td align='center' class='MtoS'><button>" + myWeekTbl[i] + "</button></td>";
            if(i == 0){FRCell = FRCell.replace("MtoS","Sun");}
            FRow = FRow + FRCell;
        }
        FRow = FRow + "</tr>";
        $("#calendar > table").append(FRow);
        // カレンダーに各日付を入れていく。日付はボタンになっていて、clickすることでその日付に一致するeitDataを表示できるようになっている。＊詳しくは３
        for(let i=0; i<myTblLine; i++){
            let Row = "<tr>";
            for(let j=0; j<7; j++){
                let Days = myTable[j+(i*7)]; 
                // DateNumは日付ボタンをclickした時にそのボタンを識別する番号のようなもので、eitDataにあるdateプロパティとDateNumを完全に一致させる必要がある。 
                let DateNum = myYear + "-" + (myMonth+1) + "-" + Days; // DateNum作成に関するコード
                if((myMonth+1) < 10 && Days < 10){DateNum = myYear + "-0" + (myMonth+1) + "-0" + Days;} // DateNum作成に関するコード
                else if((myMonth+1) < 10){DateNum = myYear + "-0" + (myMonth+1) + "-" + Days;} // DateNum作成に関するコード
                else if(Days < 10){DateNum = myYear + "-" + (myMonth+1) + "-0" + Days;} // DateNum作成に関するコード
                let RCell = "<td align='center' class='MtoS'><button id='%'>" + Days + "</button></td>";
                RCell = RCell.replace("%",DateNum);
                if(j == 0){RCell = RCell.replace("MtoS","Sun");}
                Row = Row + RCell;
            }
            Row = Row + "</tr>";
            $("#calendar > table").append(Row);
        }
    };
    makeCalender();


    // 2.カレンダー 月の切り替え

    // 2-1.先月へ
    let LastMonth = function() {
        $("#calendar > strong").empty();
        $("#calendar > table").empty();
        myMonth = myMonth - 1;
        if(myMonth == -1){myMonth = myMonth + 12;}
        if(myMonth == 11){myYear = myYear-1;}
        myDate = new Date(myYear,myMonth,01);
        myWeek = myDate.getDay();
        myTblLine = Math.ceil((myWeek+myMonthTbl[myMonth])/7);
        myTable = new Array(7*myTblLine);                      
        for(let i=0; i<7*myTblLine; i++) myTable[i] = " ";
        for(let i=0; i<myMonthTbl[myMonth]; i++)myTable[i+myWeek]=i+1;
        makeCalender();
    };
    $("#lastmonth").click(function(){ 
        LastMonth(); 
    })

    // 2-2.翌月へ
    let NextMonth = function() {
        $("#calendar > strong").empty();
        $("#calendar > table").empty();
        myMonth = myMonth + 1;
        if(myMonth == 12){myMonth = myMonth - 12;}
        if(myMonth == 0){myYear = myYear+1;}
        myDate = new Date(myYear,myMonth,01);
        myWeek = myDate.getDay();
        myTblLine = Math.ceil((myWeek+myMonthTbl[myMonth])/7);
        myTable = new Array(7*myTblLine);                      
        for(let i=0; i<7*myTblLine; i++) myTable[i] = " ";
        for(let i=0; i<myMonthTbl[myMonth]; i++)myTable[i+myWeek]=i+1;
        makeCalender();
    };
    $("#nextmonth").click(function(){
        NextMonth();
    }
    
    )


    // 3.#TheDayEitListの表示
    // カレンダーの日付をclickした時、その日付に一致するeitDataを全て表示する。

    // Datenumに一致するdateをもつeitDataを全て表示する関数。
    let makeEitTable = function(Datenum) {
        let eitA = localStorage.getItem('eitkey');
        eitA = JSON.parse(eitA);
        for(let i=0; i < eitA.length; i++) {
            let eitx = eitA[i];
            let thedayArr = eitx.filter(item => item.date === Datenum);
            for(let j=0; j < thedayArr.length; j++) {
                let thedayData = thedayArr[j];
                // 振替を受けたデータまで入れると振替したデータとかぶってわかりにくいので振替を受けたデータは入れない。
                if(thedayData.type1 === '振替を受けました'){continue;}
                let type1 = thedayData.type1;
                let type2 = thedayData.type2;
                let amount = thedayData.amount;
                let fee = thedayData.fee;
                let memo = thedayData.memo;
                let eitTable = '<li class="eit"><p class="eittype1">E:</p><p class="eittype2">F</p>' +
                '<p class="eitamount">G円H</p><p class="eitmemo">メモ:I</p></li>';;
                eitTable = eitTable.replace("E",type1).replace("G",amount).replace("F",type2).replace("H",fee).replace("I",memo);
                $("#calendar > ul").append(eitTable);
            }
        }
        // ShiftBarとeitDataのリストの末尾がかぶらないようにするためのスペース。
        let space = '<li class="space"></li>'
        $("#calendar > ul").append(space);
    };
    // カレンダーの日付ボタンをclickした時、DateNumを取得して、それを引数にmakeEitTableを実行する。
    $(document).on("click", "#calendar > table > tr > td > button",function(){
        $("#calendar > ul").empty();
        let Datenum = $(this).attr("id");
        makeEitTable(Datenum);
    })
   
})