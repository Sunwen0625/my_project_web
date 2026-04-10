import axios from 'axios'

export interface UserProfile {
  name: string
  email: string
  phone: string
  idNumber: string
  address: string
  avatar: string
}

export async function getUserByEmail(email: string): Promise<UserProfile> {
  const { data } = await axios.get(`http://127.0.0.1:8000/users/by-email/${email}`)
  return data
}
