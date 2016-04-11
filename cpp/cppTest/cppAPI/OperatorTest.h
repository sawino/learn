#ifndef OPERATOR_TEST_H
#define OPERATOR_TEST_H

#include <stdlib.h>
#include <iostream>
class OperatorTestHelper
{
public:

    int testOO()
    {
        return 100;
    }
};

// for all the other operators which are not in the class body should be placed as freedom function
// to make sure cases as a + b = b + a to be true
class OperatorTest
{
public:
    OperatorTest(void);
    ~OperatorTest(void);

    int operator[](int index)
    {
        return mBuffer[index];
    }

    // obj(3)
    void operator()(int x)
    {
        x++;
    }

    // int* v = obj;
    operator int*()
    {
        return mBuffer;
    }
        

    OperatorTest& operator =(const OperatorTest& rhs)
    {
        mBuffer = rhs.mBuffer;
        mSize = rhs.mSize;

        return *this;
    }

    // o()
    OperatorTestHelper* operator ->()
    {
        return mHelper;
    }

    // pointer to member
    OperatorTestHelper* operator ->*(OperatorTestHelper* OperatorTest::* pmf)
    {
        pmf;
        return mHelper;
    }    

    void* operator new (size_t n)
    {
        return malloc(n * 100);
    }

    void operator delete(void* val)
    {
        free(val);
    }

    int test()
    {
        return 1;
    }

    int*    mBuffer;
    int     mSize;
    OperatorTestHelper* mHelper;
};


static OperatorTest operator + (const OperatorTest& l, const OperatorTest& r)
{
    OperatorTest o;
    o.mSize = l.mSize + r.mSize;

    return o;
}

// ++x;
static OperatorTest& operator ++ (OperatorTest& o)
{
    o.mSize++;
    return o;
}

// x++;
static OperatorTest& operator ++(OperatorTest& o, int)
{
    o.mSize += 1000;
    return o;
}

static std::ostream& operator << (std::ostream& os, OperatorTest& o)
{
    os << o.mSize << " haha" << std::endl;
    return os;
}



#endif