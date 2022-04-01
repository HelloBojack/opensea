import type { NFTCollection, NFTMetadata } from "@thirdweb-dev/sdk"
import { AiFillHeart } from 'react-icons/ai'
import { MdRefresh } from 'react-icons/md'
import { RiShareBoxLine } from 'react-icons/ri'
import { FiMoreVertical } from 'react-icons/fi'
import { GiShare } from 'react-icons/gi'
import { useEffect } from "react"
import type { BigNumber } from "ethers"

interface IGeneralDetailProps {
  selectedNFT?: NFTMetadata
  nftCollection?: NFTCollection
}

const style = {
  wrapper: `flex`,
  infoContainer: `h-36 flex flex-col flex-1 justify-between mb-6`,
  accent: `text-[#2081e2]`,
  nftTitle: `text-3xl font-extrabold`,
  otherInfo: `flex`,
  ownedBy: `text-[#8a939b] mr-4`,
  likes: `flex items-center text-[#8a939b]`,
  likeIcon: `mr-1`,
  actionButtonsContainer: `w-44`,
  actionButtons: `flex container justify-between text-[1.4rem] border-2 rounded-lg`,
  actionButton: `my-2`,
  divider: `border-r-2`,
}

const GeneralDetail = ({ selectedNFT, nftCollection }: IGeneralDetailProps) => {

  useEffect(() => {
    if (!nftCollection) return
      ; (async () => {
        // let result = await nftCollection.ownerOf(selectedNFT?.id as BigNumber)
        // console.log(result);
        
      })()
  }, [nftCollection])

  return (
    <div className={style.wrapper}>
      <div className={style.infoContainer}>
        <div className={style.accent}>Board Bojack Club</div>
        <div className={style.nftTitle}>{selectedNFT?.name}</div>
        <div className={style.otherInfo}>
          <div className={style.ownedBy}>
            Owned By <span></span>
          </div>
          <div className={style.likes}>
            <AiFillHeart className={style.likeIcon} /> 2.3K favorites
          </div>
        </div>
      </div>
      <div className={style.actionButtonsContainer}>
        <div className={style.actionButtons}>
          <div className={style.actionButton + ' ml-2'}>
            <MdRefresh />
          </div>
          <div className={style.divider}></div>
          <div className={style.actionButton}>
            <RiShareBoxLine />
          </div>
          <div className={style.divider}></div>
          <div className={style.actionButton}>
            <GiShare />
          </div>
          <div className={style.divider}></div>
          <div className={style.actionButton + ' mr-2'}>
            <FiMoreVertical />
          </div>
        </div>
      </div>
    </div>
  )
}
export default GeneralDetail
