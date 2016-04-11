// ThreadingTest.cpp : Defines the entry point for the console application.
//

#include "stdafx.h"

#include "TestThreadWorker.h"
#include "RCThread.h"
#include <iostream>
#include <thread>
//#include "RCFlaggedEnumOperators.h"
using namespace std;
//using namespace A;

//
//enum class RCThreadStatus : int
//{
//    None        = 0x000000,
//    NotStarted  = 0x000001,
//    Running     = 0x000002,
//    Stopped     = 0x000004,
//    Terminated  = 0x000008,
//    Finished    = 0x000010,
//    Failed      = 0x000020,
//    All         = None | NotStarted | Running | Stopped | Terminated | Finished | Failed
//};
//
//class TestClassB
//{
//public:
//    int mi;
//    TestClassB operator | (TestClassB b2)
//    {
//        return *this;
//    }
//};
//
//enum NormalEnum
//{
//    NotStarted  = 0x000001,
//    Running     = 0x000002,
//    Stopped     = 0x000004,
//    Terminated  = 0x000008,
//    Finished    = 0x000010,
//    Failed      = 0x000020
//};
//
//enum class OtherStatus: char
//{
//    TTT = 0x001,
//    QQQ = 0x002
//};
//
//void flaggedEnumTest()
//{
//

//
//    //RCThreadStatus rs1 = RCThreadStatus::Failed | RCThreadStatus::Finished;
//    //RCThreadStatus rs2 = RCThreadStatus::Finished | RCThreadStatus::Terminated;
//    //RCThreadStatus rs3 = rs1 & rs2;
//
//    //
//    //TestClassB b1;
//    //TestClassB b2 = TestClassB();
//    //TestClassB b3 = b1 | b2;
//    //
//
//    //NormalEnum ne1 = NormalEnum::Failed | NormalEnum::Finished;
//    //NormalEnum ne2 = NormalEnum::Finished | NormalEnum::Terminated;
//    //NormalEnum ne3 = ne1 | ne2;
//
//    //rs1 = RCThreadStatus::Failed | RCThreadStatus::Finished | RCThreadStatus::Running;
//    //rs2 = RCThreadStatus::Failed | RCThreadStatus::Finished | RCThreadStatus::Terminated;
//
//    //bool v = hasFlag(rs2, rs1);
//
//    bool v2 = (RCThreadStatus::NotStarted | RCThreadStatus::Finished) == RCThreadStatus::All;
//
//    int j = static_cast<int>(RCThreadStatus::NotStarted | RCThreadStatus::Running);
//
//    RCThreadStatus m = RCThreadStatus::Running | RCThreadStatus::Stopped;
//    m  ^= RCThreadStatus::NotStarted;
//
//
//    //m &= ~(RCThreadStatus::All);
//    //m &= ~RCThreadStatus::Running;
//
//    m ^= RCThreadStatus::All;
//    //cout << typeid(  decltype(rs1)).name() << endl;
//    
//}

int _tmain(int argc, _TCHAR* argv[])
{
    TestThreadWorker* worker = new TestThreadWorker();
    RCThread t(worker);
    t.run();
    
        
    cout << "asf" << endl;
    this_thread::sleep_for(chrono::milliseconds(200));
    t.terminate();
    t.terminate();

    //t.stop();
    //t.join();
    RCThreadStatus status = t.getStatus();
    return 0;
}

