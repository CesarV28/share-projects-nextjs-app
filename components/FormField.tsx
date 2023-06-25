import { FC } from 'react';

interface FormFieldProps {
    inputType?: string;
    title?: string;
    state: string;
    placeholder?: string;
    isTextArea?: boolean;
    setState: (value: string) => void;
}

const FormField: FC<FormFieldProps> = ({ 
    inputType = 'text', 
    title = 'input', 
    state, 
    placeholder = 'placeholder', 
    setState, 
    isTextArea = false,
}) => {
  return (
    <div className='flexStart flex-col w-full gap-4'>
        <label htmlFor="" className='w-full text-gray-100'>
            { title }
        </label>
        {isTextArea
            ? (
                <textarea
                    placeholder={ placeholder }
                    value={ state }
                    required
                    className='form_field-input'
                    onChange={(e) => setState(e.target.value)}
                />
            )
            : (
                <input 
                    type={ inputType } 
                    placeholder={ placeholder }
                    value={ state }
                    required
                    className='form_field-input'
                    onChange={(e) => setState(e.target.value)}
                />
            )

        }
    </div>
  )
}
export default FormField;