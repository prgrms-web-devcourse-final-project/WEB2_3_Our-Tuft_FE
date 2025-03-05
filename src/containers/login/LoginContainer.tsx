"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLoginStore } from "../../store/store";
import { defaultFetch } from "../../service/api/defaultFetch";

import googleIcon from "@/assets/icons/google.svg";
import kakaoIcon from "@/assets/icons/kakao.svg";

export default function LoginContainer() {
  const router = useRouter();
  const { login } = useLoginStore();

  // const handleSocialLogin = (provider: "google" | "kakao") => {
  //   window.location.href = `http://43.202.142.57:8080/oauth2/authorization/${provider}`;
  // };

  // // URL에 토큰이 있는지 확인
  // useEffect(() => {
  //   const urlParams = new URLSearchParams(window.location.hash.substring(1)); // #token=엑세스토큰값
  //   const token = urlParams.get("token");
  //   console.log("token", token);

  //   if (token) {
  //     sessionStorage.setItem("accessToken", token);
  //     router.push("/lobby");
  //   }
  // }, [router]);

  // // 임시 회원가입 로직
  // const registerUser = async () => {
  //   try {
  //     const response = await defaultFetch("/test/user", {
  //       method: "POST",
  //       body: JSON.stringify({
  //         providerId: "test12",
  //         name: "최영규",
  //         email: "test123@test.com",
  //       }),
  //     });

  //     console.log("회원가입 성공:", response);
  //   } catch (error) {
  //     console.error("회원가입 실패:", error);
  //   }
  // };

  // 임시 로그인 로직
  const loginUser = async () => {
    try {
      const response = await defaultFetch<{
        isSuccess: boolean;
        data: string;
        message: string;
      }>("/test/login", {
        method: "POST",
        body: JSON.stringify({
          socialId: "tester1",
        }),
      });

      if (response.isSuccess && response.data) {
        const token = response.data; // response.data에서 토큰을 추출

        // 로그인 후 토큰 저장
        login(token);
        console.log("토큰 저장 완료: ", token);
        router.push("/lobby");
      } else {
        console.error("로그인 실패: 토큰 없음", response.message);
      }
    } catch (error) {
      console.error("로그인 실패:", error);
    }
  };

  return (
    <div
      style={{ backgroundImage: "url('/assets/images/bg.png')" }}
      className="w-full min-h-screen flex items-center justify-center bg-center bg-cover bg-repeat"
    >
      {/* 로그인 박스 */}
      <div className="bg-[var(--color-second)]/90 max-w-[1000px] w-[80%] md:w-[60%] max-h-[700px] h-[66vh] flex flex-col items-center justify-center rounded-2xl overflow-auto">
        {/* 로고 위치 */}
        <div className="flex items-center justify-center my-[2vh] md:my-[4vh]">
          <svg
            className="w-full h-auto mx-auto"
            viewBox="0 0 200 60"
            xmlns="http://www.w3.org/2000/svg"
          >
            <text
              x="50%"
              y="45"
              className="fill-white font-bold stroke-white stroke-2 text-6xl"
              fontFamily="Arial, sans-serif"
              textAnchor="middle"
            >
              HiQ
            </text>
          </svg>
        </div>
        {/* 소셜 로그인 버튼 */}
        <div className="flex flex-col gap-4 md:gap-8 w-full max-w-[300px] px-4 pb-2 md:pb-4">
          <button
            className="relative w-full bg-white text-black py-3 rounded-lg flex items-center justify-center gap-2 shadow-md hover:bg-[#2A56C6] hover:text-white cursor-pointer"
            // onClick={() => handleSocialLogin("google")}
            onClick={loginUser}
          >
            <Image
              src={googleIcon}
              alt="Google"
              className="absolute w-6 h-6 left-4"
            />
            Google 로그인
          </button>
          <button
            className="relative w-full bg-yellow-400 text-black py-3 rounded-lg flex items-center justify-center gap-2 shadow-md hover:bg-[#F7E300] hover:text-white cursor-pointer"
            // onClick={() => handleSocialLogin("kakao")}
            onClick={loginUser}
          >
            <Image
              src={kakaoIcon}
              alt="Kakao"
              className="absolute w-6 h-6 left-4"
            />
            Kakao 로그인
          </button>
        </div>
      </div>
    </div>
  );
}
