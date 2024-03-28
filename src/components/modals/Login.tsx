'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { useContext } from 'react';
import { ModalContext } from '@/contexts/ModalContext';
const WarnIcon: React.FC<{ message: string }> = ({ message }) => {
  return <p className="flex flex-row items-center text-red-800">{message}</p>;
};
const Login = () => {
  const { closeModal } = useContext(ModalContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  type Inputs = {
    email: string;
    password: string;
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const res = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (res?.ok) closeModal('login');

      if (res?.error) throw new Error('아이디 또는 비밀번호가 잘못되었습니다.');
    } catch (err) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert('알 수 없는 에러!');
      }
    }
  };

  return (
    <div>
      <div>
        <p className="my-4">로그인</p>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <div className="mb-4 flex items-center">
            <input
              placeholder="이메일"
              type="이메일"
              {...register('email', {
                required: '이메일을 입력하세요',
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: '이메일 형식에 맞지 않습니다.',
                },
              })}
              className="rounded-lg p-2 w-full"
            />
          </div>
          <div className="mb-4 flex items-center">
            <input
              className="rounded-lg p-2 w-full"
              type="password"
              placeholder="비밀번호"
              {...register('password', {
                required: '비밀번호를 입력하세요',
              })}
            />
          </div>
          {errors.email?.message && <WarnIcon message={errors.email.message} />}
          {errors.password?.message && <WarnIcon message={errors.password.message} />}
          <button type="submit" className="bg-blue-500 text-white rounded-lg p-2 w-full hover:bg-blue-800 ease-in duration-100 my-5">
            로그인
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
