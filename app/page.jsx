import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'
import RootLayout from "../app/layout";
import Movies from "../app/components/Movies";

const inter = Inter({ subsets: ['latin'] })

export default async function Home() {
    const data = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}`
    );

    const res = await data.json();

    return (
      <RootLayout>
        <main className={styles.main}>
            <h1>Main Page</h1>
            <div className="grid gap-16 grid-cols-fluid">
                {
                    res.results && res.results.length ?
                        res.results.map( (movie) => (
                            <Movies
                                key={movie.id}
                                id={movie.id}
                                title={movie.title}
                                release={movie.release_date}
                                poster={movie.poster_path}
                                overview={movie.overview}
                            />
                        ))
                        :
                        <p>No movies found....</p>
                }
            </div>
        </main>
      </RootLayout>
    )
}
