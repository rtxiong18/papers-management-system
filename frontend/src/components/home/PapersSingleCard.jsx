import { Link } from "react-router-dom"
import { PiBookOpenTextLight } from 'react-icons/pi'
import { BiUserCircle, BiShow } from 'react-icons/bi'
import { AiOutlineEdit } from "react-icons/ai"
import { BsInfoCircle, BsFillMortarboardFill } from "react-icons/bs"
import { MdOutlineDelete } from "react-icons/md"
import { useState } from "react"
import PaperModal from "./PaperModal"

const PapersSingleCard = ({ paper }) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <div
            key={paper._id}
            className='border-2 border-gray-500 rounded-lg px-4 py-2 m-4 relative hover:shadow-x1'
        >
            <h2 className='absolute top-1 right-2 px-4 py-1 bg-red-300 rounded-lg'>
                {paper.publishYear}
            </h2>
            <h4 className='my-2 text-gray-500'>{paper._id}</h4>
            <div className="flex justify-start items-center gap-x-2">
                <PiBookOpenTextLight className="text-red-300 text-2x1" />
                <h2 className="my-1">{paper.title}</h2>
            </div>
            <div className="flex justify-start items-center gap-x-2">
                <BiUserCircle className="text-red-300 text-2x1" />
                <h2 className="my-1">{paper.author}</h2>
            </div>
            <div className="flex justify-start items-center gap-x-2">
                <BsFillMortarboardFill className="text-red-300 text-2x1" />
                <h2 className="my-1">{paper.journal}</h2>
            </div>
            <div className="flex justify-between items-center gap-x-2 mt-4 p-4">
                <BiShow
                    className="text-3x1 text-blue-800 hover:text-black cursor-pointer"
                    onClick={() => setShowModal(true)}
                />
                <Link to={`/papers/details/${paper._id}`}>
                    <BsInfoCircle className="text-2x1 text-green-800 hover:text-black" />
                </Link>
                <Link to={`/papers/edit/${paper._id}`}>
                    <AiOutlineEdit className="text-2x1 text-yellow-600 hover:text-black" />
                </Link>
                <Link to={`/papers/delete/${paper._id}`}>
                    <MdOutlineDelete className="text-2x1 text-red-600 hover:text-black" />
                </Link>

            </div>
            {
                showModal && 
                <PaperModal paper = {paper} onClose={() => setShowModal(false)}/>
            }
        </div>
    )
}

export default PapersSingleCard