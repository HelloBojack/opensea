import { useEffect, useState } from 'react'
import { HiTag } from 'react-icons/hi'
import { IoMdWallet } from 'react-icons/io'
import toast, { Toaster } from 'react-hot-toast'
import type {
  AuctionListing,
  DirectListing,
  Marketplace,
  NFTMetadata,
} from '@thirdweb-dev/sdk'
import { useAddress } from '@thirdweb-dev/react'

interface IPurchaseProps {
  isListed?: string
  selectedNFT?: NFTMetadata
  listings?: (AuctionListing | DirectListing)[]
  marketplace?: Marketplace
}

const style = {
  wrapper: `flex h-20 w-full items-center rounded-lg border border-[#151c22] bg-[#303339] px-12`,
  button: `mr-8 flex items-center py-2 px-12 rounded-lg cursor-pointer`,
  buttonIcon: `text-xl`,
  buttonText: `ml-2 text-lg font-semibold`,
  buyButton: ` bg-[#2081e2] hover:bg-[#42a0ff]`,
  offerButton: ` border border-[#151c22]  bg-[#363840] hover:bg-[#4c505c]`,
  listButton: ` bg-[#2081e2] hover:bg-[#42a0ff]`,
}

const Purchase = ({
  isListed,
  selectedNFT,
  listings,
  marketplace,
}: IPurchaseProps) => {
  const address = useAddress()
  const [selectedMarketNFT, setSelectedMarketNFT] = useState<
    AuctionListing | DirectListing
  >()
  const [enableBtn, setEnableBtn] = useState(false)

  useEffect(() => {
    if (!listings || !isListed) return
    ;(async () => {
      const selectedMarketNFT = listings.find(
        (listing) => listing.asset.id.toString() === selectedNFT?.id.toString()
      )
      setSelectedMarketNFT(selectedMarketNFT)
    })()
  }, [isListed, selectedNFT, listings])

  useEffect(() => {
    if (!selectedMarketNFT || !selectedNFT) return
    setEnableBtn(true)
  }, [selectedNFT, selectedMarketNFT])

  const confirmPurchase = () =>
    toast.success(`Purchase successful!`, {
      style: {
        background: '#04111d',
        color: '#fff',
      },
    })
  const buyItem = async (
    listingId = selectedMarketNFT?.id,
    quantitiyDesired = 1
  ) => {
    console.log('buying')

    // console.log(marketplace?.direct.buyoutListing)
    console.log(address)

    let result = await marketplace?.direct.buyoutListing(
      listingId as string,
      quantitiyDesired
    )
    console.log(result)

    confirmPurchase()
  }

  return (
    <div className={style.wrapper}>
      <Toaster position="bottom-left" reverseOrder={false} />
      {isListed === 'true' ? (
        <>
          <div
            className={style.button + style.buyButton}
            onClick={() => (enableBtn ? buyItem(selectedMarketNFT?.id, 1) : '')}
          >
            <IoMdWallet className={style.buttonIcon} />
            <div className={style.buttonText}>Buy Now</div>
          </div>
          <div className={style.button + style.offerButton}>
            <HiTag className={style.buttonIcon} />
            <div className={style.buttonText}>Make Offer</div>
          </div>
        </>
      ) : (
        <div className={style.button + style.listButton}>
          <IoMdWallet className={style.buttonIcon} />
          <div className={style.buttonText}>List Item</div>
        </div>
      )}
    </div>
  )
}
export default Purchase
