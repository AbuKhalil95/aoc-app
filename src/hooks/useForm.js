import axios from "axios";
import { useState, useEffect } from "react";
import { hasEmpty, objectToQuery } from "utils";

// A custom hook that handles data change for values coming from onChange
const useForm = (obj = {}, url, method = "get", isBody = false) => {
    const [data, changeData] = useState(obj);
    const [response, setResponse] = useState({});
    const [disabled, setDisabled] = useState(true);

    const onChange = (e) => {
        const { name, value } = e.target;
        changeData((oldData) => ({ ...oldData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (disabled) return;

        // TODO: remove once user is refactored to unified schema
        try {
            let res;
            const { type, ...rest } = data;
            if (isBody) {
                res = await axios[method](`${process.env.REACT_APP_BACKEND}/${url}`, rest)
            } else {
                res = await axios[method](`${process.env.REACT_APP_BACKEND}/${url}/${type}?${objectToQuery(rest)}`)
            }

            setResponse(res.data)
        } catch (e) {
            setResponse({ e })
        }

        console.log(response);
    };

    useEffect(() => {
        setDisabled(hasEmpty(data))
    }, [data])

    return { onChange, handleSubmit, disabled, response };
};

export default useForm;