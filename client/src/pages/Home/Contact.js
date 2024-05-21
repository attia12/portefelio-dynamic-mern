import React from 'react'
import SectionTitle from '../../components/SectionTitle';
import { useSelector } from 'react-redux';

function Contact() {
  const {portfolioData}=useSelector((state)=>state.root);
  const {contact} = portfolioData;

  return (
    <div>
         <SectionTitle title="Say Hello" />
           <div className='flex  items-center justify-between '>
            <div className='flex flex-col'>
            <p className='text-tertiary '>{'{'}</p>
            {Object.keys(contact).map((key)=>(
              key !== '_id' &&
                <p className='ml-5' >
                    <span className='text-tertiary '>{key} :</span> 
                     <span className='text-tertiary '>{contact[key]}</span>
                </p>

            ))}
             <p className='text-tertiary'>{'}'}</p>
            </div>
            <div className='h-[400px]'>
            <dotlottie-player src="https://lottie.host/dad44776-6dfd-468d-881a-99df591dc7a9/RC7EaH10ah.json" background="transparent" speed="1"  autoplay></dotlottie-player>
            </div>
         

            </div>   
    </div>
  )
}

export default Contact