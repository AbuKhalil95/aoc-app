import useForm from "hooks/useForm";
import { useEffect } from "react"
import { setToken } from "utils";

const LoginForm = ({ onLogin }) => {
    const { onChange, handleSubmit, disabled, response } = useForm({ name: null, type: null }, "login", "post");

    useEffect(() => {
        console.log(!response.e && response.token, {e: response.e, response});
        if (!response.e && response.token) {
            setToken(response.token);
            onLogin();
        }
    }, [response, response.e])

    return (
        <form className="bg-gray-200 w-fit p-5 my-10 rounded-2xl">
            <legend className="my-2 text-xl">Login Here!</legend>
            <label htmlFor="name" >Name: </label>
            <input className="ml-4 p-2 m-2" type="text" name="name" id="name" onChange={onChange} />
            <br />
            <input className="mr-4 p-2 my-2" type="radio" id="buyer" name="type" value="buyer" onChange={onChange} />
            <label htmlFor="buyer">Buyer</label>
            <br />
            <input className="mr-4 p-2 my-2" type="radio" id="seller" name="type" value="seller" onChange={onChange} />
            <label htmlFor="seller">Seller</label>
            <button className={`mt-10 px-6 py-2 text-white rounded-xl block ${disabled ? "cursor-not-allowed bg-red-600" : "bg-slate-500 hover:bg-slate-800"}`} onClick={handleSubmit} >Submit</button>
            {response.e && <p className="text-red-700 font-bold mt-5">{response.e.toString()}</p>}
        </form>
    );
};

export default LoginForm;
