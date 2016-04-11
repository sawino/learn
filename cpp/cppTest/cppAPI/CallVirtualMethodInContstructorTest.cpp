#include "stdafx.h"
#include "CallVirtualMethodInContstructorTest.h"


CallVirtualMethodInContstructorTest::CallVirtualMethodInContstructorTest(void)
{
    mVal = test();
}


CallVirtualMethodInContstructorTest::~CallVirtualMethodInContstructorTest(void)
{
}
