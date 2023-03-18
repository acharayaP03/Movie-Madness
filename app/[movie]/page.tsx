/**
 * this page will be created dynamimally in the server
 */

import RootLayout from "../layout";
import Image from 'next/image';
import styles from '../page.module.css'

/**
 * this function will pre render all the params so that page can prerender on the server,
 * in order to save load time.
 */
export async function generateStaticParams() {
    const data = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}`
    );

    const res = await data.json()
    return res.results.map((movie) => ({
        movie: movie.id.toString()
    }))
}

export default async function MovieDetail({ params }){
    const imageUrl = "https://image.tmdb.org/t/p/original";
    const data = await fetch(
        `https://api.themoviedb.org/3/movie/${params.movie}?api_key=${process.env.API_KEY}`,
        {
            next:{
                revalidate: 60
            }
        }
    );

    const res = await data.json();

    console.log(res)
    return(
        <RootLayout>
            <div className={styles.main}>
                <h2 className="text-2xl">{ res.title }</h2>
                <h2 className="text-lg">{res.release_date}</h2>
                <h2>Runtime: { res.runtime} minutes</h2>
                <span className="inline-block w-[100px] text-sm bg-green-600 my-2 py-2 px-4 rounded-md">{ res.status}</span>

                <Image priority className="my-12 w-full" src={imageUrl + res.backdrop_path} width={1000} height={1000} alt={res.original_title}/>

                <div className="my=12">
                    <h2 className="text-2xl">Movie Overview</h2>
                    <p>{ res.overview}</p>
                </div>
            </div>
        </RootLayout>
    )
}