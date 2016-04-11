#pragma once

class PrivateToPublicTestHelper
{
public:
    int test()
    {
        return 4;
    }

private:
    int test2()
    {
        return 5;
    }
};

class PrivateToPublicTest
{
public:
    PrivateToPublicTest(void);
    ~PrivateToPublicTest(void);

    int test2();

private:
    int test();
    int mVal;

    PrivateToPublicTestHelper mHelper;
    struct Impl;
    Impl* mImpl;
};

