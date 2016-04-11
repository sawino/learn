#pragma once
#include <mutex>
#include <condition_variable>
#include <iostream>
#include <thread>
#include <atomic>
class RecursiveLockTest
{
public:
    // crash if using mutex, because a thread can't get the same mutex for twice
    typedef std::recursive_mutex MutexType;
    typedef std::lock_guard<MutexType> Locker;
    RecursiveLockTest()
        : mI(0)
    {

    }

    void inc()
    {
        Locker lock(mMutex);
        mI++;
    }

    void dec()
    {
        Locker lock(mMutex);
        mI--;
    }

    void both()
    {
        Locker lock(mMutex);
        inc();
        dec();
    }

    int mI;
    MutexType mMutex;    
};

static std::once_flag onceFlag;
static void doSomthingOnce()
{
    std::call_once(onceFlag, []() { std::cout << "once" << std::endl; });
}

struct Buffer
{
    int size;
    int capacity;
    int* buffer;
    std::mutex lock;
    int front;
    int rear;

    std::condition_variable notFull;
    std::condition_variable notEmpty;

    Buffer()
        : size(0)
        , capacity(200)
        , buffer(new int[200])
        , front(0)
        , rear(0)

    {
        
    }

    ~Buffer()
    {
        delete[] buffer;
    }

    void deposite(int data)
    {
        std::unique_lock<std::mutex> l(lock);
        // equals to wait until the predict is true
        notFull.wait(l, [this]()  -> bool
            {
                return size != capacity;
        });

        buffer[rear] = data;
        rear = (rear + 1) % capacity;
        size++;

        notEmpty.notify_one();        
    }

    int fetch()
    {
        std::unique_lock<std::mutex> l(lock);
        notEmpty.wait(l, [this]() -> bool {
            return size != 0;
        });

        int result = buffer[front];
        front = (front + 1) % capacity;
        --size;

        notFull.notify_one();

        return result;
    }
};

static void consumer(int id, Buffer& buffer)
{
    for (int i = 0; i < 3; i++)
    {
        int value = buffer.fetch();
        std::cout << id << " consumed: " << value << std::endl;
        std::this_thread::sleep_for(std::chrono::milliseconds(250));
    }
}

static void producer(int id, Buffer& buffer)
{
    for (int i = 0; i < 10; i++)
    {
        buffer.deposite(i);
        std::cout << id << " produced: " << i << std::endl;
        std::this_thread::sleep_for(std::chrono::milliseconds(100));
    }
}

class AtomicTest
{
public:
    int mInt;
    std::mutex mMutex;
    std::atomic<int> mAtomicInt;

    AtomicTest()
        : mInt(0)
    {
        mAtomicInt = 0;
    }

    void inc()
    {
        std::lock_guard<std::mutex> locker(mMutex);
        mInt++;
    }

    void incAtomic()
    {
        mAtomicInt++;
    }
};

static const int sIncCount = 1000000;
static void inc(AtomicTest& test)
{
    for (int i = 0; i < sIncCount; i++)
    {
        test.inc();
    }
}

static void incAtomic(AtomicTest& test)
{
    for (int i = 0; i < sIncCount; i++)
    {
        test.incAtomic();
    }
}

