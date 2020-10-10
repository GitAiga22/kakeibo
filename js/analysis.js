$(function() { 

// ローカルストレージからデータを取得する関数。
let getStorage = function(key){
  let obj = localStorage.getItem(key);
	return JSON.parse(obj);
};  
// cssNumberが2ならばパステルのデザインを適用。それ以外(1)ならばモノトーンのデザイン(初期設定はこっち)を適用。
// デザインはsettingのページで変更可能。モノトーンを選んだら1、パステルを選んだら2をローカルストレージに保存(キーはCNkey)。
let cssNumber = getStorage('CNkey');if(cssNumber == 2){
  $('#css').attr('href','css/analysis2.css');
  $('#homeShift').attr('src','images-color2/home.jpg');
  $('#calendarShift').attr('src','images-color2/calendar.jpg');
  $('#analysisShift').attr('src','images-color2/analysis.jpg');
  $('#settingShift').attr('src','images-color2/setting.jpg');
}


// 0. 日付から、何年の何月かを取得、eitAをロ－カルストレージから取得、分析結果を入れる箱の用意。

let myDate = new Date();
let myMonth = myDate.getMonth();
let myYear = myDate.getFullYear();
let eitA = getStorage('eitkey');
// 支出の分析結果を入れる箱。
let shokuhi = 0;
let koutsuuhi = 0;
let nichiyouhinn = 0;
let kounetsuhi = 0;
let tsuushinhi = 0;
let yachinn = 0;
let jidousha = 0;
let irui = 0;
let iryouhi = 0;
let biyouhi = 0;
let kyouikuhi = 0;
let shoseki = 0;
let ryokou = 0;
let asobi = 0;
let nazonosonnshitsu = 0;
let sonota = 1;
// 収入の分析結果を入れる箱。
let kyuuyo = 0;
let shiokuri = 0;
let nazonoshuunyuu = 0;
let sonota2 = 1;


// 1. 分析
// 分析を行う関数。
let MakeGraphData = function(myMonth) {
// 1-1.eitAから今月のデータのみを抜き出してanaA(analysis Array)に入れる。
let anaA = new Array();
for(let i = 0; i < eitA.length; i++){
  let eitx = eitA[i];
  let anax = eitx.filter(item => item.month === myMonth);
  anaA.push(anax);
}  
// ここから支出の分析
// 1-2.anaAから支出データのみを抜き出してanaeA(analysis expenditure array)に入れる。
let anaeA = new Array();
for(let i = 0; i < anaA.length; i++){
  let anax = anaA[i];
  let anaex = anax.filter(item => item.type1 === '支出');
  anaeA.push(anaex);
}
// 1-3.anaeAから特定の支出タイプのデータのみを抜き出してanaetypeA(analysis expenditure type array)に入れ、anaetypeAにあるデータの金額をすべて合計し、返り値として返す関数。
function analysis(type) {
  let zero = 0;
  let anaetypeA = new Array;
  if(anaeA.length == 0){return;}else{
    for(let i = 0; i < anaeA.length; i++){
      let anaex = anaeA[i];
      let anaetypex = anaex.filter(item => item.type2 === type);
      anaetypeA.push(anaetypex);
    }  
  }
  if(anaetypeA.length == 0){return;}else{
    for(let i = 0; i < anaetypeA.length; i++){
      let anaetypex = anaetypeA[i];
      if(anaetypex.length == 0){continue;}else{
        for(let i = 0; i < anaetypex.length; i++){
          let exp = anaetypex[i];
          let expa = exp.amount;
          zero = Number(zero) + Number(expa);
        }
      }
    }
  }
  return zero;
}
shokuhi = analysis('食費');
koutsuuhi = analysis('交通費');
nichiyouhinn = analysis('日用品');
kounetsuhi = analysis('水道・光熱費');
tsuushinhi = analysis('通信費');
yachinn = analysis('家賃');
jidousha = analysis('自動車');
irui = analysis('衣類');
iryouhi = analysis('医療費');
biyouhi = analysis('美容費・理髪');
kyouikuhi = analysis('教育費');
shoseki = analysis('書籍');
ryokou = analysis('旅行');
asobi = analysis('遊び');
nazonosonnshitsu = analysis('謎の損失');
sonota = analysis('その他');
// 1-4.振替の手数料を合計し、支出のその他に追加する。
let tesuuryou = 0;
let anatA = new Array();
for(let i = 0; i < anaA.length; i++){
  let anax = anaA[i];
  let anatx = anax.filter(item => item.type1 === '振替ました');
  anatA.push(anatx);
}
for(let i = 0; i < anatA.length; i++){
  let anatx = anatA[i];
  for(let i = 0; i < anatx.length; i++){
    let trans = anatx[i];
    let transa = trans.fe;
    tesuuryou = Number(tesuuryou) + Number(transa);
  }
}
sonota = Number(sonota) + Number(tesuuryou);

// ここから収入の分析
// 1-5.anaAから収入データのみを抜き出してanaiA(analysis income array)に入れる。
let anaiA = new Array();
for(let i = 0; i < anaA.length; i++){
  let anax = anaA[i];
  let anaix = anax.filter(item => item.type1 === '収入');
  anaiA.push(anaix);
}
// 1-6.anaiAから特定の収入タイプのデータのみを抜き出してanaitypeA(analysis income type array)に入れ、anaitypeAにあるデータの金額をすべて合計し、返り値として返す関数。
function analysis2(type) {
  let zero = 0;
  let anaitypeA = new Array;
  if(anaiA.length == 0){return;}else{
    for(let i = 0; i < anaiA.length; i++){
      let anaix = anaiA[i];
      let anaitypex = anaix.filter(item => item.type2 === type);
      anaitypeA.push(anaitypex);
    }  
  }
  if(anaitypeA.length == 0){return;}else{
    for(let i = 0; i < anaitypeA.length; i++){
      let anaitypex = anaitypeA[i];
      if(anaitypex.length == 0){continue;}else{
        for(let i = 0; i < anaitypex.length; i++){
          let inc = anaitypex[i];
          let inca = inc.amount;
          zero = Number(zero) + Number(inca);
        }
      }
    }
  }
  return zero;
}
kyuuyo = analysis2('給与');
shiokuri = analysis2('仕送り');
nazonoshuunyuu = analysis2('謎の収入');
sonota2 = analysis2('その他');

}
MakeGraphData(myMonth);


// 2.円グラフの作成

// 2-1.支出円グラフの作成

let expenditure = $("#expenditurePieChart");
let ExpenditurePieChart = new Chart(expenditure, {
  type: 'pie',
    data: {
      labels: ["食費", "交通費", "日用品", "水道・光熱費","通信費","家賃","自動車","衣類","医療費","美容費・理髪","教育費","書籍","旅行","遊び","謎の損失","その他"],
      datasets: [{
          backgroundColor: [
            "#eda",
            "#bbe",
            "#eea",
            "#ace",
            "#dec",
            "#eca",
            "#cde",
            "#ced",
            "#aec",
            "#ebe",
            "#eaa",
            "#edc",
            "#aee",
            "#ceb",
            "#aaa",
            "#eee",
          ],
          data: [shokuhi,koutsuuhi,nichiyouhinn,kounetsuhi,tsuushinhi,yachinn,jidousha,irui,iryouhi,
            biyouhi,kyouikuhi,shoseki,ryokou,asobi,nazonosonnshitsu,sonota]
      }]
    },
    options: {
      title: {
        display: true,
        text: myYear + '年' + (myMonth + 1) + '月の支出'
      },
      legend: {
        display: false
     }
    }
});
// 支出円グラフを上書きする関数(上に書いたコードと同じもの)
let MakeEGraph = function() {
ExpenditurePieChart = new Chart(expenditure, {
    type: 'pie',
    data: {
      labels: ["食費", "交通費", "日用品", "水道・光熱費","通信費","家賃","自動車","衣類","医療費","美容費・理髪","教育費","書籍","旅行","遊び","謎の損失","その他"],
      datasets: [{
          backgroundColor: [
            "#eda",
            "#bbe",
            "#eea",
            "#ace",
            "#dec",
            "#eca",
            "#cde",
            "#ced",
            "#aec",
            "#ebe",
            "#eaa",
            "#edc",
            "#aee",
            "#ceb",
            "#aaa",
            "#eee",
          ],
          data: [shokuhi,koutsuuhi,nichiyouhinn,kounetsuhi,tsuushinhi,yachinn,jidousha,irui,iryouhi,
            biyouhi,kyouikuhi,shoseki,ryokou,asobi,nazonosonnshitsu,sonota]
      }]
    },
    options: {
      title: {
        display: true,
        text: myYear + '年' + (myMonth + 1) + '月の支出'
      },
      legend: {
        display: false
     }
    }
});
}

// 2-2.収入円グラフの作成

let income = $("#incomePieChart");
let IncomePieChart = new Chart(income, {
  type: 'pie',
  data: {
    labels: ["給与", "仕送り", "謎の収入","その他"],
    datasets: [{
        backgroundColor: [
          "#eac",
          "#aea",
          "#aaa",
          "#eee",
        ],
        data:  [kyuuyo,shiokuri,nazonoshuunyuu,sonota2]
    }]
  },
  options: {
    title: {
      display: true,
      text: myYear + '年' + (myMonth + 1) + '月の収入'
    },
    legend: {
      display: false
   }
  }
});
// 収入円グラフを上書きする関数(上に書いたコードと同じもの)
let MakeIGraph = function() {
  IncomePieChart = new Chart(income, {
    type: 'pie',
    data: {
      labels: ["給与", "仕送り", "謎の収入","その他"],
      datasets: [{
          backgroundColor: [
            "#eac",
            "#aea",
            "#aaa",
            "#eee",
          ],
          data:  [kyuuyo,shiokuri,nazonoshuunyuu,sonota2]
      }]
    },
    options: {
      title: {
        display: true,
        text: myYear + '年' + (myMonth + 1) + '月の収入'
      },
      legend: {
        display: false
     }
    }
  });
}

// 3.月の切り替え
$("#lastgraph").click(function(){
  ExpenditurePieChart.destroy();
  IncomePieChart.destroy();
  myMonth = myMonth - 1;
  if(myMonth == -1){myMonth = myMonth + 12;}
  if(myMonth == 11){myYear = myYear-1;}
  MakeGraphData(myMonth);
  MakeEGraph();
  MakeIGraph();
})
$("#nextgraph").click(function(){
  ExpenditurePieChart.destroy();
  IncomePieChart.destroy();
  myMonth = myMonth + 1;
  if(myMonth == 12){myMonth = myMonth - 12;}
  if(myMonth == 0){myYear = myYear+1;}
  MakeGraphData(myMonth);
  MakeEGraph();
  MakeIGraph();
})

})