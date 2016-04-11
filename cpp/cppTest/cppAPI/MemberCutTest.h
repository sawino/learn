#pragma once

class MemberCutTest
{
public:

    MemberCutTest()
        : m(1000)
    {

    }

    // needed to use dynamic_cast
    virtual void f()
    {

    }

    int m;
};

class MemberCutTestDerived : public MemberCutTest
{
public:

    MemberCutTestDerived()
        : MemberCutTest(),
        j(50)
    {

    }

    int j;
};