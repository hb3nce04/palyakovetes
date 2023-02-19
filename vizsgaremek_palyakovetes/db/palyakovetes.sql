-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 19, 2023 at 04:06 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `palyakovetes`
--
CREATE DATABASE IF NOT EXISTS `palyakovetes` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_hungarian_ci;
USE `palyakovetes`;

-- --------------------------------------------------------

--
-- Table structure for table `agazat`
--

CREATE TABLE `agazat` (
  `id` int(3) NOT NULL,
  `nev` varchar(255) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `szam` varchar(255) COLLATE utf8mb4_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- Dumping data for table `agazat`
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
-- Table structure for table `felhasznalo`
--

CREATE TABLE `felhasznalo` (
  `om_azon` int(11) NOT NULL,
  `iskolaid` int(2) NOT NULL,
  `jelszo` varchar(60) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `admin` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- --------------------------------------------------------

--
-- Table structure for table `iskola`
--

CREATE TABLE `iskola` (
  `id` int(2) NOT NULL,
  `nev` varchar(255) COLLATE utf8mb4_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- --------------------------------------------------------

--
-- Table structure for table `kategoria`
--

CREATE TABLE `kategoria` (
  `id` int(2) NOT NULL,
  `megnevezes` varchar(255) COLLATE utf8mb4_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- Dumping data for table `kategoria`
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
-- Table structure for table `osztaly`
--

CREATE TABLE `osztaly` (
  `id` int(4) NOT NULL,
  `iskolaid` int(2) NOT NULL,
  `felhasznalo_om` int(11) NOT NULL,
  `nev` varchar(255) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `vegzesi_ev` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- --------------------------------------------------------

--
-- Table structure for table `palya`
--

CREATE TABLE `palya` (
  `id` int(11) NOT NULL,
  `diak_om_azon` int(11) NOT NULL,
  `kategoriaid` int(2) NOT NULL,
  `leiras` varchar(255) COLLATE utf8mb4_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- --------------------------------------------------------

--
-- Table structure for table `szakma`
--

CREATE TABLE `szakma` (
  `id` int(3) NOT NULL,
  `nev` varchar(255) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `szam` varchar(255) COLLATE utf8mb4_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tanulo`
--

CREATE TABLE `tanulo` (
  `om_azon` int(11) NOT NULL,
  `nev` varchar(255) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `osztalyid` int(4) NOT NULL,
  `nappali_munkarend` tinyint(1) NOT NULL DEFAULT 1,
  `agazatid` int(3) DEFAULT NULL,
  `szakid` int(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `agazat`
--
ALTER TABLE `agazat`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `szam` (`szam`);

--
-- Indexes for table `felhasznalo`
--
ALTER TABLE `felhasznalo`
  ADD PRIMARY KEY (`om_azon`),
  ADD UNIQUE KEY `jelszo` (`jelszo`),
  ADD UNIQUE KEY `iskolaid` (`iskolaid`);

--
-- Indexes for table `iskola`
--
ALTER TABLE `iskola`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `kategoria`
--
ALTER TABLE `kategoria`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `megnevezes` (`megnevezes`);

--
-- Indexes for table `osztaly`
--
ALTER TABLE `osztaly`
  ADD PRIMARY KEY (`id`),
  ADD KEY `osztaly_ibfk_2` (`iskolaid`),
  ADD KEY `osztaly_ibfk_3` (`felhasznalo_om`);

--
-- Indexes for table `palya`
--
ALTER TABLE `palya`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `diak_om_azon` (`diak_om_azon`),
  ADD KEY `palya_ibfk_3` (`kategoriaid`);

--
-- Indexes for table `szakma`
--
ALTER TABLE `szakma`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `szam` (`szam`);

--
-- Indexes for table `tanulo`
--
ALTER TABLE `tanulo`
  ADD PRIMARY KEY (`om_azon`),
  ADD UNIQUE KEY `osztalyid` (`osztalyid`),
  ADD KEY `tanulo_ibfk_6` (`agazatid`),
  ADD KEY `tanulo_ibfk_7` (`szakid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `agazat`
--
ALTER TABLE `agazat`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT for table `iskola`
--
ALTER TABLE `iskola`
  MODIFY `id` int(2) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `kategoria`
--
ALTER TABLE `kategoria`
  MODIFY `id` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `osztaly`
--
ALTER TABLE `osztaly`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `palya`
--
ALTER TABLE `palya`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `szakma`
--
ALTER TABLE `szakma`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `osztaly`
--
ALTER TABLE `osztaly`
  ADD CONSTRAINT `osztaly_ibfk_2` FOREIGN KEY (`iskolaid`) REFERENCES `iskola` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `osztaly_ibfk_3` FOREIGN KEY (`felhasznalo_om`) REFERENCES `felhasznalo` (`om_azon`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `palya`
--
ALTER TABLE `palya`
  ADD CONSTRAINT `palya_ibfk_2` FOREIGN KEY (`diak_om_azon`) REFERENCES `tanulo` (`om_azon`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `palya_ibfk_3` FOREIGN KEY (`kategoriaid`) REFERENCES `kategoria` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tanulo`
--
ALTER TABLE `tanulo`
  ADD CONSTRAINT `tanulo_ibfk_5` FOREIGN KEY (`osztalyid`) REFERENCES `osztaly` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tanulo_ibfk_6` FOREIGN KEY (`agazatid`) REFERENCES `agazat` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tanulo_ibfk_7` FOREIGN KEY (`szakid`) REFERENCES `szakma` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
