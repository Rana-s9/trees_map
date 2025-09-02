# 植林世界地図
## 🔗https://trees-map.onrender.com
[![Image from Gyazo](https://i.gyazo.com/08a9b2d94ee77cadb2525ef61841e2b8.png)](https://gyazo.com/08a9b2d94ee77cadb2525ef61841e2b8)<br>
「植林世界地図」は、世界の地図上に“自分たちの木”を植えていけるオンライン植林マップです。  
新しい場所に木を植え、名前を付けることで、あなたの木を３D空間に残すことができます。
日本にたくさん植えれば木々が集まって「日本地図」が浮かび上がり、世界中で木が植えられれば、世界全体に広がる森が完成します。  
また、複数のカメラ視点を切り替えることで、世界中に植えられた木を見に行くことができます。

# 💡 このサービスを作った理由  
自然にふれる時間が減り、環境問題も身近に感じにくい現代。  
「日常の中で、もっと自然を意識できる仕組みが欲しい」という思いから、このサービスを発想しました。  

植林は実際には大きな労力や時間がかかりますが、オンラインなら気軽に参加できます。  
「自分の木をここに植えた」という行為が3D空間に残ることで、自然とのつながりを感じられるだけでなく、他の人と森を共有する楽しさも生まれます。  

世界中に木を植える緑の体験を通して、自然を守る意識が少しずつ広がり、緑に癒され、オンラインから環境への興味を育てられるのではと考えています。

# 👥 想定ユーザー  
- 自然や環境保護に関心のある方  
- 世界中の人と一緒に「森」を作りたい方  
- ゲーム感覚で植林体験を楽しみたい方
- 緑で癒されたい方

 # 🖥️ 主な機能  

## 1. 新規登録・ログイン  
- アカウントを作成し、植林に参加できます

## 2. 場所登録 🌍
<img width="1324" height="815" alt="fav_picture" src="https://github.com/user-attachments/assets/733d47c3-b830-493d-be6c-7cbefb057beb" /><br>
- 世界中の好きな場所を選んで木を植えることができます
  - 住所・緯度経度を用いて登録するので、より詳細な場所を登録できます  

## 3. 3D空間での植林 🌳
<img width="1478" height="770" alt="tree_picture2" src="https://github.com/user-attachments/assets/c73775b4-9da4-471d-a398-a14916ea999f" /><br>
- 登録した場所にリンクした3D空間の相対位置に木を生やすことが可能  
- 木に名前を付けて記録できます  

## 4. 木で地図をつくる
<img width="1541" height="792" alt="tree_picture" src="https://github.com/user-attachments/assets/361ad820-80d5-455b-a99a-2f30f4bc517e" /><br>
- 日本各地に植林すれば、木々で日本列島の形が浮かび上がります  

## 5. 世界中を見に行けるカメラ機能 🎥  
<img width="1487" height="879" alt="tree_picture3" src="https://github.com/user-attachments/assets/8bc3c50c-5b2b-46b0-9958-8efb5be1adba" /><br>
- 複数の視点カメラを切り替え、地球上の木々を自由に見に行けます  
- 他のユーザーが植えた木を探す楽しみも  
  ___
# 🔧技術構成について
## 使用技術
|カテゴリ|技術内容|
|---|---|
|サーバーサイド|Ruby on Rails 7.0.6・Ruby 3.2.2|
|フロントエンド|Ruby on Rails・JavaScript(ライブラリ:three.js)|
|CSSフレームワーク|Tailwindcss|
|Web API|Google Maps API・Geocoder API・Open Weather API・Google Calendar API|
|データベースサーバー|PostgreSQL|
|ファイルサーバー（glbファイル)|Cloudflare R2|
|アプリケーションサーバー|Render|
|バージョン管理ツール|GitHub・Git Flow|
|3Dモデル|Blender|

# ER図
![木のアプリ](https://github.com/user-attachments/assets/4dcf5242-d1cf-45c3-a5c3-58aabdaba16b)

