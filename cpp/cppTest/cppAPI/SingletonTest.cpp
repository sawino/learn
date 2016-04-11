#include "stdafx.h"
#include "SingletonTest.h"
#include <mutex>

struct SingletonTest::Impl
{
    int test()
    {
        return 1;
    }
};


SingletonTest::SingletonTest(void)
    : mImpl(new Impl())
{
}


SingletonTest::~SingletonTest(void)
{
}

static std::mutex sMutex;
SingletonTest& SingletonTest::instance()
{    
    static SingletonTest* sInstance = NULL;
    if (sInstance == NULL)
    {
        std::mutex sMutex;
        std::lock_guard<std::mutex> locker(sMutex);
        if (sInstance == NULL)
        {
            sInstance = new SingletonTest();
        }
    }

    return *sInstance;
}

int SingletonTest::test()
{
    return mImpl->test();
}