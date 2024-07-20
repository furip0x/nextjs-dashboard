import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import RegisterPageContent from '@/components/auth/RegisterPageContent'

const Register = async () => {
  return <RegisterPageContent />
}

export default Register
