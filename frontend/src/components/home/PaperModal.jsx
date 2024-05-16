import { AiOutlineClose } from "react-icons/ai"
import { PiBookOpenTextLight, PiCalendarBlank, PiBook } from "react-icons/pi"
import { BiUserCircle } from "react-icons/bi"


const PaperModal = ({ paper, onClose }) => {
    return (
        <div className="fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center item-center"
            onClick={onClose}
        >
            <div
                onClick={(event) => event.stopPropagation()}
                className="w-[600px] max-w-full h-[400px] bg-white rounded-xl p-4 flex flex-col relative"

            >
                <AiOutlineClose
                    className="absolute right-6 top-6 text-3x1 text-red-600 cursor-pointer"
                    onClick={onClose}
                />
                <div className="flex justify-start items-center gap-x-2">
                    <PiBookOpenTextLight className="text-red-300 text-2x1" />
                    <h2 className="my-1">{paper.title}</h2>
                </div>
                <div className="flex justify-start items-center gap-x-2">
                    <PiCalendarBlank className="text-red-300 text-2x1" />
                    <h2 className="my-1">{paper.publishYear}</h2>
                </div>
                <div className="flex justify-start items-center gap-x-2">
                    <BiUserCircle className="text-red-300 text-2x1" />
                    <h2 className="my-1">{paper.author}</h2>
                </div>
                <div className="flex justify-start items-center gap-x-2">
                    <PiBook className="text-red-300 text-2x1" />
                    <h2 className="my-1">{paper.journal}</h2>
                </div>
                <img className='object-fill h-48 w-96' src= {`http://localhost:5555/uploads/${paper.paperImage}`} alt="the front page" />
                {/* <p className="my-2">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni quia
                    voluptatum sint. Nisi impedit libero eveniet cum vitae qui expedita
                    necessitatibus assumenda laboriosam, facilis iste cumque a pariatur
                    nesciunt cupiditate voluptas? Quis atque earum voluptate dolor nisi
                    dolorum est? Deserunt placeat cumque quo dicta architecto, dolore
                    vitae voluptate sequi repellat!
                </p> */}

            </div>

        </div>
    )
}

export default PaperModal