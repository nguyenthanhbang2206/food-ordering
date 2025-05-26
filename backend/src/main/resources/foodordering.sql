-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: foodordering
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `addresses`
--

DROP TABLE IF EXISTS `addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `addresses` (
                             `id` bigint NOT NULL AUTO_INCREMENT,
                             `city` varchar(255) DEFAULT NULL,
                             `district` varchar(255) DEFAULT NULL,
                             `street` varchar(255) DEFAULT NULL,
                             `ward` varchar(255) DEFAULT NULL,
                             `user_id` bigint DEFAULT NULL,
                             PRIMARY KEY (`id`),
                             KEY `FK1fa36y2oqhao3wgg2rw1pi459` (`user_id`),
                             CONSTRAINT `FK1fa36y2oqhao3wgg2rw1pi459` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `addresses`
--

LOCK TABLES `addresses` WRITE;
/*!40000 ALTER TABLE `addresses` DISABLE KEYS */;
INSERT INTO `addresses` VALUES (1,'TP.HCM','Quận 1','123 Lê Lợi','Phường Bến Thành',NULL),(2,'Hà Nội','Quận Thanh Xuân','48 Nguyễn Huy Tưởng','Phường hNhân Chính',NULL),(3,'Hà Nội','Phúc Thọ','Thượng Cốc','Thượng Cốc',3),(4,'Hà Nội','Hà Đông','123','Trần Phú',4);
/*!40000 ALTER TABLE `addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cartitems`
--

DROP TABLE IF EXISTS `cartitems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cartitems` (
                             `id` bigint NOT NULL AUTO_INCREMENT,
                             `quantity` int NOT NULL,
                             `total_price` bigint NOT NULL,
                             `cart_id` bigint DEFAULT NULL,
                             `food_id` bigint DEFAULT NULL,
                             PRIMARY KEY (`id`),
                             KEY `FKqbf3k33jhqlj6hhuqc4n65s3d` (`cart_id`),
                             KEY `FKo7kh4q9ego57iw6fxdflddrw5` (`food_id`),
                             CONSTRAINT `FKo7kh4q9ego57iw6fxdflddrw5` FOREIGN KEY (`food_id`) REFERENCES `foods` (`id`),
                             CONSTRAINT `FKqbf3k33jhqlj6hhuqc4n65s3d` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cartitems`
--

LOCK TABLES `cartitems` WRITE;
/*!40000 ALTER TABLE `cartitems` DISABLE KEYS */;
/*!40000 ALTER TABLE `cartitems` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carts`
--

DROP TABLE IF EXISTS `carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carts` (
                         `id` bigint NOT NULL AUTO_INCREMENT,
                         `sum` int NOT NULL,
                         `total_price` bigint NOT NULL,
                         `customer_id` bigint DEFAULT NULL,
                         PRIMARY KEY (`id`),
                         UNIQUE KEY `UK_88sv4i13lo80s74ox7rsb5a2c` (`customer_id`),
                         CONSTRAINT `FK99i1rh5nm7r3f1b3wdcuq5h57` FOREIGN KEY (`customer_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
                              `id` bigint NOT NULL AUTO_INCREMENT,
                              `name` varchar(255) DEFAULT NULL,
                              `restaurant_id` bigint DEFAULT NULL,
                              PRIMARY KEY (`id`),
                              KEY `FKtdst21nbth66utu5rvifn5x4a` (`restaurant_id`),
                              CONSTRAINT `FKtdst21nbth66utu5rvifn5x4a` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Pizza',1),(2,'Nước uống',1),(3,'Tráng miệng',1),(4,'Món chính',2),(5,'Nước uống',2);
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `food_images`
--

DROP TABLE IF EXISTS `food_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `food_images` (
                               `food_id` bigint NOT NULL,
                               `images` varchar(1000) DEFAULT NULL,
                               KEY `FKcjvuyg5u6bluono3r4ppr9dd` (`food_id`),
                               CONSTRAINT `FKcjvuyg5u6bluono3r4ppr9dd` FOREIGN KEY (`food_id`) REFERENCES `foods` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `food_images`
--

LOCK TABLES `food_images` WRITE;
/*!40000 ALTER TABLE `food_images` DISABLE KEYS */;
INSERT INTO `food_images` VALUES (2,'37307d80-02ae-4a50-80db-732ea52cfb84.jpg'),(2,'7068e1a3-aa67-4d33-8d85-b35378afbea0.jpg'),(3,'d25bf32c-35be-4783-ac70-c8fc9388811d.jpg'),(3,'d07c62c7-6135-4b3a-9852-9afcaa88ac00.jpg'),(4,'fcc1c60b-61bb-42c7-8309-e07e2c19b2c3.jpg'),(4,'df38633b-4eda-432b-8c99-f79da7bdbdac.jpg'),(6,'90bedaed-9753-4500-8887-65dd997e6972.jpg'),(6,'8e03bfb3-811e-4600-b8e0-6591c0348375.jpg'),(7,'cbe9882d-86c6-4eac-ab7a-42c5cd2e699f.jpg'),(7,'033b5f70-0cf7-4569-9c7c-8ba79df548e5.jpg'),(8,'f723e055-cd43-458e-af17-668659608b55.jpg'),(8,'6697d4f5-d3f5-4b1c-9a79-984cbb867d38.jpg'),(5,'aba6398c-4a88-4818-8743-ea12722e44a5.jpg'),(5,'08ef846b-3af2-4f6c-b611-5393990f68b5.jpg'),(1,'e4b37319-fc64-46c9-b853-79f693d6c4dd.jpg'),(1,'2d6fb42c-b5ea-4b88-a6bc-d5c9203fde92.jpg'),(9,'f371e189-aff4-40ea-b392-6f1a37962e0e.jpg'),(9,'4e4b19aa-9a8b-45fb-a656-df924dc4481e.jpg'),(10,'652ea227-7f24-4af9-ad00-050ab6194529.jpg'),(10,'892b3a21-32ca-49b6-8256-dc8bb509b27e.jpg'),(11,'624ddf0b-9fcc-4240-bc95-99e439c03a55.jpg'),(11,'2ba793b2-00e3-4d9d-af3d-ce64fe26c4ad.jpg'),(12,'f12e3f4c-e516-4c9c-822b-ab93eadfb8f8.jpg'),(12,'2c3a772f-048c-4449-b9d7-85d4d7c6c051.jpg');
/*!40000 ALTER TABLE `food_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `food_ingredient`
--

DROP TABLE IF EXISTS `food_ingredient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `food_ingredient` (
                                   `food_id` bigint NOT NULL,
                                   `ingredient_id` bigint NOT NULL,
                                   KEY `FK8iinm16w5lx76dtr9wl1ye6yu` (`ingredient_id`),
                                   KEY `FKifkhmgcmlsoi4rvpadjlph67c` (`food_id`),
                                   CONSTRAINT `FK8iinm16w5lx76dtr9wl1ye6yu` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredients` (`id`),
                                   CONSTRAINT `FKifkhmgcmlsoi4rvpadjlph67c` FOREIGN KEY (`food_id`) REFERENCES `foods` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `food_ingredient`
--

LOCK TABLES `food_ingredient` WRITE;
/*!40000 ALTER TABLE `food_ingredient` DISABLE KEYS */;
INSERT INTO `food_ingredient` VALUES (2,3),(2,5),(2,6),(3,3),(3,6),(3,7),(4,8),(4,9),(4,10),(4,11),(6,14),(6,15),(6,16),(7,9),(7,14),(8,17),(8,18),(8,19),(8,20),(5,12),(5,13),(5,14),(1,1),(1,2),(1,3),(1,4),(9,21),(9,22),(9,23),(9,24),(9,25),(10,21),(10,25),(10,26),(10,27),(10,28),(11,29),(12,30),(12,31),(12,32),(12,33);
/*!40000 ALTER TABLE `food_ingredient` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `foods`
--

DROP TABLE IF EXISTS `foods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `foods` (
                         `id` bigint NOT NULL AUTO_INCREMENT,
                         `available` bit(1) NOT NULL,
                         `cuisine` varchar(255) DEFAULT NULL,
                         `description` varchar(255) DEFAULT NULL,
                         `name` varchar(255) DEFAULT NULL,
                         `price` bigint NOT NULL,
                         `spicy` bit(1) NOT NULL,
                         `vegetarian` bit(1) NOT NULL,
                         `category_id` bigint DEFAULT NULL,
                         `restaurant_id` bigint DEFAULT NULL,
                         PRIMARY KEY (`id`),
                         KEY `FKpaltlojk6ds73o9vn3f2ri9gk` (`category_id`),
                         KEY `FKri2j6b6x4h4y1gn9ydwx02txp` (`restaurant_id`),
                         CONSTRAINT `FKpaltlojk6ds73o9vn3f2ri9gk` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`),
                         CONSTRAINT `FKri2j6b6x4h4y1gn9ydwx02txp` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `foods`
--

LOCK TABLES `foods` WRITE;
/*!40000 ALTER TABLE `foods` DISABLE KEYS */;
INSERT INTO `foods` VALUES (1,_binary '','Italian','Pizza phủ đầy tôm, mực, phô mai và sốt cà chua.','Pizza Hải sản',12,_binary '',_binary '\0',1,1),(2,_binary '','Italian','Pizza gồm xúc xích, nấm và phô mai.','Pizza Thập Cẩm',10,_binary '',_binary '\0',1,1),(3,_binary '','Italian','Pizza không thịt với nấm, bông cải xanh và phô mai.','Pizza Chay Rau Củ',10,_binary '\0',_binary '',1,1),(4,_binary '','Vietnamese','Trà đào pha cùng cam tươi và sả thơm mát lạnh.','Trà Đào Cam Sả',10,_binary '\0',_binary '',2,1),(5,_binary '','Vietnamese','Nước chanh tươi với đá lạnh giải nhiệt ngày hè.','Nước Chanh Đá',12,_binary '\0',_binary '',2,1),(6,_binary '','Vietnamese','Sinh tố bơ béo mịn, thơm ngon với sữa đặc.','Sinh tố bơ ',20,_binary '\0',_binary '',2,1),(7,_binary '','Vietnamese','100% nước cam ép nguyên chất, không đường, giàu vitamin C.','Nước Ép Cam Tươi',10,_binary '\0',_binary '',2,1),(8,_binary '','Italian','Bánh Tiramisu mềm mịn với hương cà phê và phô mai mascarpone.','Bánh Tiramisu',20,_binary '\0',_binary '',3,1),(9,_binary '','Vietnamese','Bún tươi ăn cùng chả nướng thơm lừng và nước chấm chua ngọt đặc trưng.','Bún Chả Truyền Thống',30,_binary '\0',_binary '\0',4,2),(10,_binary '','Vietnamese','Nem rán giòn rụm, nhân thịt và rau củ, ăn kèm rau sống và nước chấm.','Nem Rán (Chả Giò)',30,_binary '\0',_binary '\0',4,2),(11,_binary '','Vietnamese','Trà xanh ướp lạnh, giải nhiệt đặc trưng của Hà Nội.','Trà đá',10,_binary '\0',_binary '',5,2),(12,_binary '','Vietnamese','Trà đào pha cùng cam tươi và sả thơm mát lạnh.','Trà Đào Cam Sả',10,_binary '\0',_binary '',5,2);
/*!40000 ALTER TABLE `foods` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ingredients`
--

DROP TABLE IF EXISTS `ingredients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ingredients` (
                               `id` bigint NOT NULL AUTO_INCREMENT,
                               `name` varchar(255) DEFAULT NULL,
                               `restaurant_id` bigint DEFAULT NULL,
                               PRIMARY KEY (`id`),
                               KEY `FKspy5soghmv48ax8dqgplf290j` (`restaurant_id`),
                               CONSTRAINT `FKspy5soghmv48ax8dqgplf290j` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ingredients`
--

LOCK TABLES `ingredients` WRITE;
/*!40000 ALTER TABLE `ingredients` DISABLE KEYS */;
INSERT INTO `ingredients` VALUES (1,'Tôm',1),(2,'Mực',1),(3,'Phô mai',1),(4,'Sốt cà chua',1),(5,'Xúc xích',1),(6,'Nấm',1),(7,'Bông cải xanh',1),(8,'Đào',1),(9,'Cam',1),(10,'Sả',1),(11,'Trà',1),(12,'Chanh',1),(13,'Đường ',1),(14,'Đá',1),(15,'Bơ',1),(16,'Sữa đặc',1),(17,'Bánh ladyfinger',1),(18,' Mascarpone',1),(19,'Bột cacao',1),(20,'Cà phê',1),(21,'Thịt heo xay',2),(22,'Bún ',2),(23,'nước mắm',2),(24,'Đu đủ',2),(25,'Cà rốt',2),(26,'Miến dong',2),(27,'Mộc nhĩ',2),(28,'Trứng gà',2),(29,'Lá trà xanh',2),(30,'Trà',2),(31,'Đào',2),(32,'Cam',2),(33,'Sả',2);
/*!40000 ALTER TABLE `ingredients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invalid_token`
--

DROP TABLE IF EXISTS `invalid_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invalid_token` (
                                 `id` bigint NOT NULL AUTO_INCREMENT,
                                 `token` mediumtext,
                                 PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invalid_token`
--

LOCK TABLES `invalid_token` WRITE;
/*!40000 ALTER TABLE `invalid_token` DISABLE KEYS */;
/*!40000 ALTER TABLE `invalid_token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderitems`
--

DROP TABLE IF EXISTS `orderitems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orderitems` (
                              `id` bigint NOT NULL AUTO_INCREMENT,
                              `quantity` int NOT NULL,
                              `total_price` bigint NOT NULL,
                              `food_id` bigint DEFAULT NULL,
                              `order_id` bigint DEFAULT NULL,
                              PRIMARY KEY (`id`),
                              KEY `FKqk0tfxvx3bofo7w9rshjng4h` (`food_id`),
                              KEY `FKm3mp87f5ygbbfuqfdhc09y9a` (`order_id`),
                              CONSTRAINT `FKm3mp87f5ygbbfuqfdhc09y9a` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
                              CONSTRAINT `FKqk0tfxvx3bofo7w9rshjng4h` FOREIGN KEY (`food_id`) REFERENCES `foods` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderitems`
--

LOCK TABLES `orderitems` WRITE;
/*!40000 ALTER TABLE `orderitems` DISABLE KEYS */;
INSERT INTO `orderitems` VALUES (1,1,12,5,1),(2,1,12,1,1),(3,2,40,8,1),(4,1,12,5,2),(5,1,12,1,2),(6,1,30,10,3);
/*!40000 ALTER TABLE `orderitems` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
                          `id` bigint NOT NULL AUTO_INCREMENT,
                          `status` enum('PENDING','PROCESSING','DELIVERED','CANCELLED') DEFAULT NULL,
                          `total_items` int NOT NULL,
                          `total_price` bigint NOT NULL,
                          `customer_id` bigint DEFAULT NULL,
                          `delivery_address_id` bigint DEFAULT NULL,
                          `restaurant_id` bigint DEFAULT NULL,
                          PRIMARY KEY (`id`),
                          KEY `FKsjfs85qf6vmcurlx43cnc16gy` (`customer_id`),
                          KEY `FK3s2t83m5ddty3rgomn94d4ht6` (`delivery_address_id`),
                          KEY `FK2m9qulf12xm537bku3jnrrbup` (`restaurant_id`),
                          CONSTRAINT `FK2m9qulf12xm537bku3jnrrbup` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants` (`id`),
                          CONSTRAINT `FK3s2t83m5ddty3rgomn94d4ht6` FOREIGN KEY (`delivery_address_id`) REFERENCES `addresses` (`id`),
                          CONSTRAINT `FKsjfs85qf6vmcurlx43cnc16gy` FOREIGN KEY (`customer_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,'DELIVERED',3,64,3,3,1),(2,'PENDING',2,24,4,4,1),(3,'PENDING',1,30,4,4,2);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `restaurant_images`
--

DROP TABLE IF EXISTS `restaurant_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `restaurant_images` (
                                     `restaurant_id` bigint NOT NULL,
                                     `images` varchar(1000) DEFAULT NULL,
                                     KEY `FK714rhrkn3odt4ucjohgipd9h4` (`restaurant_id`),
                                     CONSTRAINT `FK714rhrkn3odt4ucjohgipd9h4` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `restaurant_images`
--

LOCK TABLES `restaurant_images` WRITE;
/*!40000 ALTER TABLE `restaurant_images` DISABLE KEYS */;
INSERT INTO `restaurant_images` VALUES (1,'103d67f3-a79b-4008-9281-77458eb89839.jpg'),(2,'111cdd56-cb42-48be-be46-34be055b3499.jpg');
/*!40000 ALTER TABLE `restaurant_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `restaurants`
--

DROP TABLE IF EXISTS `restaurants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `restaurants` (
                               `id` bigint NOT NULL AUTO_INCREMENT,
                               `email` varchar(255) DEFAULT NULL,
                               `facebook` varchar(255) DEFAULT NULL,
                               `instagram` varchar(255) DEFAULT NULL,
                               `phone_number` varchar(255) DEFAULT NULL,
                               `description` varchar(255) DEFAULT NULL,
                               `name` varchar(255) DEFAULT NULL,
                               `open` bit(1) NOT NULL,
                               `opening_hours` varchar(255) DEFAULT NULL,
                               `address_id` bigint DEFAULT NULL,
                               `owner_id` bigint DEFAULT NULL,
                               PRIMARY KEY (`id`),
                               UNIQUE KEY `UK_qmof4bn52u3t3qtpqlt80ypej` (`address_id`),
                               UNIQUE KEY `UK_82grnfy9su7xfo22jh2wopaen` (`owner_id`),
                               CONSTRAINT `FKf77xr396uxbl0crr0pq0qj2q7` FOREIGN KEY (`address_id`) REFERENCES `addresses` (`id`),
                               CONSTRAINT `FKp5mmmypepihvmkdb83qwugr4d` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `restaurants`
--

LOCK TABLES `restaurants` WRITE;
/*!40000 ALTER TABLE `restaurants` DISABLE KEYS */;
INSERT INTO `restaurants` VALUES (1,'pizzahome@gmail.com','https://www.facebook.com/pizzahome','https://www.instagram.com/pizzahome.vn','0909123456','Nhà hàng chuyên phục vụ các món pizza Ý chất lượng cao.','Pizza Home	',_binary '','09:00 - 22:00',1,2),(2,'bunchahanoi@gmail.com','https://facebook.com/bunchahanoi','https://instagram.com/bunchahanoi','0987654321','Nhà hàng chuyên phục vụ món bún chả đậm chất Hà Nội, thơm ngon, chuẩn vị truyền thống.','Bún Chả Hà Nội',_binary '','08:00 - 21:00',2,1);
/*!40000 ALTER TABLE `restaurants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_favourites`
--

DROP TABLE IF EXISTS `user_favourites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_favourites` (
                                   `user_id` bigint NOT NULL,
                                   `restaurant_id` bigint NOT NULL,
                                   KEY `FKabvu89h6aiej61pri2aoyakt2` (`restaurant_id`),
                                   KEY `FKsotykjapinh9k0qddenalw94k` (`user_id`),
                                   CONSTRAINT `FKabvu89h6aiej61pri2aoyakt2` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants` (`id`),
                                   CONSTRAINT `FKsotykjapinh9k0qddenalw94k` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_favourites`
--

LOCK TABLES `user_favourites` WRITE;
/*!40000 ALTER TABLE `user_favourites` DISABLE KEYS */;
INSERT INTO `user_favourites` VALUES (3,1),(1,1),(1,2);
/*!40000 ALTER TABLE `user_favourites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
                         `id` bigint NOT NULL AUTO_INCREMENT,
                         `avatar` varchar(255) DEFAULT NULL,
                         `email` varchar(255) DEFAULT NULL,
                         `full_name` varchar(255) DEFAULT NULL,
                         `gender` enum('MALE','FEMALE','OTHER') DEFAULT NULL,
                         `password` varchar(255) DEFAULT NULL,
                         `refresh_token` mediumtext,
                         `role` enum('ADMIN','CUSTOMER','RESTAURANT_OWNER') DEFAULT NULL,
                         PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,NULL,'admin1@gmail.com','admin1',NULL,'$2a$10$/JE.gt/AX1MGCJndkkYgy.Y3/eMiUqNJsgkIhKZ0HO2Zxlnxaax3G','eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbjFAZ21haWwuY29tIiwicm9sZSI6IlJPTEVfUkVTVEFVUkFOVF9PV05FUiIsImV4cCI6MTc0ODM1NTQ1NywiaWF0IjoxNzQ4MjY5MDU3fQ.RVWJRYAfN1q8LFV4qD00Nj3GlDviteyAraEbQhcjEkBsJTjul4zB9fOeEPm7zMDCnIO47AYpOujAn5ib2B84Zg','RESTAURANT_OWNER'),(2,NULL,'admin2@gmail.com','admin2',NULL,'$2a$10$lhmiDVh3fwwiq9pn3zSTn./whRgEKC5AaVIYAdMD5RlsntX88HiDy','eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbjJAZ21haWwuY29tIiwicm9sZSI6IlJPTEVfUkVTVEFVUkFOVF9PV05FUiIsImV4cCI6MTc0ODM1NTQwNiwiaWF0IjoxNzQ4MjY5MDA2fQ.aF9l_pkqLVXIInQ9eXzaWrveqA2O9HEpclm6rXymKE55h3XUeQL0i7-OR5IQBRIIgZDJlpe4be7o0R1GjVn7mQ','RESTAURANT_OWNER'),(3,NULL,'customer1@gmail.com','customer1',NULL,'$2a$10$zjHC2WoPxTFuvWjfwgUztuS8zhuPHyWA563RpyuIYEocZTATX53/G','eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjdXN0b21lcjFAZ21haWwuY29tIiwicm9sZSI6IlJPTEVfQ1VTVE9NRVIiLCJleHAiOjE3NDgzNTUyMjAsImlhdCI6MTc0ODI2ODgyMH0.22aTI9moyhvtzHxI-r3qp7fYsp2XSs5bfLNynSMEzU9kZd0pxEsYIF7Yy4pX6LKLbGQVO7bMBiO7aZzEnLojcw','CUSTOMER'),(4,NULL,'customer2@gmail.com','customer2',NULL,'$2a$10$zp06tHrsEXf0QQL.Nj5UjuUJ3UNDqzsr8iTaykbik6JMSxHwyOKnq','eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjdXN0b21lcjJAZ21haWwuY29tIiwicm9sZSI6IlJPTEVfQ1VTVE9NRVIiLCJleHAiOjE3NDgzNTUzMzksImlhdCI6MTc0ODI2ODkzOX0.HqcLYdEXg3O3GnoD3tJmT5FIvoX0D072CruMvRBMw2yxK8FlvWYQCHFhE2pysd8xxEZuM9RTtWWfTKlQrj43Dg','CUSTOMER');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-26 21:32:57
