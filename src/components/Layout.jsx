import React from 'react'

const Layout = ({ children }) => {
    return (
        <>
            <section className='bg-[#3F72AF] h-screen w-screen flex flex-col justify-center items-center'>{children}</section>

        </>
    )
}

export default Layout