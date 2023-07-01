import { useEffect, useMemo, useState } from 'react';

export const useForm = ( initialForm = {}, formValidations = {}) => {
  
    const [formState, setFormState] = useState( initialForm );
    const [formValidation, setFormValidation] = useState({})

    //Check when form change
    useEffect(() => {
        createValidations();
    }, [formState])

    useEffect(() => {
        setFormState(initialForm);
    }, [initialForm]);

    //Check if there arent error messages (Whole need to be null)
    const isFormValid = useMemo(() => {
        for (const formValue of Object.keys(formValidation)) {
            if (formValidation[formValue] !== null) return false; 
        }
        return true;
    }, [formValidation]) //Check in each validation

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [ name ]: value
        });
    }

    const onResetForm = () => setFormState( initialForm );

    const createValidations = () => {
        const formCheckValues = {};
        for (const formField of Object.keys(formValidations)) {
            const [fn, errorMessage] = formValidations[formField]; //Get validation and error message
            formCheckValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage; //If pass validation then set any error message (null), otherwise, set error message
        }
        setFormValidation(formCheckValues); 
    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
        ...formValidation,
        isFormValid,
    }
}