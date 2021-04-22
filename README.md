# 家計簿アプリ

## 概要
家計簿のWebアプリを制作しました。このアプリは、買い物をした時、その金額、日付、何に使ったのかなどの支出のデータを保存し、残金を計算してくれます。収入や振替についても同様に、データを保存し、残金を計算してくれます。保存された支出・収入・振替のデータ（以下、収支データ）を一覧で表示したり、アプリ内のカレンダーから日付ごとに収支データを確認したり、収支データを分析して、支出の割合（何にどのくらい支出したのかなど）を円グラフで表示したりしてくれます。AppStoreなどにある既存の家計簿アプリと比較して特別優れているところはありませんが、シンプルで使いやすい機能を重視し、貸し借り機能（機能で後述）など、大学生が使いやすいアプリを意識しました。  
私はアプリを制作するのはこのアプリが初めてで、自分自身、プログラミングを勉強しながら制作していきました。あまり見やすいコードではないかもしれませんが、自分なりに見やすいように整えたので、読んでいただけると幸いです。  

次のリンクからアプリのホーム画面に移動できます。（**スマホ画面で見ていただきたいです!**）→[家計簿アプリ](https://staba-tatsujin.ssl-lolipop.jp/kakeibo/home.html)  
本アプリはレスポンシブ対応はなく、スマホ画面用にCSSを作っているので、スマホ画面で見ていただきたいです。  
**アプリの使用方法はデモ動画をご覧ください。** →[デモ動画](https://youtu.be/GnH3DIdn9L4) 

## 使用言語
使用言語は Javascript、HTML5、CSS です。Javascriptのライブラリとして、jQuery、Chart.jsを使用しています。  
データはすべてブラウザのローカルストレージに保存されます。

## 機能
本アプリの機能は大きく分けて７つあります。  
1. アカウントのカスタマイズ
2. 収支データの保存
3. 収支データの表示
4. カレンダー機能
5. 分析機能
6. 貸し借り機能
7. アプリのデザイン変更
  
順に説明していきます。  
1. アカウントのカスタマイズ
"お財布"や"〇〇銀行"のように、お金のある場所をアカウントと言っています。初期設定でアカウントはなく、ユーザーがアカウント追加フォームでアカウント名、初期残高などを入力することでアカウントの追加ができます。アカウントごとにそれぞれ収支データが保存され、残金が計算されます（こうすることで、財布にはいくらお金が残ってて、銀行にはいくら残ってて..というように確認することができます）。アカウントは削除することもでき、一度アカウントが削除されると、そのアカウントに関する収支データもすべてローカルストレージから削除されます。

2. 収支データの記録
支出、収入、振替のデータを記録することができます。支出を例にすると、使った金額、使った日付、何に使ったか、などを支出の入力フォームに入力することでそれらの情報を保存します。

3. 収支データの表示
保存された収支データの履歴を一覧で確認することができます。収支データの一覧は各アカウントごとに確認することができ、日付順に並べられます。収支データの一覧から、各収支データを削除することができます。

4. カレンダー機能
自作のカレンダーが表示されます。はじめは今月のカレンダーが表示されますが、表示するカレンダーの月を切り替えることができます。カレンダーの各日付をタップすると、その日付で保存されている収支データが一覧で表示されます。

5. 分析機能
保存された収支データから月ごとの総支出における各支出（食費、交通費、光熱費..など）の割合を計算し、円グラフで表示します。収入についても同様に円グラフを表示します。はじめは今月の収支データを分析した円グラフが表示されますが、表示する円グラフを月ごとに切り替えることができます。円グラフはChart.jsを利用して描画しています。

6. 貸し借り機能
日付、金額などを入力することで、貸したお金や、借りたお金のデータを記録することができます。貸し借りのデータはホーム画面に一覧で表示され、いつでも確認できます。また、貸したお金が返ってきたり、借りたお金を返した時、ホーム画面からすぐに貸し借りデータを削除することができます。各アカウントに表示される残金は〇〇円(◇◇円)の用に表示され、〇〇円の部分は、貸し借りによる一時的なお金の増減を計算しない金額（実質的に持っている金額）で、(◇◇円)の部分は貸し借りによる一時的なお金の増減を計算した金額です。残金をこのような表示にすることで、ユーザーが自分のお財布事情をひと目で確認することができます。

7. アプリのデザイン変更
アプリ全体のデザインをカメレオン、ヤドカリの二種類から変更することができます。初期設定はカメレオンです。HTMLに適用するCSSファイルを変えることでアプリ全体のデザインを変えています。

## 特に見て欲しい機能（工夫した機能）
1のアカウントのカスタマイズ機能、4のカレンダー機能、6の貸し借り機能を特に見ていただきたいです。  

1のアカウントのカスタマイズ機能は、制作中、特に苦労した部分です。JavascriptにアカウントのHTMLのテンプレートを作っておき、ユーザーの入力内容をテンプレートに代入して、それをHTMLに追加するという仕組みで、アカウントを表示しています（home.jsの1参照）。なのでHTMLはほとんどコードがなく（home.html参照）、JSのコードがかなり長くなっています（home.js参照）。各アカウントごとに収支データが記録されるので、アカウント数が変化すると収支データを保存する配列を増やす必要があり、この配列数の動的変化に、収支データの保存・削除・表示などを対応させるのが大変でした。表示ボタンや削除ボタンをvalue属性でタグ付けし、クリック時にvalue属性を取得することで、どのアカウントの（どの配列の）どの収支データに操作（表示や削除）するかを指定するという方法で、アカウント数の動的変化に対応させました（home.jsの1-4,2-2,2-4,3-4など参照）。   
  
4のカレンダー機能は、自作のカレンダーを作ったので見てほしい部分です。いろんなwebサイトを参考にしながら、うるう年にも対応した正確なカレンダーを作成しました(calendar.jsの1,2参照）。日付をタップするとその日付の収支データの一覧が表示される機能を付け、よりユーザーが使いやすい家計簿アプリにしました（calendar.jsの3参照）。カレンダーは固定で収支データの一覧はスクロールできるなどCSSも工夫しました（calendar1.css,calendar2.css参照）。  
  
6の貸し借り機能は、私が以前家計簿アプリを使っていたときにあったらいいなと思っていた機能で、大学生が使いやすい家計簿アプリという点において大切な機能です。コードはシンプルで、追加・削除など基本は収支データのものとほぼ同じで表示の方法が違うだけです。収支データの履歴を開くボタンをタップすると一覧で表示されるか（収支データの一覧）、ホーム画面に常に表示されるか（貸し借りデータの一覧）の違いです（home.jsの2-2（収支データの表示）と3-2（貸し借りデータの表示）を参照）。ホーム画面に貸し借りの記録が常に表示されていると、貸したお金が返ってきたり、借りたお金を返した時、ホーム画面からすぐに貸し借りデータを削除できる（貸し借りによる一時的な残高の増減をボタン一つですぐにもとに戻せる）というメリットがあります。また、貸し借りをしていることを忘れないというメリットもあります。   

## アプリの使用方法（デモ動画）
本アプリはレスポンシブ対応はなく、スマホ画面用にCSSを作っているので、スマホ画面で操作して下さい。  
アプリの使用方法はデモ動画をご覧ください。→[デモ動画](https://youtu.be/GnH3DIdn9L4) 

## コードの対応について
本アプリは主に５つの画面からなり、ホーム画面はhome.html、アカウント追加画面はadd.html、カレンダー画面はcalendar.html、分析画面はanalysis.html、設定画面はsetting.htmlが対応しています。  
[home.html] のJavascriptは、[ home.jsとhome2.js ]、CSSは[ home1.cssとhome2.css ]  
[add.html] のJavascriptは、[ home.js ]、CSSは[ add1.cssとadd2.css ]  
[calendar.html] のJavascriptは、[ calendar.js ]、CSSは[ calendar1.cssとcalendar2.css ]  
[analysis.html] のJavascriptは、[ analysis.js ]、CSSは[ analysis1.cssとanalysis2.css ]  
[setting.html] のJavascriptは、[ setting.js ]、CSSは[ setting1.cssとsetting2.css ]  
＊home.htmlのjsがhome.jsとhome2.jsと２つあるのはhome.jsのコードが長くなりすぎたためです。  
＊CSSが1と2で２つありますが、1がカメレオン用、2がヤドカリ用のCSSです。  
