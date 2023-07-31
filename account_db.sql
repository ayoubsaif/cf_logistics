-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 31-07-2023 a las 13:37:06
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `cf_64b267fcd4f08`
--
CREATE DATABASE IF NOT EXISTS `cf_64b267fcd4f08` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `cf_64b267fcd4f08`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orders`
--

DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `orderNumber` varchar(150) DEFAULT NULL,
  `orderDate` datetime DEFAULT NULL,
  `orderStatus` varchar(50) DEFAULT NULL,
  `customerName` varchar(100) DEFAULT NULL,
  `companyName` varchar(100) DEFAULT NULL,
  `vat` varchar(50) DEFAULT NULL,
  `street` varchar(100) DEFAULT NULL,
  `streetComplement` varchar(100) DEFAULT NULL,
  `postalCode` varchar(15) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `state` varchar(100) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `contactPhone` varchar(50) DEFAULT NULL,
  `contactMobile` varchar(50) DEFAULT NULL,
  `contactEmail` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `orders`
--

INSERT INTO `orders` (`id`, `orderNumber`, `orderDate`, `orderStatus`, `customerName`, `companyName`, `vat`, `street`, `streetComplement`, `postalCode`, `city`, `state`, `country`, `contactPhone`, `contactMobile`, `contactEmail`) VALUES
(1, '2CJEJMVAM3', '2023-07-25 23:22:35', 'draft', 'Marina Gorostiza Santa Cruz', NULL, NULL, 'Calle ormetxe 1 3c', NULL, '48992', 'Getxo', 'Vizcaya', 'España', '658741807', NULL, 'marina.gorostiza@gmail.com');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
