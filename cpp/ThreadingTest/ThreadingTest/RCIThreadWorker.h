#pragma once

class RCIThreadWorker
{
public:
    virtual void start() = 0;
    virtual void stop() = 0;
};