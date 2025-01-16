import React from 'react'
import ContactUsForm from '../../Common/ContactUsForm'

const ContactForm = () => {
  return (
    <div className='flex flex-col gap-8 w-full border-[1px] p-4 border-richblack-600 rounded-lg'>
        <div className='flex flex-col gap-3'>
            <h1 className='font-inter text-3xl text-center text-richblack-5'>
                Get in Touch
            </h1>

            <div className='font-inter text-base font-medium text-richblack-300 text-center '>
            We'd love to here for you, Please fill out this form.
            </div>
        </div>

        <div className='p-8'>
            <ContactUsForm />
        </div>
    </div>
  )
}

export default ContactForm
