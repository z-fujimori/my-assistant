import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "../../components/ui/carousel"
import CalcuCard from './calculator/components/CalcuCard';
import TimememoCard from './timememo/components/TimememoCard';

const SwipeComponent: React.FC = () => {

    return (
        <div className='m-5'>
            <Carousel>
            <CarouselContent>
                <CarouselItem>
                    <CalcuCard />
                </CarouselItem>
                <CarouselItem>
                    <TimememoCard />
                </CarouselItem>
                <CarouselItem>kokokokoko</CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
            </Carousel>
        </div>
    )
};

export default SwipeComponent;
