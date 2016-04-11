#pragma once
class ExplicitTest
{
public:

    explicit ExplicitTest(int x)
    {
        mInt = x;
    }
    ExplicitTest(void);
    ~ExplicitTest(void);

    int mInt;
};

class ExplicitTestWithout
{
public:
    ExplicitTestWithout(int x)
    {
        mInt = x;
    }

    int mInt;
};

