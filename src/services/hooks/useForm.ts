import {useState} from "react";

export function useForm(inputValues: { email?: string | undefined, password?: string | undefined, name?: string | undefined } = {}) {
    const [values, setValues] = useState(inputValues);

    const handleChange = (event: any) => {
        const {value, name} = event.target;
        setValues({...values, [name]: value});
    };
    return {values, handleChange, setValues};
}