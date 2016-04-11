#pragma once
class NamedParameterTest
{
public:
    NamedParameterTest(void);
    ~NamedParameterTest(void);

    NamedParameterTest& do1()
    {
        mI += 1;
        return *this;
    }

    NamedParameterTest& do2()
    {
        mI += 2;

        return *this;
    }

    int mI;
};

