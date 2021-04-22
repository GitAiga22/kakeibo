$(function() {

    // 1.#homeListの各アカウントの表示について

    // 1-1.homeListの各アカウントの入力欄を開く

    // vボタンクリック時、入力欄を展開するボタン(支出/収入/振替/貸す/借りる)を表示。
    $(document).on('click','.active',function() {
        let i = $(this).val();
        document.getElementById('input' + i).style.display = "block";
        $(this).attr('class','inactive');
    })
    $(document).on('click','.inactive',function() {
        let i = $(this).val();
        document.getElementById('input' + i).style.display = "none";
        $(this).attr('class','active');
    })
    // 支出ボタンクリック時、支出入力欄を表示。
    $(document).on('click','.exp',function() {
        let i = $(this).val();
        document.getElementById('explist' + i).style.display = "block";
        $(this).attr('class','expclose');
    })
    $(document).on('click','.expclose',function() {
        let i = $(this).val();
        document.getElementById('explist' + i).style.display = "none";
        $(this).attr('class','exp');
    })
    // 収入ボタンクリック時、収入入力欄を表示。
    $(document).on('click','.inc',function() {
        let i = $(this).val();
        document.getElementById('inclist' + i).style.display = "block";
        $(this).attr('class','incclose');
    })
    $(document).on('click','.incclose',function() {
        let i = $(this).val();
        document.getElementById('inclist' + i).style.display = "none";
        $(this).attr('class','inc');
    })
    // 振替ボタンクリック時、振替入力欄を表示。
    $(document).on('click','.trs',function() {
        let i = $(this).val();
        document.getElementById('trslist' + i).style.display = "block";
        $(this).attr('class','trsclose');
    })
    $(document).on('click','.trsclose',function() {
        let i = $(this).val();
        document.getElementById('trslist' + i).style.display = "none";
        $(this).attr('class','trs');
    })
    // 貸すボタンクリック時、貸した入力欄を表示。
    $(document).on('click','.lnd',function() {
        let i = $(this).val();
        document.getElementById('lndlist' + i).style.display = "block";
        $(this).attr('class','lndclose');
    })
    $(document).on('click','.lndclose',function() {
        let i = $(this).val();
        document.getElementById('lndlist' + i).style.display = "none";
        $(this).attr('class','lnd');
    })
    // 借りるボタンクリック時、借りた入力欄を表示。
    $(document).on('click','.brw',function() {
        let i = $(this).val();
        document.getElementById('brwlist' + i).style.display = "block";
        $(this).attr('class','brwclose');
    })
    $(document).on('click','.brwclose',function() {
        let i = $(this).val();
        document.getElementById('brwlist' + i).style.display = "none";
        $(this).attr('class','brw');
    })

    // 1-2.homeListのアカウントの画像ボタンクリック時、名前の表示と残金の表示を切り替える。
    $(document).on('click','.changeOpenEit1',function() {
        let i = $(this).val();
        document.getElementById('openeit2' + i).style.display = "block";
        document.getElementById('openeit1' + i).style.display = "none";
        $(this).attr('class','changeOpenEit2');
    })
    $(document).on('click','.changeOpenEit2',function() {
        let i = $(this).val();
        document.getElementById('openeit1' + i).style.display = "block";
        document.getElementById('openeit2' + i).style.display = "none";
        $(this).attr('class','changeOpenEit1');
    })

})