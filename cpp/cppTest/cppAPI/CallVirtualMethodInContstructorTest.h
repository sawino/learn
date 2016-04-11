#pragma once
class CallVirtualMethodInContstructorTest
{
public:
    CallVirtualMethodInContstructorTest(void);
    virtual ~CallVirtualMethodInContstructorTest(void);

    virtual int test()
    {
        return 2;
    }


    int mVal;
};

class CallVirtualMethodInContstructorTest2 : public CallVirtualMethodInContstructorTest
{
public:
    CallVirtualMethodInContstructorTest2()
        : CallVirtualMethodInContstructorTest()
    {

    }

    virtual int test()
    {
        return 8;
    }
};

