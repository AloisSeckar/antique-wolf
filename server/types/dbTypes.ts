export type WolfFile = {
  name: string,
  type: string,
  file?: File,
  base64File?: string,
}

export type WolfItem = {
  id?: number,
  description: string,
  price: number,
  image: string,
  dbImage?: string,
  imageFile?: WolfFile[],
  created: Date,
  edited: Date,
  author: string,
  valid: boolean
}

export type WolfItemDB = Omit<WolfItem, 'id'>
