#include "stdafx.h"
#include "Ctest.h"
#include <iostream>

struct Ctest::Impl
{
    int mI;
    void f()
    {

    }

    ~Impl()
    {
        std::cout << 10 << std::endl;
    }
};


Ctest::Ctest(void)
    : mImpl(new Impl)
{

}


Ctest::~Ctest(void)
{

}

void Ctest::f()
{
    return mImpl->f();
}

