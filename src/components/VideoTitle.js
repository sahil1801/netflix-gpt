export const VideoTitle = ({title, overview}) => {
  return (
    <div className="w-screen aspect-video pt-[20%] px-20 absolute text-white bg-gradient-to-r from-black">
      <h1 className="font-bold text-4xl">{title}</h1>
      <p className="text-md w-1/4 py-6">{overview}</p>
      <div>
        <button className="bg-white text-black font-bold py-2 px-8 text-md rounded-md hover:bg-opacity-80"> ▶ Play</button>
        <button className="bg-gray-500 text-white py-2 px-5 mx-2  text-md bg-opacity-50 rounded-md hover:bg-opacity-70"> ℹ More Info</button>
      </div>

    </div>
  )
}


