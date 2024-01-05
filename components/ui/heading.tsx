import React from "react";

interface HeadingProps {
    title: String,
    description: String
}
export const Heading: React.FC<HeadingProps> = ({ title, description }) => {
    return (
        <div className="">
            <h3 className="text-3xl font-bold tracking-tight" >{title}</h3>
            <p>{description}</p>
        </div>
    );
}

