import React from 'react';
import ProductSkeleton from "./ProductSkeleton";

interface SkeletonListProps {
    amount: number
}

const SkeletonList = ({amount}: SkeletonListProps) => {
    return (
        <>
            {Array(amount)
                .fill(null)
                .map((_, index) => <ProductSkeleton key={index}/>)}
        </>
    );
};

export default SkeletonList;