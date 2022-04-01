import Header from '../../components/Header'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import type {
  AuctionListing,
  DirectListing,
  NFTMetadata,
} from '@thirdweb-dev/sdk'
import { useMarketplace, useNFTCollection } from '@thirdweb-dev/react'
import NFTImage from '../../components/nft/NFTImage'
import GeneralDetail from '../../components/nft/GeneralDetail'
import ItemActivity from '../../components/nft/ItemActivity'
import Purchase from '../../components/nft/Purchase'
import { marketplaceAddress } from '../collections/[collectionId]'

const style = {
  wrapper: `flex flex-col items-center container-lg text-[#e5e8eb]`,
  container: `container p-6`,
  topContent: `flex`,
  nftImgContainer: `flex-1 mr-4`,
  detailsContainer: `flex-[2] ml-4`,
}

const NFT = () => {
  const router = useRouter()
  const { nftId, collectionId, isListed } = router.query

  const [listings, setListings] = useState<(AuctionListing | DirectListing)[]>()
  const [selectedNFT, setSelectedNFT] = useState<NFTMetadata>()
  const nftCollection = useNFTCollection(collectionId as string)
  const marketplace = useMarketplace(marketplaceAddress)

  // get all listings in collection
  useEffect(() => {
    if (marketplace) {
      ;(async () => {
        const listings = await marketplace.getAllListings()
        setListings(listings)
      })()
    }
  }, [marketplace])

  // get all nfts in collection & setSelectedNFT
  useEffect(() => {
    if (nftCollection) {
      ;(async () => {
        const nfts = await nftCollection.getAll()
        const selectedNFT = nfts.find(
          (nft) => nft.metadata.id.toString() === nftId
        )
        setSelectedNFT(selectedNFT?.metadata)
      })()
    }
  }, [nftCollection])

  return (
    <>
      <Header />
      <div className={style.wrapper}>
        <div className={style.container}>
          <div className={style.topContent}>
            <div className={style.nftImgContainer}>
              <NFTImage selectedNFT={selectedNFT} />
            </div>
            <div className={style.detailsContainer}>
              <GeneralDetail
                selectedNFT={selectedNFT}
                nftCollection={nftCollection}
              />
              <Purchase
                isListed={isListed as string}
                selectedNFT={selectedNFT}
                listings={listings}
                marketplace={marketplace}
              />
            </div>
          </div>
          <ItemActivity />
        </div>
      </div>
    </>
  )
}
export default NFT
