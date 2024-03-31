'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { useCallback, useContext, useRef, useState } from 'react';
import { ModalContext } from '@/contexts/ModalContext';
import { Button } from 'primereact/button';
import { signup as signupAction } from '@/app/actions/signupAction';
import { FileUpload } from 'primereact/fileupload';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';

const WarnIcon: React.FC<{ message: string }> = ({ message }) => {
  return <p className="w-full my-1 text-red-800">{message}</p>;
};

interface SignupForm {
  email: string;
  password: string;
  nickname: string;
}

const Signup = () => {
  const { closeModal, openModal } = useContext(ModalContext);
  const fileUploadRef = useRef<HTMLInputElement | null>(null);
  const [previewImage, setPreviewImage] = useState<string | ArrayBuffer | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64Image = reader.result;
      setPreviewImage(base64Image);
    };
    reader.readAsDataURL(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': [],
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupForm>();

  const onSubmit: SubmitHandler<SignupForm> = async (data) => {
    try {
      signupAction();
      closeModal('signup');
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
      <div className=" w-96">
        <p className="my-4">회원가입</p>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <div className="flex items-center">
            <input
              placeholder="이메일*"
              type="이메일"
              {...register('email', {
                required: '이메일을 입력하세요',
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: '이메일 형식에 맞지 않습니다.',
                },
              })}
              autoComplete="kitch-email"
              className="rounded-lg p-2 w-full border"
            />
          </div>
          {errors.email?.message && <WarnIcon message={errors.email.message} />}

          <div className="flex items-center">
            <input
              className="rounded-lg p-2 w-full border mt-3"
              type="password"
              autoComplete="kitch-password"
              placeholder="비밀번호*"
              {...register('password', {
                required: '비밀번호를 입력하세요',
              })}
            />
          </div>
          {errors.password?.message && <WarnIcon message={errors.password.message} />}

          <div className="flex items-center">
            <input
              className="rounded-lg p-2 w-full border mt-3"
              type="password"
              placeholder="닉네임*"
              {...register('nickname', {
                required: '닉네임을 입력하세요',
              })}
            />
          </div>
          {errors.password?.message && <WarnIcon message={errors.password.message} />}

          {previewImage ? (
            <div className="rounded-full my-4 cursor-pointer" {...getRootProps()}>
              <Image src={previewImage as string} alt="Image" width="250" height="250" className="rounded-full" />
            </div>
          ) : (
            <div {...getRootProps()} className="mt-3 border rounded-lg p-2 flex items-center justify-center cursor-pointer h-24">
              <input {...getInputProps()} />
              <p>프로필 이미지를 드래그 앤 드롭 하거나 클릭하세요</p>
            </div>
          )}
        </form>
        <div className="mt-4 flex gap-1">
          <Button type="submit" label="회원가입" severity="info" />
        </div>
      </div>
    </div>
  );
};

export default Signup;
