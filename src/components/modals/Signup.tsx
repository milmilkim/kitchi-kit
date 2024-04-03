'use client';

import { SubmitHandler, useForm, useFormContext, Controller } from 'react-hook-form';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { signup as signupAction } from '@/app/actions/signupAction';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { useFormState } from 'react-dom';
import { cls } from '@/utils/cls';

const WarnIcon: React.FC<{ message: string }> = ({ message }) => {
  return <p className="w-full my-1 text-red-800">{message}</p>;
};

interface SignupForm {
  email: string;
  password: string;
  nickname: string;
  profileImage: File;
}

const Signup = () => {
  const fileUploadRef = useRef<HTMLInputElement | null>(null);
  const [previewImage, setPreviewImage] = useState<string | ArrayBuffer | null>(null);
  const [state, formAction] = useFormState<any, FormData>(signupAction, null);

  const {
    register,
    // handleSubmit,
    formState: { errors, isValid },
    setValue,
    control,
    watch,
  } = useForm<SignupForm>();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Image = reader.result;
        setPreviewImage(base64Image);
        setValue('profileImage', acceptedFiles[0]);
      };
      reader.readAsDataURL(acceptedFiles[0]);
    },
    [setValue]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': [],
    },
  });

  const profileImage = watch('profileImage');
  const email = watch('email');

  return (
    <div>
      {profileImage && profileImage.name}
      <div className=" w-96">
        <p className="my-4">회원가입</p>
        <form action={signupAction} className="flex flex-col">
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
              type="text"
              placeholder="닉네임*"
              {...register('nickname', {
                required: '닉네임을 입력하세요',
              })}
            />
          </div>
          {errors.password?.message && <WarnIcon message={errors.password.message} />}

          {previewImage && (
            <div className="rounded-full my-4 cursor-pointer w-32 h-32" {...getRootProps()}>
              <Image src={previewImage as string} width={128} height={128} alt="Image" className="rounded-full object-cover w-full h-full" />
            </div>
          )}
          <Controller
            render={({ field }) => (
              <div {...getRootProps()} className={cls('mt-3 border rounded-lg p-2 flex items-center justify-center cursor-pointer h-24', profileImage ? 'hidden' : '')}>
                <input onChange={field.onChange} name="profileImage" />
                <p>프로필 이미지를 드래그 앤 드롭 하거나 여기를 클릭하여 업로드 하세요</p>
              </div>
            )}
            name="profileImage"
            control={control}
            rules={{ required: '프로필 이미지를 업로드하세요' }}
          />

          <div className="mt-4 flex gap-1">
            <Button disabled={!isValid} type="submit" label="회원가입" severity="info" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
