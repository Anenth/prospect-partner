import { Form, Input, Button, notification } from 'antd';
import { supabase } from '../../service/SupabaseService';

const SignupPage = () => {
  const onFinish = async (values: any) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
      });

      if (error) {
        // Handle signup error
        notification.error({ message: 'Signup Error', description: error.message });
      } else {
        // Signup successful, do something with the user object
        console.log(data.user);
      }
    } catch (error) {
      notification.error({ message: 'Signup Error', description: error.message });
    }
  };

  const onGoogleSignup = async () => {
    try {
      const { data, error } = await supabase.auth.signIn({
        provider: 'google'
      });

      if (error) {
        // Handle signup error
        notification.error({ message: 'Signup Error', description: error.message });
      } else {
        // Signup successful, do something with the user object
        console.log(data.user);
      }
    } catch (error) {
      notification.error({ message: 'Signup Error', description: error.message });
    }
  };

  return (
    <Form onFinish={onFinish}>
      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: 'Please enter your email' },
          { type: 'email', message: 'Please enter a valid email' },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please enter your password' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Sign Up
        </Button>
      </Form.Item>

      <Form.Item>
        <Button type="default" onClick={onGoogleSignup}>
          Sign Up with Google
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SignupPage;
