#include "stdafx.h"
#include "OperatorTest.h"


OperatorTest::OperatorTest(void)
{
    mSize = 10;
    mBuffer = new int[mSize];
    mHelper = new OperatorTestHelper();
}


OperatorTest::~OperatorTest(void)
{
    delete mHelper;
}
