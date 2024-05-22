"use client"

import { useEffect, useState } from 'react';
import {useInView} from 'react-intersection-observer';
import SnippetView from './snippet-view';
import { Skeleton } from './ui/skeleton';

export default function SnippetsList({initialSnippets}) {
    const [snippets, setSnippets] = useState<any>(initialSnippets)
    const [loading, setLoading] = useState(false);

    const {ref, inView} = useInView();

    

    useEffect(() => {
        if(inView) {
            setLoading(true);
            setTimeout(() => {
                fetch("/api").then(body => body.json()).then(data => {                
                    setSnippets((prevData) => [...prevData, ...data]);
                    setLoading(false);
                });
            }, 2000)
        }
    }, [inView]);  
    

    return (
        <>        
            <div className="grid gap-4 md:grid-cols-4 md:gap-6">
                {snippets.map((snippet, idx) => (
                    <SnippetView key={idx} snippet={snippet} />
            ))}

            {loading && (
                new Array(3).fill(0).map((v) => (
                    <Skeleton className="w-auto h-auto" />
                ))
            )}
            </div>
            <div ref={ref}>{`${inView}`}</div>
        </>
    )
}