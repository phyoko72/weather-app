import Image from "next/image"
import spinner from "../public/loading.gif"
const Loading = () => {
    return (
        // <div className=" absolute top-0 right-0 bottom-0 left-0 bg-[#f1f2f3] flex justify-center items-center">
        //     <Image src={spinner} alt="spinner" />
        // </div>

        <div className=" h-[50vh] flex justify-center items-center">
            <Image src={spinner} alt="spinner" width={120} height={120} />
        </div>
    )
}

export default Loading
