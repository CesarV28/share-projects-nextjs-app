"use client"
import { ProjectInterface, SessionInterface } from '@/common.types';
import Image from 'next/image';
import { ChangeEvent, FC, useState } from 'react';
import FormField from './FormField';
import { categoryFilters } from '@/constants';
import CustomMenu from './CustomMenu';
import Button from './Button';
import { createNewProject, fetchToken, updateProject } from '@/lib/actions';
import { useRouter } from 'next/navigation';

interface ProjectFormProps {
    type: string;
    session: SessionInterface;
    project?: ProjectInterface
}

interface IProjectForm {
    image: string;
    title: string;
    description: string;
    liveSiteUrl: string;
    githubUrl: string;
    category: string;
}

const ProjectForm: FC<ProjectFormProps> = ({ type, session, project }) => {

  const router = useRouter();  
    
  // States
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [form, setForm] = useState<IProjectForm>({
    image: project?.image || '',
    title: project?.title || '',
    description: project?.description || '',
    liveSiteUrl: project?.liveSiteUrl || '',
    githubUrl: project?.githubUrl || '',
    category: project?.category || '',
  });

  // Custom functions
  const handleFormSubmit = async( e: React.FormEvent ) => {
    e.preventDefault();

    setIsSubmitting( true );

    const { token } = await fetchToken();

    try {
        if( type === 'Create' ) {

            await createNewProject( form, session?.user?.id, token);
            
            router.push('/');
        }

        if( type === 'Edit' ) {

            await updateProject( form, project?.id as string , token);
            
            router.push('/');
        }
    } catch (error) {
        console.log( error );
    } finally {
        setIsSubmitting( false );
    }
  } 

  const handleChangeImage = ( e: ChangeEvent<HTMLInputElement> ) => {
    e.preventDefault();
    const file = e.target.files?.[0];

    if( !file ) return;

    if( !file?.type.includes('image') ) {
        return alert('Please upload an image file')
    }

    const reader = new FileReader();

    reader.readAsDataURL( file );

    reader.onload = () => {
        const result = reader.result as string;
        handleStateChange( 'image', result );
    }
  }  

  const handleStateChange = ( fieldName: string, value: string ) => {
    setForm( (prevValue) => ({
        ...prevValue,
        [fieldName]: value,
    }))
  }

  

  return (
    <form
        onSubmit={ handleFormSubmit }
        className='flexStart form'
    >
        <div className='flexStart form_image-container'>
            <label htmlFor='poster' className='flexCenter form_image-label'>
                {!form.image && 'Choose a poster for your project'}
            </label>
            <input 
                id='image' 
                type="file" 
                accept='image/*'
                required={ type == 'create ' }
                className='form_image-input'
                onChange={ handleChangeImage }
            />
            {form.image && 
                <Image
                    src={ form.image }
                    className='sm:p-10 object-contain z-20'
                    alt='Project poster'
                    fill
                />
            }
        </div>   

        <FormField 
            inputType={ 'text '}
            title={ 'Title' }
            state={ form.title }
            placeholder={ 'Flexibble '}
            setState={ (value) => handleStateChange('title', value)}
        />
        <FormField 
            inputType={ 'text '}
            title={ 'Description' }
            state={ form.description }
            placeholder={ 'Show case and discover remarcable projects '}
            setState={ (value) => handleStateChange('description', value)}
        />
        <FormField 
            inputType={ 'url '}
            title={ 'Website url' }
            state={ form.liveSiteUrl }
            placeholder={ 'https://dev-master.pro'}
            setState={ (value) => handleStateChange('liveSiteUrl', value)}
        />
        <FormField 
            inputType={ 'url '}
            title={ 'GitHub url' }
            state={ form.githubUrl }
            placeholder={ 'https://github.com/devmaster'}
            setState={ (value) => handleStateChange('githubUrl', value)}
        />

        <CustomMenu
            title={ 'Category' }
            state={ form?.category }
            filters={ categoryFilters }
            setState={ (value) => handleStateChange('category', value)}
        />

        <div className='flexStart w-full'>
            <Button 
                title={ isSubmitting
                    ? `${ type === 'Create' ? 'Creating' : 'Editing'}`
                    : `${ type === 'Create' ? 'Create' : 'Edit'}`
                }  
                type='submit'
                leftIcon={ isSubmitting ? "" : '/plus.svg' }
                isSubmittin={ isSubmitting }          
            />
        </div>
    </form>
  )
}
export default ProjectForm;