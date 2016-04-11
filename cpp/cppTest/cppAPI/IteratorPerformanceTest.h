#pragma once

#include <vector>
#include <chrono>
#include <ctime>
#include <functional>
#include <iostream>
using namespace std;


class IteratorPerformanceHelper
{
public:
    IteratorPerformanceHelper()
    {
        int i = 0;
    }

    ~IteratorPerformanceHelper()
    {
        int i = 0;
    }
};


class IteratorPerformanceTest
{
public:
    const size_t IteratorPerformanceTestCount;
    typedef vector<IteratorPerformanceHelper> Vec;

    Vec helperVec;
    IteratorPerformanceTest()
        : IteratorPerformanceTestCount(1000000)
    {
        helperVec.reserve(IteratorPerformanceTestCount);

        for (size_t i = 0; i < IteratorPerformanceTestCount; i++)
        {
            helperVec.push_back(IteratorPerformanceHelper());
        }
    }

    void testForward()
    {
        // ++it
        for (Vec::iterator it = helperVec.begin(); it != helperVec.end(); ++it)
        {
        }
    }

    void testPost()
    {
        // ++it
        for (Vec::iterator it = helperVec.begin(); it != helperVec.end(); it++)
        {
        }
    }

    void testFunction(function<void(void)> f)
    {
        chrono::high_resolution_clock::time_point start = chrono::high_resolution_clock::now();

        f();

        chrono::high_resolution_clock::time_point end = chrono::high_resolution_clock::now();

        chrono::duration<double> duration = end - start;        

        cout << duration.count() << endl;      
    }

    void test()
    {
        cout << "++i"  << endl;
        testFunction(bind(&IteratorPerformanceTest::testForward, this));

        cout << "i++" << endl;
        testFunction(bind(&IteratorPerformanceTest::testPost, this));
    }
};