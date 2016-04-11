#pragma once
#include <type_traits>
namespace A {
#define RC_PREPARE_FLAGGED_ENUM_TYPE RCFlaggedEnumTypeHelper<EnumType>::AssertIsEnum();  \
    typedef typename RCFlaggedEnumTypeHelper<EnumType>::InternalType InternalType;

template<typename EnumType>
// Helper class for the flagged enum operators.
struct RCFlaggedEnumTypeHelper
{
    typedef typename std::underlying_type<EnumType>::type InternalType;
    static void AssertIsEnum()
    {
        static_assert(std::is_enum<EnumType>::value, "Not Enum");   
    }
};

template<typename EnumType>
inline EnumType operator & (const EnumType& lhs, const EnumType& rhs)
{
    RC_PREPARE_FLAGGED_ENUM_TYPE

    return static_cast<EnumType>(static_cast<InternalType>(lhs)
                                & static_cast<InternalType>(rhs));
}

template<typename EnumType>
inline EnumType operator | (const EnumType& lhs, const EnumType& rhs)
{
    RC_PREPARE_FLAGGED_ENUM_TYPE

    return static_cast<EnumType>(static_cast<InternalType>(lhs)
                                | static_cast<InternalType>(rhs));
}

template<typename EnumType>
inline EnumType operator ^ (const EnumType& lhs, const EnumType& rhs)
{
    RC_PREPARE_FLAGGED_ENUM_TYPE

    return static_cast<EnumType>(static_cast<InternalType>(lhs)
                                ^ static_cast<InternalType>(rhs));
}

template<typename EnumType>
inline EnumType operator ~ (const EnumType& arg)
{
    RC_PREPARE_FLAGGED_ENUM_TYPE

    return static_cast<EnumType>(~static_cast<InternalType>(arg));
}

template<typename EnumType>
inline EnumType& operator &= (EnumType& lhs, const EnumType& rhs)
{
    RC_PREPARE_FLAGGED_ENUM_TYPE

    lhs = lhs & rhs;
    return lhs;
}

template<typename EnumType>
inline EnumType& operator |= (EnumType& lhs, const EnumType& rhs)
{
    RC_PREPARE_FLAGGED_ENUM_TYPE

    lhs = lhs | rhs;
    return lhs;
}

template<typename EnumType>
inline EnumType& operator ^= (EnumType& lhs, const EnumType& rhs)
{
    RC_PREPARE_FLAGGED_ENUM_TYPE

    lhs = lhs ^ rhs;
    return lhs;
}

template<typename EnumType>
inline bool hasFlag(const EnumType& testee, const EnumType& flag)
{
    RCFlaggedEnumTypeHelper<EnumType>::AssertIsEnum();
    return (testee & flag) == flag;
}


}