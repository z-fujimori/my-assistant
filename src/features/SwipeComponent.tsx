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
      <div className='m-10'>
        <select name="" id="">
          <option value="">1</option>
          <option value="">2</option>
          <option value="">3</option>
        </select>
      </div>
      <Carousel>
      <CarouselContent>
        <CarouselItem>
          <CalcuCard />
        </CarouselItem>
        <CarouselItem>
          121212121å
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
