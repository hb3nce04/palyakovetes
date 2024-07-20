# Pályakövető rendszer

Mentorok:

Szabó Ákos,
Dantesz Tamás

Készítette:

Kiss Szabolcs,
Labbancz Balázs,
Menyhárt Martin

Utólagos hozzájárulás:

Hagymási Bence ([hb3nce04](https://github.com/hb3nce04/))

Nyíregyháza, 2024

Használat:

1. https://www.apachefriends.org/hu/index.html weboldalról töltsük le az operációs rendszerünknek megfelelő XAMPP verziót.
2. Telepítés után indítsuk el a XAMPP-ot, majd indítsuk el az Apache-t és a MySQL-t a "Start" gombok segítségével,
majd a MySQL-nél kattintsunk az "Admin" gombra.
3. phpMyAdminba importáljuk be az adatbázist. Az adatbázis a következő útvonalon érhető el ->
/vizsgaremek_palyakovetes/db/palyakovetes.sql
4. https://nodejs.org/ weboldalról töltsük le a Node.js-t.
5. https://code.visualstudio.com/ weboldalról töltsük le a Visual Studio Code-ot.
6. Visual Studio Code-ban a "Terminal" -> "New Terminal" megnyitása után 
telepítsük fel az összes modult az 'npm i --legacy-peer-deps' parancs segítségével /vizsgaremek_palyakovetes/backend/server útvonalon, illetve /vizsgaremek_palyakovetes/frontend útvonalon.
- először indítsuk el a backendet /vizsgaremek_palyakovetes/backend/server mappán belül az 'npm start' parancs segítségével.
- majd a /vizsgaremek_palyakovetes/frontend mappán belül indítsuk el a frontendet szintúgy az 'npm start' paranccsal.
7. Az alkalmazást a http://localhost:3000 címen tudjuk elérni.
