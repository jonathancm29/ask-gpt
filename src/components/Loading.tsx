import { LoadingIcon } from './Icons'

export default function Loading({ show = false }) {
  return <>{show && <LoadingIcon show={show} />}</>
}
