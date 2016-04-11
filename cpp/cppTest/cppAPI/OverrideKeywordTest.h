#pragma once
class OverrideKeywordTest
{
public:
    OverrideKeywordTest(void);
    virtual ~OverrideKeywordTest(void);

    virtual int function() {
        return 1;
    }
    
};

class OverrideKeywordDerived : public OverrideKeywordTest
{
public:

    int function() override
    {
        return 2;
    }
};

class OverrideKeywordDerived2 : public OverrideKeywordDerived
{
public:

// compiles
//private:

    int function() override 
    {
        return 3;
    }
};

