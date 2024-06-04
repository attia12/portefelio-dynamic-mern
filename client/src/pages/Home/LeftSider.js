import React from 'react'

function LeftSider() {
    return (
        <div className='fixed left-0 bottom-0 px-10  sm:static'>
            <div className='flex flex-col items-center'>
                <div className='flex flex-col gap-3 sm:flex-row'>
                <a href='https://www.facebook.com/mohamed.attia.12935756/'><i class="ri-facebook-circle-line text-gray-600 text-xl"></i></a>
                    
                    <i class="ri-mail-line text-gray-600 text-xl"></i>
                    <a href='https://www.instagram.com/yesineattia?igsh=OGQ5ZDc2ODk2ZA=='><i class="ri-instagram-line text-gray-600 text-xl"></i></a>
                    <a href='https://www.linkedin.com/in/mohamedyassine-attia-4447a9202/'><i class="ri-linkedin-box-line text-gray-600 text-xl"></i></a>
                    <a href='https://github.com/attia12'><i class="ri-github-fill text-gray-600 text-xl"></i></a>
                </div>
                <div className='w-[1px] h-52 bg-[#125f63] sm:hidden'>

                </div>
            </div>



        </div>
    )
}

export default LeftSider
