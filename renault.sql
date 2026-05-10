-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: mysql:3306
-- Generation Time: May 10, 2026 at 04:31 PM
-- Server version: 8.0.46
-- PHP Version: 8.3.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `renault`
--

-- --------------------------------------------------------

--
-- Table structure for table `agencies`
--

CREATE TABLE `agencies` (
  `Id` int NOT NULL,
  `Name` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Address` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Email` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Phone` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `agencies`
--

INSERT INTO `agencies` (`Id`, `Name`, `Address`, `Email`, `Phone`) VALUES
(5, 'Agence Tunis Centre', '36.8065, 10.1815', 'tunis.centre@auto.com', '+216 71 111 111'),
(6, 'Agence Ariana', '36.8625, 10.1956', 'ariana@auto.com', '+216 71 222 222'),
(7, 'Agence Sfax', '34.7398, 10.7600', 'sfax@auto.com', '+216 74 333 333'),
(8, 'Agence Sousse', '35.8256, 10.6084', 'sousse@auto.com', '+216 73 444 444'),
(9, 'Agence Nabeul', '36.4561, 10.7376', 'nabeul@auto.com', '+216 72 555 555'),
(10, 'Agence Bizerte', '37.2744, 9.8739', 'bizerte@auto.com', '+216 72 666 666'),
(11, 'Agence Monastir', '35.7643, 10.8113', 'monastir@auto.com', '+216 73 777 777'),
(12, 'Agence Gabes', '33.8815, 10.0982', 'gabes@auto.com', '+216 75 888 888'),
(13, 'Agence Kairouan', '35.6781, 10.0963', 'kairouan@auto.com', '+216 77 999 999'),
(14, 'Agence Djerba', '33.8076, 10.8451', 'djerba@auto.com', '+216 75 101 010');

-- --------------------------------------------------------

--
-- Table structure for table `agencyservices`
--

CREATE TABLE `agencyservices` (
  `Id` int NOT NULL,
  `AgencyId` int NOT NULL,
  `ServiceId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `agencyservices`
--

INSERT INTO `agencyservices` (`Id`, `AgencyId`, `ServiceId`) VALUES
(11, 5, 7),
(12, 5, 8),
(13, 5, 9),
(14, 5, 10),
(15, 5, 11),
(16, 6, 8),
(17, 6, 9),
(18, 6, 12),
(19, 6, 13),
(20, 6, 15),
(21, 7, 7),
(22, 7, 9),
(23, 7, 10),
(24, 7, 12),
(25, 7, 14),
(26, 8, 8),
(27, 8, 11),
(28, 8, 12),
(29, 8, 13),
(30, 8, 15),
(31, 9, 7),
(32, 9, 8),
(33, 9, 9),
(34, 9, 10),
(35, 9, 12),
(36, 10, 7),
(37, 10, 11),
(38, 10, 12),
(39, 10, 14),
(40, 10, 15),
(41, 11, 8),
(42, 11, 9),
(43, 11, 10),
(44, 11, 13),
(45, 11, 14),
(46, 12, 7),
(47, 12, 9),
(48, 12, 11),
(49, 12, 12),
(50, 12, 15),
(51, 13, 8),
(52, 13, 10),
(53, 13, 12),
(54, 13, 13),
(55, 13, 14),
(56, 14, 7),
(57, 14, 8),
(58, 14, 9),
(59, 14, 11),
(60, 14, 15);

-- --------------------------------------------------------

--
-- Table structure for table `otpcode`
--

CREATE TABLE `otpcode` (
  `Id` int NOT NULL,
  `PhoneNumber` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `Code` varchar(6) COLLATE utf8mb4_general_ci NOT NULL,
  `ExpiresAt` datetime NOT NULL,
  `CreatedAt` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `otpcode`
--

INSERT INTO `otpcode` (`Id`, `PhoneNumber`, `Code`, `ExpiresAt`, `CreatedAt`) VALUES
(12, '12345678', '621171', '2026-05-10 08:05:30', '2026-05-10 08:00:30'),
(13, '25084006', '431814', '2026-05-10 08:05:41', '2026-05-10 08:00:41'),
(14, '25084006', '533150', '2026-05-10 08:11:09', '2026-05-10 08:06:09'),
(15, '25084006', '797761', '2026-05-10 11:03:38', '2026-05-10 10:58:37');

-- --------------------------------------------------------

--
-- Table structure for table `phonenumbers`
--

CREATE TABLE `phonenumbers` (
  `Id` int NOT NULL,
  `VehicleId` int NOT NULL,
  `PhoneNumber` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `CreatedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `IsVerified` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `phonenumbers`
--

INSERT INTO `phonenumbers` (`Id`, `VehicleId`, `PhoneNumber`, `CreatedAt`, `IsVerified`) VALUES
(4, 2, '12345678', '2026-05-10 07:58:19', 0),
(5, 2, '25084006', '2026-05-10 08:06:18', 1),
(6, 22, '25084006', '2026-05-10 10:58:41', 0);

-- --------------------------------------------------------

--
-- Table structure for table `rdvs`
--

CREATE TABLE `rdvs` (
  `id` int NOT NULL,
  `vehicle_id` int NOT NULL,
  `phone_number_id` int NOT NULL,
  `service_id` int NOT NULL,
  `agency_id` int NOT NULL,
  `appointment_date` date NOT NULL,
  `appointment_time` time NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rdvs`
--

INSERT INTO `rdvs` (`id`, `vehicle_id`, `phone_number_id`, `service_id`, `agency_id`, `appointment_date`, `appointment_time`, `created_at`) VALUES
(9, 2, 4, 7, 5, '2026-05-10', '720:00:00', '2026-05-10 08:09:52'),
(10, 2, 4, 8, 7, '2026-05-05', '08:00:00', '2026-05-10 08:12:18'),
(11, 22, 6, 7, 7, '2026-05-06', '08:00:00', '2026-05-10 11:00:14'),
(12, 22, 6, 7, 9, '2026-05-07', '08:00:00', '2026-05-10 12:34:18'),
(13, 22, 6, 8, 7, '2026-05-06', '08:00:00', '2026-05-10 16:25:31'),
(14, 22, 6, 8, 12, '2026-05-06', '08:00:00', '2026-05-10 16:29:46');

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `Id` int NOT NULL,
  `Name` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Description` text COLLATE utf8mb4_general_ci,
  `Img` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `DurationMinutes` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`Id`, `Name`, `Description`, `Img`, `DurationMinutes`) VALUES
(7, 'Vidange', 'Changement d’huile et filtre pour votre moteur', 'vidange.png', 30),
(8, 'Révision', 'Contrôle complet du véhicule pour la sécurité', 'checklist.png', 90),
(9, 'Freins', 'Inspection et remplacement des plaquettes et disques', 'brakes.png', 60),
(10, 'Échappement', 'Réparation et contrôle du système d’échappement', 'exhaust-pipe.png', 60),
(11, 'Batterie', 'Vérification et remplacement de la batterie', 'image1.png', 15),
(12, 'Pneus', 'Montage, équilibrage et contrôle de vos pneus', 'car.png', 60),
(13, 'Climatisation', 'Entretien et recharge du système de climatisation', 'air-conditioning.png', 45),
(14, 'Carrosserie', 'Réparation et peinture de la carrosseriere', 'reparation-de-carrosserie.png', 2),
(15, 'Diagnostic', 'Analyse électronique et détection des pannes', 'image.png', 20);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `Id` int NOT NULL,
  `FullName` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Email` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Password` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`Id`, `FullName`, `Email`, `Password`) VALUES
(1, 'Rayen Sayadi', 'rayen99.sayadi@gmail.com', '12345678');

-- --------------------------------------------------------

--
-- Table structure for table `vehicles`
--

CREATE TABLE `vehicles` (
  `Id` int NOT NULL,
  `Serie` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `ChassisNumber` varchar(150) COLLATE utf8mb4_general_ci NOT NULL,
  `CreatedAt` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vehicles`
--

INSERT INTO `vehicles` (`Id`, `Serie`, `ChassisNumber`, `CreatedAt`) VALUES
(2, '92 TUN 4831', 'VF1ABC12345678901', '2026-05-10 07:44:51'),
(3, '145 TUN 120', 'VF1ABC12345678902', '2026-05-10 07:44:51'),
(4, '88 TUN 9021', 'VF1ABC12345678903', '2026-05-10 07:44:51'),
(5, '160 TUN 77', 'VF1DEF12345678904', '2026-05-10 07:44:51'),
(6, '101 TUN 6550', 'VF1DEF12345678905', '2026-05-10 07:44:51'),
(7, '134 TUN 3012', 'VF1GHI12345678906', '2026-05-10 07:44:51'),
(8, '80 TUN 9999', 'VF1GHI12345678907', '2026-05-10 07:44:51'),
(9, '119 TUN 450', 'VF1JKL12345678908', '2026-05-10 07:44:51'),
(10, '156 TUN 7801', 'VF1JKL12345678909', '2026-05-10 07:44:51'),
(11, '97 TUN 33', 'VF1MNO12345678910', '2026-05-10 07:44:51'),
(12, '110 TUN 8700', 'VF1MNO12345678911', '2026-05-10 07:44:51'),
(13, '83 TUN 2145', 'VF1PQR12345678912', '2026-05-10 07:44:51'),
(14, '148 TUN 600', 'VF1PQR12345678913', '2026-05-10 07:44:51'),
(15, '125 TUN 999', 'VF1STU12345678914', '2026-05-10 07:44:51'),
(16, '90 TUN 5000', 'VF1STU12345678915', '2026-05-10 07:44:51'),
(17, '152 TUN 11', 'VF1VWX12345678916', '2026-05-10 07:44:51'),
(18, '100 TUN 7603', 'VF1VWX12345678917', '2026-05-10 07:44:51'),
(19, '140 TUN 320', 'VF1YZA12345678918', '2026-05-10 07:44:51'),
(20, '85 TUN 8888', 'VF1YZA12345678919', '2026-05-10 07:44:51'),
(21, '130 TUN 2400', 'VF1BCD12345678920', '2026-05-10 07:44:51'),
(22, '106 TUN 9580', 'VF31AHFXF52761147', '2026-05-10 10:31:23');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `agencies`
--
ALTER TABLE `agencies`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `agencyservices`
--
ALTER TABLE `agencyservices`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `fk_agency` (`AgencyId`),
  ADD KEY `fk_service` (`ServiceId`);

--
-- Indexes for table `otpcode`
--
ALTER TABLE `otpcode`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `phonenumbers`
--
ALTER TABLE `phonenumbers`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `fk_vehicle_phone` (`VehicleId`);

--
-- Indexes for table `rdvs`
--
ALTER TABLE `rdvs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `vehicle_id` (`vehicle_id`),
  ADD KEY `phone_number_id` (`phone_number_id`),
  ADD KEY `service_id` (`service_id`),
  ADD KEY `agency_id` (`agency_id`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `Email` (`Email`);

--
-- Indexes for table `vehicles`
--
ALTER TABLE `vehicles`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `ChassisNumber` (`ChassisNumber`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `agencies`
--
ALTER TABLE `agencies`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `agencyservices`
--
ALTER TABLE `agencyservices`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT for table `otpcode`
--
ALTER TABLE `otpcode`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `phonenumbers`
--
ALTER TABLE `phonenumbers`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `rdvs`
--
ALTER TABLE `rdvs`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `vehicles`
--
ALTER TABLE `vehicles`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `agencyservices`
--
ALTER TABLE `agencyservices`
  ADD CONSTRAINT `fk_agency` FOREIGN KEY (`AgencyId`) REFERENCES `agencies` (`Id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_service` FOREIGN KEY (`ServiceId`) REFERENCES `services` (`Id`) ON DELETE CASCADE;

--
-- Constraints for table `phonenumbers`
--
ALTER TABLE `phonenumbers`
  ADD CONSTRAINT `fk_vehicle_phone` FOREIGN KEY (`VehicleId`) REFERENCES `vehicles` (`Id`) ON DELETE CASCADE;

--
-- Constraints for table `rdvs`
--
ALTER TABLE `rdvs`
  ADD CONSTRAINT `rdvs_ibfk_1` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles` (`Id`),
  ADD CONSTRAINT `rdvs_ibfk_2` FOREIGN KEY (`phone_number_id`) REFERENCES `phonenumbers` (`Id`),
  ADD CONSTRAINT `rdvs_ibfk_3` FOREIGN KEY (`service_id`) REFERENCES `services` (`Id`),
  ADD CONSTRAINT `rdvs_ibfk_4` FOREIGN KEY (`agency_id`) REFERENCES `agencies` (`Id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
