# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 14.63.213.246 (MySQL 5.5.53-0ubuntu0.12.04.1)
# Database: SMART_MESSAGE_VERTWO
# Generation Time: 2017-06-27 12:30:56 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


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
  (11,'AC-IhLk85-CP',NULL,NULL,'N','2017-06-15 13:40:52',NULL,NULL,NULL);

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
  (170,'K9FRdTXPH9Vv','keyboard','2017-06-15 09:51:08',NULL,NULL,NULL);

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
  (7,1,4,'keyboard','{\"keyboard\":{\"buttons\":[\"일반 문의\",\"요금 문의\",\"변경 문의\",\"해지 문의\",\"티브로드에 문의하기\"],\"type\":\"buttons\"},\"message\":{\"text\":\"아래 내용 중 선택해 주세요!\"}}','2017-04-14 14:00:55','',NULL,NULL),
  (24,2,0,'일반 문의','{\"keyboard\":{\"buttons\":[\"홈페이지주소\",\"콜센터 전화번호\"],\"type\":\"buttons\"},\"message\":{\"text\":\"콜센터 전화번호, 홈페이지 주소 등 간단한 정보를 안해 드립니다.\\r\\n\\r\\n처음으로 가시려면 \\\"돌아가기\\\" 또는 \\\"#\\\"을 입력해 주세요.\"}}','2017-06-15 09:42:24','keyboard','7',NULL),
  (25,2,1,'요금 문의','{\"keyboard\":{\"buttons\":[\"요금조회\",\"입금확인기간\",\"소득공제 안내\"],\"type\":\"buttons\"},\"message\":{\"text\":\"고객님의 요금 조회, 입금확인 기간 안내 등을 제공 하고 있습니다.\\r\\n\\r\\n처음으로 가시려면 \\\"돌아가기\\\" 또는 \\\"#\\\"을 입력해 주세요.\"}}','2017-06-15 09:43:49','keyboard','7',NULL),
  (26,2,2,'변경 문의','{\"keyboard\":{\"buttons\":[\"명의 변경 방법\",\"일시정지 안내\"],\"type\":\"buttons\"},\"message\":{\"text\":\"명의 변경 방법, 일시정지 방법을 안내 하고 있습니다.\\r\\n\\r\\n처음으로 가시려면 \\\"돌아가기\\\" 또는 \\\"#\\\"을 입력해 주세요.\"}}','2017-06-15 09:44:39','keyboard','7',NULL),
  (27,2,3,'해지 문의','{\"keyboard\":{\"buttons\":[\"해지안내\"],\"type\":\"buttons\"},\"message\":{\"text\":\"서비스 해지 방법을 안내 해드립니다. 아래 메뉴를 선택하세요.\\r\\n\\r\\n처음으로 가시려면 \\\"돌아가기\\\" 또는 \\\"#\\\"을 입력해 주세요.\"}}','2017-06-15 09:45:30','keyboard','7',NULL),
  (30,3,0,'입금확인기간','{\"keyboard\":{\"type\":\"text\"},\"message\":{\"text\":\"입금 후 아래와 같이 확인이 가능합니다.\\r\\n\\r\\n-. 은행 자동이체는 출금된 후 평일기준 2~3일\\r\\n-. 카드납부는 결제된 후 평일기준 1~2일\\r\\n-. 지로납부는 납부된 후 평일기준 3~4일 \\r\\n경과 후 입금 확인이 가능합니다.\\r\\n\\r\\n단, 가상계좌로 입금한 경우나 카드, 휴대폰으로 즉시 결제한 경우에는 입금 또는 결제 후 바로 입금 확인 가능합니다.\\r\\n\\r\\n처음으로 가시려면 #을 입력해 주세요.\"}}','2017-06-15 13:47:56','요금 문의','25',NULL),
  (31,3,1,'소득공제 안내','{\"keyboard\":{\"type\":\"text\"},\"message\":{\"text\":\"<통신요금 소득공제 여부> \\r\\n방송 요금, 인터넷 요금, 전화 요금 등의 통신요금은 연말정산시 소득공제 및 현금 영수증 발급 대상이 아닙니다.\\r\\n 단, 설치비를 현금으로 납부 했을 경우에는 현금 영수증 발급이 가능합니다.\\r\\n\\r\\n처음으로 가시려면 #을 입력해 주세요.\"}}','2017-06-15 13:49:19','요금 문의','25',NULL),
  (32,3,0,'명의 변경 방법','{\"keyboard\":{\"type\":\"text\"},\"message\":{\"message_button\":{\"label\":\"홈페이지\",\"url\":\"http:\\/\\/www.tbroad.com\"},\"text\":\"- 명의변경을 하시려면 명의변경신청서+양도인 서류(신분증 or 사업자등록증)+양수인 서류(신분증 or 사업자등록증)가 구비되어야 합니다.\\r\\n\\r\\n 명의변경신청서는 티브로드 홈페이지에서도 다운로드 가능합니다.  아래 경로 URL 기재.\\r\\n(http:\\/\\/www.tbroad.com → 고객센터 → 서비스이용안내 → 서류양식다운로드)\\r\\n\\r\\n처음으로 가시려면 #을 입력해 주세요.\"}}','2017-06-15 13:50:42','변경 문의','26',NULL),
  (33,3,1,'일시정지 안내','{\"keyboard\":{\"type\":\"text\"},\"message\":{\"text\":\"- 일시정지는 1회에 30일 범위내에서 년 3회까지 신청할 수 있으며, 1년 동안 최대 90일을 초과할 수 없습니다. \\r\\n\\r\\n일시정지 기간 동안에는 사용료는 부과되지 않지만, 장비임대료는 정상적으로 부과됩니다. \\r\\n\\r\\n일시정지 해제시 일부 방송 상품의 경우 재연결비가 부과될 수 있습니다.\\r\\n\\r\\n약정중인 서비스 상품의 경우 일시정지 기간은 약정 기간에 미포함되어, 정지 기간만큼 약정 기간이 연장됩니다.\\r\\n\\r\\n - 일시정지 관련 자세한 문의는 티브로드 콜센터 1877-7000 으로 연락주세요.  감사합니다.\\r\\n\\r\\n처음으로 가시려면 #을 입력해 주세요.\"}}','2017-06-15 13:51:33','변경 문의','26',NULL),
  (34,3,0,'해지안내','{\"keyboard\":{\"type\":\"text\"},\"message\":{\"text\":\"- 해지문의 및 접수는 \\r\\n  1. 가입자 본인 : 해지상담 및 본인인증(본인여부 확인) 후 접수가 가능 합니다.\\r\\n  2. 자녀, 배우자, 부모 : 해지 상담은\\r\\n  가능 하나 해지 접수는 불가합니다.\\r\\n  해지 접수는 가입자 본인만 가능 합니다\\r\\n  3. 제3자 : 해지상담 및 해지접수 모두\\r\\n  불가합니다. \\r\\n\\r\\n- 해지문의 및 접수 시간은\\r\\n  평일 9시 ~ 18시입니다.\\r\\n  주말과 공휴일은 접수가 불가합니다. \\r\\n   \\r\\n- 해지 관련 자세한 문의는 \\r\\n  티브로드 콜센터 1877-7000 로 \\r\\n  연락 주시기 바랍니다. \\r\\n\\r\\n처음으로 가시려면 #을 입력해 주세요.\"}}','2017-06-15 13:52:11','해지 문의','27',NULL),
  (35,2,4,'티브로드에 문의하기','{\"keyboard\":{\"type\":\"text\"},\"message\":{\"text\":\"입력창에 문의하실 내용을 입력 후 전송 버튼을 눌러주세요. \\r\\n처음으로 가시려면 #을 입력해 주세요.\\r\\n\\r\\n<고객이 문의 입력 후 전송 버튼 누르면>\\r\\n문의가 정상적으로 접수되었습니다. \\r\\n빠른 시간 내 답변드리도록 하겠습니다.\"}}','2017-06-15 13:53:22','keyboard','7',NULL),
  (37,3,0,'요금조회','{\"keyboard\":{\"type\":\"text\"},\"message\":{\"text\":\"(방긋)톡 상담을 처음 이용하시네요. 개인정보 수집에 대한 동의를 꼭 확인해주세요. \\r\\n \\r\\n㈜티브로드 개인정보 수집이용 동의 \\r\\n \\r\\n- 이용 목적 : 회원 식별\\/상담\\/민원처리 등 \\r\\n- 수집 항목 : 휴대폰번호, 생년월일 (요금관련 상담시) \\r\\n- 보유 기간 : 회원 탈퇴 시 혹은 법정 보유 기간 \\r\\n- 수탁 업체 : ㈜티브로드 \\r\\n- 위탁 업무 : 톡 기반 상담 서비스 제공\\r\\n \\r\\n(하하)티-브로드 친구추가를 하신 후 톡 상담을 이용하시기 바랍니다. \\r\\n \\r\\n(씨익)서비스 이용을 위해 개인정보 수집 이용 동의 내용을 확인하시고, 동의하시면 휴대폰 번호를 입력해주세요 \\r\\n \\r\\n( - 없이 숫자만 입력)\"}}','2017-06-15 19:55:12','요금 문의','25',NULL),
  (40,3,0,'콜센터 전화번호','{\"keyboard\":{\"type\":\"text\"},\"message\":{\"message_button\":{\"label\":\"홈페이지방문\",\"url\":\"http:\\/\\/www.tbroad.com\\/\"},\"text\":\"가입관련 자세한 문의는 티브로드 콜센터 1877-7000으로 연락주세요. \\r\\n\\r\\n처음으로 가시려면 \\\"돌아가기\\\" 또는 \\\"#\\\"을 입력해 주세요.\"}}','2017-06-21 20:34:30','일반 문의','24',NULL),
  (41,3,0,'홈페이지주소','{\"keyboard\":{\"type\":\"text\"},\"message\":{\"message_button\":{\"label\":\"홈페이지방문\",\"url\":\"http:\\/\\/www.tbroad.com\\/\"},\"text\":\"홈페이지 주소는 http:\\/\\/www.tbroad.com 입니다. 방문을 원하시면 아래 버튼을 선택해주세요.\\r\\n\\r\\n처음으로 가시려면 \\\"돌아가기\\\"  선택 하시거나 또는 \\\"#\\\"을 입력해주세요.\"}}','2017-06-21 20:35:12','일반 문의','24',NULL),
  (42,0,0,'테스트버튼','{\"keyboard\":{\"type\":\"buttons\"},\"message\":{\"text\":\"1111\"}}','2017-06-23 13:48:06',NULL,NULL,NULL),
  (60,-1,0,'NAME','{\"message\": {\"text\": \"문의 사항에 대해서 알림톡으로 회신 예정이며 이를 위해 고객님의 성함을 입력해 주세요.\r\n 취소하시려면 \\\"#\\\"을 입력해 주세요.\"},\"keyboard\": {\"type\":\"text\"}}','2017-06-26 20:15:00',NULL,NULL,'system'),
  (61,-1,0,'PHONE','{\"message\": {\"text\": \"문의 사항에 대해서 알림톡으로 회신 예정이며 이를 위해 고객님의 핸드폰번호를 - 없이 숫자만 입력해 주세요.\r\n 취소하시려면 \\\"#\\\"을 입력해 주세요.\"},\"keyboard\": {\"type\":\"text\"}}','2017-06-26 20:15:19',NULL,NULL,'system'),
  (62,-1,0,'AUTH','{\"message\": {\"text\": \"고객님의 핸드폰번호으로 인증번호를 전달해 드렸습니다. 확인 후 입력을 부탁 드립니다. 숫자만 입력해 주세요.\r\n 취소하시려면 \\\"#\\\"을 입력해 주세요.\"}, \"keyboard\": {\"type\":\"text\"}}','2017-06-26 20:15:20',NULL,NULL,'system'),
  (63,-1,0,'QUESTION_OK','{\"message\":  {\"text\": \"문의가 정상적으로 접수되었습니다. 평일 9시~18시, 빠른 시간 안에 답변 드리겠습니다.\r\n 처음으로 가시려 \\\"#\\\"을 입력해 주세요.\"},\"keyboard\": {\"type\":\"text\"}}','2017-06-26 20:15:20',NULL,NULL,'system');

INSERT INTO `TB_AUTOCHAT_SCENARIO` (`STEP`, `TRUN`, `REQ_MESSAGE`, `RES_MESSAGE`, `ETC1`, `ETC2`, `ETC3`)
VALUES
  (-1, 0, 'AUTH_OK', '{\"message\":  {\"text\": \"최종 확인하였습니다. 요청하신 정보를 조회합니다. 취소하시려면 \'#\'을 입력해 주세요.\"},\"keyboard\": {\"type\":\"text\"}}', NULL, NULL, 'system');

INSERT INTO `TB_AUTOCHAT_SCENARIO` (`STEP`, `TRUN`, `REQ_MESSAGE`, `RES_MESSAGE`, `ETC1`, `ETC2`, `ETC3`)
VALUES
  (-1, 0, 'AUTH_NOK', '{\"message\":  {\"text\": \"입력하신 인증 번호가 정확하지 않습니다. 오류가 있으시면 채팅방 종료하시면 모든 개인정보를 안전하게 지워집니다.처음으로 가시려면 \'#\'을 입력해 주세요.\"},\"keyboard\": {\"type\":\"text\"}}', NULL, NULL, 'system');  

INSERT INTO `TB_AUTOCHAT_SCENARIO` (`STEP`, `TRUN`, `REQ_MESSAGE`, `RES_MESSAGE`, `ETC1`, `ETC2`, `ETC3`)
VALUES
  (-1, 0, 'PHONE_NOK', '{\"message\":  {\"text\": \"입력하신 전화번호가 정확하지 않습니다. 전화번호는 숫자만 입력하여 주십시요. 이전으로 가시려면 \'#\'을 입력해 주세요.\"},\"keyboard\": {\"type\":\"text\"}}', NULL, NULL, 'system');  


INSERT INTO `TB_AUTOCHAT_SCENARIO` (`STEP`, `TRUN`, `REQ_MESSAGE`, `RES_MESSAGE`, `WRTDATE`, `ETC1`, `ETC2`, `ETC3`)
VALUES
  ( 1, 4, 'keyboard', '{\"message\":{\"text\":\"아래 내용 중 선택해 주세요!\"},\"keyboard\":{\"buttons\":[\"일반 문의\",\"변경 문의\",\"요금 문의\",\"해지 문의\",\"티브로드에 문의하기\"],\"type\":\"buttons\"}}', '2017-04-14 14:00:55', '', '', NULL),
  ( 2, 0, '일반 문의', '{\"message\":{\"text\":\"콜센터 전화번호, 홈페이지 주소 등 간단한 정보를 안해 드립니다.\\r\\n\\r\\n처음으로 가시려면 \\\"처음으로\\\"를 선택해 주세요\"},\"keyboard\":{\"buttons\":[\"홈페이지주소\",\"콜센터 전화번호\"],\"type\":\"buttons\"}}', '2017-06-15 09:42:24', 'keyboard', '7', NULL),
  ( 2, 2, '요금 문의', '{\"message\":{\"text\":\"고객님의 요금 조회, 입금확인 기간 안내 등을 제공 하고 있습니다.\\r\\n\\r\\n처음으로 가시려면 \\\"처음으로\\\" 선택해 주세요.\"},\"keyboard\":{\"buttons\":[\"요금조회\",\"입금확인기간\"],\"type\":\"buttons\"}}', '2017-06-15 09:43:49', 'keyboard', '7', NULL),
  ( 2, 1, '변경 문의', '{\"message\":{\"text\":\"명의 변경 방법, 일시정지 방법을 안내 하고 있습니다.\\r\\n\\r\\n처음으로 가시려면 \\\"처음으로\\\"를  선택해 주세요.\"},\"keyboard\":{\"buttons\":[\"명의 변경 방법\",\"일시정지 안내\"],\"type\":\"buttons\"}}', '2017-06-15 09:44:39', 'keyboard', '7', NULL),
  ( 2, 3, '해지 문의', '{\"message\":{\"text\":\"서비스 해지 방법을 안내 해드립니다. 아래 메뉴를 선택하세요.\\r\\n\\r\\n처음으로 가시려면 \\\"처음으로\\\"를 선택해 주세요.\"},\"keyboard\":{\"buttons\":[\"소득공제 안내\",\"해지안내\"],\"type\":\"buttons\"}}', '2017-06-15 09:45:30', 'keyboard', '7', NULL),
  ( 3, 1, '입금확인기간', '{\"message\":{\"text\":\"입금 후 아래와 같이 확인이 가능합니다.\\r\\n\\r\\n-. 은행 자동이체는 출금된 후 평일기준 2~3일\\r\\n-. 카드납부는 결제된 후 평일기준 1~2일\\r\\n-. 지로납부는 납부된 후 평일기준 3~4일 \\r\\n경과 후 입금 확인이 가능합니다.\\r\\n\\r\\n단, 가상계좌로 입금한 경우나 카드, 휴대폰으로 즉시 결제한 경우에는 입금 또는 결제 후 바로 입금 확인 가능합니다.\\r\\n\\r\\n처음으로 가시려면 #을 입력해 주세요.\"},\"keyboard\":{\"buttons\":[],\"type\":\"text\"}}', '2017-06-15 13:47:56', '요금 문의', '25', NULL),
  ( 3, 0, '소득공제 안내', '{\"message\":{\"text\":\"방송 요금, 인터넷 요금, 전화 요금 등의 통신요금은 연말정산 시 소득공제 및 현금 영수증 발급 대상이 아닙니다.\\r\\n\\r\\n단, 설치비를 현금으로 납부 했을 경우에는 현금 영수증 발급이 가능합니다.\\r\\n처음으로 가시려면 \\\"#\\\"을 입력해 주세요.\"},\"keyboard\":{\"buttons\":[],\"type\":\"text\"}}', '2017-06-15 13:49:19', '해지 문의', '27', NULL),
  ( 3, 0, '명의 변경 방법', '{\"message\":{\"message_button\":{\"label\":\"홈페이지\",\"url\":\"http:\\/\\/www.tbroad.com\"},\"text\":\"- 명의변경을 하시려면 명의변경신청서+양도인 서류(신분증 or 사업자등록증)+양수인 서류(신분증 or 사업자등록증)가 구비되어야 합니다.\\r\\n\\r\\n 명의변경신청서는 티브로드 홈페이지에서도 다운로드 가능합니다.\\r\\n(http:\\/\\/www.tbroad.com → 고객센터 → 서비스이용안내 → 서류양식다운로드)\\r\\n\\r\\n처음으로 가시려면 \\\"#\\\"을 입력해 주세요.\"},\"keyboard\":{\"buttons\":[],\"type\":\"text\"}}', '2017-06-15 13:50:42', '변경 문의', '26', NULL),
  ( 3, 1, '일시정지 안내', '{\"message\":{\"text\":\"- 일시정지는 1회에 30일 범위내에서 년 3회까지 신청할 수 있으며, 1년 동안 최대 90일을 초과할 수 없습니다. \\r\\n\\r\\n일시정지 기간 동안에는 사용료는 부과되지 않지만, 장비임대료는 정상적으로 부과됩니다. \\r\\n\\r\\n일시정지 해제시 일부 방송 상품의 경우 재연결비가 부과될 수 있습니다.\\r\\n\\r\\n약정중인 서비스 상품의 경우 일시정지 기간은 약정 기간에 미포함되어, 정지 기간만큼 약정 기간이 연장됩니다.\\r\\n\\r\\n - 일시정지 관련 자세한 문의는 티브로드 콜센터 1877-7000 으로 연락주세요.  감사합니다.\\r\\n\\r\\n처음으로 가시려면 \\\"#\\\"을 입력해 주세요.\"},\"keyboard\":{\"buttons\":[],\"type\":\"text\"}}', '2017-06-15 13:51:33', '변경 문의', '26', NULL),
  ( 3, 1, '해지안내', '{\"message\":{\"text\":\"- 해지문의 및 접수는 \\r\\n  1. 가입자 본인 : 해지상담 및 본인인증(본인여부 확인) 후 접수가 가능 합니다.\\r\\n  2. 자녀, 배우자, 부모 : 해지 상담은\\r\\n  가능 하나 해지 접수는 불가합니다.\\r\\n  해지 접수는 가입자 본인만 가능 합니다\\r\\n  3. 제3자 : 해지상담 및 해지접수 모두\\r\\n  불가합니다. \\r\\n\\r\\n- 해지문의 및 접수 시간은\\r\\n  평일 9시 ~ 18시입니다.\\r\\n  주말과 공휴일은 접수가 불가합니다. \\r\\n   \\r\\n- 해지 관련 자세한 문의는 \\r\\n  티브로드 콜센터 1877-7000 로 \\r\\n  연락 주시기 바랍니다. \\r\\n\\r\\n처음으로 가시려면 #을 입력해 주세요.\"},\"keyboard\":{\"buttons\":[],\"type\":\"text\"}}', '2017-06-15 13:52:11', '해지 문의', '27', NULL),
  ( 2, 4, '티브로드에 문의하기', '{\"message\":{\"text\":\"#> 문의 사항을 입력창에 입력 후 \\\"전송\\\" 버튼을 눌러주세요 또는 입력창 왼쪽에 \\\"+\\\"를 눌러 이미지 전송도 가능합니다. \\r\\n\\r\\n문의사항에 대해서는 빠른 시간 내 답변 드리겠습니다.\\r\\n\\r\\n처음으로 가시려면 \'#\'을 입력해 주세요.\"},\"keyboard\":{\"buttons\":[],\"type\":\"text\"}}', '2017-06-15 13:53:22', 'keyboard', '7', 'input'),
  ( 3, 0, '요금조회', '{\"message\":{\"text\":\"(방긋)톡 상담을 처음 이용하시네요. 개인정보 수집에 대한 동의를 꼭 확인해주세요. \\r\\n \\r\\n㈜티브로드 개인정보 수집이용 동의 \\r\\n \\r\\n- 이용 목적 : 회원 식별\\/상담\\/민원처리 등 \\r\\n- 수집 항목 : 휴대폰번호, 생년월일 (요금관련 상담시) \\r\\n- 보유 기간 : 회원 탈퇴 시 혹은 법정 보유 기간 \\r\\n- 수탁 업체 : ㈜티브로드 \\r\\n- 위탁 업무 : 톡 기반 상담 서비스 제공\\r\\n \\r\\n(하하)티-브로드 친구추가를 하신 후 톡 상담을 이용하시기 바랍니다. \\r\\n \\r\\n(씨익)서비스 이용을 위해 개인정보 수집 이용 동의 내용을 확인하시고, 동의하시면 휴대폰 번호를 입력해주세요 \\r\\n \\r\\n( - 없이 숫자만 입력)\"},\"keyboard\":{\"buttons\":[],\"type\":\"text\"}}', '2017-06-15 19:55:12', '요금 문의', '25', 'if'),
  ( 3, 1, '콜센터 전화번호', '{\"message\":{\"message_button\":{\"label\":\"홈페이지방문\",\"url\":\"http:\\/\\/www.tbroad.com\\/\"},\"text\":\"가입관련 자세한 문의는 티브로드 콜센터 1877-7000으로 연락주세요. \\r\\n\\r\\n(다이얼 6번) 자동안내서비스\\r\\n* 당월 청구서 요금\\/미납요금 안내\\r\\n6번 > 1번 요금 관련 자동 안내 > 1번 당월 청구요금\\/미납요금\\r\\n안내 [ 생년월일 또는 사업자 번호 입력 > 청구 요금 안내\\r\\n\\r\\n* 청구서 재발행\\r\\n6번 > 1번 요금 관련 자동안내 > 2번 청구서 재발행\\r\\n[생년월일 또는 사업자 번호] > 1번 문자 청구서 발행 \\/\\r\\n2번 이메일 \\/ 3번 우편 \\/ 4번 무통장입금 계좌 안내\\r\\n\\r\\n* 입급 확인 안내\\r\\n6번 > 1번 요금 관련 자동 안내 > 3번 입금 확인 안내\\r\\n[생년월일 또는 사업자 번호] > 입금 연월일 > 입금내역 확인\\r\\n\\r\\n* ARS 자동안내\\r\\n6번 > 2번 ARS 자동안내\\r\\n\\r\\n* 팩스 자동 발신\\r\\n6번 > 3번 팩스 자동 발신\\r\\n\\r\\n* 기타 전화번호 \\r\\n일반상담 : 070-8177-0000\\r\\nFAX:0505-166-8592\\r\\n\\r\\n처음으로 가시려면  \\\"#\\\"을 입력해 주세요.\"},\"keyboard\":{\"buttons\":[],\"type\":\"text\"}}', '2017-06-21 20:34:30', '일반 문의', '24', NULL),
  ( 3, 0, '홈페이지주소', '{\"message\":{\"message_button\":{\"label\":\"홈페이지방문\",\"url\":\"http:\\/\\/www.tbroad.com\\/\"},\"text\":\"홈페이지 주소는 (http:\\/\\/www.tbroad.com) 입니다.\\r\\n\\r\\n방문을 원하시면 아래 버튼을 선택해주세요.\\r\\n\\r\\n처음으로 가시려면  \\\"#\\\"을 입력해주세요.\"},\"keyboard\":{\"buttons\":[],\"type\":\"text\"}}', '2017-06-21 20:35:12', '일반 문의', '24', NULL),
  ( -1, 0, 'NAME', '{\"message\":{\"text\":\"문의 사항에 대해서 알림톡으로 회신 예정이며 이를 위해 고객님의 성함을 입력해 주세요. 취소하시려면 \'#\'을 입력해 주세요.\"},\"keyboard\":{\"buttons\":[],\"type\":\"text\"}}', '2017-06-29 07:55:09', '', 'system', 'system'),
  ( -1, 0, 'PHONE', '{\"message\":{\"text\":\"문의 사항에 대해서 알림톡으로 회신 예정이며 이를 위해 고객님의 핸드폰번호를 - 없이 숫자만 입력해 주세요. 취소하시려면 \'#\'을 입력해 주세요.\"},\"keyboard\":{\"buttons\":[],\"type\":\"text\"}}', '2017-06-29 07:55:09', '', 'system', 'system'),
  ( -1, 0, 'AUTH', '{\"message\":{\"text\":\"고객님의 핸드폰번호으로 인증번호를 전달해 드렸습니다. 확인 후 입력을 부탁 드립니다. 숫자만 입력해 주세요. 취소하시려면 \'#\'을 입력해 주세요.\"},\"keyboard\":{\"buttons\":[],\"type\":\"text\"}}', '2017-06-29 07:55:09', '', 'system', 'system'),
  ( -1, 0, 'QUESTION_OK', '{\"message\":{\"text\":\"문의가 정상적으로 접수 되었습니다. \\r\\n\\r\\n평일 9시~18시에 고객님에게 회신 드리겠습니다,\\r\\n\\r\\n빠른 시간 안에 답변 드리겠습니다. 처음으로 가시려면 \\\"#\\\"을 입력해 주세요.\"},\"keyboard\":{\"buttons\":[],\"type\":\"text\"}}', '2017-06-29 07:55:09', '', 'system', 'system'),
  ( -1, 0, 'AUTH_OK', '{\"message\":{\"text\":\"최종 확인하였습니다. 요청하신 정보를 조회합니다. 취소하시려면 \'#\'을 입력해 주세요.\"},\"keyboard\":{\"buttons\":[],\"type\":\"text\"}}', '2017-06-29 19:55:42', '', 'system', 'system'),
  ( -1, 0, 'AUTH_NOK', '{\"message\":{\"text\":\"입력하신 인증 번호가 정확하지 않습니다. 오류가 있으시면 채팅방 종료하시면 모든 개인정보를 안전하게 지워집니다.처음으로 가시려면 \'#\'을 입력해 주세요.\"},\"keyboard\":{\"buttons\":[],\"type\":\"text\"}}', '2017-06-29 19:55:43', '', 'system', 'system'),
  ( -1, 0, 'PHONE_NOK', '{\"message\":  {\"text\": \"입력하신 전화번호가 정확하지 않습니다. 전화번호는 숫자만 입력하여 주십시요. 이전으로 가시려면 \'#\'을 입력해 주세요.\"},\"keyboard\": {\"type\":\"text\"}}', '2017-07-05 13:00:50', NULL, NULL, 'system');


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
  (24,24,NULL,NULL,'일반','{\"keyboard\":{\"type\":\"buttons\"},\"message\":{\"text\":\"콜센터 전화번호, 홈페이지 주소 등 간단한 정보를 안해 드립니다.\"}}','2017-06-15 09:42:24',NULL,NULL,'I'),
  (25,25,NULL,NULL,'요금','{\"keyboard\":{\"type\":\"buttons\"},\"message\":{\"text\":\"고객님의 요금 조회, 입금확인 기간 안내 등을 제공 하고 있습니다.\"}}','2017-06-15 09:43:49',NULL,NULL,'I'),
  (26,26,NULL,NULL,'변경','{\"keyboard\":{\"type\":\"buttons\"},\"message\":{\"text\":\"명의 변경 방법, 일시정지 방법을 안내 하고 있습니다.\"}}','2017-06-15 09:44:39',NULL,NULL,'I'),
  (27,27,NULL,NULL,'해지','{\"keyboard\":{\"type\":\"buttons\"},\"message\":{\"text\":\"서비스 해지 방법을 안해 드립니다. 아래 메뉴를 선택하세요.\"}}','2017-06-15 09:45:30',NULL,NULL,'I'),
  (28,28,NULL,NULL,'콜센터 전화번호','{\"keyboard\":{\"type\":\"buttons\"},\"message\":{\"message_button\":{\"label\":\"홈페이지\",\"url\":\"http:\\/\\/www.tbroad.com\\/\"},\"text\":\"가입관련 자세한 문의는 티브로드 콜센터 1877-7000으로 연락주세요. \\r\\n감사합니다.\"}}','2017-06-15 09:50:01',NULL,NULL,'I'),
  (29,28,0,0,'콜센터 전화번호','{\"keyboard\":{\"type\":\"text\"},\"message\":{\"message_button\":{\"label\":\"홈페이지\",\"url\":\"http:\\/\\/www.tbroad.com\\/\"},\"text\":\"가입관련 자세한 문의는 티브로드 콜센터 1877-7000으로 연락주세요. \\r\\n감사합니다.\"}}','2017-06-15 09:50:21',NULL,NULL,'U'),
  (30,29,NULL,NULL,'홈페이지주소','{\"keyboard\":{\"type\":\"text\"},\"message\":{\"message_button\":{\"label\":\"홈페이지\",\"url\":\"http:\\/\\/www.tbroad.com\\/\"},\"text\":\"홈페이지 주소는 www.tbroad.com 입니다. 방문을 원하시면 아래 버튼을 선택해주세요.\\r\\n처음으로 가시려면 \\\"돌아가기\\\"  선택하시거나 또는 \\\"#\\\"을 입력해주세요.\"}}','2017-06-15 13:44:25',NULL,NULL,'I'),
  (31,30,NULL,NULL,'입금확인기간','{\"keyboard\":{\"type\":\"text\"},\"message\":{\"text\":\"입금 후 아래와 같이 확인이 가능합니다.\\r\\n\\r\\n-. 은행 자동이체는 출금된 후 평일기준 2~3일\\r\\n-. 카드납부는 결제된 후 평일기준 1~2일\\r\\n-. 지로납부는 납부된 후 평일기준 3~4일 \\r\\n경과 후 입금 확인이 가능합니다.\\r\\n\\r\\n단, 가상계좌로 입금한 경우나 카드, 휴대폰으로 즉시 결제한 경우에는 입금 또는 결제 후 바로 입금 확인 가능합니다.\"}}','2017-06-15 13:47:56',NULL,NULL,'I'),
  (32,31,NULL,NULL,'소득공제 안내','{\"keyboard\":{\"type\":\"text\"},\"message\":{\"text\":\"<통신요금 소득공제 여부> \\r\\n방송 요금, 인터넷 요금, 전화 요금 등의 통신요금은 연말정산시 소득공제 및 현금 영수증 발급 대상이 아닙니다.\\r\\n 단, 설치비를 현금으로 납부 했을 경우에는 현금 영수증 발급이 가능합니다.\"}}','2017-06-15 13:49:19',NULL,NULL,'I'),
  (33,32,NULL,NULL,'명의 변경 방법','{\"keyboard\":{\"type\":\"text\"},\"message\":{\"message_button\":{\"label\":\"홈페이지\",\"url\":\"http:\\/\\/www.tbroad.com\"},\"text\":\"- 명의변경을 하시려면 명의변경신청서+양도인 서류(신분증 or 사업자등록증)+양수인 서류(신분증 or 사업자등록증)가 구비되어야 합니다.\\r\\n\\r\\n 명의변경신청서는 티브로드 홈페이지에서도 다운로드 가능합니다.  아래 경로 URL 기재.\\r\\n(http:\\/\\/www.tbroad.com → 고객센터 → 서비스이용안내 → 서류양식다운로드)\"}}','2017-06-15 13:50:42',NULL,NULL,'I'),
  (34,33,NULL,NULL,'일시정지 안내','{\"keyboard\":{\"type\":\"text\"},\"message\":{\"text\":\"- 일시정지는 1회에 30일 범위내에서 년 3회까지 신청할 수 있으며, 1년 동안 최대 90일을 초과할 수 없습니다. \\r\\n\\r\\n일시정지 기간 동안에는 사용료는 부과되지 않지만, 장비임대료는 정상적으로 부과됩니다. \\r\\n\\r\\n일시정지 해제시 일부 방송 상품의 경우 재연결비가 부과될 수 있습니다.\\r\\n\\r\\n약정중인 서비스 상품의 경우 일시정지 기간은 약정 기간에 미포함되어, 정지 기간만큼 약정 기간이 연장됩니다.\\r\\n\\r\\n - 일시정지 관련 자세한 문의는 티브로드 콜센터 1877-7000 으로 연락주세요.  감사합니다.\"}}','2017-06-15 13:51:33',NULL,NULL,'I'),
  (35,34,NULL,NULL,'해지안내','{\"keyboard\":{\"type\":\"text\"},\"message\":{\"text\":\"- 해지 문의 및 접수는 \\r\\n   가입자 본인일 경우 해지 상담 및 본인 인증(본인 여부 확인) 후 해지 접수 가능 합니다.\\r\\n   자녀, 배우자, 부모일 경우 해지 상담은 가능 하나 해지 접수는 불가합니다.  해지 접수는 가입자 본인만 가능 합니다..\\r\\n   제3자일 경우 해지 상담 및 해지 접수 모두 불가합니다. \\r\\n\\r\\n- 해지 관련 자세한 문의는 티브로드 콜센터 1877-7000 으로 연락주세요.  \\r\\n\\r\\n감사합니다.\"}}','2017-06-15 13:52:11',NULL,NULL,'I'),
  (36,35,NULL,NULL,'문의하기','{\"keyboard\":{\"type\":\"text\"},\"message\":{\"text\":\"입력창에 문의하실 내용을 입력 후 전송 버튼을 눌러주세요. \\r\\n처음으로 가시려면 #을 입력해 주세요.\\r\\n\\r\\n<고객이 문의 입력 후 전송 버튼 누르면>\\r\\n문의가 정상적으로 접수되었습니다. \\r\\n빠른 시간 내 답변드리도록 하겠습니다.\"}}','2017-06-15 13:53:22',NULL,NULL,'I'),
  (37,36,NULL,NULL,'문의하기','{\"keyboard\":{\"type\":\"buttons\"},\"message\":{\"text\":\"궁금하신 사항을 텍스트나 이미지로 올릴 수 있는 메뉴 입니다.\"}}','2017-06-15 13:55:31',NULL,NULL,'I'),
  (38,34,3,0,'해지안내','{\"keyboard\":{\"buttons\":[],\"type\":\"text\"},\"message\":{\"text\":\"- 해지 문의 및 접수는 \\r\\n   가입자 본인일 경우 해지 상담 및 본인 인증(본인 여부 확인) 후 해지 접수 가능 합니다.\\r\\n   자녀, 배우자, 부모일 경우 해지 상담은 가능 하나 해지 접수는 불가합니다.  해지 접수는 가입자 본인만 가능 합니다..\\r\\n   제3자일 경우 해지 상담 및 해지 접수 모두 불가합니다. \\r\\n\\r\\n- 해지 관련 자세한 문의는 티브로드 콜센터 1877-7000 으로 연락주세요.  \\r\\n\\r\\n처음으로 가시려면 #을 입력해 주세요.\"}}','2017-06-15 14:38:10','해지',NULL,'U'),
  (39,33,3,1,'일시정지 안내','{\"keyboard\":{\"buttons\":[],\"type\":\"text\"},\"message\":{\"text\":\"- 일시정지는 1회에 30일 범위내에서 년 3회까지 신청할 수 있으며, 1년 동안 최대 90일을 초과할 수 없습니다. \\r\\n\\r\\n일시정지 기간 동안에는 사용료는 부과되지 않지만, 장비임대료는 정상적으로 부과됩니다. \\r\\n\\r\\n일시정지 해제시 일부 방송 상품의 경우 재연결비가 부과될 수 있습니다.\\r\\n\\r\\n약정중인 서비스 상품의 경우 일시정지 기간은 약정 기간에 미포함되어, 정지 기간만큼 약정 기간이 연장됩니다.\\r\\n\\r\\n - 일시정지 관련 자세한 문의는 티브로드 콜센터 1877-7000 으로 연락주세요.  감사합니다.\\r\\n\\r\\n처음으로 가시려면 #을 입력해 주세요.\"}}','2017-06-15 14:38:24','변경',NULL,'U'),
  (40,32,3,0,'명의 변경 방법','{\"keyboard\":{\"buttons\":[],\"type\":\"text\"},\"message\":{\"message_button\":{\"label\":\"홈페이지\",\"url\":\"http:\\/\\/www.tbroad.com\"},\"text\":\"- 명의변경을 하시려면 명의변경신청서+양도인 서류(신분증 or 사업자등록증)+양수인 서류(신분증 or 사업자등록증)가 구비되어야 합니다.\\r\\n\\r\\n 명의변경신청서는 티브로드 홈페이지에서도 다운로드 가능합니다.  아래 경로 URL 기재.\\r\\n(http:\\/\\/www.tbroad.com → 고객센터 → 서비스이용안내 → 서류양식다운로드)\\r\\n\\r\\n처음으로 가시려면 #을 입력해 주세요.\"}}','2017-06-15 14:38:35','변경',NULL,'U'),
  (41,31,3,1,'소득공제 안내','{\"keyboard\":{\"buttons\":[],\"type\":\"text\"},\"message\":{\"text\":\"<통신요금 소득공제 여부> \\r\\n방송 요금, 인터넷 요금, 전화 요금 등의 통신요금은 연말정산시 소득공제 및 현금 영수증 발급 대상이 아닙니다.\\r\\n 단, 설치비를 현금으로 납부 했을 경우에는 현금 영수증 발급이 가능합니다.\\r\\n\\r\\n처음으로 가시려면 #을 입력해 주세요.\"}}','2017-06-15 14:38:49','요금',NULL,'U'),
  (42,30,3,0,'입금확인기간','{\"keyboard\":{\"buttons\":[],\"type\":\"text\"},\"message\":{\"text\":\"입금 후 아래와 같이 확인이 가능합니다.\\r\\n\\r\\n-. 은행 자동이체는 출금된 후 평일기준 2~3일\\r\\n-. 카드납부는 결제된 후 평일기준 1~2일\\r\\n-. 지로납부는 납부된 후 평일기준 3~4일 \\r\\n경과 후 입금 확인이 가능합니다.\\r\\n\\r\\n단, 가상계좌로 입금한 경우나 카드, 휴대폰으로 즉시 결제한 경우에는 입금 또는 결제 후 바로 입금 확인 가능합니다.\\r\\n\\r\\n처음으로 가시려면 #을 입력해 주세요.\"}}','2017-06-15 14:38:57','요금',NULL,'U'),
  (43,28,3,0,'콜센터 전화번호','{\"keyboard\":{\"buttons\":[],\"type\":\"text\"},\"message\":{\"message_button\":{\"label\":\"홈페이지\",\"url\":\"http:\\/\\/www.tbroad.com\\/\"},\"text\":\"가입관련 자세한 문의는 티브로드 콜센터 1877-7000으로 연락주세요. \\r\\n\\r\\n처음으로 가시려면 \\\"돌아가기\\\" 또는 \\\"#\\\"을 입력해 주세요.\"}}','2017-06-15 14:40:05','일반',NULL,'U'),
  (44,27,2,3,'해지','{\"keyboard\":{\"buttons\":[\"해지안내\"],\"type\":\"buttons\"},\"message\":{\"text\":\"서비스 해지 방법을 안해 드립니다. 아래 메뉴를 선택하세요.\\r\\n\\r\\n처음으로 가시려면 \\\"돌아가기\\\" 또는 \\\"#\\\"을 입력해 주세요.\"}}','2017-06-15 14:40:23','keyboard',NULL,'U'),
  (45,26,2,2,'변경','{\"keyboard\":{\"buttons\":[\"명의 변경 방법\",\"일시정지 안내\"],\"type\":\"buttons\"},\"message\":{\"text\":\"명의 변경 방법, 일시정지 방법을 안내 하고 있습니다.\\r\\n\\r\\n처음으로 가시려면 \\\"돌아가기\\\" 또는 \\\"#\\\"을 입력해 주세요.\"}}','2017-06-15 14:40:31','keyboard',NULL,'U'),
  (46,25,2,1,'요금','{\"keyboard\":{\"buttons\":[\"입금확인기간\",\"소득공제 안내\"],\"type\":\"buttons\"},\"message\":{\"text\":\"고객님의 요금 조회, 입금확인 기간 안내 등을 제공 하고 있습니다.\\r\\n\\r\\n처음으로 가시려면 \\\"돌아가기\\\" 또는 \\\"#\\\"을 입력해 주세요.\"}}','2017-06-15 14:40:47','keyboard',NULL,'U'),
  (47,24,2,0,'일반','{\"keyboard\":{\"buttons\":[\"콜센터 전화번호\",\"홈페이지주소\"],\"type\":\"buttons\"},\"message\":{\"text\":\"콜센터 전화번호, 홈페이지 주소 등 간단한 정보를 안해 드립니다.\\r\\n\\r\\n처음으로 가시려면 \\\"돌아가기\\\" 또는 \\\"#\\\"을 입력해 주세요.\"}}','2017-06-15 14:40:58','keyboard',NULL,'U'),
  (48,27,2,3,'해지 안내','{\"keyboard\":{\"buttons\":[\"해지안내\"],\"type\":\"buttons\"},\"message\":{\"text\":\"서비스 해지 방법을 안해 드립니다. 아래 메뉴를 선택하세요.\\r\\n\\r\\n처음으로 가시려면 \\\"돌아가기\\\" 또는 \\\"#\\\"을 입력해 주세요.\"}}','2017-06-15 17:28:56','keyboard',NULL,'U'),
  (49,26,2,2,'변경 안내','{\"keyboard\":{\"buttons\":[\"명의 변경 방법\",\"일시정지 안내\"],\"type\":\"buttons\"},\"message\":{\"text\":\"명의 변경 방법, 일시정지 방법을 안내 하고 있습니다.\\r\\n\\r\\n처음으로 가시려면 \\\"돌아가기\\\" 또는 \\\"#\\\"을 입력해 주세요.\"}}','2017-06-15 17:29:08','keyboard',NULL,'U'),
  (50,25,2,1,'요금 안내','{\"keyboard\":{\"buttons\":[\"입금확인기간\",\"소득공제 안내\"],\"type\":\"buttons\"},\"message\":{\"text\":\"고객님의 요금 조회, 입금확인 기간 안내 등을 제공 하고 있습니다.\\r\\n\\r\\n처음으로 가시려면 \\\"돌아가기\\\" 또는 \\\"#\\\"을 입력해 주세요.\"}}','2017-06-15 17:29:17','keyboard',NULL,'U'),
  (51,24,2,0,'일반 안내','{\"keyboard\":{\"buttons\":[\"콜센터 전화번호\",\"홈페이지주소\"],\"type\":\"buttons\"},\"message\":{\"text\":\"콜센터 전화번호, 홈페이지 주소 등 간단한 정보를 안해 드립니다.\\r\\n\\r\\n처음으로 가시려면 \\\"돌아가기\\\" 또는 \\\"#\\\"을 입력해 주세요.\"}}','2017-06-15 17:29:30','keyboard',NULL,'U'),
  (52,36,2,4,'티브로드에 문의하기','{\"keyboard\":{\"buttons\":[\"문의하기\"],\"type\":\"buttons\"},\"message\":{\"text\":\"궁금하신 사항을 텍스트나 이미지로 올릴 수 있는 메뉴 입니다.\"}}','2017-06-15 17:29:44','keyboard',NULL,'U'),
  (53,37,NULL,NULL,'요금조회','{\"keyboard\":{\"type\":\"text\"},\"message\":{\"text\":\"(방긋)톡 상담을 처음 이용하시네요. 개인정보 수집에 대한 동의를 꼭 확인해주세요. \\r\\n \\r\\n㈜티브로드 개인정보 수집이용 동의 \\r\\n \\r\\n- 이용 목적 : 회원 식별\\/상담\\/민원처리 등 \\r\\n- 수집 항목 : 휴대폰번호, 생년월일 (요금관련 상담시) \\r\\n- 보유 기간 : 회원 탈퇴 시 혹은 법정 보유 기간 \\r\\n- 수탁 업체 : ㈜티브로드 \\r\\n- 위탁 업무 : 톡 기반 상담 서비스 제공\\r\\n \\r\\n(하하)티-브로드 친구추가를 하신 후 톡 상담을 이용하시기 바랍니다. \\r\\n \\r\\n(씨익)서비스 이용을 위해 개인정보 수집 이용 동의 내용을 확인하시고, 동의하시면 휴대폰 번호를 입력해주세요 \\r\\n \\r\\n( - 없이 숫자만 입력)\"}}','2017-06-15 19:55:12',NULL,NULL,'I'),
  (54,27,2,3,'해지 안내','{\"keyboard\":{\"buttons\":[\"해지안내\"],\"type\":\"buttons\"},\"message\":{\"text\":\"서비스 해지 방법을 안내 해드립니다. 아래 메뉴를 선택하세요.\\r\\n\\r\\n처음으로 가시려면 \\\"돌아가기\\\" 또는 \\\"#\\\"을 입력해 주세요.\"}}','2017-06-16 00:20:37','keyboard',NULL,'U'),
  (55,38,NULL,NULL,'aa','{\"keyboard\":{\"type\":\"buttons\"},\"message\":{\"text\":\"1\"}}','2017-06-16 13:17:57',NULL,NULL,'I'),
  (56,27,0,3,'해지 문의','{\"keyboard\":{\"buttons\":[],\"type\":\"buttons\"},\"message\":{\"text\":\"서비스 해지 방법을 안내 해드립니다. 아래 메뉴를 선택하세요.\\r\\n\\r\\n처음으로 가시려면 \\\"돌아가기\\\" 또는 \\\"#\\\"을 입력해 주세요.\"}}','2017-06-16 13:23:12','',NULL,'U'),
  (57,26,0,2,'변경 문의','{\"keyboard\":{\"buttons\":[],\"type\":\"buttons\"},\"message\":{\"text\":\"명의 변경 방법, 일시정지 방법을 안내 하고 있습니다.\\r\\n\\r\\n처음으로 가시려면 \\\"돌아가기\\\" 또는 \\\"#\\\"을 입력해 주세요.\"}}','2017-06-16 13:23:25','',NULL,'U'),
  (58,25,0,1,'요금 문의','{\"keyboard\":{\"buttons\":[],\"type\":\"buttons\"},\"message\":{\"text\":\"고객님의 요금 조회, 입금확인 기간 안내 등을 제공 하고 있습니다.\\r\\n\\r\\n처음으로 가시려면 \\\"돌아가기\\\" 또는 \\\"#\\\"을 입력해 주세요.\"}}','2017-06-16 13:23:37','',NULL,'U'),
  (59,24,0,0,'일반 문의','{\"keyboard\":{\"buttons\":[],\"type\":\"buttons\"},\"message\":{\"text\":\"콜센터 전화번호, 홈페이지 주소 등 간단한 정보를 안해 드립니다.\\r\\n\\r\\n처음으로 가시려면 \\\"돌아가기\\\" 또는 \\\"#\\\"을 입력해 주세요.\"}}','2017-06-16 13:23:47','',NULL,'U'),
  (60,35,0,0,'티브로드에 문의하기','{\"keyboard\":{\"buttons\":[],\"type\":\"text\"},\"message\":{\"text\":\"입력창에 문의하실 내용을 입력 후 전송 버튼을 눌러주세요. \\r\\n처음으로 가시려면 #을 입력해 주세요.\\r\\n\\r\\n<고객이 문의 입력 후 전송 버튼 누르면>\\r\\n문의가 정상적으로 접수되었습니다. \\r\\n빠른 시간 내 답변드리도록 하겠습니다.\"}}','2017-06-16 13:24:01','',NULL,'U'),
  (61,38,0,0,'aa','{\"keyboard\":{\"buttons\":[],\"type\":\"buttons\"},\"message\":{\"text\":\"1\"}}','2017-06-16 13:24:06','',NULL,'D'),
  (62,39,NULL,NULL,'버튼테스트','{\"keyboard\":{\"type\":\"buttons\"},\"message\":{\"text\":\"11121\"}}','2017-06-19 16:25:07',NULL,NULL,'I'),
  (63,34,3,0,'해지안내','{\"keyboard\":{\"buttons\":[],\"type\":\"text\"},\"message\":{\"text\":\"- 해지문의 및 접수는 \\r\\n  1. 가입자 본인 : 해지상담 및 본인인증(본인여부 확인) 후 접수가 가능 합니다.\\r\\n  2. 자녀, 배우자, 부모 : 해지 상담은\\r\\n  가능 하나 해지 접수는 불가합니다.\\r\\n  해지 접수는 가입자 본인만 가능 합니다\\r\\n  3. 제3자 : 해지상담 및 해지접수 모두\\r\\n  불가합니다. \\r\\n\\r\\n- 해지문의 및 접수 시간은\\r\\n  평일 9시 ~ 18시입니다.\\r\\n  주말과 공휴일은 접수가 불가합니다. \\r\\n   \\r\\n- 해지 관련 자세한 문의는 티브로드 콜센터 1877-7000 으로 연락주세요.  \\r\\n\\r\\n처음으로 가시려면 #을 입력해 주세요.\"}}','2017-06-20 09:14:33','해지 문의',NULL,'U'),
  (64,34,3,0,'해지안내','{\"keyboard\":{\"buttons\":[],\"type\":\"text\"},\"message\":{\"text\":\"- 해지문의 및 접수는 \\r\\n  1. 가입자 본인 : 해지상담 및 본인인증(본인여부 확인) 후 접수가 가능 합니다.\\r\\n  2. 자녀, 배우자, 부모 : 해지 상담은\\r\\n  가능 하나 해지 접수는 불가합니다.\\r\\n  해지 접수는 가입자 본인만 가능 합니다\\r\\n  3. 제3자 : 해지상담 및 해지접수 모두\\r\\n  불가합니다. \\r\\n\\r\\n- 해지문의 및 접수 시간은\\r\\n  평일 9시 ~ 18시입니다.\\r\\n  주말과 공휴일은 접수가 불가합니다. \\r\\n   \\r\\n- 해지 관련 자세한 문의는 \\r\\n  티브로드 콜센터 1877-7000 로 \\r\\n  연락 주시기 바랍니다. \\r\\n\\r\\n처음으로 가시려면 #을 입력해 주세요.\"}}','2017-06-20 09:15:08','해지 문의',NULL,'U'),
  (65,36,2,6,'티브로드에 문의하기','{\"keyboard\":{\"buttons\":[],\"type\":\"buttons\"},\"message\":{\"text\":\"궁금하신 사항을 텍스트나 이미지로 올릴 수 있는 메뉴 입니다.\"}}','2017-06-21 20:32:57','keyboard',NULL,'D'),
  (66,39,0,0,'버튼테스트','{\"keyboard\":{\"buttons\":[],\"type\":\"buttons\"},\"message\":{\"text\":\"11121\"}}','2017-06-21 20:33:04','',NULL,'D'),
  (67,28,0,0,'콜센터 전화번호','{\"keyboard\":{\"buttons\":[],\"type\":\"text\"},\"message\":{\"message_button\":{\"label\":\"홈페이지\",\"url\":\"http:\\/\\/www.tbroad.com\\/\"},\"text\":\"가입관련 자세한 문의는 티브로드 콜센터 1877-7000으로 연락주세요. \\r\\n\\r\\n처음으로 가시려면 \\\"돌아가기\\\" 또는 \\\"#\\\"을 입력해 주세요.\"}}','2017-06-21 20:33:31','',NULL,'U'),
  (68,28,0,0,'콜센터 전화번호','{\"keyboard\":{\"buttons\":[],\"type\":\"text\"},\"message\":{\"message_button\":{\"label\":\"홈페이지\",\"url\":\"http:\\/\\/www.tbroad.com\\/\"},\"text\":\"가입관련 자세한 문의는 티브로드 콜센터 1877-7000으로 연락주세요. \\r\\n\\r\\n처음으로 가시려면 \\\"돌아가기\\\" 또는 \\\"#\\\"을 입력해 주세요.\"}}','2017-06-21 20:34:06','',NULL,'D'),
  (69,40,NULL,NULL,'콜센터 전화번호','{\"keyboard\":{\"type\":\"text\"},\"message\":{\"text\":\"가입관련 자세한 문의는 티브로드 콜센터 1877-7000으로 연락주세요. \\r\\n\\r\\n처음으로 가시려면 \\\"돌아가기\\\" 또는 \\\"#\\\"을 입력해 주세요.\"}}','2017-06-21 20:34:30',NULL,NULL,'I'),
  (70,29,3,1,'홈페이지주소','{\"keyboard\":{\"buttons\":[],\"type\":\"text\"},\"message\":{\"message_button\":{\"label\":\"홈페이지\",\"url\":\"http:\\/\\/www.tbroad.com\\/\"},\"text\":\"홈페이지 주소는 www.tbroad.com 입니다. 방문을 원하시면 아래 버튼을 선택해주세요.\\r\\n처음으로 가시려면 \\\"돌아가기\\\"  선택하시거나 또는 \\\"#\\\"을 입력해주세요.\"}}','2017-06-21 20:34:46','일반 문의',NULL,'D'),
  (71,41,NULL,NULL,'홈페이지주소','{\"keyboard\":{\"type\":\"text\"},\"message\":{\"text\":\"홈페이지 주소는 http:\\/\\/www.tbroad.com 입니다. 방문을 원하시면 아래 버튼을 선택해주세요.\\r\\n\\r\\n처음으로 가시려면 \\\"돌아가기\\\"  선택 하시거나 또는 \\\"#\\\"을 입력해주세요.\"}}','2017-06-21 20:35:12',NULL,NULL,'I'),
  (72,41,0,0,'홈페이지주소','{\"keyboard\":{\"type\":\"text\"},\"message\":{\"message_button\":{\"label\":\"홈페이지방문\",\"url\":\"http:\\/\\/www.tbroad.com\\/\"},\"text\":\"홈페이지 주소는 http:\\/\\/www.tbroad.com 입니다. 방문을 원하시면 아래 버튼을 선택해주세요.\\r\\n\\r\\n처음으로 가시려면 \\\"돌아가기\\\"  선택 하시거나 또는 \\\"#\\\"을 입력해주세요.\"}}','2017-06-21 20:35:40',NULL,NULL,'U'),
  (73,40,0,0,'콜센터 전화번호','{\"keyboard\":{\"type\":\"text\"},\"message\":{\"message_button\":{\"label\":\"홈페이지방문\",\"url\":\"http:\\/\\/www.tbroad.com\\/\"},\"text\":\"가입관련 자세한 문의는 티브로드 콜센터 1877-7000으로 연락주세요. \\r\\n\\r\\n처음으로 가시려면 \\\"돌아가기\\\" 또는 \\\"#\\\"을 입력해 주세요.\"}}','2017-06-21 20:36:25',NULL,NULL,'U'),
  (74,42,NULL,NULL,'테스트버튼','{\"keyboard\":{\"type\":\"buttons\"},\"message\":{\"text\":\"1111\"}}','2017-06-23 13:48:06',NULL,NULL,'I');

/*!40000 ALTER TABLE `TB_AUTOCHAT_SCENARIO_HISTORY` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
