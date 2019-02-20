-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Oct 02, 2018 at 09:16 PM
-- Server version: 5.7.23-0ubuntu0.16.04.1
-- PHP Version: 7.0.30-0ubuntu0.16.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `retaildb`
--

-- --------------------------------------------------------

--
-- Table structure for table `retail2`
--

CREATE TABLE `retail2` (
  `idt` text NOT NULL,
  `tit` text NOT NULL,
  `img` text NOT NULL,
  `pri` text NOT NULL,
  `ido` text NOT NULL,
  `eth` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `retail2`
--

INSERT INTO `retail2` (`idt`, `tit`, `img`, `pri`, `ido`, `eth`) VALUES
('1', 'sach1', 'https://vcdn.tikicdn.com/cache/175x175/media/catalog/product/d/o/dong-song-tho-au.u5131.d20170516.t161319.69089.jpg', '4', '002', '0.004'),
('2', 'sach2', 'https://vcdn.tikicdn.com/cache/175x175/ts/product/fd/07/7d/dd8572d8837fa68b9220be3e16f64afd.jpg', '15', '001', '0.003'),
('3', 'sach 3', 'https://vcdn.tikicdn.com/cache/175x175/ts/product/f8/33/af/6a4e15083cee96b74e8e4bb4cbc3abda.jpg', '8', '001', '0.08'),
('4', 'sach 4', 'https://vcdn.tikicdn.com/cache/175x175/ts/product/e7/20/31/7c9bfafd2236f2cf5abd71ab2eaf7ae1.jpg', '12', '002', '0.014'),
('5', 'sach 5', 'https://vcdn.tikicdn.com/cache/175x175/ts/product/e5/55/1d/4b3af9081f0843f425faccf1edc3b993.jpg', '16', '001', '0.07'),
('6', 'sach6', 'https://vcdn.tikicdn.com/cache/175x175/media/catalog/product/9/7/9786046981930_1.u3059.d20170622.t125617.794882.jpg', '8', '002', '0.012');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
