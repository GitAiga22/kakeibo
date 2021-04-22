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
        $('#LOGO').attr('href','img1/かけいぼロゴ2.svg');
        $('#APPLOGO').attr('href','img1/かけいぼロゴ2.svg');
        $('#css').attr('href','css/setting2.css');
        $('#homeShift').attr('src','img1/HOME2.svg');
        $('#calendarShift').attr('src','img1/CALENDAR2.svg');
        $('#analysisShift').attr('src','img1/ANALYSIS2.svg');
        $('#settingShift').attr('src','img1/SETTING2.svg');
    }
    
    // モノトーンボタンをクリックするとcssNumberが１となってローカルストレージに保存される。
    $('#changeDesign').click(function(){
        if(cssNumber == 2){
            $(this).toggleClass('rotationAnime');
            $('#fadeLayer').toggleClass('fadeAnime');
            setTimeout(function(){
            let cssNumber = 1;
            saveStorage('CNkey',cssNumber);
            window.location.href = 'home.html';
        },2000)
        }else{
            $(this).toggleClass('rotationAnime');
            $('#fadeLayer').toggleClass('fadeAnime');
            setTimeout(function(){
            let cssNumber = 2;
            saveStorage('CNkey',cssNumber);
            window.location.href = 'home.html';
        },2000)
        }    
    })
})


