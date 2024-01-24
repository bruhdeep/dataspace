import Link from "next/link";

export default function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[url('https://ewm.swiss/application/files/5716/0379/3279/social_media_.jpg')] bg-cover">
      <div className="w-full max-w-[90%] md:max-w-[60%] lg:max-w-[40%] xl:max-w-[30%] h-auto md:h-[80%] my-9 rounded-xl bg-white bg-opacity-75">
        <div className="w-[90%] md:w-[80%] lg:w-[90%] mx-auto h-full px-14 py-3 flex flex-col justify-between">
          <div className="h-[20%] my-10">
            <img
              src="/dataspacelogo.png"
              alt="dataspace"
              className="m-auto w-[65%] pt-5"
            />
          </div>
          <div className="h-[10%] mb-5">
            <p className="text-4xl font-extrabold">LOGIN</p>
          </div>
          <div className="h-[60%]">
            <form className="flex flex-col space-y-10">
              <div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  className="w-full h-20 px-7 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-xl"
                  required
                />
              </div>

              <div>
                <input
                  id="password"
                  name="password"
                  placeholder="Password"
                  className="w-full h-20 px-7 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-xl"
                  required
                />
                <div className="flex float-right">
                  <Link href="/">
                    <p className="text-[#6CA2F3] pt-2 mb-8">
                      Forgot Password?
                    </p>
                  </Link>
                </div>
              </div>

              <button
                type="submit"
                className="w-full h-20 text-2xl font-semibold bg-[#0D5077] text-white px-4 py-2 rounded-2xl hover:bg-blue-600 duration-200   focus:outline-none focus:bg-blue-600"
              >
                Login
              </button>
            </form>
          </div>
          <div className="mt-14 mb-5 h-[10%] text-center font-extrabold text-lg">
            Not registered yet?{" "}
            <Link href="/register">
              <span className="text-[#6CA2F3] cursor-pointer font-medium">
                Create an account
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
