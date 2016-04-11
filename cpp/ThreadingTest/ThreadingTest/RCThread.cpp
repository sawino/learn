#include "stdafx.h"
#include "RCThread.h"
#include <thread>
#include <future>
#include <memory>
#include "RCThreadStatus.h"

using namespace std;

struct RCThread::Impl
{
    Impl(RCIThreadWorker* worker)
        : mWorker(worker)
        , mPromise(new promise<int>())
        , mStatus(RCThreadStatus::NotStarted)
    {
        
    }

    void start()
    {
        if (getStatus() == RCThreadStatus::NotStarted)
        {
            setStatus(RCThreadStatus::Running);

            std::thread([&] (std::promise<int>& tp) 
            {
                mWorker->start();
                mPromise->set_value(1);
                setStatus(RCThreadStatus::Finished);
            }, std::ref(*mPromise)).detach();
        }
    }

    void stop()
    {
        if (getStatus() == RCThreadStatus::Running)
        {
            setStatus(RCThreadStatus::Stopped);
            mWorker->stop();
        }
    }

    void terminate()
    {
        if (getStatus() != RCThreadStatus::Terminated)
        {
            setStatus(RCThreadStatus::Terminated);
            mPromise->set_value(-1);
        }
    }

    RCThreadStatus getStatus()
    {
        return mStatus;
    }

    void setStatus(RCThreadStatus status)
    {
        mStatus = status;
    }

    void join()
    {
        if (getStatus() == RCThreadStatus::Running)
        {
            mPromise->get_future().get();
        }
    }

    unique_ptr<promise<int>>    mPromise;
    RCIThreadWorker*            mWorker;
    RCThreadStatus              mStatus;
};

RCThread::RCThread(RCIThreadWorker* worker)
    : mImpl(new Impl(worker))
{
}


RCThread::~RCThread(void)
{
}

void RCThread::run()
{
    mImpl->start();
}

void RCThread::stop()
{
    mImpl->stop();
}

void RCThread::terminate()
{
    mImpl->terminate();
}

RCThreadStatus RCThread::getStatus()
{
    return mImpl->getStatus();
}

void RCThread::join()
{
    mImpl->join();
}