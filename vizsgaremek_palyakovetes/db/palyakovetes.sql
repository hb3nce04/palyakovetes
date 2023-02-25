-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2023. Feb 25. 12:44
-- Kiszolgáló verziója: 10.4.21-MariaDB
-- PHP verzió: 8.0.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `palyakovetes`
--
CREATE DATABASE IF NOT EXISTS `palyakovetes` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_hungarian_ci;
USE `palyakovetes`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `agazat`
--

CREATE TABLE `agazat` (
  `id` int(3) NOT NULL,
  `nev` varchar(255) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `szam` varchar(255) COLLATE utf8mb4_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `agazat`
--

INSERT INTO `agazat` (`id`, `nev`, `szam`) VALUES
(1, 'Vegyipar', '25'),
(2, 'Agrár gépész', 'XXXI'),
(3, 'Bányászat', 'VII'),
(4, 'Egészségügy', 'I'),
(5, 'Élelmiszeripar', 'XXXVI'),
(6, 'Építőipar', 'XVI'),
(7, 'Épületgépészet', 'VIII'),
(8, 'Erdészet és vadgazdálkodás', 'XXXII'),
(9, 'Faipar', 'XVIII'),
(10, 'Földmérés', 'XXXV'),
(11, 'Gépészet', 'IX'),
(12, 'Honvédelem', 'XLIII'),
(13, 'Informatika', 'XIII'),
(14, 'Kereskedelem', 'XXVI'),
(15, 'Kertészet és parképítés', 'XXXIV'),
(16, 'Kohászat', 'X'),
(17, 'Könnyűipar', 'XVII'),
(18, 'Környezetvédelem', 'XXIII'),
(19, 'Közgazdaság', 'XXIV'),
(20, 'Közlekedés, szállítmányozás és logisztika', 'XL'),
(21, 'Közlekedésgépész', 'XXII'),
(22, 'Közművelődés', 'XXXIX'),
(23, 'Mezőgazdaság', 'XXXIII'),
(24, 'Nyomdaipar', 'XIX'),
(25, 'Optika', 'XXIX'),
(26, 'Pedagógia', 'IV'),
(27, 'Rendészet és közszolgálat', 'XXXVIII'),
(28, 'Sport', 'XXXVII'),
(29, 'Szépészet', 'XXX'),
(30, 'Szociális', 'III'),
(31, 'Távközlés', 'XII'),
(32, 'Turisztika', 'XXVIII'),
(33, 'Ügyvitel', 'XXV'),
(34, 'Vegyész', 'XV'),
(35, 'Vegyipar', 'XIV'),
(36, 'Vendéglátóipar', 'XXVII'),
(37, 'Villamosipar és elektronika', 'XI'),
(38, 'Vízügy', 'XLI'),
(39, 'Bányászat és kohászat', '1'),
(40, 'Egészségügy', '2'),
(41, 'Egészségügyi technika', '3'),
(42, 'Elektronika és elektrotechnika', '4'),
(43, 'Élelmiszeripar', '5'),
(44, 'Építőipar', '6'),
(45, 'Épületgépészet', '7'),
(46, 'Fa- és bútoripar', '8'),
(47, 'Gazdálkodás és menedzsment', '9'),
(48, 'Gépészet', '10'),
(49, 'Honvédelem', '11'),
(50, 'Informatika és távközlés', '12'),
(51, 'Kereskedelem', '13'),
(52, 'Környezetvédelem és vízügy', '14'),
(53, 'Közlekedés és szállítmányozás', '15'),
(54, 'Kreatív', '16'),
(55, 'Mezőgazdaság és erdészet', '17'),
(56, 'Oktatás', '18'),
(57, 'Rendészet és közszolgálat', '19'),
(58, 'Specializált gép- és járműgyártás', '20'),
(59, 'Sport', '21'),
(60, 'Szépészet', '22'),
(61, 'Szociális', '23'),
(62, 'Turizmus-vendéglátás', '24');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `felhasznalo`
--

CREATE TABLE `felhasznalo` (
  `om_azon` bigint(11) NOT NULL,
  `jelszo` varchar(60) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `admin` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `felhasznalo`
--

INSERT INTO `felhasznalo` (`om_azon`, `jelszo`, `admin`) VALUES
(11111111111, '$2a$12$jSE6tVSj5JTIZxBgN7wpKeHn7oqUVBim0zO/R3iCA5HBvjgM7u5m6', 1),
(22222222222, '$2a$12$7eWjhG.OcKNAeYR3NZVOg.kYEUtWsXKBWcnUGgbXlkM57EbEorqku', 0);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `iskola`
--

CREATE TABLE `iskola` (
  `id` int(2) NOT NULL,
  `nev` varchar(255) COLLATE utf8mb4_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `iskola`
--

INSERT INTO `iskola` (`id`, `nev`) VALUES
(1, 'Nyíregyházi SZC Bánki Donát Műszaki Technikum és Kollégium'),
(2, 'Nyíregyházi SZC Bencs László Szakképző Iskola'),
(3, 'Nyíregyházi SZC Inczédy György Szakképző Iskola és Kollégium'),
(4, 'Nyíregyházi SZC Sipkay Barna Technikum'),
(5, 'Nyíregyházi SZC Széchenyi István Technikum és Kollégium'),
(6, 'Nyíregyházi SZC Teleki Blanka Szakképző Iskola és Kollégium'),
(7, 'Nyíregyházi SZC Tiszavasvári Szakképző Iskola és Kollégium'),
(8, 'Nyíregyházi SZC Vásárhelyi Pál Technikum'),
(9, 'Nyíregyházi SZC Wesselényi Miklós Technikum és Kollégium'),
(10, 'Nyíregyházi SZC Zay Anna Technikum és Kollégium');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `kategoria`
--

CREATE TABLE `kategoria` (
  `id` int(2) NOT NULL,
  `megnevezes` varchar(255) COLLATE utf8mb4_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `kategoria`
--

INSERT INTO `kategoria` (`id`, `megnevezes`) VALUES
(9, 'Egészségügyi / családi okok miatt nem dolgozik'),
(10, 'Egyéb okból nem dolgozik'),
(2, 'Érettségire készül az intézményben/\r\ntagintézményben'),
(4, 'Más középfokú intézményben/\r\ntagintézményben érettségire készül'),
(3, 'Más középfokú intézményben/\r\ntagintézményben szakmát tanul'),
(12, 'Nem a szakmájában dolgozik külföldön'),
(6, 'Nem szakirányú felsőoktatásban tanul'),
(8, 'Nem szakmájában dolgozik'),
(13, 'Nincs információ'),
(5, 'Szakirányú felsőoktatásban tanul'),
(7, 'Szakmájában dolgozik'),
(11, 'Szakmájában dolgozik külföldön'),
(1, 'Szakmát tanul az intézményben/\r\ntagintézményben');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `osztaly`
--

CREATE TABLE `osztaly` (
  `id` int(4) NOT NULL,
  `iskolaid` int(2) NOT NULL,
  `felhasznalo_om` bigint(11) NOT NULL,
  `nev` varchar(255) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `vegzesi_ev` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `palya`
--

CREATE TABLE `palya` (
  `id` int(11) NOT NULL,
  `diak_om_azon` bigint(11) NOT NULL,
  `kategoriaid` int(2) NOT NULL,
  `leiras` varchar(255) COLLATE utf8mb4_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `szakma`
--

CREATE TABLE `szakma` (
  `id` int(3) NOT NULL,
  `nev` varchar(255) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `szam` varchar(255) COLLATE utf8mb4_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `szakma`
--

INSERT INTO `szakma` (`id`, `nev`, `szam`) VALUES
(1, 'Ács', '3458201'),
(2, 'Asztalos', '3454302'),
(3, 'Autóelektronikai műszerész', '5452501'),
(4, 'Autószerelő', '5452502'),
(5, 'Burkoló', '3458213'),
(6, 'Cukrász', '3481101'),
(7, 'Divat- és stílustervező', '5421102'),
(8, 'Eladó', '3434101'),
(9, 'Elektronikai technikus', '5452302'),
(10, 'Épület- és szerkezetlakatos', '3458203'),
(11, 'Faipari technikus', '5454301'),
(12, 'Festő, mázoló, tapétázó', '3458204'),
(13, 'Fodrász', '5481501'),
(14, 'Gépgyártástechnológiai technikus', '5452103'),
(15, 'Gépi forgácsoló', '3452103'),
(16, 'Gyakorló ápoló', '5472302'),
(17, 'Hegesztő', '3452106'),
(18, 'Informatikai rendszerüzemeltető', '5448106'),
(19, 'Ipari gépész', '3452104'),
(20, 'Ipari gumitermék előállító', '3454304'),
(21, 'Irodai titkár', '5434603'),
(22, 'Járműfényező', '3452503'),
(23, 'Karosszérialakatos', '3452506'),
(24, 'Kereskedő', '5434101'),
(25, 'Kisgyermekgondozó, -nevelő', '5476102'),
(26, 'Kozmetikus', '5481502'),
(27, 'Kőműves', '3458214'),
(28, 'Környezetvédelmi technikus', '5485001'),
(29, 'Központifűtés- és gázhálózat rendszerszerelő', '3458209'),
(30, 'Logisztikai és szállítmányozási ügyintéző', '5484111'),
(31, 'Magasépítő technikus', '5458203'),
(32, 'Mechatronikai technikus', '5452304'),
(33, 'Mélyépítő technikus', '5458204'),
(34, 'Műszaki informatikus', '5448105'),
(35, 'Női szabó', '3454206'),
(36, 'Pénzügyi-számviteli ügyintéző', '5434401'),
(37, 'Pincér', '3481103'),
(38, 'Sportedző', '5481302'),
(39, 'Szakács', '3481104'),
(40, 'Számítógép-szerelő, karbantartó', '3452302'),
(41, 'Szociális gondozó és ápoló', '3476201'),
(42, 'Turisztikai szervező, értékesítő', '5481203'),
(43, 'Vendéglátásszervező', '5481101'),
(44, 'Villanyszerelő', '3452204'),
(45, 'Víz-, csatorna- és közmű- rendszerszerelő', '3458212'),
(46, 'Vízgazdálkodó technikus', '5485302');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `tanulo`
--

CREATE TABLE `tanulo` (
  `om_azon` bigint(11) NOT NULL,
  `nev` varchar(255) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `osztalyid` int(4) NOT NULL,
  `nappali_munkarend` tinyint(1) NOT NULL DEFAULT 1,
  `agazatid` int(3) DEFAULT NULL,
  `szakid` int(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `agazat`
--
ALTER TABLE `agazat`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `szam` (`szam`);

--
-- A tábla indexei `felhasznalo`
--
ALTER TABLE `felhasznalo`
  ADD PRIMARY KEY (`om_azon`),
  ADD UNIQUE KEY `jelszo` (`jelszo`);

--
-- A tábla indexei `iskola`
--
ALTER TABLE `iskola`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `kategoria`
--
ALTER TABLE `kategoria`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `megnevezes` (`megnevezes`);

--
-- A tábla indexei `osztaly`
--
ALTER TABLE `osztaly`
  ADD PRIMARY KEY (`id`),
  ADD KEY `felhasznalo_om` (`felhasznalo_om`),
  ADD KEY `iskolaid` (`iskolaid`);

--
-- A tábla indexei `palya`
--
ALTER TABLE `palya`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `diak_om_azon` (`diak_om_azon`),
  ADD KEY `kategoriaid` (`kategoriaid`);

--
-- A tábla indexei `szakma`
--
ALTER TABLE `szakma`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `szam` (`szam`);

--
-- A tábla indexei `tanulo`
--
ALTER TABLE `tanulo`
  ADD PRIMARY KEY (`om_azon`),
  ADD UNIQUE KEY `osztalyid` (`osztalyid`),
  ADD KEY `agazatid` (`agazatid`),
  ADD KEY `szakid` (`szakid`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `agazat`
--
ALTER TABLE `agazat`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT a táblához `iskola`
--
ALTER TABLE `iskola`
  MODIFY `id` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT a táblához `kategoria`
--
ALTER TABLE `kategoria`
  MODIFY `id` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT a táblához `osztaly`
--
ALTER TABLE `osztaly`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `palya`
--
ALTER TABLE `palya`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `szakma`
--
ALTER TABLE `szakma`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `osztaly`
--
ALTER TABLE `osztaly`
  ADD CONSTRAINT `osztaly_ibfk_1` FOREIGN KEY (`iskolaid`) REFERENCES `iskola` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `osztaly_ibfk_2` FOREIGN KEY (`felhasznalo_om`) REFERENCES `felhasznalo` (`om_azon`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `palya`
--
ALTER TABLE `palya`
  ADD CONSTRAINT `palya_ibfk_1` FOREIGN KEY (`diak_om_azon`) REFERENCES `tanulo` (`om_azon`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `palya_ibfk_2` FOREIGN KEY (`kategoriaid`) REFERENCES `kategoria` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `tanulo`
--
ALTER TABLE `tanulo`
  ADD CONSTRAINT `tanulo_ibfk_1` FOREIGN KEY (`osztalyid`) REFERENCES `osztaly` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tanulo_ibfk_2` FOREIGN KEY (`agazatid`) REFERENCES `agazat` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tanulo_ibfk_3` FOREIGN KEY (`szakid`) REFERENCES `szakma` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
