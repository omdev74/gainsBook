import * as React from 'react';
import { useWorkout } from '@/contexts/WorkoutContext';
import { AccordionTrigger, Accordion, AccordionContent, AccordionItem } from '@/components/ui/accordion';

interface IWorkoutStateProps { }

const WorkoutState: React.FunctionComponent<IWorkoutStateProps> = (props) => {
    const { workoutState, setWorkoutState } = useWorkout();

    return (

        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>


                    <pre>{JSON.stringify(workoutState.workout, null, 2)}</pre>

                </AccordionContent>
            </AccordionItem>
        </Accordion>

    );
};

export default WorkoutState;
