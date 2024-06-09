// creating custom hooks using standard fun
// we will use the use- because for every function that start with use react will treat it as a custom hook.
// creating a custom hook using use will make the custom hook rules to be applied also to it.
//  the reason for creating custom hook is because so that we can reuse it else where.
// when updating the state inside the custom hook, the component where you will be using the custom hook will also be exercuted again.
// in every component where this state will be use will get independent snapshot hence it will independent.


import { useEffect, useState } from "react";

export const useFetch = (fetchFun, initialValue) => {
    // hooks inside custome hooks
    //  state
    const [fetchedData, setFetchedData] = useState(initialValue);
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        async function fetchData() {
          setIsFetching(true);
          try {
            const places = await fetchFun();
            setFetchedData(places);
          } catch (error) {
            setError({ message: error.message || 'Failed to fetch data.' });
          }

          setIsFetching(false);
        }

        fetchData();

      }, [fetchFun]);

      return {
        isFetching,
        error,
        fetchedData,
        setFetchedData
      }
}