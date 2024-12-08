import { RiExchangeBoxFill } from "react-icons/ri";
import { useData } from "../../../../context/DataContext";

const YouTubeFrame = ({ videoID }) => {
    const { isFullScreen } = useData();
    return (
        videoID && (
            <div className={`${isFullScreen ? 'h-[45vh] pt-1' : 'h-[43vh]'} relative`}>
                <iframe
                    className="w-full h-full mb-2 rounded-md shadow-lg"
                    src={`https://www.youtube.com/embed/${videoID}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            </div>
        )
    )
};

export default YouTubeFrame;