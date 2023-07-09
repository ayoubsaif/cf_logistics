-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-07-2023 a las 00:03:23
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
-- Base de datos: `cr_logistics_dev`
--
CREATE DATABASE IF NOT EXISTS `cr_logistics_dev` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `cr_logistics_dev`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `accounts`
--

DROP TABLE IF EXISTS `accounts`;
CREATE TABLE `accounts` (
  `id` int(11) NOT NULL,
  `accountId` varchar(36) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `status` tinyint(4) NOT NULL,
  `companyName` varchar(255) DEFAULT NULL,
  `companyLegalName` varchar(255) DEFAULT NULL,
  `companyVat` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `accounts`
--

INSERT INTO `accounts` (`id`, `accountId`, `name`, `status`, `companyName`, `companyLegalName`, `companyVat`) VALUES
(1, '', 'Trendico', 1, 'Tréndico Group SL', 'Trendico Group S.L.', 'B99021644'),
(2, '', 'Oxigeno', 1, 'Oxigeno Iberspor SL', 'Oxigeno Iberspor SL', 'B99350621'),
(657, '3e98a348-1db0-11ee-8349-bf4d446d586f', 'crasforum', 1, 'Cras Forum', 'GESTION DIGITAL LABS 23 SL', 'B02668911');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `accounts_users_rel`
--

DROP TABLE IF EXISTS `accounts_users_rel`;
CREATE TABLE `accounts_users_rel` (
  `userId` int(11) NOT NULL,
  `accountId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `accounts_users_rel`
--

INSERT INTO `accounts_users_rel` (`userId`, `accountId`) VALUES
(1, 1),
(1, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `addresses`
--

DROP TABLE IF EXISTS `addresses`;
CREATE TABLE `addresses` (
  `id` int(20) NOT NULL,
  `addressName` varchar(255) DEFAULT NULL,
  `contactName` varchar(255) DEFAULT NULL,
  `companyName` varchar(255) DEFAULT NULL,
  `vat` varchar(20) DEFAULT NULL,
  `street` varchar(255) DEFAULT NULL,
  `streetComplement` varchar(255) DEFAULT NULL,
  `postalCode` varchar(20) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `contactPhone` varchar(20) DEFAULT NULL,
  `contactMobile` varchar(20) DEFAULT NULL,
  `contactEmail` varchar(255) DEFAULT NULL,
  `accountId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `site_config`
--

DROP TABLE IF EXISTS `site_config`;
CREATE TABLE `site_config` (
  `variable` varchar(50) NOT NULL,
  `value` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `site_config`
--

INSERT INTO `site_config` (`variable`, `value`) VALUES
('title', 'Cras Forum Logistics');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `stores`
--

DROP TABLE IF EXISTS `stores`;
CREATE TABLE `stores` (
  `id` int(11) NOT NULL,
  `storeId` bigint(13) NOT NULL,
  `accountId` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `commercialName` varchar(255) DEFAULT NULL,
  `contactName` varchar(255) DEFAULT NULL,
  `vat` varchar(255) DEFAULT NULL,
  `street` varchar(255) DEFAULT NULL,
  `streetComplement` varchar(255) DEFAULT NULL,
  `postalCode` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `contactPhone` varchar(255) DEFAULT NULL,
  `contactMobile` varchar(255) DEFAULT NULL,
  `contactEmail` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `stores`
--

INSERT INTO `stores` (`id`, `storeId`, `accountId`, `name`, `commercialName`, `contactName`, `vat`, `street`, `streetComplement`, `postalCode`, `city`, `state`, `country`, `contactPhone`, `contactMobile`, `contactEmail`) VALUES
(0, 1, 1, 'Foot on Mars Store Zaragoza', 'Foot on Mars Zaragoza', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL COMMENT 'E-Mail for contact and login',
  `password` varchar(255) NOT NULL COMMENT 'User Password for login pruposes',
  `firstName` varchar(255) NOT NULL COMMENT 'User Firstname',
  `lastName` varchar(255) NOT NULL COMMENT 'User Lastname',
  `role` enum('admin','client') DEFAULT 'client' COMMENT 'Permission Type Admin or Client',
  `image` varchar(255) DEFAULT NULL COMMENT 'Avatar iamge URL',
  `active` tinyint(4) DEFAULT NULL COMMENT 'State of user',
  `googleId` varchar(50) DEFAULT NULL COMMENT 'Google User ID',
  `createDate` datetime DEFAULT current_timestamp() COMMENT 'Create Date'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `firstName`, `lastName`, `role`, `image`, `active`, `googleId`, `createDate`) VALUES
(1, 'ayoubsaif@gmail.com', '$2y$10$XVBRuKaUqO2lHX5nX0063.UC9r8LwyoBth6PGcu973siHNz5VhDa6', 'Ayoub', 'Saif Manzahi', 'admin', 'http://localhost/uploads/users/6491e17884274_ayoub_profile.png', 1, '108460731755381611754', '2023-05-01 00:16:47');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`id`,`accountId`) USING BTREE;

--
-- Indices de la tabla `accounts_users_rel`
--
ALTER TABLE `accounts_users_rel`
  ADD PRIMARY KEY (`userId`,`accountId`) USING BTREE,
  ADD KEY `accountId` (`accountId`);

--
-- Indices de la tabla `addresses`
--
ALTER TABLE `addresses`
  ADD PRIMARY KEY (`id`,`accountId`) USING BTREE,
  ADD KEY `Address User` (`accountId`);

--
-- Indices de la tabla `site_config`
--
ALTER TABLE `site_config`
  ADD PRIMARY KEY (`variable`) USING BTREE,
  ADD UNIQUE KEY `variable.unique` (`variable`) USING BTREE COMMENT 'Unique variable name';

--
-- Indices de la tabla `stores`
--
ALTER TABLE `stores`
  ADD PRIMARY KEY (`id`,`storeId`,`accountId`,`name`) USING BTREE,
  ADD KEY `Account ID` (`accountId`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`,`email`) USING BTREE,
  ADD UNIQUE KEY `Id` (`id`) USING BTREE COMMENT 'id',
  ADD UNIQUE KEY `Unique email` (`email`) USING BTREE COMMENT 'email',
  ADD UNIQUE KEY `Google ID Unique` (`googleId`) USING BTREE COMMENT 'google_id';

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `accounts`
--
ALTER TABLE `accounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=658;

--
-- AUTO_INCREMENT de la tabla `addresses`
--
ALTER TABLE `addresses`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `accounts_users_rel`
--
ALTER TABLE `accounts_users_rel`
  ADD CONSTRAINT `Account` FOREIGN KEY (`accountId`) REFERENCES `accounts` (`id`),
  ADD CONSTRAINT `User` FOREIGN KEY (`userId`) REFERENCES `users` (`id`);

--
-- Filtros para la tabla `stores`
--
ALTER TABLE `stores`
  ADD CONSTRAINT `Account ID` FOREIGN KEY (`accountId`) REFERENCES `accounts` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
