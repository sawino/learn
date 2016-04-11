// CrtMemoryChecker.cpp : Defines the entry point for the console application.
//

#include "stdafx.h"
#include <iostream>
//#include "C:\\Users\\yangsaw\\Documents\\Visual Studio 2012\\Projects\\CrtMemoryChecker\\VLD\\include\\vld.h"
#include <windows.h>
//#include <crtdbg.h>
#include <DClass1.h>
#include <DClass2.h>
#include <SClass1.h>
#include <SClass2.h>

class B
{
public:
    char* mC;
};

class A
{
private:
    B* mPb;
    int mI;

public:
    A()
        : mPb(NULL)
        , mI(0)
    {

    }

    ~A()
    {
        if (mPb != NULL)
        {
            delete mPb;
            mPb = nullptr;
        }
    }
};



int _tmain(int argc, _TCHAR* argv[])
{
    //VLDDisable();
    DClass1 d1;
    //VLDEnable();
    DClass1 d11;
    DClass2 d2;
    SClass1 s1;
    SClass2 s2;
    //int* pi = new int[1];
    //pi[1] = 3;

    //A* pa = new A;
    //_ASSERTE(_CrtCheckMemory());

    int i;

    std::cin >> i;

	return 0;
}

