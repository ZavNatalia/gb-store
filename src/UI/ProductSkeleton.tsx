import React from 'react';
import {Flex, Skeleton, SkeletonText, Spacer} from "@chakra-ui/react";

const ProductSkeleton = () => {
    return (
        <Flex
            bg='gray.100'
            rounded='2xl'
            maxW='220px'
            minWidth='200px'
            height='409px'
            pb={2}
            flexDirection='column'
            overflow='hidden'
            boxShadow='md'
        >
            <Skeleton height='220px'/>
            <Skeleton mt='5' mx={3} h={6} w={50}/>
            <SkeletonText mt='4' mx={3} noOfLines={3} spacing='3'/>
            <Spacer/>
            <Skeleton height='50px' mt={8} mx={2} borderRadius='xl'/>
        </Flex>
    );
};

export default ProductSkeleton;