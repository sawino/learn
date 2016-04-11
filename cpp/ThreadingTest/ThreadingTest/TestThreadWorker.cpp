#include "stdafx.h"
#include "TestThreadWorker.h"
#include <thread>
#include <iostream>

using namespace std;

TestThreadWorker::TestThreadWorker(void)
{
    mStop = false;
}


TestThreadWorker::~TestThreadWorker(void)
{
}

void TestThreadWorker::start()
{
    for (int i = 0; i < 10; i++)
    {
        if (mStop)
        {
            break;
        }
        cout << i << endl;
        this_thread::sleep_for(chrono::milliseconds(50));
    }
}

void TestThreadWorker::stop()
{
    mStop = true;
}
