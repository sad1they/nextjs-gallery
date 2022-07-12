import Head from 'next/head'
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import { createClient } from 'pexels'
import { AppContext } from './_app'

export default function Home({gallery}) {   
    const [keyword, setKeyword] = React.useState('');
    const [data, setData] = React.useState({});
    const [title, setTitle] = React.useState('Random');
    const context = React.useContext(AppContext)
    let searchData;

    const searchImages = async (keyword) => {
        event.preventDefault();
        
        setTitle(keyword);
        const query = keyword;
        const client = createClient('563492ad6f917000010000014e15c5f9dd874b30bbb0b1244c3d4ce9');
        client.photos.search({ query, per_page: 18, size: 'small' }).then(photos => {setData(photos)});
    }

    const initData = gallery.data.map((image) => (
        image.type == 'image/jpeg' 
            ? 
        <GalleryImage 
            key={image.id} 
            id={image.id} 
            link={image.link} 
            alt={image.title}
            click={() => {context.setImage(image.link)}}
        /> 
            : 
        null              
    ));

    if (data.photos) {
        searchData = data.photos.map((image) => (
            <GalleryImage 
                key={image.id} 
                id={image.id} 
                link={image.src.original} 
                alt={image.alt}
                click={() => {context.setImage(image.src.original)}}
            /> 
        ))
    }
  
    return (
        <div className='container-fluid bg-light'>
            <Head>
                <title>Gallery App</title>
                <meta name="description" content="Gallery App" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className='row row-centered row-header'>
                <div className='col-5'>
                    <h1>Gallery request is {title}</h1>
                </div>
                <div className='col-3'>
                    <nav className="navbar navbar-light justify-content-between">
                        <form className="form-inline" onSubmit={() => searchImages(keyword)}>
                            <input 
                                className="form-control mr-sm-2" 
                                type="search" 
                                placeholder="Search" 
                                aria-label="Search"
                                onChange={e => {setKeyword(e.target.value)}} 
                            />
                            <button 
                                className="btn btn-outline-success my-2 my-sm-0" 
                                type="submit"
                            >
                                Search
                            </button>
                        </form>
                    </nav>
                </div>
            </div>
            <div className='row row-content'>
                {data.photos ? searchData : initData}
            </div>
        </div>
    )
}

function GalleryImage(props) {
    return (
        <div className='col col-12 col-md-6 col-lg-4'>
            <Link href={`/image/${encodeURIComponent(props.id)}`}>
                <a>
                    <Image 
                        className='img-fluid rounded'
                        src={props.link} 
                        alt={props.alt} 
                        width='300'
                        height='300'
                        onClick={props.click}
                    />
                </a>
            </Link>
        </div>
    )
}

export async function getStaticProps() {
  const res = await fetch(
      'https://api.imgur.com/3/gallery/random/random/18', 
      {
          method: 'get',
          headers: {
              'Authorization': 'Client-ID 1e4a70ca77b5e5d'
          }
      })
  const gallery = await res.json()

  return {
    props: {
      gallery,
    },
  }
}
