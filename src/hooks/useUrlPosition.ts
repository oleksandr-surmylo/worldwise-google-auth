import { useSearchParams } from "react-router";

export function useUrlPosition() {
  const [ searchParams ] = useSearchParams()
  const lat = searchParams.get( 'lat' )
  const lng = searchParams.get( 'lng' )

  // console.log ('searchParams-lat', lat)
  // console.log ('searchParams-lng', lng)

  return [ lat, lng ]
}