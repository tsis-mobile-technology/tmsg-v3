#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>
const char table[] = {"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"};
#define BASE    62

int strpos(const char *s, int c)
{
    char *p = strchr(s, c);
    if(p)
        return (p - s);

    return -1;
}

void toBase62(long id, char *pBase62)
{
    int i = 0;

    do {
        int mod = id % BASE;
        pBase62[i] = table[mod];
        i++;
    } while ((id = id / BASE));
}

long fromBase62(char *pBase62)
{
    long dec = 0;
    long mul = 1;
    int pos = 0;

    for(int i = 0; i < strlen(pBase62); i++)
    {
        pos = strpos(table, pBase62[i]);
        dec += pos * mul;
        mul *= BASE;
    }

    return dec;
}

long getTime()
{
    time_t current_time;
    char* c_time_string;

    current_time = time(NULL);

    if (current_time == ((time_t)-1))
    {
        (void) fprintf(stderr, "Failure to obtain the current time.\n");
        return (EXIT_FAILURE);
    }

    c_time_string = ctime(&current_time);

    if (c_time_string == NULL)
    {
        (void) fprintf(stderr, "Failure to convert the current time.\n");
        return 0;
    }

    return (long)current_time;
}

int shorturl (int argc, const char * argv[])
{
    char szBase62[16] = {0x00,};
    long dec = 0;
    long timeInput = 0;
   
    timeInput = getTime();
    toBase62((long)atol(argv[1]) + timeInput, szBase62);
    dec = fromBase62(szBase62);
   
    fprintf(stdout, "%s", szBase62);
    return 0;
}


int fulltest (int argc, const char * argv[])
{
    char szBase62[16] = {0x00,};
    long dec = 0;
    long timeInput = 0;
   
    timeInput = getTime();
    if( argc > 1 ) {
        toBase62((long)atol(argv[1]) + timeInput, szBase62);
        dec = fromBase62(szBase62);
    }
    else {
        toBase62(1042432728, szBase62);
        dec = fromBase62(szBase62);
    }

    printf("Input:[%s] Time:[%ld] Base62:[%s] Base10:[%ld]\n", argv[1], timeInput, szBase62, dec);
    return 0;
}

int main (int argc, const char * argv[])
{
    if( argc > 1 ) {
        shorturl(argc, argv);
    }
    else {
        fulltest(argc, argv);
    }

    return 0;
}
