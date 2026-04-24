// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export default function  Button({text, onClick}){
    return (
        <button
            className={"border border-gray-200/15 rounded-lg h-8 px-2 hover:bg-blue-300 hover:text-black cursor-pointer transition delay-150 duration-150 ease-in-out"}
            onClick={onClick}
        >
            {text}
        </button>
    )
}

