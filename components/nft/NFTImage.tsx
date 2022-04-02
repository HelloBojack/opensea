import type { NFTMetadata } from '@thirdweb-dev/sdk'
import { IoMdSnow } from 'react-icons/io'
import { AiOutlineHeart } from 'react-icons/ai'

interface INFTImageProps {
  selectedNFT?: NFTMetadata
}

const style = {
  topBar: `bg-[#303339] p-2 rounded-t-lg border-[#151c22] border`,
  topBarContent: `flex items-center`,
  likesCounter: `flex-1 flex items-center justify-end`,
}

const NFTImage = ({ selectedNFT }: INFTImageProps) => {
  return (
    <>
      <div className={style.topBar}>
        <div className={style.topBarContent}>
          <IoMdSnow />
          <div className={style.likesCounter}>
            <AiOutlineHeart />
          </div>
        </div>
      </div>
      <img className="w-full" src={selectedNFT?.image} alt="" />
    </>
  )
}
export default NFTImage
