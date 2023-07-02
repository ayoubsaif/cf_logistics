-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 02-07-2023 a las 23:52:32
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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `accounts`
--

CREATE TABLE `accounts` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `status` tinyint(4) NOT NULL,
  `companyName` varchar(255) DEFAULT NULL,
  `companyLegalName` varchar(255) DEFAULT NULL,
  `companyTaxNo` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `accountsusersrel`
--

CREATE TABLE `accountsusersrel` (
  `userId` int(11) NOT NULL,
  `accountId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `addresses`
--

CREATE TABLE `addresses` (
  `id` int(20) NOT NULL,
  `addressName` varchar(255) DEFAULT NULL,
  `contactName` varchar(255) DEFAULT NULL,
  `companyName` varchar(255) DEFAULT NULL,
  `docId` varchar(20) DEFAULT NULL,
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
-- Estructura de tabla para la tabla `menu_items`
--

CREATE TABLE `menu_items` (
  `id` int(11) NOT NULL,
  `order` int(11) DEFAULT NULL,
  `label` varchar(255) DEFAULT NULL,
  `subLabel` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `parent_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `menu_items`
--

INSERT INTO `menu_items` (`id`, `order`, `label`, `subLabel`, `url`, `parent_id`) VALUES
(1, 1, 'Pedidos', 'Pedidos', '', NULL),
(2, 1, 'Abiertos', NULL, '/orders/open', 1),
(3, 2, 'Información', 'Información', '/information', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `site_config`
--

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
-- Estructura de tabla para la tabla `users`
--

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
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `accountsusersrel`
--
ALTER TABLE `accountsusersrel`
  ADD PRIMARY KEY (`userId`,`accountId`) USING BTREE,
  ADD KEY `accountId` (`accountId`);

--
-- Indices de la tabla `addresses`
--
ALTER TABLE `addresses`
  ADD PRIMARY KEY (`id`,`accountId`) USING BTREE,
  ADD KEY `Address User` (`accountId`);

--
-- Indices de la tabla `menu_items`
--
ALTER TABLE `menu_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `parent_id` (`parent_id`);

--
-- Indices de la tabla `site_config`
--
ALTER TABLE `site_config`
  ADD PRIMARY KEY (`variable`) USING BTREE,
  ADD UNIQUE KEY `variable.unique` (`variable`) USING BTREE COMMENT 'Unique variable name';

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `addresses`
--
ALTER TABLE `addresses`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `menu_items`
--
ALTER TABLE `menu_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `accountsusersrel`
--
ALTER TABLE `accountsusersrel`
  ADD CONSTRAINT `Account` FOREIGN KEY (`accountId`) REFERENCES `accounts` (`id`),
  ADD CONSTRAINT `User` FOREIGN KEY (`userId`) REFERENCES `users` (`id`);

--
-- Filtros para la tabla `menu_items`
--
ALTER TABLE `menu_items`
  ADD CONSTRAINT `menu_items_ibfk_1` FOREIGN KEY (`parent_id`) REFERENCES `menu_items` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
