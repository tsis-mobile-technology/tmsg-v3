/**
@file KISA_SHA_256.h
@brief SHA256 ¾ÏÈ£ ¾Ë°í¸®Áò
@author Copyright (c) 2013 by KISA
@remarks http://seed.kisa.or.kr/
*/

#ifndef SHA256_H
#define SHA256_H

#ifdef  __cplusplus
extern "C" {
#endif

#ifndef OUT
#define OUT
#endif

#ifndef IN
#define IN
#endif

#ifndef INOUT
#define INOUT
#endif

#undef BIG_ENDIAN
#undef LITTLE_ENDIAN

#if defined(USER_BIG_ENDIAN)
	#define BIG_ENDIAN
#elif defined(USER_LITTLE_ENDIAN)
	#define LITTLE_ENDIAN
#else
	#if 1
		#define BIG_ENDIAN
	#elif defined(_MSC_VER)
		#define LITTLE_ENDIAN
	#else
		#error
	#endif
#endif

typedef unsigned long ULONG;
typedef ULONG* ULONG_PTR;

typedef unsigned int UINT;
typedef UINT* UINT_PTR;

typedef signed int SINT;
typedef SINT* SINT_PTR;

typedef unsigned char UCHAR;
typedef UCHAR* UCHAR_PTR;

typedef unsigned char BYTE;

#define SHA256_DIGEST_BLOCKLEN	64
#define SHA256_DIGEST_VALUELEN	32

typedef struct{
	UINT uChainVar[SHA256_DIGEST_VALUELEN / 4];
	UINT uHighLength;
	UINT uLowLength;
	BYTE szBuffer[SHA256_DIGEST_BLOCKLEN];
} SHA256_INFO;

/**
@brief ¿¬¼âº¯¼ö¿Í ±æÀÌº¯¼ö¸¦ ÃÊ±âÈ­ÇÏ´Â ÇÔ¼ö
@param Info : SHA256_Process È£Ãâ ½Ã »ç¿ëµÇ´Â ±¸Á¶Ã¼
*/
void SHA256_Init( OUT SHA256_INFO *Info );

/**
@brief ¿¬¼âº¯¼ö¿Í ±æÀÌº¯¼ö¸¦ ÃÊ±âÈ­ÇÏ´Â ÇÔ¼ö
@param Info : SHA256_Init È£ÃâÇÏ¿© ÃÊ±âÈ­µÈ ±¸Á¶Ã¼(³»ºÎÀûÀ¸·Î »ç¿ëµÈ´Ù.)
@param pszMessage : »ç¿ëÀÚ ÀÔ·Â Æò¹®
@param inLen : »ç¿ëÀÚ ÀÔ·Â Æò¹® ±æÀÌ
*/
void SHA256_Process( OUT SHA256_INFO *Info, IN const BYTE *pszMessage, IN UINT uDataLen );

/**
@brief ¸Þ½ÃÁö µ¡ºÙÀÌ±â¿Í ±æÀÌ µ¡ºÙÀÌ±â¸¦ ¼öÇàÇÑ ÈÄ ¸¶Áö¸· ¸Þ½ÃÁö ºí·ÏÀ» °¡Áö°í ¾ÐÃàÇÔ¼ö¸¦ È£ÃâÇÏ´Â ÇÔ¼ö
@param Info : SHA256_Init È£ÃâÇÏ¿© ÃÊ±âÈ­µÈ ±¸Á¶Ã¼(³»ºÎÀûÀ¸·Î »ç¿ëµÈ´Ù.)
@param pszDigest : ¾ÏÈ£¹®
*/
void SHA256_Close( OUT SHA256_INFO *Info, OUT BYTE *pszDigest );

/**
@brief »ç¿ëÀÚ ÀÔ·Â Æò¹®À» ÇÑ¹ø¿¡ Ã³¸®
@param pszMessage : »ç¿ëÀÚ ÀÔ·Â Æò¹®
@param pszDigest : ¾ÏÈ£¹®
@remarks ³»ºÎÀûÀ¸·Î SHA256_Init, SHA256_Process, SHA256_Close¸¦ È£ÃâÇÑ´Ù.
*/
void SHA256_Encrpyt( IN const BYTE *pszMessage, IN UINT uPlainTextLen, OUT BYTE *pszDigest );

#ifdef  __cplusplus
}
#endif

#endif