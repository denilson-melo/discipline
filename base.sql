CREATE DATABASE  IF NOT EXISTS `proto` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `proto`;
-- MySQL dump 10.13  Distrib 5.6.23, for Win32 (x86)
--
-- Host: 127.0.0.1    Database: proto
-- ------------------------------------------------------
-- Server version	5.6.24

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `colegiado`
--

DROP TABLE IF EXISTS `colegiado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `colegiado` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sigla` varchar(45) DEFAULT NULL,
  `nomeColegiado` varchar(100) DEFAULT NULL,
  `fkdepartamento` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `col_dep_fk_idx` (`fkdepartamento`),
  CONSTRAINT `col_dep_fk` FOREIGN KEY (`fkdepartamento`) REFERENCES `departamento` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `colegiado`
--

LOCK TABLES `colegiado` WRITE;
/*!40000 ALTER TABLE `colegiado` DISABLE KEYS */;
INSERT INTO `colegiado` VALUES (1,'COLCIC','Colegiado de Ciência da Computação',1);
/*!40000 ALTER TABLE `colegiado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `departamento`
--

DROP TABLE IF EXISTS `departamento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `departamento` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sigla` varchar(45) DEFAULT NULL,
  `nomeDepartamento` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departamento`
--

LOCK TABLES `departamento` WRITE;
/*!40000 ALTER TABLE `departamento` DISABLE KEYS */;
INSERT INTO `departamento` VALUES (1,'DCET','Departamento de Ciências Exatas e Tecnológicas');
/*!40000 ALTER TABLE `departamento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `disciplina`
--

DROP TABLE IF EXISTS `disciplina`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `disciplina` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nomeDisciplina` varchar(45) DEFAULT NULL,
  `cargaHoraria` int(11) DEFAULT NULL,
  `cargaHorariaSemanal` int(11) DEFAULT NULL,
  `periodo` int(11) DEFAULT NULL,
  `fkdepartamento` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `dis_dep_fk_idx` (`fkdepartamento`),
  CONSTRAINT `dis_dep_fk` FOREIGN KEY (`fkdepartamento`) REFERENCES `departamento` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `disciplina`
--

LOCK TABLES `disciplina` WRITE;
/*!40000 ALTER TABLE `disciplina` DISABLE KEYS */;
INSERT INTO `disciplina` VALUES (1,'Banco de Dados 2',60,4,6,1),(2,'Compiladores',60,4,6,1),(3,'Linguagem de Programação 1',60,4,1,1),(4,'Estruturas de Dados',60,4,3,1);
/*!40000 ALTER TABLE `disciplina` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `horaaula`
--

DROP TABLE IF EXISTS `horaaula`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `horaaula` (
  `id` int(11) NOT NULL,
  `inicio` time DEFAULT NULL,
  `fim` time DEFAULT NULL,
  `fkturma` int(11) DEFAULT NULL,
  `avaliando` tinyint(4) DEFAULT NULL,
  `confirmado` tinyint(4) DEFAULT NULL,
  `criacao` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `turmaId_idx` (`fkturma`),
  CONSTRAINT `turmafk` FOREIGN KEY (`fkturma`) REFERENCES `turma` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `horaaula`
--

LOCK TABLES `horaaula` WRITE;
/*!40000 ALTER TABLE `horaaula` DISABLE KEYS */;
INSERT INTO `horaaula` VALUES (1,'07:30:00','08:20:00',1,1,0,'2015-09-13 19:21:11'),(2,'08:20:00','09:10:00',1,1,0,'2015-09-13 19:21:11'),(3,'13:30:00','14:20:00',2,1,0,'2015-09-13 22:45:10'),(4,'14:20:00','15:10:00',2,1,0,'2015-09-13 22:45:10');
/*!40000 ALTER TABLE `horaaula` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `professor`
--

DROP TABLE IF EXISTS `professor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `professor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nomeProfessor` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `professor`
--

LOCK TABLES `professor` WRITE;
/*!40000 ALTER TABLE `professor` DISABLE KEYS */;
INSERT INTO `professor` VALUES (1,'Honda','honda@gmail.com'),(2,'Bravo','bravo@uesc.br'),(3,'Suzanna','suzanna@uesc.br'),(4,'Esbel','esbel@uesc.br');
/*!40000 ALTER TABLE `professor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `responsavel`
--

DROP TABLE IF EXISTS `responsavel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `responsavel` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fkprofessor` int(11) DEFAULT NULL,
  `fkturma` int(11) DEFAULT NULL,
  `avaliando` tinyint(1) DEFAULT NULL,
  `confirmado` tinyint(1) DEFAULT NULL,
  `criacao` datetime DEFAULT NULL,
  `fkusuario` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `professor_idx` (`fkprofessor`),
  KEY `turma_idx` (`fkturma`),
  CONSTRAINT `professor` FOREIGN KEY (`fkprofessor`) REFERENCES `professor` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `turma` FOREIGN KEY (`fkturma`) REFERENCES `turma` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `responsavel`
--

LOCK TABLES `responsavel` WRITE;
/*!40000 ALTER TABLE `responsavel` DISABLE KEYS */;
INSERT INTO `responsavel` VALUES (1,1,1,1,0,'2015-09-13 19:19:12',NULL),(2,1,2,1,0,'2015-09-13 19:19:46',NULL);
/*!40000 ALTER TABLE `responsavel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `secret`
--

DROP TABLE IF EXISTS `secret`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `secret` (
  `idSecret` int(11) NOT NULL AUTO_INCREMENT,
  `text` varchar(45) NOT NULL,
  PRIMARY KEY (`idSecret`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `secret`
--

LOCK TABLES `secret` WRITE;
/*!40000 ALTER TABLE `secret` DISABLE KEYS */;
/*!40000 ALTER TABLE `secret` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `turma`
--

DROP TABLE IF EXISTS `turma`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `turma` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `codigo` varchar(10) DEFAULT NULL,
  `fkdisciplina` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `disciplinafk_idx` (`fkdisciplina`),
  CONSTRAINT `disciplinafk` FOREIGN KEY (`fkdisciplina`) REFERENCES `disciplina` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `turma`
--

LOCK TABLES `turma` WRITE;
/*!40000 ALTER TABLE `turma` DISABLE KEYS */;
INSERT INTO `turma` VALUES (1,'T01',1),(2,'T02',1);
/*!40000 ALTER TABLE `turma` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `iduser` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `password` char(60) DEFAULT NULL,
  `group` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`iduser`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (17,'Balanar','$2a$08$tUQPJStUpamD3EOGjcNVC.7thHglbRkIIvsHwvm5/mcTFxiro.4bS','night'),(18,'Lanaya','$2a$08$JKpUW0rycSAqeC53sO15I.sg.y8WQ5KJsjIvrhMGxq/0y6Oiv/F22','secret'),(19,'Piranha','$2a$08$/DpkoNNWMzU/7xXia4SrTOVXruGX7ABliUlVG2LFVzgeRkIwfoZtC','tree'),(20,'Cavalor','$2a$08$vbaW2fmI2hG3QHmtKr6hO.5e8m31meZgFmhiZRdIOAjYBIPNgeoR6','secret'),(21,'Picolo','$2a$08$vWhJGZeewkz4ywDntZUPyeMMIXUaS4N31jhIR4Y4FgXKsieZX/al2',NULL),(22,'Balarn','$2a$08$yKv7S2rXmtkWgZY2v4GN7eT2mkUdvrbt2E2cwk4iK39gOFm7jXffO',NULL),(23,'Ezalor','$2a$08$eW832OV6LMjbJ0sDt/LHB.NVvo4heLvCX2pKha1OD2Kbq9wwr6zcq',NULL),(24,'Mirana','$2a$08$sdL4eMYWQ45mT2bfx261G.DekQMUCp.QgupvA1zBWvzOvXd6gXic6',NULL),(25,'Techies','$2a$08$aDsCX3pKHsmyADcGtgw2teqmb3zKFz8MQTBcayYJSwOYnWLzz.fHa','night'),(26,'Weaver','$2a$08$hZU5.qBEJwpCspnhvd9ONO0d4Xw0EVOnomlkoJbUAq3OxL1iImdgi','secret'),(27,'Pugna','$2a$08$ZtTsZos90YfCMKocOQU2w.8QsMycuQVh9rO9hnCi3AjbNBLg/43Ke','night'),(28,'Abaddon','$2a$08$DT4XAB9zHI0D/maj657DbuaC3gwBY8d1oVMvo7GPiJ.4IDmUUzCMe','night'),(29,'Bambi','$2a$08$qwN4KmAj3y5W.c9j4K28pO4nMqow4QrPnC/KUb7CLblSBU6h7grXS','tree'),(30,'Gondar','$2a$08$nqieBlB7Sc0JtLRsUDW2K.41JtrgxfaWSVemeEzhf0SQ/JG4KBWGu','night');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-09-14 12:18:47
