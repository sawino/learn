// propertySheetTest2.cpp : Defines the entry point for the console application.
//

#include "stdafx.h"

#include <iostream>
using namespace std;

#ifdef RC_XXX
class A
{
public:
    void f()
    {
        cout << "FF" << endl;
    }
};
#endif
int _tmain(int argc, _TCHAR* argv[])
{
#ifdef RC_XXX
    cout << 10 << endl;
    A a;
    a.f();
#endif
	return 0;
}

