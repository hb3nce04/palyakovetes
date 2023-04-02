-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1:3306
-- Létrehozás ideje: 2023. Ápr 02. 13:34
-- Kiszolgáló verziója: 10.4.27-MariaDB
-- PHP verzió: 8.1.12

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
  `nev` varchar(255) NOT NULL,
  `szam` varchar(255) NOT NULL
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
  `jelszo` varchar(60) NOT NULL,
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
  `nev` varchar(255) NOT NULL
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
  `megnevezes` varchar(255) NOT NULL
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
  `nev` varchar(255) NOT NULL,
  `vegzesi_ev` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `osztaly`
--

INSERT INTO `osztaly` (`id`, `iskolaid`, `felhasznalo_om`, `nev`, `vegzesi_ev`) VALUES
(1, 8, 22222222222, '10.C', 2019),
(2, 2, 22222222222, '11.F', 2021),
(3, 4, 22222222222, '10.D', 1982),
(4, 4, 22222222222, '11.F', 2005),
(5, 8, 22222222222, '11.C', 1975),
(6, 5, 22222222222, '10.A', 1976),
(7, 3, 22222222222, '13.A', 2006),
(8, 4, 22222222222, '9.E', 2016),
(9, 1, 22222222222, '11.C', 1974),
(10, 10, 22222222222, '13.E', 1980);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `palya`
--

CREATE TABLE `palya` (
  `id` int(11) NOT NULL,
  `diak_om_azon` bigint(11) NOT NULL,
  `kategoriaid` int(2) NOT NULL,
  `leiras` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `szakma`
--

CREATE TABLE `szakma` (
  `id` int(3) NOT NULL,
  `nev` varchar(255) NOT NULL,
  `szam` varchar(255) NOT NULL
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
  `nev` varchar(255) NOT NULL,
  `osztalyid` int(4) NOT NULL,
  `nappali_munkarend` tinyint(1) NOT NULL DEFAULT 1,
  `agazatid` int(3) DEFAULT NULL,
  `szakid` int(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `tanulo`
--

INSERT INTO `tanulo` (`om_azon`, `nev`, `osztalyid`, `nappali_munkarend`, `agazatid`, `szakid`) VALUES
(10254124410, 'Szona', 9, 1, 22, NULL),
(10486636543, 'Ézsaiás', 6, 0, 1, NULL),
(10522084059, 'Markéta', 5, 0, NULL, 23),
(11790909404, 'Melina', 2, 0, NULL, 12),
(12221704185, 'Anelma', 8, 1, 22, NULL),
(12410944519, 'Dilon', 5, 1, NULL, 8),
(12476898067, 'Lukrécia', 8, 0, 12, NULL),
(12521600696, 'Alen', 8, 0, 22, NULL),
(12646075251, 'Max', 4, 1, NULL, 22),
(13644609376, 'Bíborka', 3, 1, NULL, 23),
(13669293080, 'Elinor', 3, 1, NULL, 19),
(13776034864, 'Karolin', 3, 0, NULL, 12),
(13914261227, 'Bogát', 4, 1, NULL, 5),
(14323889477, 'Vadvirág', 10, 1, 20, NULL),
(14407757379, 'Zsadán', 3, 0, NULL, 4),
(15335479214, 'Tibád', 4, 0, NULL, 9),
(15367396091, 'Jáel', 5, 1, NULL, 20),
(16193383080, 'Hana', 7, 1, 16, NULL),
(17017249335, 'Eponin', 1, 0, NULL, 11),
(17362699244, 'Raid', 10, 0, 8, NULL),
(18294325339, 'Ernesztó', 5, 1, NULL, 20),
(19477554102, 'Kordélia', 9, 1, 20, NULL),
(20357064730, 'Káldor', 1, 0, NULL, 3),
(20524067692, 'Líviusz', 1, 0, NULL, 21),
(20599804920, 'Szidalisz', 9, 0, 17, NULL),
(20679382960, 'Jelek', 9, 1, 25, NULL),
(21212143124, 'Nonna', 7, 0, 19, NULL),
(21441827094, 'Bertel', 4, 0, NULL, 15),
(21539527743, 'Ajnácska', 7, 1, 17, NULL),
(21940163130, 'Arszlán', 2, 0, NULL, 15),
(22164931541, 'Arszlán', 10, 0, 5, NULL),
(22630799918, 'Hetti', 1, 1, NULL, 25),
(22912463803, 'Ajád', 9, 0, 21, NULL),
(23415269701, 'Karolt', 5, 0, NULL, 19),
(23536030650, 'Dália', 3, 1, NULL, 8),
(23773150177, 'Illés', 9, 0, 25, NULL),
(24092513224, 'Gede', 3, 0, NULL, 1),
(24680101699, 'Kinizs', 8, 0, 12, NULL),
(25387127311, 'Bedő', 7, 0, 18, NULL),
(25845000212, 'Hunor', 8, 1, 22, NULL),
(26127900410, 'Kán', 9, 1, 1, NULL),
(26397099390, 'Johanka', 8, 0, 3, NULL),
(27218143363, 'Ráchel', 2, 0, NULL, 10),
(27487312630, 'Ottilia', 6, 0, 18, NULL),
(27849196376, 'Zsüsztin', 8, 0, 13, NULL),
(28599925707, 'Manda', 2, 0, NULL, 11),
(28624582110, 'Pázmán', 6, 1, 7, NULL),
(29726024776, 'Pippa', 10, 1, 8, NULL),
(29840644345, 'Adala', 3, 0, NULL, 21),
(30003829008, 'Nikoletta', 5, 1, NULL, 24),
(30021651625, 'Hanife', 5, 0, NULL, 1),
(30971493752, 'Nadinka', 1, 0, NULL, 20),
(31632182357, 'Olena', 5, 0, NULL, 9),
(32049847275, 'Morgána', 3, 0, NULL, 3),
(32280645197, 'Manóhar', 7, 1, 20, NULL),
(33917054065, 'Szedra', 9, 0, 18, NULL),
(35413195115, 'Nikosz', 9, 0, 18, NULL),
(36845443989, 'Szende', 5, 0, NULL, 16),
(37075842896, 'Dezmér', 4, 0, NULL, 4),
(37855806943, 'Gvendolin', 2, 0, NULL, 4),
(38304742837, 'Amadil', 6, 1, 22, NULL),
(38709252917, 'Jefte', 1, 0, NULL, 25),
(39059615102, 'Primula', 8, 0, 24, NULL),
(39218099124, 'Navid', 5, 1, NULL, 6),
(39772308980, 'Zenóbia', 9, 0, 1, NULL),
(39898203116, 'Emőd', 3, 1, NULL, 14),
(39941495288, 'Gellén', 4, 1, NULL, 22),
(40460974472, 'Frida', 7, 0, 6, NULL),
(40620748513, 'Evódia', 6, 1, 22, NULL),
(40905782357, 'Avenár', 7, 1, 2, NULL),
(41609806963, 'Annalujza', 8, 1, 7, NULL),
(41724403965, 'Milán', 8, 1, 12, NULL),
(43534218643, 'Celesztin', 9, 1, 17, NULL),
(44554240702, 'Színes', 1, 0, NULL, 3),
(45167716358, 'Lagerta', 8, 0, 14, NULL),
(45705012588, 'Arita', 7, 0, 23, NULL),
(45831756131, 'Modeszta', 5, 0, NULL, 12),
(45930005195, 'Mariska', 5, 1, NULL, 3),
(46673719922, 'Parker', 4, 0, NULL, 16),
(46930116398, 'Devana', 7, 0, 13, NULL),
(47040942085, 'Dejte', 3, 1, NULL, 23),
(49424656841, 'Juszuf', 2, 1, NULL, 21),
(49649687077, 'Jáel', 3, 0, NULL, 11),
(49694567524, 'Aníziusz', 5, 0, NULL, 25),
(49757988133, 'Ahillész', 8, 0, 16, NULL),
(50250061554, 'Erneszta', 6, 0, 18, NULL),
(51148317276, 'Léni', 10, 0, 10, NULL),
(51153897833, 'Eduán', 1, 0, NULL, 20),
(51338976570, 'Bóbita', 3, 0, NULL, 17),
(52985416672, 'Kemal', 4, 1, NULL, 1),
(53195580424, 'Adela', 7, 0, 12, NULL),
(53437234376, 'Milágrosz', 3, 1, NULL, 10),
(53508469756, 'Joel', 9, 1, 16, NULL),
(53807940081, 'Berill', 6, 0, 19, NULL),
(53876799910, 'Tinetta', 4, 0, NULL, 3),
(53961997051, 'Zajzon', 9, 0, 11, NULL),
(54021014436, 'Lula', 4, 1, NULL, 10),
(54079518448, 'Alap', 10, 0, 24, NULL),
(54163352166, 'Zamira', 4, 0, NULL, 16),
(54176328472, 'Manóhar', 10, 1, 19, NULL),
(54253175912, 'Avitál', 6, 1, 13, NULL),
(54866363658, 'Ernán', 8, 1, 13, NULL),
(55873609303, 'Mendi', 9, 1, 22, NULL),
(55931385144, 'Zsigmond', 5, 0, NULL, 5),
(56420718340, 'Kunigunda', 4, 1, NULL, 22),
(57284174229, 'Agrippína', 8, 1, 21, NULL),
(57337323591, 'Aba', 2, 0, NULL, 7),
(58122662048, 'Abelárd', 4, 0, NULL, 12),
(58330979760, 'Borcsa', 7, 0, 6, NULL),
(58698420752, 'Szaléz', 2, 0, NULL, 14),
(59435738506, 'Sztefani', 6, 0, 16, NULL),
(59505017940, 'Rápolt', 2, 0, NULL, 24),
(59859297803, 'Tánya', 2, 0, NULL, 4),
(60375923309, 'Elvir', 10, 0, 6, NULL),
(60644165796, 'Vító', 6, 0, 11, NULL),
(61043408571, 'Génia', 10, 1, 22, NULL),
(61492574172, 'Véta', 8, 1, 20, NULL),
(61770049108, 'Lizi', 2, 1, NULL, 17),
(64327221606, 'Héda', 6, 1, 17, NULL),
(64327534328, 'Gyula', 8, 0, 25, NULL),
(64418639803, 'Mirjam', 7, 0, 2, NULL),
(65742563998, 'Katalina', 8, 1, 3, NULL),
(65751767037, 'Rozalinda', 4, 1, NULL, 15),
(66092910062, 'Verka', 9, 0, 10, NULL),
(66279187806, 'Szamira', 7, 1, 9, NULL),
(66904996220, 'Torontál', 10, 0, 19, NULL),
(67508903588, 'Melissza', 1, 0, NULL, 3),
(67730900674, 'Ancilla', 2, 1, NULL, 11),
(67954201975, 'Ábris', 5, 0, NULL, 8),
(68885664799, 'Bardó', 7, 1, 2, NULL),
(69642155179, 'Brett', 7, 1, 15, NULL),
(69748012522, 'Ilárion', 9, 0, 3, NULL),
(70223383996, 'Nemere', 3, 0, NULL, 18),
(70331076583, 'Sarel', 10, 0, 5, NULL),
(70762502285, 'Iréneusz', 4, 0, NULL, 6),
(73394021995, 'Mór', 1, 1, NULL, 10),
(73874500027, 'Boris', 1, 0, NULL, 1),
(74810074100, 'Frézia', 6, 0, 17, NULL),
(75093092523, 'Szeverina', 1, 0, NULL, 13),
(75896885505, 'Elektra', 4, 0, NULL, 25),
(76017802989, 'Mikán', 7, 0, 25, NULL),
(76348023515, 'Médea', 8, 1, 18, NULL),
(76751513106, 'Zsanett', 4, 1, NULL, 1),
(77452793879, 'Bekes', 1, 0, NULL, 17),
(77541613975, 'Zsuzsa', 3, 0, NULL, 4),
(77832495844, 'Edizon', 5, 0, NULL, 6),
(78356153952, 'Mateusz', 1, 0, NULL, 5),
(78582283010, 'Néva', 5, 1, NULL, 19),
(78792665319, 'Magda', 2, 1, NULL, 24),
(78837536112, 'Bodó', 7, 1, 4, NULL),
(79064710837, 'Zelinda', 5, 0, NULL, 20),
(79317965445, 'Uros', 8, 0, 12, NULL),
(80062379440, 'Balmaz', 1, 1, NULL, 18),
(80495998103, 'Marinka', 5, 0, NULL, 10),
(80652426462, 'Balassa', 5, 1, NULL, 5),
(82405413981, 'Floransz', 9, 0, 11, NULL),
(83213273747, 'Gordon', 9, 0, 3, NULL),
(84099280967, 'Ágas', 3, 0, NULL, 7),
(85056702978, 'Ádomás', 9, 1, 24, NULL),
(85691638657, 'Max', 2, 0, NULL, 5),
(85951890616, 'Mona', 10, 1, 10, NULL),
(86404801214, 'Nella', 9, 1, 2, NULL),
(86984356010, 'Milanna', 5, 0, NULL, 4),
(87372346462, 'Jagelló', 1, 1, NULL, 15),
(87727221354, 'Jeles', 9, 0, 11, NULL),
(87941146602, 'Anatol', 3, 1, NULL, 15),
(88522021166, 'Nóna', 5, 1, NULL, 19),
(89141003480, 'Zorka', 4, 1, NULL, 21),
(89269691107, 'Milton', 7, 1, 1, NULL),
(89431015843, 'Bertina', 10, 0, 15, NULL),
(90209869685, 'Szaffi', 6, 1, 19, NULL),
(90788777912, 'Émi', 7, 0, 1, NULL),
(91548229532, 'Tuzson', 5, 0, NULL, 11),
(91632752315, 'Szemira', 5, 0, NULL, 9),
(91665987681, 'Tamerlán', 1, 1, NULL, 5),
(92537101403, 'Dzsenni', 5, 0, NULL, 7),
(93156466309, 'Eufémia', 8, 0, 10, NULL),
(93437874920, 'Levendula', 4, 1, NULL, 16),
(94085675580, 'Údó', 6, 1, 18, NULL),
(94094949256, 'Nasszer', 6, 1, 3, NULL),
(94163933685, 'Helmond', 1, 1, NULL, 22),
(94413132626, 'Melióra', 9, 0, 14, NULL),
(94925118050, 'Karacs', 2, 0, NULL, 9),
(95081400838, 'Krisztin', 8, 0, 9, NULL),
(95226871596, 'Sarolt', 9, 1, 25, NULL),
(95356185377, 'Csejte', 6, 1, 16, NULL),
(95965258643, 'Peggi', 7, 0, 24, NULL),
(95974861915, 'Ambos', 2, 1, NULL, 10),
(96167230045, 'Polda', 5, 1, NULL, 5),
(96178747480, 'Ingmár', 1, 0, NULL, 2),
(96762740742, 'Héra', 10, 0, 12, NULL),
(97159318968, 'Gilda', 6, 0, 18, NULL),
(97172435105, 'Kreola', 10, 0, 22, NULL),
(97274519582, 'Blanka', 6, 1, 25, NULL),
(97376248859, 'Csende', 7, 0, 2, NULL),
(98025320638, 'Eleanor', 3, 0, NULL, 25),
(98759224612, 'Zena', 5, 0, NULL, 16),
(99792999973, 'Józsiás', 7, 1, 6, NULL),
(99873776019, 'Honorát', 5, 1, NULL, 12),
(99895344333, 'Rezső', 10, 0, 3, NULL);

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
  ADD KEY `osztalyid` (`osztalyid`),
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
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

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
