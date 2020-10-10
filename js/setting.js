$(function(){

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
        $('#css').attr('href','css/setting2.css');
        $('#homeShift').attr('src','images-color2/home.jpg');
        $('#calendarShift').attr('src','images-color2/calendar.jpg');
        $('#analysisShift').attr('src','images-color2/analysis.jpg');
        $('#settingShift').attr('src','images-color2/setting.jpg');
    }
    
    // モノトーンの設定のときはモノトーンのボタンが赤枠で表示される。パステルの設定のときはパステルのボタンが赤枠で表示される。
    if(cssNumber == 1){
        document.getElementById('monotone').style.borderColor = 'red';
    }else if(cssNumber == 2){
        document.getElementById('pasuteru').style.borderColor = 'red';
    }
    // モノトーンボタンをクリックするとcssNumberが１となってローカルストレージに保存される。
    $('#monotone').click(function(){
        let cssNumber = 1;
        saveStorage('CNkey',cssNumber);
        location.reload();
    })
    // パステルボタンをクリックするとcssNumberが２となってローカルストレージに保存される。
    $('#pasuteru').click(function(){
        let cssNumber = 2;
        saveStorage('CNkey',cssNumber);
        location.reload();
    })
})


