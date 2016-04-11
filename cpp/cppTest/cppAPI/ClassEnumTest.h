#pragma once
class ClassEnumTest
{
public:
    virtual enum A
    {
        a = 0,
        b,
        c
    };

    ClassEnumTest(void);
    ~ClassEnumTest(void);
};

class ClassEnumDerivded : public ClassEnumTest
{
public:
    virtual enum A
    {
        d = c + 1,
        e
    };
};

