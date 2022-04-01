import Header from '../../components/Header'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import type { NFTMetadata } from '@thirdweb-dev/sdk'
import { useNFTCollection } from '@thirdweb-dev/react'
import NFTImage from '../../components/nft/NFTImage'
import GeneralDetail from '../../components/nft/GeneralDetail'
import ItemActivity from '../../components/nft/ItemActivity'

const style = {
  wrapper: `flex flex-col items-center container-lg text-[#e5e8eb]`,
  container: `container p-6`,
  topContent: `flex`,
  nftImgContainer: `flex-1 mr-4`,
  detailsContainer: `flex-[2] ml-4`,
}

const NFT = () => {
  const router = useRouter()
  const { nftId, collectionId } = router.query

  const [selectedNFT, setSelectedNFT] = useState<NFTMetadata>()
  const nftCollection = useNFTCollection(collectionId as string)

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
              <GeneralDetail selectedNFT={selectedNFT} nftCollection={nftCollection}/>
            </div>
          </div>
          <ItemActivity/>
        </div>
      </div>
    </>
  )
}
export default NFT
