-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 26-06-2023 a las 23:59:57
-- Versión del servidor: 10.4.22-MariaDB
-- Versión de PHP: 8.1.0

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
-- Estructura de tabla para la tabla `site_config`
--

CREATE TABLE `site_config` (
  `variable` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
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
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'E-Mail for contact and login',
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'User Password for login pruposes',
  `firstname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'User Firstname',
  `lastname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'User Lastname',
  `username` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bio` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` enum('admin','teacher','student') COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Permission Type Admin, Teacher or Student',
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Avatar iamge URL',
  `active` tinyint(4) DEFAULT NULL COMMENT 'State of user',
  `google_id` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Google User ID',
  `create_date` datetime DEFAULT current_timestamp() COMMENT 'Create Date'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `firstname`, `lastname`, `username`, `bio`, `role`, `image`, `active`, `google_id`, `create_date`) VALUES
(1, 'ayoubsaif@gmail.com', '$2y$10$XVBRuKaUqO2lHX5nX0063.UC9r8LwyoBth6PGcu973siHNz5VhDa6', 'Ayoub', 'Saif Manzahi', 'ayoubsaif', 'Streamings sobre Desarrollo FullStack con JavaScript de midudev en Twitch. Directos completos y extracto de los mejores momentos.', 'admin', 'http://localhost/uploads/users/6491e17884274_ayoub_profile.png', 1, '108460731755381611754', '2023-05-01 00:16:47');

--
-- Índices para tablas volcadas
--

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
  ADD UNIQUE KEY `Unique username` (`username`) USING BTREE COMMENT 'username',
  ADD UNIQUE KEY `Google ID Unique` (`google_id`) USING BTREE COMMENT 'google_id';

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
