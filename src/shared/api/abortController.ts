export const withAbortController = <T, R>(request: (params: T) => R) => {
    let abortController = new AbortController();

    return (params: T) => {
        abortController.abort();
        abortController = new AbortController();

        return request({
            ...params,
            signal: abortController.signal,
        });
    };
};
