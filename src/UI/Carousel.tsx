import { Box, IconButton, Image } from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
import Slider from 'react-slick';

interface CarouselProps {
    images: string[];
}

const settings = {
    dots: true,
    arrows: false,
    fade: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
};

const Carousel = ({images}: CarouselProps) => {
    const [slider, setSlider] = React.useState<Slider | null>(null);

    const ArrowIcon = ({
                           icon,
                           ariaLabel,
                           right,
                           left,
                           onClick
                       }:
                           {
                               icon: ReactNode,
                               ariaLabel: string,
                               right?: string,
                               left?: string,
                               onClick: () => void
                           }) => {
        return (
            <IconButton
                aria-label={ariaLabel}
                colorScheme="gray"
                borderRadius="full"
                border='1px solid'
                borderColor='gray.200'
                shadow='sm'
                position="absolute"
                size='lg'
                right={right}
                left={left}
                top='40%'
                transform={'translate(0%, -50%)'}
                zIndex={2}
                hidden={images.length <= 1}
                onClick={onClick}>
                {icon}
            </IconButton>
        )
    }
    return (
        <Box
            position='relative'
            height='560px'
            width='full'>

            <ArrowIcon
                icon={<BiLeftArrowAlt/>}
                ariaLabel='left-arrow'
                left='-20px'
                onClick={() => slider?.slickPrev()}/>

            <ArrowIcon
                icon={<BiRightArrowAlt/>}
                ariaLabel='right-arrow'
                right='-20px'
                onClick={() => slider?.slickNext()}/>

            <Slider {...settings} ref={(slider: any) => setSlider(slider)}>
                {images.map((url, index) => (
                    <Image
                        key={index}
                        maxH='500px'
                        maxW='100%'
                        minH='500px'
                        minW='500px'
                        objectFit={'contain'}
                        src={url}
                        fallbackSrc={'/imgs/placeholder-image.jpg'}
                    />
                ))}
            </Slider>
        </Box>
    );
};

export default Carousel;