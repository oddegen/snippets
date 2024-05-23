"use client"

import { useEffect, useState } from 'react';
import {useInView} from 'react-intersection-observer';
import SnippetView from './snippet-view';
import { Skeleton } from './ui/skeleton';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function SnippetsList({initialSnippets, totalPages, query}) {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const {replace} = useRouter()

    const [snippets, setSnippets] = useState<any>(initialSnippets)
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
    
    const {ref, inView} = useInView();

    const createPageUrl = (pageNumber: number) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", pageNumber.toString());

        replace(`${pathname}?${params.toString()}`, {scroll: false})
    }

    const end = page >= totalPages;



    useEffect(() => {
        fetch(`/api?q=${query}&page=${page}`).then(body => body.json()).then(data => {                
            setSnippets(data);
        }); 
    }, [query])
    

    useEffect(() => {
        if(inView) {
            setLoading(true);
            setPage(prevPage => prevPage + 1);
            
            setTimeout(() => {
                fetch(`/api?q=${query}&page=${page}`).then(body => body.json()).then(data => {                
                    setSnippets(prevData => [...prevData, ...data]);
                    setLoading(false);
                });  
                createPageUrl(page + 1);
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
                new Array(3).fill(0).map((_, idx) => (
                    <Skeleton key={idx} className="w-auto h-auto" />
                ))
            )}
            </div>
            <div ref={ref}>{`${inView} ${end ? "cant load more" : ""}`}</div>
        </>
    )
}