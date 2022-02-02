// transforms argument of shallow object that returns from the hook, into a query parameter
export const objectToQuery = (obj) => {
    return Object.keys(obj).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`).join('&');
}

// checks for empty values
export const hasEmpty = (obj) => Object.values(obj).some(x => x === null || x === '');


