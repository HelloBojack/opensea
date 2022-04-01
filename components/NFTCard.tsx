import type {
  AuctionListing,
  DirectListing,
  NFTMetadata,
} from '@thirdweb-dev/sdk'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { BiHeart } from 'react-icons/bi'

interface INFTCardProps {
  collectionId?:string
  nftItem?: NFTMetadata
  listings?: (AuctionListing | DirectListing)[]
  title?: string
}

const style = {
  wrapper: `bg-[#303339] flex-auto w-[14rem] h-[22rem] my-10 mx-5 rounded-2xl overflow-hidden cursor-pointer`,
  imgContainer: `h-2/3 w-full overflow-hidden flex justify-center items-center`,
  nftImg: `w-full object-cover`,
  details: `p-3`,
  info: `flex justify-between text-[#e4e8eb] drop-shadow-xl`,
  infoLeft: `flex-0.6 flex-wrap`,
  collectionName: `font-semibold text-sm text-[#8a939b]`,
  assetName: `font-bold text-lg mt-2`,
  infoRight: `flex-0.4 text-right`,
  priceTag: `font-semibold text-sm text-[#8a939b]`,
  priceValue: `flex items-center text-xl font-bold mt-2`,
  ethLogo: `h-5 mr-2`,
  likes: `text-[#8a939b] font-bold flex items-center w-full justify-end mt-3`,
  likeIcon: `text-xl mr-2`,
}

const NFTCard = ({ nftItem, title, listings, collectionId }: INFTCardProps) => {
  const router = useRouter()
  const [isListed, setIsListed] = useState(false)
  const [price, setPrice] = useState('0')

  useEffect(() => {
    if (!listings) return
    const listing = listings.find(
      (listing) => listing.asset.id.toString() === nftItem?.id.toString()
    )
    if (listing) {
      setIsListed(true)
      setPrice(listing.buyoutCurrencyValuePerToken.displayValue)
    }
  }, [listings, nftItem])

  return (
    <div
      className={style.wrapper}
      onClick={() => {
        router.push({
          pathname: `/nfts/${nftItem?.id}`,
          query: { isListed, collectionId },
        })
      }}
    >
      <div className={style.imgContainer}>
        <img
          className={style.nftImg}
          src={nftItem?.image}
          alt={nftItem?.name}
        />
      </div>
      <div className={style.details}>
        <div className={style.info}>
          <div className={style.infoLeft}>
            <div className={style.collectionName}>{title}</div>
            <div className={style.assetName}>{nftItem?.name}</div>
          </div>
          {isListed && (
            <div className={style.infoRight}>
              <div className={style.priceTag}>Pirce</div>
              <div className={style.priceValue}>
                <img
                  className={style.ethLogo}
                  src="https://openseauserdata.com/files/6f8e2979d428180222796ff4a33ab929.svg"
                  alt=""
                />
                {price}
              </div>
            </div>
          )}
        </div>
        <div className={style.likes}>
          <span className={style.likeIcon}>
            <BiHeart />
          </span>
          {nftItem?.likes}
        </div>
      </div>
    </div>
  )
}
export default NFTCard
