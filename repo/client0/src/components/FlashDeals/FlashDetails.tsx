
import React from 'react';
import { BiTime } from 'react-icons/bi';

interface FlashDetailsProps {
  endTime: Date;
}

export default function FlashDetails({ endTime }: FlashDetailsProps) {
  const [timeLeft, setTimeLeft] = React.useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  React.useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const end = new Date(endTime).getTime();
      const distance = end - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  return (
    <div className="flex items-center space-x-4 space-x-reverse">
      <BiTime className="text-2xl text-primary" />
      
      <div className="flex items-center space-x-2 space-x-reverse">
        <div className="text-center">
          <div className="bg-primary text-white rounded px-2 py-1 min-w-[40px]">
            {timeLeft.days}
          </div>
          <div className="text-xs mt-1">روز</div>
        </div>
        
        <span className="text-xl">:</span>
        
        <div className="text-center">
          <div className="bg-primary text-white rounded px-2 py-1 min-w-[40px]">
            {timeLeft.hours}
          </div>
          <div className="text-xs mt-1">ساعت</div>
        </div>
        
        <span className="text-xl">:</span>
        
        <div className="text-center">
          <div className="bg-primary text-white rounded px-2 py-1 min-w-[40px]">
            {timeLeft.minutes}
          </div>
          <div className="text-xs mt-1">دقیقه</div>
        </div>
        
        <span className="text-xl">:</span>
        
        <div className="text-center">
          <div className="bg-primary text-white rounded px-2 py-1 min-w-[40px]">
            {timeLeft.seconds}
          </div>
          <div className="text-xs mt-1">ثانیه</div>
        </div>
      </div>
    </div>
  );
}
