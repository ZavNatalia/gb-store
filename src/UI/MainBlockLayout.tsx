import React, {ReactNode} from 'react';
import {BackHomeLink} from "./BackHomeLink";
import {Flex, Heading} from "@chakra-ui/react";

interface MainBlockLayoutProps {
    title?: string,
    children: ReactNode
}

const MainBlockLayout = ({title, children}: MainBlockLayoutProps) => {
    return (
        <Flex flexDirection='column' flex={1} mx='auto' w='70%' maxW='1200px' p={5}>
            <BackHomeLink/>
            {title && <Heading my={5}>{title}</Heading>}
            {children}
        </Flex>
    );
};

export default MainBlockLayout;