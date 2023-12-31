import axios from "axios";
import React, { useEffect, useState } from "react";
import { GET_USER } from "../../API/User/GetUser.js";
import { useNavigate } from "react-router-dom";
import { REGISTER_MOTEL } from "../../API/Motels/RegisterMotel.js";
import { ToastContainer, toast } from "react-toastify";

function MotelPage({ user, props }) {
  const navigation = useNavigate();
  const [motelName, setmotelName] = useState();
  //   console.log(user);
  const [data, setData] = useState();
  const CallAPI = async () => {
    try {
      const result = await GET_USER(user.token);
      console.log(result.data.data);
      setData(result.data.data);
      if (!data?.Motel) {
        localStorage.setItem("isConvert", JSON.stringify(data?.Motel));
      } else {
        navigation("/room");
      }
    } catch (error) {}
  };
  const handlerSubmit = async () => {
    try {
      console.log(user);
      const result = await REGISTER_MOTEL(user?.token, motelName);
      // CallAPI();
      console.log(result?.data.data);
      if (result) {
        // localStorage.setItem("user", JSON.stringify(result?.data.data));
        // props.setUser(JSON.stringify(result?.data.data));
        // window.location.reload();
        localStorage.setItem("user", JSON.stringify(result.data.data));
        toast.success("Đăng ký thành công");
        setTimeout(() => {
          window.location = "/room";
        }, 2000);
      } else {
      }
    } catch (error) {}
  };
  // useEffect(() => {
  //   CallAPI();
  // }, [data]);
  return (
    <div>
      {/* <ToastContainer /> */}

      <div className="">
        {!data?.Motel ? (
          <>
            <section class=" bg-cover  w-full">
              <div class="flex h-full w-full items-center justify-center container mx-auto px-8">
                <div class=" text-center">
                  <h1 class="mt-10 text-2xl sm:text-5xl capitalize tracking-widest text-black lg:text-5xl">
                    Đăng Ký Quản Lý Trọ Của Bạn
                  </h1>

                  <p class="mt-6 lg:text-lg text-white">
                    Nhập Tên Trọ Của Bạn Vào Đây
                  </p>

                  <div class="mt-4 flex flex-col space-y-3 sm:-mx-2 sm:flex-row sm:justify-center sm:space-y-0">
                    <input
                      id="email"
                      type="text"
                      class="rounded-md border border-transparent bg-black/20 px-4 py-2 text-black placeholder-black backdrop-blur-sm focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 sm:mx-2"
                      placeholder="Nhập Tên Trọ"
                      value={motelName}
                      onChange={(e) => setmotelName(e.target.value)}
                    />

                    <button
                      onClick={handlerSubmit}
                      class="transform rounded-md bg-blue-700 px-8 py-2 text-sm font-medium capitalize tracking-wide text-white transition-colors duration-200 hover:bg-blue-600 focus:bg-blue-600 focus:outline-none sm:mx-2"
                    >
                      Đăng Ký
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </>
        ) : (
          <>Da la chu ro</>
        )}
      </div>
    </div>
  );
}

export default MotelPage;
