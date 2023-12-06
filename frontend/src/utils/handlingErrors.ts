import toast from 'react-hot-toast'
import { CustomError } from './network/contract-config'

export const handleContractError = (error: Error, message: string) => {
  if (error instanceof CustomError) {
    toast.error(error.message || 'An error occurred.')
    return
  }
  toast.error(message)
}
