#pragma once
#include "RCIThreadWorker.h"
class TestThreadWorker : public RCIThreadWorker
{
public:
    TestThreadWorker(void);
    virtual ~TestThreadWorker(void);

    virtual void start();

    virtual void stop();

    bool mStop;
};

