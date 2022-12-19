import {Box, IconButton, Image, useBreakpointValue} from '@chakra-ui/react';
import React from 'react';
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
    const top = useBreakpointValue({ base: '90%', md: '50%' });
    const side = useBreakpointValue({ base: '30%', md: '10px' });

    return (
        <Box
            position='relative'
            height='600px'
            width='full'
            overflow='hidden'>
            <IconButton
                aria-label="left-arrow"
                colorScheme="messenger"
                borderRadius="full"
                position="absolute"
                left={side}
                top={top}
                transform={'translate(0%, -50%)'}
                zIndex={2}
                onClick={() => slider?.slickPrev()}>
                <BiLeftArrowAlt />
            </IconButton>
            <IconButton
                aria-label="right-arrow"
                colorScheme="messenger"
                borderRadius="full"
                position="absolute"
                right={side}
                top={top}
                transform={'translate(0%, -50%)'}
                zIndex={2}
                onClick={() => slider?.slickNext()}>
                <BiRightArrowAlt />
            </IconButton>
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