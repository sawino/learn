#include "stdafx.h"
#include "PrivateToPublicTest.h"


struct PrivateToPublicTest::Impl
{
    int test2()
    {
        return 3;
    }
};

PrivateToPublicTest::PrivateToPublicTest(void)
    : mImpl(new Impl())
{   
    mVal = 2;
}


PrivateToPublicTest::~PrivateToPublicTest(void)
{
    delete mImpl;
}

int PrivateToPublicTest::test()
{
    return 1;
}


int PrivateToPublicTest::test2()
{
    return mImpl->test2();
}