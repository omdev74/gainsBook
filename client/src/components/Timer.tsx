import * as React from 'react';
import { Button } from './ui/button';

import { Check, X } from "lucide-react";
interface ITimerProps {
}

const Timer: React.FunctionComponent<ITimerProps> = (props) => {
    return <div className="flex justify-between">
        <Button variant={'destructive'}><X /></Button>
        <div className="flex-col align-middle text-xs ">
        <div>Workout Name</div>
        <div>00:00:69</div>
        </div>
        <Button className="bg-green-700"><Check /></Button>

    </div>
};

export default Timer;
