-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 26-03-2021 a las 20:02:55
-- Versión del servidor: 5.7.31
-- Versión de PHP: 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `notas2000`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notas2021`
--

DROP TABLE IF EXISTS `notas2021`;
CREATE TABLE IF NOT EXISTS `notas2021` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cod_alum` varchar(5) CHARACTER SET latin1 NOT NULL,
  `fecha_ing` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `codigoNota` varchar(8) CHARACTER SET latin1 NOT NULL,
  `nota` varchar(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `notas2021`
--

INSERT INTO `notas2021` (`id`, `cod_alum`, `fecha_ing`, `codigoNota`, `nota`) VALUES
(15, '11707', '2021-03-26 14:39:23', 'A11707', '1.3'),
(16, '11707', '2021-03-26 14:39:23', 'B11707', '2.0'),
(17, '11628', '2021-03-26 14:39:23', 'B11628', '2.4'),
(18, '11964', '2021-03-26 14:39:23', 'A11964', '3.6'),
(19, '11964', '2021-03-26 14:39:23', 'B11964', '4.1');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
