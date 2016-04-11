// cppAPI.cpp : Defines the entry point for the console application.
//

#include "stdafx.h"
#include <iostream>

#define private public
#include "PrivateToPublicTest.h"
#undef private

#include "CallVirtualMethodInContstructorTest.h"
#include "SingletonTest.h"
#include "ConcurrencyTest.h"
#include <thread>

#include "NamedParameterTest.h"
#include <chrono>
#include <ctime>
#include <functional>
#include "TemplateTest.h"
#include <string>

#include "OperatorTest.h"
#include "ExplicitTest.h"
#include "ClassEnumTest.h"
#include "BitwiseMemberTest.h"
#include "SizeofTest.h"
#include "IteratorPerformanceTest.h"
#include "MemberCutTest.h"
#include "OverrideKeywordTest.h"
#include "STLTest.h"
#include "StdIntTest.h"

using namespace std;

void testPrivateToPublic()
{
    PrivateToPublicTest p;

    // can't compile
    //cout << p.test() << endl;

    // compile failed.
    //cout << p.mImpl->test2() << endl;

    // compile OK
    cout << p.mHelper.test() << endl;

    // compiple OK
    cout << p.mHelper.test2() << endl;

    // compile OK
    cout << p.mVal << endl;
}

void testCallVirtualMethodInContstructorTest()
{
    CallVirtualMethodInContstructorTest* p = new CallVirtualMethodInContstructorTest2();
    // the subclass virtual method will not be called
    cout << p->mVal << endl;
}

void testSingleton()
{
    cout << SingletonTest::instance().test() << endl;
}

void testRecursiveMutex()
{
    RecursiveLockTest t;
    t.both();
}

void testCallOnce()
{
    std::thread t1(doSomthingOnce);
    std::thread t2(doSomthingOnce);
    std::thread t3(doSomthingOnce);

    t1.join();
    t2.join();
    t3.join();
}

void testConsumerProducer()
{
    Buffer buffer;
    std::thread c1(consumer, 0, std::ref(buffer));
    std::thread c2(consumer, 1, std::ref(buffer));
    std::thread c3(consumer, 2, std::ref(buffer));

    std::thread p1(producer, 0, std::ref(buffer));
    std::thread p2(producer, 1, std::ref(buffer));

    c1.join();
    c2.join();
    c3.join();
    p1.join();
    p2.join();

}

void testAtomic(function<void(AtomicTest&)> func)
{
    AtomicTest test;

    // system_clock
    // steady_clock
    // high_resolution_clock
    typedef chrono::high_resolution_clock TimeType;
    typedef chrono::time_point<TimeType> TimePoint;

    TimePoint start, end;
    start = TimeType::now();
    thread t1(func, std::ref(test));
    thread t2(func, std::ref(test));
    thread t3(func, std::ref(test));
    thread t4(func, std::ref(test));
    thread t5(func, std::ref(test));
    thread t6(func, std::ref(test));
    t1.join();
    t2.join();
    t3.join();
    t4.join();
    t5.join();
    t6.join();
    end = TimeType::now();

    // chrono::duration<double> default is std::ratio<1> 
    // std::nano -> chrono::nanoseconds
    // std::micro -> chrono::microseconds
    // std::milli -> chrono::milliseconds
    // std::ratio<1> -> chrono::seconds
    // std::ratio<60> -> chrono::seconds
    // std::ratio<3600> -> chrono::hours    
    chrono::duration<double, std::milli> duration = end - start;

    // double the value and cast to int
    chrono::duration<int, std::ratio<1, 2>> durationInt = chrono::duration_cast<chrono::duration<int, std::ratio<1, 2>>>( end- start);

    time_t endTime = TimeType::to_time_t(end);

    char buffer[26];
    ctime_s(buffer, 26, &endTime);
    
    cout << "finished at " << buffer << " used " << duration.count() << endl;

    tm* t = new tm;
    localtime_s(t, &endTime);
    asctime_s(buffer, 26, t);
    cout << "asc local time: " << buffer << endl;

    cout << "int " << test.mInt << endl;
    cout << "atomic int " << test.mAtomicInt.load() << endl;

    cout << "duration int " << durationInt.count() << endl;

}

void testNamedParameter()
{
    NamedParameterTest n;
    std::cout << n.do1().do2().mI << std::endl;

}

void testTemplate()
{
    TemplateTest<int> val(3);
    cout << val.get() << endl;

    BoolTemplate boolTemp;
    boolTemp.get();
    // won't compile, because the string is not the type supported which has been defined in the 
    // template cpp file
    //ObviousInstanceTemplate<std::string> strTemp;
    //strTemp.get();
}


void testOperators()
{
    int* s = NULL;
    OperatorTest o;
    int v = o[3];
    o(3);
    int* pv = o;

    OperatorTest* po = &o;

    po->test();
    o->testOO();

    
    int (OperatorTest::*p_val)() = &OperatorTest::test;
    (po->*p_val)();

    OperatorTestHelper* (OperatorTest::*p_val2) = &OperatorTest::mHelper;
    (po->*p_val2)->testOO();

    // called overrode ->*  
    (o->*p_val2)->testOO();

    OperatorTest o2 = o;    

    OperatorTest o3 = o + o2;

    OperatorTest* newP = new OperatorTest();

    
    ++o;
    o++;
    cout << o << endl;
    delete newP;
}

void explicitTestFun(ExplicitTest a, ExplicitTestWithout b)
{

}

void explicitTestFun2(ExplicitTestWithout a, ExplicitTestWithout b)
{

}

void testExplicit()
{
    // complies ok
    explicitTestFun2(1, 2);
    // won't complie 
    //explicitTestFun(1, 2);
}

void testClassEnum()
{
    ClassEnumTest::A a;
    a = ClassEnumTest::A::a;

    ClassEnumDerivded::A b;
    b = ClassEnumDerivded::A::d;
    
    BitTest c;
    c.a;

    int size = sizeof(c);
}


void testSizeof()
{
    int a = sizeof(SizeofTestBig);
    a = sizeof(SizeofTestSmall);
}

void testIteratorPerformance()
{

    IteratorPerformanceTest test;
    test.test();
}

void passByParentValue(MemberCutTest p)
{
    // the j from the derived will be cut off
    MemberCutTestDerived* a = (MemberCutTestDerived*)(&p);


    // can't cast
    MemberCutTestDerived* b = dynamic_cast<MemberCutTestDerived*>(&p);
    MemberCutTest* c = dynamic_cast<MemberCutTestDerived*>(&p);

    MemberCutTestDerived td;
    // cast
    MemberCutTest* d = dynamic_cast<MemberCutTest*>(&p);
    MemberCutTest* e = dynamic_cast<MemberCutTest*>(&td);
    MemberCutTest* f = dynamic_cast<MemberCutTestDerived*>(&td);

    // can't compile
    //MemberCutTestDerived* g = dynamic_cast<MemberCutTest*>(&td);
    MemberCutTestDerived* h = dynamic_cast<MemberCutTestDerived*>(&td);

}

void testMemberCut()
{
    MemberCutTestDerived m;
    passByParentValue(m);
}

void testOverride()
{
    OverrideKeywordTest* a = new OverrideKeywordTest;
    OverrideKeywordTest* b = new OverrideKeywordDerived;
    OverrideKeywordTest* c = new OverrideKeywordDerived2;

    cout << a->function() << endl;
    cout << b->function() << endl;
    cout << c->function() << endl;

}

void testSTL()
{
    STLTest s;
    s.testRemove();
    s.testAccumulate();

}

void testInt()
{
    StdIntTest t;
    t.testInt();
}

int _tmain(int argc, _TCHAR* argv[])
{
    

    //testPrivateToPublic();
    //testCallVirtualMethodInContstructorTest();
    //testSingleton();
    //testRecursiveMutex();
    //testCallOnce();
    //testConsumerProducer();
    //testNamedParameter();
    //testAtomic(inc);
    //testAtomic(incAtomic);
    //testTemplate();
    //testOperators();
    //testExplicit();
    //testClassEnum();
    //testSizeof();
    //testIteratorPerformance();
    //testMemberCut();
    //testOverride();
    //testSTL();
    testInt();
	return 0;
}

