// wstringStringConvert.cpp : Defines the entry point for the console application.
//


#include "stdafx.h"
//#include <locale>
#include <codecvt>
#include <string>
#include <fstream>

using namespace std;

wstring cstringToUnicodeString(const char* str)
{
    wstring_convert<codecvt_utf8<wchar_t>> converter;
    return converter.from_bytes(str);
}

int _tmain(int argc, _TCHAR* argv[])
{
    wstring_convert<codecvt_utf8<wchar_t>> converter;

    string narrow = converter.to_bytes(L"你好");
    ofstream ofs("F:\\test.txt");
    ofs << narrow;

    wstring wide = converter.from_bytes("hello");
    //locale::global(std::locale("Chinese-simplified"));
    wstring wide2 = cstringToUnicodeString("Hi there");
    wofstream wofs("F:\\testW.txt");
    wofs << wide2;


	return 0;
}

