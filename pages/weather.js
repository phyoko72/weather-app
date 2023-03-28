import {useState} from "react"

const Weather = () => {
    const [city, setCity] = useState("")
    const [result, setResult] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (city.length < 1) {
            console.log("Input first")
            return
        }
        try {
            setIsError(false)
            setIsLoading(true)
            const res = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${process.env.NEXT_PUBLIC_WEATHER_API}`
            )
            const data = await res.json()
            console.log("data: ", data)

            if (data.cod !== 200) {
                throw new Error(data.message)
            }
            setResult(data)
            setIsLoading(false)
            console.log("result: ", result)
        } catch (error) {
            console.log("err: ", error)
            setIsLoading(false)
            setIsError(true)
        }
    }

    const handleChange = (e) => setCity(e.target.value)

    if (isLoading) return <h1>LOADING.....</h1>
    if (isError) return <h1>ERROR! {} </h1>

    return (
        <>
            <h1>Weather</h1>
            <form action="" onSubmit={handleSubmit}>
                <div className="flex">
                    <input
                        type="text"
                        name="city"
                        value={city}
                        onChange={handleChange}
                        placeholder="Name a city"
                        id=""
                    />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        />
                    </svg>
                </div>

                <br />
                <button>Search</button>
            </form>
        </>
    )
}

export default Weather
