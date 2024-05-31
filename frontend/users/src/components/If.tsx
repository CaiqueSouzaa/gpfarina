import { ReactNode } from "react";

export interface IfProps {
    condition: boolean;
    children: ReactNode[] | ReactNode;
}

const If = ({ children, condition }: IfProps) => {    
    if (condition) {
        return children;
    } else {
        return null;
    }
};

export default If;
