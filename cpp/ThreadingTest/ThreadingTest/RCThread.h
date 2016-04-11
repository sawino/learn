#pragma once

#include "RCIThreadWorker.h"
#include <memory>

enum class RCThreadStatus;

class RCThread
{
public:
    RCThread(RCIThreadWorker* worker);
    ~RCThread(void);

    void                run();
    void                stop();
    void                join();

    void                terminate();
    RCThreadStatus      getStatus();
private:

    struct Impl;
    std::unique_ptr<Impl> mImpl;
};

