#pragma once

template<typename T>
class TemplateTest
{
public:
    TemplateTest(T val);
    ~TemplateTest(void);

    T get();

    T mT;
};

// move the impl to another file to make the header clean
#include "TemplateTestImpl.h"


// hided the detail
template<typename T>
class ObviousInstanceTemplate
{
public:

    T get();

    T mT;
};

// to hint that the users can only use the int and bool for the template type
typedef ObviousInstanceTemplate<int> IntTemplate;
typedef ObviousInstanceTemplate<bool> BoolTemplate;