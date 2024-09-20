'use client';

import BackButton from '@/components/BackButton';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import { AuthServices } from '@/components/services/authServices';
import { LoginAccount } from '@/types/loginAccount';


const formSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: 'Email is required',
    })
    .email({
      message: 'Please enter a valid email',
    }),
  password: z.string().min(1, {
    message: 'Password is required',
  }),
});

const LoginForm = () => {
  const router = useRouter();
  const signIn = useSignIn();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data, "data");
    // router.push("/")
    if (data !== null) {
      AuthServices.loginUser(data)
        .then((res) => {
          console.log(res.data, "login res")
          localStorage.setItem("refreshToken", res.data.data.refreshToken);
          localStorage.setItem("accessToken", res.data.data.accessToken);
          localStorage.setItem("userId",res.data.data.userId);
          //login success
          if (
            signIn({
              auth: {
                // expiresIn: 3600,
                token: res.data.data.accessToken,
                type: "Bearer",
              },
              // refresh: res.data.refreshToken,
              userState: {
                accessToken: res.data?.data.accessToken,
                userId: res.data?.data.userId,
                refreshToken: res.data?.data.refreshToken,
              },
              // expiresIn: 3600,
            })
          ) {
            router.push("/");
            // Redirect or do-something
          } else {
            console.log("Đăng nhập thất bại!");
            //Throw error
          }
        })
        .catch((err) => {
          // setIsLoading(false);
          // console.log(isLoading);
          console.log(err);
        })
        .finally(() => {
          // setIsLoading(false);
        });
    }
  };


  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Log into your account with your credentials
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-2'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className='space-y-6'
          >
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-white'>
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      className='bg-slate-100 dark:bg-slate-500 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible: ring-offset-0'
                      placeholder='Enter Email'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-white'>
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type='password'
                      className='bg-slate-100 dark:bg-slate-500 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible: ring-offset-0'
                      placeholder='Enter Password'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className='w-full'>Sign In</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
