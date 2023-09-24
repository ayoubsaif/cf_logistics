-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 03-09-2023 a las 23:54:34
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
(1, 1, 'amazon', '2CJEJMVAM3', '2023-07-25 23:22:35', 'done', 'Marina Gorostiza Santa Cruz', NULL, NULL, 'Calle ormetxe 1 3c', NULL, '48992', 'Getxo', 'Vizcaya', 'España', '658741807', NULL, 'marina.gorostiza@gmail.com'),
(2, 1, 'aliexpress', '11401061982190', '2023-08-15 23:22:35', 'done', 'Graciela Fdez Fdez', NULL, NULL, 'Calle López de La Torre 4 Bar La Torre', NULL, '33120', 'Pravia', 'Asturias', 'España', '31604903895', NULL, 'email@email.com'),
(3, 1, 'hipercalzado', '11401061982191', '2023-08-15 23:22:35', 'done', 'Graciela Fdez Fdez', NULL, NULL, 'Calle López de La Torre 4 Bar La Torre', NULL, '28200', 'Madrid', 'Asturias', 'España', '31604903895', NULL, 'email@email.com'),
(4, 1, 'zalando', '11401061982192', '2023-08-15 23:22:35', 'done', 'Graciela Fdez Fdez', NULL, NULL, 'Calle López de La Torre 4 Bar La Torre', NULL, '33120', 'Pravia', 'Asturias', 'España', '31604903895', NULL, 'email@email.com'),
(5, 1, 'miravia', '11401061982193', '2023-08-15 23:22:35', 'done', 'Graciela Fdez Fdez', NULL, NULL, 'Calle López de La Torre 4 Bar La Torre', NULL, '50002', 'Zaragoza', 'Zaragoza', 'España', '31604903895', NULL, 'email@email.com'),
(6, 1, 'decathlon', '11401061982195', '2023-08-15 23:22:35', 'done', 'Graciela Fdez Fdez', NULL, NULL, 'Calle López de La Torre 4 Bar La Torre', NULL, '33120', 'Pravia', 'Asturias', 'España', '31604903895', NULL, 'email@email.com'),
(7, 1, 'miravia', '11401061982196', '2023-08-15 23:22:35', 'done', 'Graciela Fdez Fdez', NULL, NULL, 'Calle López de La Torre 4 Bar La Torre', NULL, '33120', 'Pravia', 'Asturias', 'España', '31604903895', NULL, 'email@email.com'),
(8, 1, 'zalando', '11401061982197', '2023-08-20 23:22:35', 'done', 'Graciela Fdez Fdez', NULL, NULL, 'Calle López de La Torre 4 Bar La Torre', NULL, '33120', 'Pravia', 'Asturias', 'España', '31604903895', NULL, 'email@email.com'),
(9, 1, 'miinto', '11401061982198', '2023-08-29 23:22:35', 'done', 'Graciela Fdez Fdez', NULL, NULL, 'Calle López de La Torre 4 Bar La Torre', NULL, '33120', 'Valencia', 'Valencia', 'España', '31604903895', NULL, 'email@email.com'),
(10, 1, 'zalando', '11401061982199', '2023-08-15 23:22:35', 'done', 'Graciela Fdez Fdez', NULL, NULL, 'Calle López de La Torre 4 Bar La Torre', NULL, '33120', 'Pravia', 'Asturias', 'España', '31604903895', NULL, 'email@email.com'),
(11, 1, 'miravia', '11401061982180', '2023-08-17 23:22:35', 'done', 'Graciela Fdez Fdez', NULL, NULL, 'Calle López de La Torre 4 Bar La Torre', NULL, '33120', 'Pravia', 'Asturias', 'España', '31604903895', NULL, 'email@email.com'),
(12, 1, 'zalando', '11401061982181', '2023-08-15 23:22:35', 'done', 'Graciela Fdez Fdez', NULL, NULL, 'Calle López de La Torre 4 Bar La Torre', NULL, '33120', 'Pravia', 'Asturias', 'España', '31604903895', NULL, 'email@email.com'),
(13, 1, 'carrefour', '11401061982182', '2023-08-15 23:22:35', 'done', 'Graciela Fdez Fdez', NULL, NULL, 'Calle López de La Torre 4 Bar La Torre', NULL, '33120', 'Pravia', 'Asturias', 'España', '31604903895', NULL, 'email@email.com'),
(14, 1, 'zalando', '11401061982183', '2023-08-15 23:22:35', 'done', 'Graciela Fdez Fdez', NULL, NULL, 'Calle López de La Torre 4 Bar La Torre', NULL, '33120', 'Pravia', 'Asturias', 'España', '31604903895', NULL, 'email@email.com'),
(15, 1, 'colizey', '11401061982184', '2023-08-24 23:22:35', 'done', 'Graciela Fdez Fdez', NULL, NULL, 'Calle López de La Torre 4 Bar La Torre', NULL, '33120', 'Pravia', 'Asturias', 'España', '31604903895', NULL, 'email@email.com'),
(16, 1, 'zalando', '11401061982185', '2023-08-15 23:22:35', 'done', 'Graciela Fdez Fdez', NULL, NULL, 'Calle López de La Torre 4 Bar La Torre', NULL, '33120', 'Pravia', 'Asturias', 'España', '31604903895', NULL, 'email@email.com'),
(17, 1, 'spartoo', '11401061982186', '2023-08-15 23:22:35', 'done', 'Graciela Fdez Fdez', NULL, NULL, 'Calle López de La Torre 4 Bar La Torre', NULL, '33120', 'Pravia', 'Asturias', 'España', '31604903895', NULL, 'email@email.com'),
(18, 1, 'zalando', '11401061982187', '2023-08-31 23:22:35', 'done', 'Graciela Fdez Fdez', NULL, NULL, 'Calle López de La Torre 4 Bar La Torre', NULL, '33120', 'Pravia', 'Asturias', 'España', '31604903895', NULL, 'email@email.com'),
(19, 1, 'amazon', '11401061982188', '2023-08-15 23:22:35', 'done', 'Graciela Fdez Fdez', NULL, NULL, 'Calle López de La Torre 4 Bar La Torre', NULL, '33120', 'Pravia', 'Asturias', 'España', '31604903895', NULL, 'email@email.com'),
(20, 1, 'pccomponentes', '11401061982189', '2023-08-15 23:22:35', 'done', 'Graciela Fdez Fdez', NULL, NULL, 'Calle López de La Torre 4 Bar La Torre', NULL, '33120', 'Pravia', 'Asturias', 'España', '31604903895', NULL, 'email@email.com'),
(21, 1, 'hipercalzado', '11401061982170', '2023-08-15 23:22:35', 'done', 'Graciela Fdez Fdez', NULL, NULL, 'Calle López de La Torre 4 Bar La Torre', NULL, '33120', 'Pravia', 'Asturias', 'España', '31604903895', NULL, 'email@email.com'),
(22, 1, 'elcorteingles', '11401061982171', '2023-08-15 23:22:35', 'done', 'Graciela Fdez Fdez', NULL, NULL, 'Calle López de La Torre 4 Bar La Torre', NULL, '33120', 'Pravia', 'Asturias', 'España', '31604903895', NULL, 'email@email.com');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `StoreID relation` FOREIGN KEY (`storeId`) REFERENCES `cf_logistics`.`stores` (`storeId`) ON DELETE NO ACTION ON UPDATE CASCADE;
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
(1, 1, 1, 'Foot on Mars Store Zaragoza', 'Foot on Mars Zaragoza', 'Victor', 'Paseo de Damas', '27', '50002', 'Zaragoza', 'Zaragoza', 'Spain', '876 61 01 37', NULL, 'zaragoza@footonmars.com'),
(2, 2, 1, 'Atleet Store Zaragoza', 'Atleet Zaragoza', 'Victor', 'Maria Zambrano', '31', '50018', 'Zaragoza', 'Zaragoza', 'Spain', '876 61 01 37', NULL, 'zaragoza@atleet.store');

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
(1, 'ayoubsaif@gmail.com', '$2y$10$XVBRuKaUqO2lHX5nX0063.UC9r8LwyoBth6PGcu973siHNz5VhDa6', 'Ayoub', 'Saif Manzahi', 'admin', 'https://lh3.googleusercontent.com/ogw/AGvuzYaIa_Nth4F5ARDU9j_N9m1zE5I-BkXlYzl9YEKc0g=s500-c-mo', 1, '', '2023-05-01 00:16:47'),
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
