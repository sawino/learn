#pragma once

#include <memory>

class Ctest
{
public:
    Ctest(void);
    virtual ~Ctest(void);

    void f();

private:
    class Impl;
    std::unique_ptr<Impl> mImpl;
};

