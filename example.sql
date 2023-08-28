-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 28-08-2023 a las 21:47:28
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
DROP DATABASE IF EXISTS `cf_64b267fcd4f08`;
CREATE DATABASE IF NOT EXISTS `cf_64b267fcd4f08` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `cf_64b267fcd4f08`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orders`
--

DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `storeId` bigint(13) NOT NULL,
  `orderOrigin` varchar(150) DEFAULT NULL,
  `orderNumber` varchar(150) NOT NULL,
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

INSERT INTO `orders` (`id`, `storeId`, `orderOrigin`, `orderNumber`, `orderDate`, `orderStatus`, `customerName`, `companyName`, `vat`, `street`, `streetComplement`, `postalCode`, `city`, `state`, `country`, `contactPhone`, `contactMobile`, `contactEmail`) VALUES
(1, 1, 'Atleet', '2CJEJMVAM3', '2023-07-25 23:22:35', 'DONE', 'Marina Gorostiza Santa Cruz', NULL, NULL, 'Calle ormetxe 1 3c', NULL, '48992', 'Getxo', 'Vizcaya', 'España', '658741807', NULL, 'marina.gorostiza@gmail.com'),
(2, 1, 'Zalando', '11401061982190', '2023-08-15 23:22:35', 'OPEN', 'Graciela Fdez Fdez', NULL, NULL, 'Calle López de La Torre 4 Bar La Torre', NULL, '33120', 'Pravia Pravia', 'Asturias', 'España', '31604903895', NULL, 'email@email.com');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`,`storeId`,`orderNumber`) USING BTREE,
  ADD KEY `storeId` (`storeId`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`storeId`) REFERENCES `cf_logistics`.`stores` (`storeId`);
--
-- Base de datos: `cf_logistics`
--
DROP DATABASE IF EXISTS `cf_logistics`;
CREATE DATABASE IF NOT EXISTS `cf_logistics` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `cf_logistics`;

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
(1, '981239i1po2i3', 'Trendico', 1, 'Tréndico Group SL', 'Trendico Group S.L.', 'B99021644'),
(2, 'i098123oji1j23', 'Oxigeno', 1, 'Oxigeno Iberspor SL', 'Oxigeno Iberspor SL', 'B99350621'),
(666, '64b267fcd4f08', 'crasforum', 1, 'Cras Forum', 'GESTION DIGITAL LABS 23 SL', 'B02668911');

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
(1, 2),
(1, 666),
(3, 1),
(3, 666);

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
-- Estructura de tabla para la tabla `delivery_carriers`
--

DROP TABLE IF EXISTS `delivery_carriers`;
CREATE TABLE `delivery_carriers` (
  `id` int(11) NOT NULL,
  `name` varchar(150) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `accountId` int(11) DEFAULT NULL,
  `enviroment` enum('test','production') DEFAULT 'test',
  `deliveryType` varchar(100) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `labellerCode` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `delivery_carriers`
--

INSERT INTO `delivery_carriers` (`id`, `name`, `status`, `accountId`, `enviroment`, `deliveryType`, `username`, `password`, `labellerCode`) VALUES
(1, 'Correos Default', 'active', 666, 'production', 'correos', 'W81313323856C', 'N),7fKr0', '856C');

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

INSERT INTO `stores` (`id`, `storeId`, `accountId`, `name`, `commercialName`, `contactName`, `street`, `streetComplement`, `postalCode`, `city`, `state`, `country`, `contactPhone`, `contactMobile`, `contactEmail`) VALUES
(1, 1, 1, 'Foot on Mars Store Zaragoza', 'Foot on Mars Zaragoza', 'Victor', 'Paseo de Damas', '27', '50002', 'Zaragoza', 'Zaragoza', 'Spain', '876 61 01 37', NULL, 'zaragoza@footonmars.com');

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
(1, 'ayoubsaif@gmail.com', '$2y$10$XVBRuKaUqO2lHX5nX0063.UC9r8LwyoBth6PGcu973siHNz5VhDa6', 'Ayoub', 'Saif Manzahi', 'admin', NULL, 1, '', '2023-05-01 00:16:47'),
(3, 'john223133@example.com', '$2y$10$AZzgi/IQV97kse5.MGe.Je6XyJETP2nD9.4kXD.9cR4oF6rRs3lKG', 'John', 'Doe', 'client', NULL, NULL, NULL, '2023-08-14 18:58:09');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`id`,`accountId`) USING BTREE,
  ADD KEY `id` (`id`);

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
-- Indices de la tabla `delivery_carriers`
--
ALTER TABLE `delivery_carriers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `AccountID` (`accountId`);

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
  ADD KEY `Account ID` (`accountId`),
  ADD KEY `storeId` (`storeId`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=667;

--
-- AUTO_INCREMENT de la tabla `addresses`
--
ALTER TABLE `addresses`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `delivery_carriers`
--
ALTER TABLE `delivery_carriers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `stores`
--
ALTER TABLE `stores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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
-- Filtros para la tabla `delivery_carriers`
--
ALTER TABLE `delivery_carriers`
  ADD CONSTRAINT `AccountID` FOREIGN KEY (`accountId`) REFERENCES `accounts` (`id`);

--
-- Filtros para la tabla `stores`
--
ALTER TABLE `stores`
  ADD CONSTRAINT `Account ID` FOREIGN KEY (`accountId`) REFERENCES `accounts` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
