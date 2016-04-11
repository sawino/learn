#ifndef RC_THREAD_STATUS_H
#define RC_THREAD_STATUS_H

enum class RCThreadStatus
{
    NotStarted  = 0,
    Running     = 1,
    Stopped     = 2,
    Terminated  = 3,
    Finished    = 4,
    Failed      = 5
};


#endif

