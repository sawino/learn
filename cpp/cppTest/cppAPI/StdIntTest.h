#pragma once

#include <cstdint>
#include <iostream>
#include <sstream>

using namespace std;

class StdIntTest
{
public:
    StdIntTest(void);
    ~StdIntTest(void);

    void testInt()
    {
        
        int8_t i = 9;
        wcout << INT8_MAX << endl;
        cout << INT8_MIN << endl;

        cout << INT32_MAX << endl;
        cout << INT32_MIN << endl;

        cout << INT64_MAX << endl;
        cout << INT64_MIN << endl;

        cout << INT_FAST32_MAX << endl;
        cout << INT_LEAST32_MAX << endl;

        cout << UINT8_MAX << endl;

        wstringstream ss;
        ss << i;
        wcout << ss.str() << endl;

    }
};

