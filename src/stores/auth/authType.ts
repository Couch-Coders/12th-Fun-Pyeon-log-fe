export interface UserType {
  token: string
  email: string
  displayName: string
  imgUrl: string
}

export interface UserStateType {
  user: UserType | null
  loading: boolean
  error: string
}
