#include "stdafx.h"
#include "TemplateTest.h"


template<typename T>
T ObviousInstanceTemplate<T>::get()
{
    return mT;
}


// obvious
template class ObviousInstanceTemplate<int>;
template class ObviousInstanceTemplate<bool>;
