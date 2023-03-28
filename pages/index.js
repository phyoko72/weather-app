import Head from "next/head"
import Image from "next/image"
import {useState} from "react"
import mountain from "../public/view.jpg"
import Loading from "@/components/Loading"
import Error from "@/components/Error"
import Weather from "@/components/Weather"
import CityNotFound from "@/components/CityNotFound"

export default function Home({data}) {
    const [city, setCity] = useState("")
    const [result, setResult] = useState(data)
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(data ? false : true)
    const [isNotFound, setIsNotFound] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (city.length < 1) {
            return
        }
        try {
            setIsError(false)
            setIsNotFound(false)
            setIsLoading(true)
            setResult(null)
            const res = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_API}`
            )
            const data = await res.json()

            setCity("")
            setIsLoading(false)

            if (data.cod == 200) {
                setResult(data)
            } else if (data.cod == 404) {
                setIsNotFound(true)
            } else {
                throw new Error(data.message)
            }
        } catch (error) {
            setCity("")
            setIsLoading(false)
            setIsError(true)
        }
    }

    const handleChange = (e) => setCity(e.target.value)

    return (
        <>
            <Head>
                <title>Weather App</title>
                <meta
                    name="description"
                    content="Check your city's weather in this app"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/weather-icon.webp" />
            </Head>
            <main className=" relative min-h-screen pt-10 select-none">
                <div className=" absolute top-0 right-0 bottom-0 left-0 bg-black/40 z-10"></div>
                <Image
                    src={mountain}
                    alt="mountain"
                    fill
                    priority
                    style={{objectFit: "cover"}}
                />

                <div className=" relative max-w-screen-sm m-auto text-white z-20 max-sm:p-2 ">
                    <form
                        className="border-[1px] border-white rounded-xl p-2 w-full "
                        onSubmit={handleSubmit}
                    >
                        <div className="flex gap-x-2">
                            <input
                                type="text"
                                name="city"
                                value={city}
                                onChange={handleChange}
                                placeholder="Search City"
                                id="city"
                                className=" w-full bg-transparent text-xl py-1 px-2 rounded outline-none"
                            />
                            <button disabled={city.length < 1}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-7 h-7"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                                    />
                                </svg>
                            </button>
                        </div>
                    </form>

                    {isError && <Error />}

                    {isNotFound && <CityNotFound />}

                    {isLoading && <Loading />}

                    {result && <Weather data={result} />}
                </div>
            </main>
        </>
    )
}

export async function getServerSideProps() {
    try {
        const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=yangon&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_API}`
        )
        const data = await res.json()

        if (data.cod !== 200) {
            throw new Error("Error")
        }
        return {
            props: {
                data,
            },
        }
    } catch (error) {
        return {
            props: {
                data: null,
            },
        }
    }
}
