#include "KISA_SHA_256.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

const UINT SHA256_K[64] = 
{
	0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1,
	0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
	0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174, 0xe49b69c1, 0xefbe4786,
	0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
	0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147,
	0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
	0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85, 0xa2bfe8a1, 0xa81a664b,
	0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
	0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a,
	0x5b9cca4f, 0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
	0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
};

#if defined(_MSC_VER)
	#define ROTL_ULONG(x, n) _lrotl((x), (n))
	#define ROTR_ULONG(x, n) _lrotr((x), (n))
#else
	#define ROTL_ULONG(x, n) ((ULONG)((x) << (n)) | (ULONG)((x) >> (32 - (n))))
	#define ROTR_ULONG(x, n) ((ULONG)((x) >> (n)) | (ULONG)((x) << (32 - (n))))
#endif

#define ENDIAN_REVERSE_ULONG(dwS)	( (ROTL_ULONG((dwS),  8) & 0x00ff00ff)	\
									| (ROTL_ULONG((dwS), 24) & 0xff00ff00) )

#if defined(BIG_ENDIAN)
	#define BIG_B2D(B, D)		D = *(ULONG_PTR)(B)
	#define BIG_D2B(D, B)		*(ULONG_PTR)(B) = (ULONG)(D)
	#define LITTLE_B2D(B, D)	D = ENDIAN_REVERSE_ULONG(*(ULONG_PTR)(B))
	#define LITTLE_D2B(D, B)	*(ULONG_PTR)(B) = ENDIAN_REVERSE_ULONG(D)
#elif defined(LITTLE_ENDIAN)
	#define BIG_B2D(B, D)		D = ENDIAN_REVERSE_ULONG(*(ULONG_PTR)(B))
	#define BIG_D2B(D, B)		*(ULONG_PTR)(B) = ENDIAN_REVERSE_ULONG(D)
	#define LITTLE_B2D(B, D)	D = *(ULONG_PTR)(B)
	#define LITTLE_D2B(D, B)	*(ULONG_PTR)(B) = (ULONG)(D)
#else
	#error ERROR : Invalid DataChangeType
#endif

#define RR(x, n)		ROTR_ULONG(x, n)
#define SS(x, n)		(x >> n)

#define Ch(x, y, z)		((x & y) ^ ((~x) & z))
#define Maj(x, y, z)	((x & y) ^ (x & z) ^ (y & z))
#define Sigma0(x)		(RR(x,  2) ^ RR(x, 13) ^ RR(x, 22))
#define Sigma1(x)		(RR(x,  6) ^ RR(x, 11) ^ RR(x, 25))

#define RHO0(x)			(RR(x,  7) ^ RR(x, 18) ^ SS(x,  3))
#define RHO1(x)			(RR(x, 17) ^ RR(x, 19) ^ SS(x, 10))

		
//*********************************************************************************************************************************
// o SHA256_Transform()	: 512 ºñÆ® ´ÜÀ§ ºí·ÏÀÇ ¸Þ½ÃÁö¸¦ ÀÔ·Â ¹Þ¾Æ ¿¬¼âº¯¼ö¸¦ °»½ÅÇÏ´Â ¾ÐÃà ÇÔ¼ö·Î½á
//						  4 ¶ó¿îµå(64 ´Ü°è)·Î ±¸¼ºµÇ¸ç 8°³ÀÇ ¿¬¼âº¯¼ö(a, b, c, d, e, f, g, h)¸¦ »ç¿ë
// o ÀÔ·Â				: Message		- ÀÔ·Â ¸Þ½ÃÁöÀÇ Æ÷ÀÎÅÍ º¯¼ö
//						  ChainVar		- ¿¬¼âº¯¼öÀÇ Æ÷ÀÎÅÍ º¯¼ö
// o Ãâ·Â				: 
//*********************************************************************************************************************************
void SHA256_Transform(ULONG_PTR Message, ULONG_PTR ChainVar)
{
	ULONG a, b, c, d, e, f, g, h, T1, X[64];
	ULONG j;

#define FF(a, b, c, d, e, f, g, h, j) {							\
	T1 = h + Sigma1(e) + Ch(e, f, g) + SHA256_K[j] + X[j];		\
	d += T1;													\
	h = T1 + Sigma0(a) + Maj(a, b, c);							\
}

#if defined(BIG_ENDIAN)
	#define GetData(x)	x
#else
	#define GetData(x)	ENDIAN_REVERSE_ULONG(x)
#endif

	for (j = 0; j < 16; j++)
		X[j] = GetData(Message[j]);

	for (j = 16; j < 64; j++)
		X[j] = RHO1(X[j - 2]) + X[j - 7] + RHO0(X[j - 15]) + X[j - 16];

	a = ChainVar[0];
	b = ChainVar[1];
	c = ChainVar[2];
	d = ChainVar[3];
	e = ChainVar[4];
	f = ChainVar[5];
	g = ChainVar[6];
	h = ChainVar[7];

	for (j = 0; j < 64; j += 8)
	{
		FF(a, b, c, d, e, f, g, h, j + 0);
		FF(h, a, b, c, d, e, f, g, j + 1);
		FF(g, h, a, b, c, d, e, f, j + 2);
		FF(f, g, h, a, b, c, d, e, j + 3);
		FF(e, f, g, h, a, b, c, d, j + 4);
		FF(d, e, f, g, h, a, b, c, j + 5);
		FF(c, d, e, f, g, h, a, b, j + 6);
		FF(b, c, d, e, f, g, h, a, j + 7);
	}

	ChainVar[0] += a;
	ChainVar[1] += b;
	ChainVar[2] += c;
	ChainVar[3] += d;
	ChainVar[4] += e;
	ChainVar[5] += f;
	ChainVar[6] += g;
	ChainVar[7] += h;
}

/*
연쇄 변수와 길이 변수를 초기화 하는 함수
매개변수 :
	Info SHA256_Process 호출 시 사용되는 구조체
참 고 :
	1. IN 사용자가 입력해야 할 매개변수를 의미 한다. 
	2. OUT 함수 호출 후 값이 채워지는 매개변수를 의미 한다
*/
void SHA256_Init( OUT SHA256_INFO *Info )
{
	Info->uChainVar[0] = 0x6a09e667;
	Info->uChainVar[1] = 0xbb67ae85;
	Info->uChainVar[2] = 0x3c6ef372;
	Info->uChainVar[3] = 0xa54ff53a;
	Info->uChainVar[4] = 0x510e527f;
	Info->uChainVar[5] = 0x9b05688c;
	Info->uChainVar[6] = 0x1f83d9ab;
	Info->uChainVar[7] = 0x5be0cd19;

	Info->uHighLength = Info->uLowLength = 0;
}

/*
임의의 길이를 가지는 입력 메시지를 512비트 블록단위로 나누어 압축 함수를 호출하는 함수
매개변수 :
	Info SHA-256 구조체의 포인터 변수
	pszMessage 입력 메시지의 포인터변수
	uDataLen 입력 메시지의 바이트 길이
*/
void SHA256_Process( OUT SHA256_INFO *Info, IN const BYTE *pszMessage, IN UINT uDataLen )
{
	if ((Info->uLowLength += (uDataLen << 3)) < 0)
		Info->uHighLength++;

	Info->uHighLength += (uDataLen >> 29);

	while (uDataLen >= SHA256_DIGEST_BLOCKLEN)
	{
		memcpy((UCHAR_PTR)Info->szBuffer, pszMessage, (SINT)SHA256_DIGEST_BLOCKLEN);
		SHA256_Transform((ULONG_PTR)Info->szBuffer, (ULONG_PTR)Info->uChainVar);
		pszMessage += SHA256_DIGEST_BLOCKLEN;
		uDataLen -= SHA256_DIGEST_BLOCKLEN;
	}

	memcpy((UCHAR_PTR)Info->szBuffer, pszMessage, uDataLen);
}

/*
메시지 덧붙이기와 길이 덧붙이기를 수행한 후 마지막 메시지 블록을 가지고 압축 함수를 호출하는 함수
매개변수 :
	Info SHA-256 구조체의 포인터 변수
	pszDigest SHA-256 해시값을 저장할 포인터 변수
*/
void SHA256_Close( OUT SHA256_INFO *Info, IN BYTE *pszDigest )
{
	ULONG i, Index;

	Index = (Info->uLowLength >> 3) % SHA256_DIGEST_BLOCKLEN;
	Info->szBuffer[Index++] = 0x80;

	if (Index > SHA256_DIGEST_BLOCKLEN - 8)
	{
		memset((UCHAR_PTR)Info->szBuffer + Index, 0, (SINT)(SHA256_DIGEST_BLOCKLEN - Index));
		SHA256_Transform((ULONG_PTR)Info->szBuffer, (ULONG_PTR)Info->uChainVar);
		memset((UCHAR_PTR)Info->szBuffer, 0, (SINT)SHA256_DIGEST_BLOCKLEN - 8);
	}
	else
		memset((UCHAR_PTR)Info->szBuffer + Index, 0, (SINT)(SHA256_DIGEST_BLOCKLEN - Index - 8));

#if defined(LITTLE_ENDIAN)
	Info->uLowLength = ENDIAN_REVERSE_ULONG(Info->uLowLength);
	Info->uHighLength = ENDIAN_REVERSE_ULONG(Info->uHighLength);
#endif

	((ULONG_PTR)Info->szBuffer)[SHA256_DIGEST_BLOCKLEN / 4 - 2] = Info->uHighLength;
	((ULONG_PTR)Info->szBuffer)[SHA256_DIGEST_BLOCKLEN / 4 - 1] = Info->uLowLength;

	SHA256_Transform((ULONG_PTR)Info->szBuffer, (ULONG_PTR)Info->uChainVar);

	for (i = 0; i < SHA256_DIGEST_VALUELEN; i += 4)
		BIG_D2B((Info->uChainVar)[i / 4], &(pszDigest[i]));
}
/*
SHA256_Init, SHA256_Process, SHA256_Close 함수를 내부적으로 모두 호출하여 간편한 인터페이스를제공하기 위한 함수
매개변수 :
	pszMessage 입력 메시지의 포인터변수
	uPlainTextLen 입력 메시지의 바이트 길이
	pszDigest SHA-256 해시 값을 저장할 포인터 변수
참 고 :
	1. IN 사용자가 입력해야 할 매개변수를 의미 한다. 
	2. OUT 함수 호출 후 값이 채워지는 매개변수를 의미 한다.
*/

void SHA256_Encrypt( IN const BYTE *pszMessage, IN UINT uPlainTextLen, OUT BYTE *pszDigest )
{
	SHA256_INFO info;

	SHA256_Init( &info );

	SHA256_Process( &info, pszMessage, uPlainTextLen );

	SHA256_Close( &info, pszDigest );
}

int main (int argc, const char * argv[])
{
    typedef unsigned char BYTE;
    typedef unsigned char UINT;

    // FILE *fp;

    BYTE plain[32];
    BYTE encrypt[32];
    UINT plain_leng = 0;
    int i = 0;

    memset(plain, 0x00, sizeof(plain));
    memset(encrypt, 0x00, sizeof(encrypt));

    // fp = fopen("SHA-256 Encrypted.txt", "w");

/*
    printf("평문 : ");
    scanf("%s", plain);
*/
    strcpy((char *)plain, argv[1]);
    plain_leng = strlen((char *)plain);
//printf("plain:%32s, length:%d\n", (char *)plain, plain_leng);
    SHA256_Encrypt(plain, plain_leng, encrypt);

    for(i = 0; i < 32; i++) {
        // fprintf(fp, "%02X", encrypt[i]);
        printf("%02X", encrypt[i]);
    }

    printf("\n");
    // fclose(fp);
    return 0;
}
