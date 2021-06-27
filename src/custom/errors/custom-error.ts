export class CustomError extends Error {
     code?: string
     statusCode?: number
     data?: object

     constructor(
          message: string,
          code: string,
          statusCode: number = 500,
          data: object
     ) {
          super(message)

          this.name = "CustomError"
          this.message = message
          this.code = code
          this.statusCode = statusCode
          this.data = data
     }
}

export default CustomError
