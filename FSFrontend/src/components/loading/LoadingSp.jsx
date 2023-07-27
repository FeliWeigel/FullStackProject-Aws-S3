import Icon from "react-icons-kit"
import {spinner9} from 'react-icons-kit/icomoon/spinner9'
import "./LoadingSp.css"

// eslint-disable-next-line react/prop-types
export default function LoadingSp({size}) {
  return (
    <Icon className="loading-spin" icon={spinner9} size={size}></Icon>
  )
}