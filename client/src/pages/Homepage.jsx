import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/Button";
import { useAuth } from "../context/authentication";

export default function Home() {
  const { state } = useAuth();

  return (
    <>
      {state ? <Navbar auth /> : <Navbar unauth />}
      <section className="bg-bg h-[47.375rem] flex justify-center items-center gap-[3.25rem]">
        <div className="relative top-[9.5rem]">
          <div className="bg-red-700 w-[9.5625rem] h-[2.5625rem] pl-3 rounded-l-3xl rounded-tr-3xl text-body5 font-semibold flex justify-center items-center absolute top-[4.87rem] right-44 text-white">
            Nice to meet you too!
            <svg
              className="fill-purple-100 -rotate-[30deg] absolute top-2 left-3"
              width="10"
              height="10"
              viewBox="0 0 26 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                id="Vector"
                d="M12.5267 23.8807L12.5173 23.8767L12.488 23.8607C12.3164 23.7663 12.1461 23.6694 11.9773 23.57C9.94775 22.364 8.05103 20.9472 6.31867 19.3433C3.25067 16.4805 0 12.2324 0 7.00027C0 3.09617 3.28533 9.46041e-05 7.25067 9.46041e-05C8.353 -0.00530477 9.44238 0.237888 10.4378 0.711587C11.4331 1.18528 12.3089 1.8773 13 2.73616C13.6912 1.87712 14.5672 1.185 15.5628 0.711296C16.5585 0.237591 17.6481 -0.00550555 18.7507 9.46041e-05C22.7147 9.46041e-05 26 3.09617 26 7.00027C26 12.2337 22.7493 16.4818 19.6813 19.3419C17.949 20.9459 16.0523 22.3627 14.0227 23.5687C13.8539 23.6685 13.6836 23.7658 13.512 23.8607L13.4827 23.8767L13.4733 23.882L13.4693 23.8834C13.3247 23.96 13.1636 24 13 24C12.8364 24 12.6753 23.96 12.5307 23.8834L12.5267 23.882V23.8807Z"
              />
            </svg>
          </div>
          <img src="images/hero1.png" alt="" />
        </div>
        <div className="flex flex-col justify-center items-center w-[22.375rem]">
          <h1 className="text-headline1 text-white text-center ">
            Make the <br /> first ‘Merry’
          </h1>
          <p className="mt-6 text-body1 text-white text-center">
            If you feel lonely, let’s start meeting <br /> new people in your
            area!
            <br /> Don’t forget to get Merry with us
          </p>
          {state ? (
            <Button
              primary
              className="mt-[3.75rem]"
              onClick={() => (window.location.href = "/matching")}
            >
              Start matching!
            </Button>
          ) : (
            <Button
              primary
              className="mt-[3.75rem]"
              onClick={() => (window.location.href = "/login")}
            >
              Start matching!
            </Button>
          )}
        </div>
        <div className="relative bottom-60">
          <div className="bg-red-700 w-[9.25rem] sha h-[2.56rem] rounded-r-3xl rounded-tl-3xl text-body5 font-semibold flex justify-center items-center absolute bottom-[3.81rem] left-[11.31rem] text-white">
            Hi! Nice to meet you
          </div>
          <img src="images/hero2.png" alt="" />
        </div>
        <div className="absolute">
          <svg
            className="absolute fill-purple-800 -top-[17rem] right-[43rem]"
            width="58"
            height="67"
            viewBox="0 0 60 60"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle id="Ellipse 2" cx="30" cy="30" r="30" />
          </svg>
          <svg
            className="absolute fill-red-300 -top-[19rem] right-[38rem]"
            width="7"
            height="7"
            viewBox="0 0 60 60"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle id="Ellipse 2" cx="30" cy="30" r="30" />
          </svg>
          <svg
            className="absolute fill-beige-700 top-48 left-[32rem]"
            width="8"
            height="8"
            viewBox="0 0 60 60"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle id="Ellipse 2" cx="30" cy="30" r="30" />
          </svg>
          <svg
            className="absolute fill-red-800 top-20 left-[37rem]"
            width="60"
            height="60"
            viewBox="0 0 60 60"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle id="Ellipse 2" cx="30" cy="30" r="30" />
          </svg>
          <svg
            className="absolute fill-purple-700 -top-[16rem] left-36"
            width="26"
            height="24"
            viewBox="0 0 26 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              id="Vector"
              d="M12.5267 23.8807L12.5173 23.8767L12.488 23.8607C12.3164 23.7663 12.1461 23.6694 11.9773 23.57C9.94775 22.364 8.05103 20.9472 6.31867 19.3433C3.25067 16.4805 0 12.2324 0 7.00027C0 3.09617 3.28533 9.46041e-05 7.25067 9.46041e-05C8.353 -0.00530477 9.44238 0.237888 10.4378 0.711587C11.4331 1.18528 12.3089 1.8773 13 2.73616C13.6912 1.87712 14.5672 1.185 15.5628 0.711296C16.5585 0.237591 17.6481 -0.00550555 18.7507 9.46041e-05C22.7147 9.46041e-05 26 3.09617 26 7.00027C26 12.2337 22.7493 16.4818 19.6813 19.3419C17.949 20.9459 16.0523 22.3627 14.0227 23.5687C13.8539 23.6685 13.6836 23.7658 13.512 23.8607L13.4827 23.8767L13.4733 23.882L13.4693 23.8834C13.3247 23.96 13.1636 24 13 24C12.8364 24 12.6753 23.96 12.5307 23.8834L12.5267 23.882V23.8807Z"
            />
          </svg>
          <img
            src="images/emoji5.png"
            className="relative top-28 left-[36.5rem]"
            alt=""
          />
        </div>
      </section>
      <section
        id="why-merry-match"
        className="bg-bg h-[33.3125rem] px-40 pt-[6.56rem] gap-6 pb-20 flex justify-center items-center"
      >
        <div className="w-[34.3125rem] flex flex-col gap-10">
          <h2 className="text-headline2 text-purple-300">Why Merry Match?</h2>
          <div>
            <p className="text-body1 text-white">
              Merry Match is a new generation of online dating website for
              everyone
            </p>
            <br />
            <p className="text-body2 text-gray-100">
              Whether you’re committed to dating, meeting new people, expanding
              your social network, meeting locals while traveling, or even just
              making a small chat with strangers.
              <br /> <br />
              This site allows you to make your own dating profile, discover new
              people, save favorite profiles, and let them know that you’re
              interested
            </p>
          </div>
        </div>
        <div className="relative w-[34.125rem] pl-12">
          <div className="bg-purple-600 w-[14.82706rem] h-[6.21594rem] rounded-[1.82488rem] absolute bottom-20 right-48 z-20">
            <div className="flex gap-3 absolute left-6 top-5">
              <img src="images/Send.svg" alt="" />
              <span className="text-white text-[1.36863rem] font-bold leading-8">
                Fast
              </span>
            </div>
            <img
              src="images/big-send.svg"
              className="absolute bottom-[0.7rem] left-32"
              alt=""
            />
          </div>
          <div className="bg-purple-300 w-[24.875rem] h-[6.8125rem] rounded-[1.82488rem] absolute bottom-[-1rem] z-10">
            <div className="flex gap-3 absolute right-8 top-8">
              <img src="images/Shield-Done.svg" alt="" />
              <span className="text-purple-600 text-[1.36863rem] font-bold leading-9">
                Secure
              </span>
            </div>
            <img
              src="images/Shield.svg"
              className="absolute top-4 left-6"
              alt=""
            />
          </div>
          <div className="bg-purple-200 w-[20.52975rem] h-[9.12431rem] rounded-[1.82488rem] absolute right-0 z-20">
            <div className="flex gap-3 absolute bottom-6 left-8">
              <img src="images/Star.svg" alt="" />
              <span className="text-red-500 text-[1.36863rem] font-bold leading-9">
                Easy
              </span>
            </div>
            <img
              src="images/big-star.svg"
              className="absolute top-[-0.05rem] right-0"
              alt=""
            />
          </div>
          <div>
            <img
              src="images/whymatch1.png"
              className="absolute z-0 bottom-[4.75rem] right-[4.5rem]"
              alt=""
            />
            <img
              src="images/whymatch2.png"
              className="absolute top-20 left-[5.5rem]"
              alt=""
            />
            <svg
              className="absolute fill-purple-400 top-32 left-14"
              width="7"
              height="8"
              viewBox="0 0 60 60"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle id="Ellipse 2" cx="30" cy="30" r="30" />
            </svg>
            <svg
              className="absolute fill-beige-800 bottom-[9.5rem] right-8"
              width="9"
              height="9"
              viewBox="0 0 60 60"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle id="Ellipse 2" cx="30" cy="30" r="30" />
            </svg>
          </div>
        </div>
      </section>
      <section
        id="how-to-merry"
        className="bg-bg px-40 pt-20 pb-[5.5rem] flex flex-col gap-12 justify-center items-center"
      >
        <div className="text-purple-300 text-headline2">How to Merry</div>
        <div className="flex gap-6">
          <div className="bg-purple-900 p-8 w-[16.375rem] h-[21.75rem] rounded-[2.5rem] flex flex-col justify-center items-center gap-10">
            <div className="w-[7.5rem] h-[7.5rem] bg-purple-800 rounded-[6.1875rem] flex justify-center items-center">
              <img src="images/emoji1.png" alt="" />
            </div>
            <div className="flex flex-col text-center gap-3">
              <div className="text-white text-headline4">
                Upload your cool picture
              </div>
              <div className="text-gray-500 text-body2">
                Lorem ipsum is a placeholder text
              </div>
            </div>
          </div>
          <div className="bg-purple-900 p-8 w-[16.375rem] h-[21.75rem] rounded-[2.5rem] flex flex-col justify-center items-center gap-10">
            <div className="w-[7.5rem] h-[7.5rem] bg-purple-800 rounded-[6.1875rem] flex justify-center items-center">
              <img src="images/emoji2.png" alt="" />
            </div>
            <div className="flex flex-col text-center gap-3">
              <div className="text-white text-headline4">
                Explore and find the one you like
              </div>
              <div className="text-gray-500 text-body2">
                Lorem ipsum is a placeholder text
              </div>
            </div>
          </div>
          <div className="bg-purple-900 p-8 w-[16.375rem] h-[21.75rem] rounded-[2.5rem] flex flex-col justify-center items-center gap-10">
            <div className="w-[7.5rem] h-[7.5rem] bg-purple-800 rounded-[6.1875rem] flex justify-center items-center">
              <img src="images/emoji3.png" alt="" />
            </div>
            <div className="flex flex-col text-center gap-3">
              <div className="text-white text-headline4">
                Click ‘Merry’ for get to know!
              </div>
              <div className="text-gray-500 text-body2">
                Lorem ipsum is a placeholder text
              </div>
            </div>
          </div>
          <div className="bg-purple-900 p-8 w-[16.375rem] h-[21.75rem] rounded-[2.5rem] flex flex-col justify-center items-center gap-10">
            <div className="w-[7.5rem] h-[7.5rem] bg-purple-800 rounded-[6.1875rem] flex justify-center items-center">
              <img src="images/emoji4.png" alt="" />
            </div>
            <div className="flex flex-col text-center gap-3">
              <div className="text-white text-headline4">
                Start chating and relationship
              </div>
              <div className="text-gray-500 text-body2">
                Lorem ipsum is a placeholder text
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-bg flex align-middle justify-center pt-20 pb-[7.56rem] px-40 ">
        <div className="h-96 w-[70rem] bg-gradient-to-l from-[#A95BCD] to-[#820025] to-65% rounded-[2rem] px-[16.63rem] mt-[5.19rem] flex flex-col justify-center items-center relative overflow-hidden">
          <div className="text-white text-headline2 text-center">
            Let’s start finding <br />
            and matching someone new
          </div>
          {state ? (
            <Button
              secondary
              className="mt-[3.75rem]"
              onClick={() => (window.location.href = "/matching")}
            >
              Start matching!
            </Button>
          ) : (
            <Button
              secondary
              className="mt-[3.75rem]"
              onClick={() => (window.location.href = "/login")}
            >
              Start matching!
            </Button>
          )}

          <div>
            <svg
              className="fill-purple-300 -rotate-[9.526deg] opacity-50 absolute bottom-32 right-14"
              width="25"
              height="24"
              viewBox="0 0 26 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                id="Vector"
                d="M12.5267 23.8807L12.5173 23.8767L12.488 23.8607C12.3164 23.7663 12.1461 23.6694 11.9773 23.57C9.94775 22.364 8.05103 20.9472 6.31867 19.3433C3.25067 16.4805 0 12.2324 0 7.00027C0 3.09617 3.28533 9.46041e-05 7.25067 9.46041e-05C8.353 -0.00530477 9.44238 0.237888 10.4378 0.711587C11.4331 1.18528 12.3089 1.8773 13 2.73616C13.6912 1.87712 14.5672 1.185 15.5628 0.711296C16.5585 0.237591 17.6481 -0.00550555 18.7507 9.46041e-05C22.7147 9.46041e-05 26 3.09617 26 7.00027C26 12.2337 22.7493 16.4818 19.6813 19.3419C17.949 20.9459 16.0523 22.3627 14.0227 23.5687C13.8539 23.6685 13.6836 23.7658 13.512 23.8607L13.4827 23.8767L13.4733 23.882L13.4693 23.8834C13.3247 23.96 13.1636 24 13 24C12.8364 24 12.6753 23.96 12.5307 23.8834L12.5267 23.882V23.8807Z"
              />
            </svg>
            <svg
              className="fill-purple-300 rotate-[15deg] opacity-50 absolute bottom-8 -right-1"
              width="67"
              height="74"
              viewBox="0 0 26 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                id="Vector"
                d="M12.5267 23.8807L12.5173 23.8767L12.488 23.8607C12.3164 23.7663 12.1461 23.6694 11.9773 23.57C9.94775 22.364 8.05103 20.9472 6.31867 19.3433C3.25067 16.4805 0 12.2324 0 7.00027C0 3.09617 3.28533 9.46041e-05 7.25067 9.46041e-05C8.353 -0.00530477 9.44238 0.237888 10.4378 0.711587C11.4331 1.18528 12.3089 1.8773 13 2.73616C13.6912 1.87712 14.5672 1.185 15.5628 0.711296C16.5585 0.237591 17.6481 -0.00550555 18.7507 9.46041e-05C22.7147 9.46041e-05 26 3.09617 26 7.00027C26 12.2337 22.7493 16.4818 19.6813 19.3419C17.949 20.9459 16.0523 22.3627 14.0227 23.5687C13.8539 23.6685 13.6836 23.7658 13.512 23.8607L13.4827 23.8767L13.4733 23.882L13.4693 23.8834C13.3247 23.96 13.1636 24 13 24C12.8364 24 12.6753 23.96 12.5307 23.8834L12.5267 23.882V23.8807Z"
              />
            </svg>
            <svg
              className="fill-red-300 -rotate-[15deg] opacity-30 absolute top-8 -left-2"
              width="129"
              height="147"
              viewBox="0 0 26 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                id="Vector"
                d="M12.5267 23.8807L12.5173 23.8767L12.488 23.8607C12.3164 23.7663 12.1461 23.6694 11.9773 23.57C9.94775 22.364 8.05103 20.9472 6.31867 19.3433C3.25067 16.4805 0 12.2324 0 7.00027C0 3.09617 3.28533 9.46041e-05 7.25067 9.46041e-05C8.353 -0.00530477 9.44238 0.237888 10.4378 0.711587C11.4331 1.18528 12.3089 1.8773 13 2.73616C13.6912 1.87712 14.5672 1.185 15.5628 0.711296C16.5585 0.237591 17.6481 -0.00550555 18.7507 9.46041e-05C22.7147 9.46041e-05 26 3.09617 26 7.00027C26 12.2337 22.7493 16.4818 19.6813 19.3419C17.949 20.9459 16.0523 22.3627 14.0227 23.5687C13.8539 23.6685 13.6836 23.7658 13.512 23.8607L13.4827 23.8767L13.4733 23.882L13.4693 23.8834C13.3247 23.96 13.1636 24 13 24C12.8364 24 12.6753 23.96 12.5307 23.8834L12.5267 23.882V23.8807Z"
              />
            </svg>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
