import { useState } from 'react'
import { Form, Input, Button, message, Divider } from 'antd'
import { supabase } from '../../service/SupabaseService'
import APP_ROUTES from '../../service/AppRoutes'
import { Link } from 'react-router-dom'

const LoginPage = () => {
  const [loading, setLoading] = useState(false)

  const handleLogin = async (values: any) => {
    setLoading(true)
    const { email, password } = values

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password })

      if (error) {
        throw new Error(error.message)
      }

      message.success('Logged in successfully!')
    } catch (error) {
      message.error((error as {message: string}).message)
    } finally {
      setLoading(false)
    }
  }


  const handleLoginWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google',
    options: {
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
     })

    if (error) {
      message.error((error as {message: string}).message)
    }
  }

  return (
    <div>
      <Form onFinish={handleLogin}>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please enter your email!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please enter your password!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Login
          </Button>
        </Form.Item>
      </Form>
      <Form.Item>
        <Button type="default" onClick={handleLoginWithGoogle}>
          Login with Google
        </Button>
      </Form.Item>
      <Divider />
      <Link to={APP_ROUTES.SIGNUP}>Sign Up</Link>
    </div>
  )
}

export default LoginPage
