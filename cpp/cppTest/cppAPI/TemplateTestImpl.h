#pragma once

template<typename T>
// Notice that it's TemplateTest<T>::, rather than TemplateTest::
TemplateTest<T>::~TemplateTest()
{

}

template<typename T>
TemplateTest<T>::TemplateTest(T val)
    : mT(val)
{

}

template<typename T>
T TemplateTest<T>::get()
{
    return mT;
}