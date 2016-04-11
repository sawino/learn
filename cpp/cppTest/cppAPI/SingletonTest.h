#pragma once
#include <memory>
class SingletonTest
{
public:
    static SingletonTest& instance();
    int test();

private:
    SingletonTest(void);
    ~SingletonTest(void);    

    struct Impl;
    std::unique_ptr<Impl> mImpl;
};

