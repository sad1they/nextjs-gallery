import Head from 'next/head'
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import { AppContext } from '../_app'

export default function ImagePage() {
    const context = React.useContext(AppContext)

    return (
        <div className='container-fluid bg-light'>
            <Head>
                <title>View image</title>
                <meta name="description" content="View image" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className='row row-centered row-header'>
                <div className='col-12 col-lg-2 mx-auto'>
                    <Link href='/'>
                        <a className='btn btn-success'>Back</a>
                    </Link>
                </div>
                <div className='col-12 col-lg-6 mx-auto'>
                    <h1>View image</h1>
                </div>
            </div>
            <div className='row row-content row-image'>
                <Image 
                    className='img-fluid rounded'
                    src={context.image}
                    width='600'
                    height='600'
                />
            </div>
        </div>
    )
}
