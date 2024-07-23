import type { FormulariosInterface } from '@customTypes/FormulariosInterface';
import {useState, useEffect } from 'react';
import type {FC} from 'react';

export const LoginFormulario:FC<FormulariosInterface> = ({cosas}) => {
  const [isLoading, setIsLoading]=useState<boolean>(false);
  const [isLoadingText, setIsLoadingText]=useState<string>('holadsdaf');

  const textName=cosas;
  useEffect(() => {
    console.log("cosas");
    return () => {
    }
  }, [isLoading])

  return (
    <div>
      <h1 style={{color:'#ffffff'}} >{String(isLoading)} {textName} {isLoadingText}</h1>
      <button type="button" 
        onClick={()=>{
          setIsLoading(!isLoading);
          if(isLoadingText === 'cosas'){
            setIsLoadingText('hola');
          }else{
            setIsLoadingText('cosas');
          }
        }}
      >Change</button>
    </div>
  )
}
