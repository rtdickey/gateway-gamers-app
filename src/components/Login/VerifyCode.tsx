import { useState } from "react"

import logo from "assets/gateway-gamers-logo.png"
import Button from "components/Button"

interface VerifyCodeProps {
  handleVerifyCode: (value: string) => void
}

const VerifyCode: React.FC<VerifyCodeProps> = ({ handleVerifyCode }) => {
  const [code, setCode] = useState("")
  const handleOnClick = () => {
    handleVerifyCode(code)
  }

  return (
    <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
      <div className='mb-4'>
        <img src={logo} alt='Gateway Gamers' className={`w-20 m-auto`} />
      </div>
      <div className='mb-4'>
        <p>Please check your email for the access link.</p>
        <input
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          id='code'
          type='text'
          placeholder='OTP Code'
          onChange={e => setCode(e.target.value)}
        />
      </div>
      <div className='flex items-center justify-between'>
        <Button
          type='button'
          onClick={handleOnClick}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
        >
          Verify
        </Button>
      </div>
    </form>
  )
}

export default VerifyCode
