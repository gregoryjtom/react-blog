import { useState, useEffect } from 'react';

const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortController = new AbortController(); 

        // TODO: remove the timeout in production
        setTimeout(() => {
            fetch(url, { signal: abortController.signal }) // this tells the fetch when to continue and when to abort
            .then(res => {
                if (!res.ok)
                {
                    throw Error ('Could not fetch data for that resource.');
                }
                return res.json();
            })
            .then((data) => {
                setData(data);
                setIsPending(false);
                setError(null);
            })
            .catch((err) => {
                if (err.name==='AbortError')
                {
                    console.log('Fetch aborted.');
                }
                else 
                {
                    setError(err.message);
                    setIsPending(false);
                }
            })
        }, 5);

         // this gets activated when the url for the fetch changes (b/c the url is passed in on the next line)
         // i.e. we abort whenever a new call is made for a different fetch
        return () => abortController.abort();
    }, [url]);

    return {data, isPending, error}
}

export default useFetch;    