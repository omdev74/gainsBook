import { Loader2 } from 'lucide-react';
import * as React from 'react';

interface ILoaderProps extends React.SVGAttributes<SVGElement> { }

const Loader: React.FunctionComponent<ILoaderProps> = (props) => {
    return <Loader2 className="my-4 h-8 w-8 animate-spin text-muted-foreground" {...props} />;
};

export default Loader;
