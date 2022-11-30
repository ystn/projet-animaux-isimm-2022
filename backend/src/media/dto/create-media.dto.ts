import { MediaType } from "@prisma/client"

export class CreateMediaDto {
    order: number
    // path: string
    type: MediaType
    tags: string[]
}
