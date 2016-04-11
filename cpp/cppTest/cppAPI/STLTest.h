#pragma once

#include <vector>
#include <algorithm>
#include <numeric>
#include <string>

using namespace std;

class STLTest
{
public:
    STLTest(void);
    ~STLTest(void);

    void testRemove()
    {
        vector<int> v;
        v.push_back(1);
        v.push_back(2);
        v.push_back(3);

        auto i = remove_if(v.begin(), v.end(), [&v] (int x) {
            return x > 1;
        });

        v.erase(i, v.end());
    }

    void testAccumulate()
    {
        vector<int> v;
        v.push_back(1);
        v.push_back(2);
        v.push_back(3);

        int i = std::accumulate(v.begin(), v.end(), 0);
        i = accumulate(v.begin(), v.end(), 1, [&](int x, int y) {
            return x * y * 10;        
        });

        string val = accumulate(v.begin(), v.end(), string(), [&](string res, int val) {
            if (val > 1)
            {
                res += "l";
            }
            else
            {
                res += "s";
            }

            return res;
        });
        
    }
};

