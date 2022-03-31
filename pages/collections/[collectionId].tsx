import { useRouter } from 'next/router'

const Collection = () => {
  const router = useRouter()
  const { collectionId } = router.query
  return <>{collectionId}</>
}
export default Collection
