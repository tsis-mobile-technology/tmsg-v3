
# Dump of table TB_AUTOCHAT_CUSTOMER
# ------------------------------------------------------------

DROP TABLE IF EXISTS `TB_AUTOCHAT_CUSTOMER`;

CREATE TABLE `TB_AUTOCHAT_CUSTOMER` (
  `SEQ` int(11) NOT NULL AUTO_INCREMENT,
  `UNIQUE_ID` varchar(64) NOT NULL,
  `NAME` varchar(128) DEFAULT NULL,
  `PHONE` varchar(16) DEFAULT NULL,
  `YN_AUTH` varchar(1) NOT NULL DEFAULT 'N',
  `WRTDATE` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ETC1` varchar(64) DEFAULT NULL,
  `ETC2` varchar(64) DEFAULT NULL,
  `ETC3` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`SEQ`),
  KEY `TB_AUTOCHAT_CUSTOMER_IDX1` (`UNIQUE_ID`),
  KEY `TB_AUTOCHAT_CUSTOMER_IDX2` (`PHONE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `TB_AUTOCHAT_CUSTOMER` WRITE;
/*!40000 ALTER TABLE `TB_AUTOCHAT_CUSTOMER` DISABLE KEYS */;

INSERT INTO `TB_AUTOCHAT_CUSTOMER` (`SEQ`, `UNIQUE_ID`, `NAME`, `PHONE`, `YN_AUTH`, `WRTDATE`, `ETC1`, `ETC2`, `ETC3`)
VALUES
	(1,'cjgHBDipyzD1','홍길동','01022471110','Y','2017-04-17 17:28:56',NULL,NULL,NULL);

/*!40000 ALTER TABLE `TB_AUTOCHAT_CUSTOMER` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table TB_AUTOCHAT_HISTORY
# ------------------------------------------------------------

DROP TABLE IF EXISTS `TB_AUTOCHAT_HISTORY`;

CREATE TABLE `TB_AUTOCHAT_HISTORY` (
  `SEQ` int(11) NOT NULL AUTO_INCREMENT,
  `UNIQUE_ID` varchar(64) NOT NULL,
  `MESSAGE` varchar(1024) NOT NULL DEFAULT '0',
  `WRTDATE` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ETC1` varchar(64) DEFAULT NULL,
  `ETC2` varchar(64) DEFAULT NULL,
  `ETC3` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`SEQ`),
  KEY `TB_AUTOCHAT_HISTORY_IDX1` (`UNIQUE_ID`),
  KEY `TB_AUTOCHAT_HISTORY_IDX2` (`ETC1`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `TB_AUTOCHAT_HISTORY` WRITE;
/*!40000 ALTER TABLE `TB_AUTOCHAT_HISTORY` DISABLE KEYS */;

INSERT INTO `TB_AUTOCHAT_HISTORY` (`SEQ`, `UNIQUE_ID`, `MESSAGE`, `WRTDATE`, `ETC1`, `ETC2`, `ETC3`)
VALUES
    (8,'cjgHBDipyzD1','문의하기','2017-04-17 17:08:01',NULL,NULL,NULL);

/*!40000 ALTER TABLE `TB_AUTOCHAT_HISTORY` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table TB_AUTOCHAT_QUESTION
# ------------------------------------------------------------

DROP TABLE IF EXISTS `TB_AUTOCHAT_QUESTION`;

CREATE TABLE `TB_AUTOCHAT_QUESTION` (
  `SEQ` int(11) NOT NULL AUTO_INCREMENT,
  `UNIQUE_ID` varchar(64) NOT NULL,
  `REQ_MESSAGE` varchar(1024) DEFAULT NULL,
  `RES_MESSAGE` varchar(1024) DEFAULT NULL,
  `WRTDATE` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `RES_ID` varchar(64) DEFAULT NULL,
  `RES_DT` timestamp NULL DEFAULT NULL,
  `ETC1` varchar(64) DEFAULT NULL,
  `ETC2` varchar(64) DEFAULT NULL,
  `ETC3` varchar(64) DEFAULT NULL,
  `PROCESS_TP` varchar(12) NOT NULL DEFAULT 'STR',
  PRIMARY KEY (`SEQ`),
  KEY `TB_AUTOCHAT_QUESTION_IDX1` (`UNIQUE_ID`),
  KEY `TB_AUTOCHAT_QUESTION_IDX2` (`RES_ID`,`RES_DT`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `TB_AUTOCHAT_QUESTION` WRITE;
/*!40000 ALTER TABLE `TB_AUTOCHAT_QUESTION` DISABLE KEYS */;

INSERT INTO `TB_AUTOCHAT_QUESTION` (`SEQ`, `UNIQUE_ID`, `REQ_MESSAGE`, `RES_MESSAGE`, `WRTDATE`, `RES_ID`, `RES_DT`, `ETC1`, `ETC2`, `ETC3`, `PROCESS_TP`)
VALUES
	(1,'cjgHBDipyzD1','문의 합니다. !!!! 메롱 하지요?',NULL,'2017-04-14 17:35:49',NULL,NULL,NULL,NULL,NULL,'STR');

/*!40000 ALTER TABLE `TB_AUTOCHAT_QUESTION` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table TB_AUTOCHAT_SCENARIO
# ------------------------------------------------------------

DROP TABLE IF EXISTS `TB_AUTOCHAT_SCENARIO`;

CREATE TABLE `TB_AUTOCHAT_SCENARIO` (
  `SEQ` int(11) NOT NULL AUTO_INCREMENT,
  `STEP` int(2) DEFAULT NULL COMMENT '단계, 최대 3단계',
  `TRUN` int(2) DEFAULT NULL COMMENT '정렬 순서',
  `REQ_MESSAGE` varchar(1024) DEFAULT NULL COMMENT '수신 메세지 : "keyboard" 또는  메뉴명',
  `RES_MESSAGE` varchar(1024) DEFAULT NULL COMMENT '송신 메세지 : 출력 JSON',
  `WRTDATE` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ETC1` varchar(64) DEFAULT NULL,
  `ETC2` varchar(64) DEFAULT NULL,
  `ETC3` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`SEQ`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `TB_AUTOCHAT_SCENARIO` WRITE;
/*!40000 ALTER TABLE `TB_AUTOCHAT_SCENARIO` DISABLE KEYS */;

INSERT INTO `TB_AUTOCHAT_SCENARIO` (`SEQ`, `STEP`, `TRUN`, `REQ_MESSAGE`, `RES_MESSAGE`, `WRTDATE`, `ETC1`, `ETC2`, `ETC3`)
VALUES
	(7,1,2,'keyboard','{\"keyboard\":{\"buttons\":[\"자주하는 질문\",\"주문 조회\\/변경\",\"문의하기\",\"회사 소개\"],\"type\":\"buttons\"},\"message\":{\"text\":\"아래 내용 중 선택해 주세요!\"}}','2017-04-14 14:00:55','',NULL,NULL),
	(8,2,0,'자주하는 질문','{\"keyboard\":{\"buttons\":[\"콜센터 전화번호\",\"배송기간\"],\"type\":\"buttons\"},\"message\":{\"text\":\"다른 고객님들이 궁금해 하시는 내용입니다. \\r\\n궁금하신 내용을 선택해주세요!\"}}','2017-04-14 14:04:12','keyboard',NULL,NULL),
	(9,2,1,'주문 조회/변경','{\"keyboard\":{\"buttons\":[\"반품 문의\",\"주문 취소\",\"배송지 변경\",\"주문 조회\"],\"type\":\"buttons\"},\"message\":{\"text\":\"아래 내용 중 하나를 선택해 주세요!\"}}','2017-04-14 14:05:04','keyboard',NULL,NULL),
	(10,2,2,'문의하기','{\"keyboard\":{\"buttons\":[\"문의사항만 입력\",\"사진 첨부 후 문의하기\"],\"type\":\"buttons\"},\"message\":{\"text\":\"문의하실 내용을 선택해 주세요!\"}}','2017-04-14 14:05:40','keyboard',NULL,NULL),
	(11,3,0,'콜센터 전화번호','{\"keyboard\":{\"buttons\":[],\"type\":\"text\"},\"message\":{\"message_button\":{\"label\":\"홈페이지 방문\",\"url\":\"http:\\/\\/www.tsis.co.kr\\/\"},\"text\":\"콜센터 전화번호는 1234-1234입니다. \\r\\n처음으로 처음으로 가시려면  \'#\'을 입력하세요.\"}}','2017-04-14 14:09:10','자주하는 질문',NULL,NULL),
	(12,3,1,'배송기간','{\"keyboard\":{\"buttons\":[],\"type\":\"text\"},\"message\":{\"message_button\":{\"label\":\"홈페이지 방문\",\"url\":\"http:\\/\\/www.tsis.co.kr\\/\"},\"text\":\"상품에 따라 배송기간의 차이가 있습니다. \\r\\n예상 배송일자가 궁금하시면 콜센터(1234-1234)로 전화주세요!\\r\\n처음으로 돌아가려면 \'#\'을 입력하세요.\"}}','2017-04-14 14:11:01','자주하는 질문',NULL,NULL),
	(13,3,0,'주문 조회','{\"keyboard\":{\"buttons\":[],\"type\":\"text\"},\"message\":{\"text\":\"최근 3개월 내 고객님의 주문 내역이 없습니다. \\r\\n취소하시려면 \'#\'을 입력해 주세요.\"}}','2017-04-14 14:15:13','주문 조회/변경',NULL,NULL),
	(14,3,0,'배송지 변경','{\"keyboard\":{\"buttons\":[],\"type\":\"text\"},\"message\":{\"photo\":{\"width\":\"640\",\"url\":\"http:\\/\\/127.0.0.1:8080\\/upload\\/f4a8355538e34038889c53bf58b0ff63.png\",\"height\":\"480\"},\"text\":\"배송지 변경 가능한 주문내역이 없습니다.\\\\n 취소하시려면 \'#\'을 입력해 주세요.\"}}','2017-04-14 14:15:27','주문 조회/변경',NULL,NULL),
	(15,3,0,'주문 취소','{\"keyboard\":{\"buttons\":[],\"type\":\"text\"},\"message\":{\"text\":\"주문 취소 가능한 내역이 없습니.\\\\n 취소하시려면 \'#\'을 입력해 주세요.\"}}','2017-04-14 14:15:43','주문 조회/변경',NULL,NULL),
	(16,3,0,'반품 문의','{\"keyboard\":{\"buttons\":[],\"type\":\"text\"},\"message\":{\"message_button\":{\"label\":\"홈페이지 방문\",\"url\":\"https:\\/\\/www.shoppingntmall.com\\/index\"},\"text\":\"주문 반품은 콜센터 1234-1234로 전화하셔서 신청가능합니다.\"}}','2017-04-14 14:16:28','주문 조회/변경',NULL,NULL),
	(17,3,0,'사진 첨부 후 문의하기','{\"keyboard\":{\"buttons\":[],\"type\":\"text\"},\"message\":{\"message_button\":{\"label\":\"홈페이지 방문\",\"url\":\"https:\\/\\/www.shoppingntmall.com\\/index\"},\"text\":\"입력창 왼쪽에 잇는 +버튼을 눌러 사진을 선택하신 후 전송 버튼을 눌러주세요.\"}}','2017-04-14 14:17:59','문의하기',NULL,NULL),
	(18,3,0,'문의사항만 입력','{\"keyboard\":{\"buttons\":[],\"type\":\"text\"},\"message\":{\"message_button\":{\"label\":\"홈페이지 방문\",\"url\":\"https:\\/\\/www.shoppingntmall.com\\/index\"},\"text\":\"문의하실 내용을 모두 입력 후 전송 버튼을 눌러주세요.\"}}','2017-04-14 14:18:30','문의하기',NULL,NULL),
	(21,2,3,'회사 소개','{\"keyboard\":{\"buttons\":[\"회사 전화번호\",\"회사 주소\"],\"type\":\"buttons\"},\"message\":{\"photo\":{\"width\":\"640\",\"url\":\"http:\\/\\/127.0.0.1:8080\\/upload\\/61ba88a1b3e84c9bbe0d6e75fb5121c6.PNG\",\"height\":\"480\"},\"text\":\"회사 소개입니다.\"}}','2017-04-18 09:13:52','keyboard',NULL,NULL),
	(22,3,0,'회사 전화번호','{\"keyboard\":{\"buttons\":[],\"type\":\"text\"},\"message\":{\"text\":\"070-8188-0000\\r\\n\\r\\n팩스번호 0505-166-0000\"}}','2017-04-18 09:31:09','회사 소개',NULL,NULL),
	(23,3,1,'회사 주소','{\"keyboard\":{\"buttons\":[],\"type\":\"text\"},\"message\":{\"text\":\"서울 중구 칠패로\"}}','2017-04-18 09:31:54','회사 소개',NULL,NULL);

/*!40000 ALTER TABLE `TB_AUTOCHAT_SCENARIO` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table TB_AUTOCHAT_SCENARIO_HISTORY
# ------------------------------------------------------------

DROP TABLE IF EXISTS `TB_AUTOCHAT_SCENARIO_HISTORY`;

CREATE TABLE `TB_AUTOCHAT_SCENARIO_HISTORY` (
  `HIS_SEQ` int(11) NOT NULL AUTO_INCREMENT,
  `SEQ` int(11) NOT NULL,
  `STEP` int(2) DEFAULT NULL COMMENT '단계, 최대 3단계',
  `TRUN` int(2) DEFAULT NULL COMMENT '정렬 순서',
  `REQ_MESSAGE` varchar(1024) DEFAULT NULL COMMENT '수신 메세지 : "keyboard" 또는  메뉴명',
  `RES_MESSAGE` varchar(1024) DEFAULT NULL COMMENT '송신 메세지 : 출력 JSON',
  `WRTDATE` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ETC1` varchar(64) DEFAULT NULL,
  `ETC2` varchar(64) DEFAULT NULL,
  `ETC3` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`HIS_SEQ`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `TB_AUTOCHAT_SCENARIO_HISTORY` WRITE;
/*!40000 ALTER TABLE `TB_AUTOCHAT_SCENARIO_HISTORY` DISABLE KEYS */;

INSERT INTO `TB_AUTOCHAT_SCENARIO_HISTORY` (`HIS_SEQ`, `SEQ`, `STEP`, `TRUN`, `REQ_MESSAGE`, `RES_MESSAGE`, `WRTDATE`, `ETC1`, `ETC2`, `ETC3`)
VALUES
	(18,20,NULL,NULL,'11','{\"keyboard\":{\"type\":\"buttons\"},\"message\":{\"text\":\"22\"}}','2017-04-17 17:26:38',NULL,NULL,'I'),
	(19,20,0,0,'11','{\"keyboard\":{\"type\":\"buttons\"},\"message\":{\"text\":\"22\"}}','2017-04-17 17:27:11',NULL,NULL,'D'),
	(20,21,NULL,NULL,'회사 소개','{\"keyboard\":{\"type\":\"buttons\"},\"message\":{\"photo\":{\"width\":\"640\",\"url\":\"http:\\/\\/127.0.0.1:8080\\/upload\\/61ba88a1b3e84c9bbe0d6e75fb5121c6.PNG\",\"height\":\"480\"},\"text\":\"회사 소개입니다.\"}}','2017-04-18 09:13:52',NULL,NULL,'I'),
	(21,14,3,0,'배송지 변경','{\"keyboard\":{\"buttons\":[],\"type\":\"text\"},\"message\":{\"photo\":{\"width\":\"640\",\"url\":\"http:\\/\\/127.0.0.1:8080\\/upload\\/f4a8355538e34038889c53bf58b0ff63.png\",\"height\":\"480\"},\"text\":\"배송지 변경 가능한 주문내역이 없습니다.\\\\n 취소하시려면 \'#\'을 입력해 주세요.\"}}','2017-04-18 09:24:12','주문 조회/변경',NULL,'U'),
	(22,22,NULL,NULL,'회사 전화번호','{\"keyboard\":{\"type\":\"text\"},\"message\":{\"text\":\"070-8188-0000\\r\\n\\r\\n팩스번호 0505-166-0000\"}}','2017-04-18 09:31:09',NULL,NULL,'I'),
	(23,23,NULL,NULL,'회사 주소','{\"keyboard\":{\"type\":\"text\"},\"message\":{\"text\":\"서울 중구 칠패로\"}}','2017-04-18 09:31:54',NULL,NULL,'I');

/*!40000 ALTER TABLE `TB_AUTOCHAT_SCENARIO_HISTORY` ENABLE KEYS */;
UNLOCK TABLES;



# Dump of table TB_SHORTURL
# ------------------------------------------------------------

DROP TABLE IF EXISTS `TB_SHORTURL`;

CREATE TABLE `TB_SHORTURL` (
  `SEQ` int(11) NOT NULL AUTO_INCREMENT,
  `LONG_URL` varchar(1024) NOT NULL,
  `SHORT_URL` varchar(128) DEFAULT NULL,
  `CALL_CNT` int(11) NOT NULL DEFAULT '0',
  `WRTDATE` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ETC1` varchar(64) DEFAULT NULL,
  `ETC2` varchar(64) DEFAULT NULL,
  `ETC3` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`SEQ`),
  KEY `TB_AUTOCHAT_CUSTOMER_IDX1` (`SHORT_URL`),
  KEY `TB_AUTOCHAT_CUSTOMER_IDX2` (`LONG_URL`(255))
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `TB_SHORTURL` WRITE;
/*!40000 ALTER TABLE `TB_SHORTURL` DISABLE KEYS */;

INSERT INTO `TB_SHORTURL` (`SEQ`, `LONG_URL`, `SHORT_URL`, `CALL_CNT`, `WRTDATE`, `ETC1`, `ETC2`, `ETC3`)
VALUES
	(80,'http://www.proidea.kr/samples/web-application-manifest/add-to-homescreen/demos/simple/','Dmh3Mb',1,'2017-03-29 15:34:01',NULL,NULL,NULL),
	(81,'http://www.proidea.kr/samples/web-application-manifest/add-to-homescreen/demos/simple/','poh3Mb',0,'2017-03-29 15:35:50',NULL,NULL,NULL),
	(82,'http://www.proidea.kr/samples/web-application-manifest/add-to-homescreen/demos/simple/','Pph3Mb',1,'2017-03-29 15:37:17',NULL,NULL,NULL),
	(83,'http://www.proidea.kr/samples/web-application-manifest/add-to-homescreen/demos/simple/','Duh3Mb',0,'2017-03-29 15:42:14',NULL,NULL,NULL),
	(84,'https://linuxacademy.com/blog/mobile/create-an-add-to-home-screen-popup-html5-or-jquery-mobile/','lyh3Mb',0,'2017-03-29 15:46:03',NULL,NULL,NULL),
	(85,'http://www.proidea.kr/samples/web-application-manifest/add-to-homescreen/demos/simple/','2Ch3Mb',4,'2017-03-29 15:50:53',NULL,NULL,NULL);

/*!40000 ALTER TABLE `TB_SHORTURL` ENABLE KEYS */;
UNLOCK TABLES;




CREATE TABLE `TB_ICR_COUNSELOR` (
  `SEQ` int(11) NOT NULL AUTO_INCREMENT,
  `UNIQUE_ID` varchar(64) NOT NULL,
  `NAME` varchar(128) DEFAULT NULL,
  `PHONE` varchar(16) DEFAULT NULL,
  `TYPE` varchar(10)  DEFAULT NULL,
  `PASSWORD` varchar(128) DEFAULT NULL,
  `WRTDATE` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `MODDATE` timestamp NULL,  
  `ETC1` varchar(64) DEFAULT NULL,
  `ETC2` varchar(64) DEFAULT NULL,
  `ETC3` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`SEQ`),
  KEY `TB_ICR_COUNSELOR_IDX1` (`UNIQUE_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `TB_ICR_COUNSELOR_LIST` (
  `SEQ` int(11) NOT NULL AUTO_INCREMENT,
  `COUNSELOR_ID` varchar(64) NOT NULL,
  `STATUS` varchar(10) DEFAULT NULL,
  `WRTDATE` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `MODDATE` timestamp NULL,  
  `ETC1` varchar(64) DEFAULT NULL,
  `ETC2` varchar(64) DEFAULT NULL,
  `ETC3` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`SEQ`),
  KEY `TB_ICR_COUNSELOR_LIST_IDX1` (`COUNSELOR_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `TB_ICR_USER_LIST` (
  `SEQ` int(11) NOT NULL AUTO_INCREMENT,
  `USER_ID` varchar(64) NOT NULL,
  `STATUS` varchar(10) DEFAULT NULL,
  `WRTDATE` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `MODDATE` timestamp NULL,  
  `ETC1` varchar(64) DEFAULT NULL,
  `ETC2` varchar(64) DEFAULT NULL,
  `ETC3` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`SEQ`),
  KEY `TB_ICR_USER_LIST_IDX1` (`USER_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `TB_ICR_ROOM_LIST` (
  `SEQ` int(11) NOT NULL AUTO_INCREMENT,
  `USER_ID` varchar(64) NOT NULL,
  `COUNSELOR_ID` varchar(64) NOT NULL,
  `STATUS` varchar(10) DEFAULT NULL,
  `WRTDATE` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `MODDATE` timestamp NULL,  
  `ETC1` varchar(64) DEFAULT NULL,
  `ETC2` varchar(64) DEFAULT NULL,
  `ETC3` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`SEQ`),
  KEY `TB_ICR_ROOM_LIST_IDX1` (`COUNSELOR_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE `TB_ICR_CHAT_HISTORY` (
  `SEQ` int(11) NOT NULL AUTO_INCREMENT,
  `ROOM_SEQ` int(11) NOT NULL,
  `CHAT_SEQ` int(11) NOT NULL,
  `USER_ID` varchar(64) NOT NULL,
  `COUNSELOR_ID` varchar(64) NOT NULL,
  `TYPE` varchar(10) DEFAULT NULL, /* IN(COUNSELOR <- USER) / OUT(COUNSELOR -> USER) */
  `CONTENTS` varchar(2000) DEFAULT NULL,
  `WRTDATE` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ETC1` varchar(64) DEFAULT NULL,
  `ETC2` varchar(64) DEFAULT NULL,
  `ETC3` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`SEQ`),
  KEY `TB_ICR_CHAT_HISTORY_IDX1` (`ROOM_SEQ`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
