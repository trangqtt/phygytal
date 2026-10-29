import {
  User,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import JWTDecode from 'jwt-decode';
import { ReactElement, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signUp } from '../../api/user';
import { signInGoogle } from '../../lib/auth';
import { login } from '../../state/userSlice';
import { translateErrorCode } from '../../utils/login';
import BackdropLoader from '../common/BackdropLoader';
import { Button } from '../common/shadcn-ui-kit/button';
import { Input } from '../common/shadcn-ui-kit/input';

export default function Login(): ReactElement {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const [loading, setLoading] = useState<boolean>(false);
  const [isSignUp, setIsSignUp] = useState<boolean>(false);

  const { mutate: signUpMutation } = useMutation((accessToken: string) => {
    return signUp(accessToken);
  });

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const onSubmit = async (data: any, event: any) => {
    event.preventDefault();
    setLoading(true);
    const auth = getAuth();

    if (!isSignUp) {
      signInWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
          const user = userCredential.user as User & { accessToken: string };
          const token = JWTDecode(user.accessToken) as any;

          if (
            token?.role &&
            (token?.role === 'ORG_ADMIN' || token?.role === 'SUPER_ADMIN')
          ) {
            dispatch(login(user));
            toast.info('Welcome to Phygital Admin Client');

            // eslint-disable-next-line no-undef
            navigate('/products');
          } else {
            toast.error('Only Admin can access!');
          }

          setLoading(false);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(translateErrorCode(errorCode));
          setLoading(false);
        });
    } else {
      createUserWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
          const user = userCredential.user as User & { accessToken: string };
          const token = JWTDecode(user.accessToken) as any;
          toast.info('Sign up successfully');

          if (
            token?.role &&
            (token?.role === 'ORG_ADMIN' || token?.role === 'SUPER_ADMIN')
          ) {
            dispatch(login(user));
            signUpMutation(user.accessToken);
            // localStorage.setItem(userInfoKey, user.accessToken);

            toast.info('Welcome to Fygito Admin Client');

            // eslint-disable-next-line no-undef
            navigate('/products');
          } else {
            toast.error('Contact our to get access role!');
          }

          setLoading(false);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(translateErrorCode(errorCode));
          setLoading(false);
        });
    }
  };

  const onSignInGmail = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await signInGoogle();

      if (response && !response.errorCode) {
        const token = JWTDecode(response.data.accessToken) as any;

        if (
          token?.role &&
          (token?.role === 'ORG_ADMIN' || token?.role === 'SUPER_ADMIN')
        ) {
          dispatch(login(response.data));
          navigate('/products');
        } else {
          toast.error('Only Admin can access!');
        }
      }
    } catch (error: any) {
      toast.error(translateErrorCode(error.code));
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <BackdropLoader open={loading} />
      <div className="w-[300px] h-fit bg-white rounded-xl shadow-2xl py-[20px] flex flex-col gap-[20px]">
        <div className="w-full h-fit text-center">
          <p className="font-bold text-[20px]">Nomion</p>
        </div>
        <div className="w-full h-fit flex flex-col justify-center items-center gap-[20px]">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full px-[18px] flex flex-col gap-[20px]"
          >
            <div className="w-full">
              <Controller
                control={control}
                name="email"
                rules={{ required: true }}
                render={({ field }) => (
                  <Input {...field} placeholder="Email" className="w-full" />
                )}
              />
              {errors?.email && <p className="text-red-500 italic">Email is required</p>}
            </div>
            <div className="w-full">
              <Controller
                control={control}
                name="password"
                rules={{ required: true }}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="password"
                    placeholder="Password"
                    className="w-full"
                  />
                )}
              />
              {errors?.password && (
                <p className="text-red-500 italic">Password is required</p>
              )}
            </div>
            <div className="w-full flex flex-col gap-[20px]">
              <Button type="submit" className='w-full'>
                <p className="font-bold text-[16px]">
                  {!isSignUp ? 'Sign in' : 'Sign up'}
                </p>
              </Button>
              <Button type='button' onClick={onSignInGmail} className='w-full'>
                <p className="font-bold text-[16px] mr-2">Sign in with GOOGLE </p>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
