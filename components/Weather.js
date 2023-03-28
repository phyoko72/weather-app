import Image from "next/image"

const Weather = ({data}) => {
    return (
        <div className="p-3 min-h-[70vh] flex flex-col justify-between mt-10">
            <div className=" flex max-[300px]:flex-col justify-between items-center mb-4">
                <div className=" flex flex-col items-center">
                    <Image
                        src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                        alt={data.weather[0].main}
                        width={100}
                        height={100}
                    />
                    <p className=" text-xl">{data.weather[0].main}</p>
                </div>
                <p className="max-[320px]:text-6xl text-7xl font-semibold">
                    {data.main.temp.toFixed(0)}&#8451;
                </p>
            </div>
            <div className="  bg-black/50 p-2 md:p-6 rounded-lg">
                <p className=" max-[225px]:text-xl text-3xl font-semibold text-center my-5">
                    Weather in {data.name}, {data.sys.country}
                </p>
                <div className=" flex max-[300px]:flex-col gap-5 items-center justify-between w-full text-center p-2">
                    <div>
                        <p className=" text-2xl font-semibold">
                            {data.main.feels_like.toFixed(0)}&#8451;
                        </p>
                        <p className=" text-xl">Feels Like</p>
                    </div>
                    <div>
                        <p className=" text-2xl font-semibold">
                            {data.main.humidity}%
                        </p>
                        <p className=" text-xl">Humidity</p>
                    </div>
                    <div>
                        <p className=" text-2xl font-semibold">
                            {(data.wind.speed * 2.23).toFixed(0)} mph
                        </p>
                        <p className=" text-xl">Wind</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Weather
