export interface UserType {
  token: string
  email: string
  displayName: string
  imgUrl: string
}

export interface UserStateType {
  user: UserType | null
  userPostion: { lat: number; lng: number } | null
  loading: boolean
  error: string
}
