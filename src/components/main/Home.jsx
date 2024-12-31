import React from 'react';
import { Link } from 'react-router-dom';
import { useUserAuth } from '../context/UserAuthContext';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
import { HiOutlineShare } from "react-icons/hi";
import Header from '../../common/parts/Header';
import Footer from '../../common/parts/Footer';
import toast from 'react-hot-toast';
import { HashLink } from 'react-router-hash-link';

function Home() {
  const { user } = useUserAuth();

  const HandleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "CodeSpark",
          url: window.origin,
        });
      }
    } catch (err) {
      toast.error("Unable to share.");
    }
  };

  return (
    <div className="">
      <Header />
      <section class="text-black/60 body-font">
        <div class="container md:h-[80vh] mx-auto home22-intro overflow-hidden relative flex px-5 md:px-12 py-12 md:flex-row flex-col-reverse gap-5 md:gap-0 items-center">
          <div class="lg:flex-grow md:w-1/2 lg:pr-16 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 class="title-font sm:text-4xl text-2xl mb-4 font-semibold text-gray-900">Learn programming Interactively
              <br class="hidden lg:inline-block" /><span className='sm:text-3xl font-medium text-2xl' >with AI-Powered Dashboards</span>
            </h1>
            <p class="mb-8 sm:text-lg md:text-base leading-relaxed">CodeSpace offers real-time previews, Space Trash for code management, and Jarvis AI for assistance. WebSpace provides responsive templates, while Space Notes helps capture insights, all while delivering <strong>Skill as a Service</strong></p>
            <div className="flex gap-3">
              {user ? <Link to="/dashboard" class="inline-flex text-black bg-white border-2 border-dashed border-black py-2 px-6 focus:outline-none rounded text-lg">Access Your Space</Link> : <Link to="/auth" class="inline-flex text-black bg-white border-2 border-dashed border-black py-2 px-6 focus:outline-none rounded text-lg">Get Started Now</Link>}
              <button onClick={HandleShare} className="bg-black py-3 px-4 rounded-md text-white" >
                <HiOutlineShare />
              </button>
            </div>
          </div>
          <div class="lg:max-w-xl lg:block lg:w-full md:w-1/2 w-5/6">
            <ReactCompareSlider
              position={75}
              changePositionOnHover={true}
              buttonStyle={{
                display: 'none'
              }}
              itemOne={
                <ReactCompareSliderImage
                  src="https://ik.imagekit.io/vituepzjm/codespace2.png?updatedAt=1734705428800"
                  alt="Image one"
                />
              }
              itemTwo={
                <ReactCompareSliderImage
                  src="https://ik.imagekit.io/vituepzjm/webspace.png?updatedAt=1734704706719"
                  alt="Image two"
                />
              }
              style={{ width: '100%', height: '100%', borderRadius: "20px" }}
            />
          </div>
        </div>
      </section>
      <section class="text-black/60 body-font">
        <div class="container mx-auto flex lg:px-24 px-5 pt-24 pb-12 md:py-24 md:flex-row flex-col items-center">
          <div class="lg:max-w-xl lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
            <img class="object-cover object-center rounded" alt="hero" src="https://ik.imagekit.io/vituepzjm/10.png" />
          </div>
          <div class="lg:flex-grow md:w-1/2 lg:pl-32 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
            <h1 className="px-5 py-2 border-2 border-dashed border-black uppercase text-sm rounded-md mb-5 font-bold text-main">CODE SPACE</h1>
            <h1 class="title-font sm:text-5xl text-3xl mb-4 break-words font-bold text-main">Start Coding Simply
              <br class="hidden lg:inline-block" /> with CodeSpace
            </h1>
            <p class="mb-8 font-medium leading-relaxed w-[80%]">CodeSpace is a dynamic and user-friendly platform designed to enhance your coding experience, providing a seamless environment for learning and developing projects with real-time feedback and intuitive tools.</p>
            <div className="flex items-center gap-3">
              <Link to='/dashboard/space/new' class="flex justify-center items-center bg-main ps-5 pe-3 py-3 rounded-md gap-2">
                <span class="text-white">Start Creating</span>
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-1 text-white" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </Link>
              <HashLink to="/need-spark#codespace" class="hover:underline hover:text-black cursor-pointer underline-offset-2 ps-5 pe-3 py-3 rounded-md gap-2">
                more about this
              </HashLink>
            </div>
          </div>
        </div>
      </section>
      <hr className='mx-12' />
      <section class="text-black/60 body-font">
        <div class="container mx-auto flex lg:px-20 px-5 gap-12 md:gap-0 py-12 md:py-24 md:flex-row flex-col-reverse items-center">
          <div class="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="px-5 py-2 border-2 border-dashed border-black uppercase text-sm rounded-md mb-5 font-bold text-main">WEB SPACE</h1>
            <h1 class="title-font sm:text-5xl text-3xl capitalize mb-4 font-bold text-main">
              Build Your Topic Website
              <br class="hidden lg:inline-block" />with WebSpace
            </h1>
            <p class="mb-8 leading-relaxed w-[80%]">WebSpace is an intuitive platform for building responsive websites, offering easy-to-use templates, live previews, and seamless collaboration, allowing users to create, manage, and share web projects effortlessly.</p>
            <div className="flex items-center gap-3">
              <Link to='/dashboard/webspace/new' class="flex justify-center items-center bg-main ps-5 pe-3 py-3 rounded-md gap-2">
                <span class="text-white">Start Creating</span>
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-1 text-white" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </Link>
              <HashLink to="/need-spark#webspace" className="hover:underline hover:text-black cursor-pointer underline-offset-2 ps-5 pe-3 py-3 rounded-md gap-2">
                more about this
              </HashLink>
            </div>
          </div>
          <div class=" lg:max-w-xl lg:w-full md:w-1/2 w-5/6">
            <img class="object-cover lg:-ml-24 object-center rounded" alt="hero" src="https://ik.imagekit.io/vituepzjm/webspacesample3.png" />
          </div>
        </div>
      </section>
      <hr className='mx-12' />
      <section class="text-black/60 body-font">
        <div class="container px-5 md:px-12 py-24 mx-auto flex flex-wrap">
          <div class="lg:w-1/2 w-full border-4 border-white outline-2 outline-black outline mb-10 relative lg:mb-0 rounded-lg overflow-hidden">
            <img alt="feature" class="object-cover object-center h-full w-full" src="https://ik.imagekit.io/vituepzjm/WhatsApp%20Image%202024-12-25%20at%2010.14.29%20PM.jpeg?updatedAt=1735403330914" />
            <h1 className="absolute top-3 text-sm right-3 px-3 py-1 bg-black/60 text-white rounded-md">STEPS TO START</h1>
          </div>
          <div class="flex flex-col flex-wrap lg:py-6 -mb-10 lg:w-1/2 lg:pl-12 lg:text-left text-center">
            <div class="flex flex-col mb-10 lg:items-start items-center">
              <div class="w-12 h-12 inline-flex items-center justify-center rounded-full bg-black text-white mb-5">
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-6 h-6" viewBox="0 0 24 24">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <div class="flex-grow">
                <h2 class="text-gray-900 text-lg title-font font-medium mb-1">Account Creation</h2>
                <p class="leading-relaxed text-base">Register your free CodeSpark Learning account to leavarage your inner potential in coding.</p>

              </div>
            </div>
            <div class="flex flex-col mb-10 lg:items-start items-center">
              <div class="w-12 h-12 inline-flex items-center justify-center rounded-full bg-black text-white mb-5">
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" class="w-6 h-6" viewBox="0 0 256 256" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M229.5,113,166.06,89.94,143,26.5a16,16,0,0,0-30,0L89.94,89.94,26.5,113a16,16,0,0,0,0,30l63.44,23.07L113,229.5a16,16,0,0,0,30,0l23.07-63.44L229.5,143a16,16,0,0,0,0-30ZM157.08,152.3a8,8,0,0,0-4.78,4.78L128,223.9l-24.3-66.82a8,8,0,0,0-4.78-4.78L32.1,128l66.82-24.3a8,8,0,0,0,4.78-4.78L128,32.1l24.3,66.82a8,8,0,0,0,4.78,4.78L223.9,128Z"></path></svg>
              </div>
              <div class="flex-grow">
                <h2 class="text-gray-900 text-lg title-font font-medium mb-1">Create your own Spaces</h2>
                <p class="leading-relaxed text-base">Generate the Learning Dashboards for your lagging topics with the help of our AI model Jarvis AI or create with blank space.</p>

              </div>
            </div>
            <div class="flex flex-col mb-10 lg:items-start items-center">
              <div class="w-12 h-12 inline-flex items-center justify-center rounded-full bg-black text-white mb-5">
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-6 h-6" viewBox="0 0 24 24">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>
              </div>
              <div class="flex-grow">
                <h2 class="text-gray-900 text-lg title-font font-medium mb-1">Start Learning and Innovating</h2>
                <p class="leading-relaxed text-base">Learn complex topics effectively using an adaptive learning approach featuring hands-on coding, integrated compilers, and personalized learning paths.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <hr className='mx-12' />
      <section class="text-black/60 body-font ">
        <div class="container px-5 md:px-12 py-24 mx-auto">
          <div class="flex flex-col text-center w-full mb-12">
            <h2 class="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-1">We Offer the Best Features</h2>
            <h1 class="text-xs text-black tracking-widest font-medium title-font">From Us For Your Convenience</h1>
          </div>
          <div class="flex flex-wrap -m-4">
            <div class="p-4 md:w-1/3">
              <div class="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
                <div class="flex items-center mb-3">
                  <div class="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-black text-white flex-shrink-0">
                    <svg class="svg-inline--fa fa-users size-4" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="users" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" data-fa-i2svg=""><path fill="currentColor" d="M144 160c-44.2 0-80-35.8-80-80S99.8 0 144 0s80 35.8 80 80s-35.8 80-80 80zm368 0c-44.2 0-80-35.8-80-80s35.8-80 80-80s80 35.8 80 80s-35.8 80-80 80zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM416 224c0 53-43 96-96 96s-96-43-96-96s43-96 96-96s96 43 96 96zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z"></path></svg>
                  </div>
                  <h2 class="text-gray-900 text-lg title-font font-medium">Collaboration</h2>
                </div>
                <div class="flex-grow">
                  <p class="leading-relaxed text-base">Collaborate seamlessly in real-time, sharing and working on projects together effortlessly.</p>
                  <HashLink to="/need-spark#sharedspace" class="mt-3 text-black inline-flex items-center">Learn More
                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-2" viewBox="0 0 24 24">
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </HashLink>
                </div>
              </div>
            </div>
            <div class="p-4 md:w-1/3">
              <div class="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
                <div class="flex items-center mb-3">
                  <div class="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-black text-white flex-shrink-0">
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M20.4668 8.69379L20.7134 8.12811C21.1529 7.11947 21.9445 6.31641 22.9323 5.87708L23.6919 5.53922C24.1027 5.35653 24.1027 4.75881 23.6919 4.57612L22.9748 4.25714C21.9616 3.80651 21.1558 2.97373 20.7238 1.93083L20.4706 1.31953C20.2942 0.893489 19.7058 0.893489 19.5293 1.31953L19.2761 1.93083C18.8442 2.97373 18.0384 3.80651 17.0252 4.25714L16.308 4.57612C15.8973 4.75881 15.8973 5.35653 16.308 5.53922L17.0677 5.87708C18.0555 6.31641 18.8471 7.11947 19.2866 8.12811L19.5331 8.69379C19.7136 9.10792 20.2864 9.10792 20.4668 8.69379ZM5.79993 16H7.95399L8.55399 14.5H11.4459L12.0459 16H14.1999L10.9999 8H8.99993L5.79993 16ZM9.99993 10.8852L10.6459 12.5H9.35399L9.99993 10.8852ZM15 16V8H17V16H15ZM3 3C2.44772 3 2 3.44772 2 4V20C2 20.5523 2.44772 21 3 21H21C21.5523 21 22 20.5523 22 20V11H20V19H4V5H14V3H3Z"></path></svg>
                  </div>
                  <h2 class="text-gray-900 text-lg title-font font-medium">Ai Space Generation</h2>
                </div>
                <div class="flex-grow">
                  <p class="leading-relaxed text-base">Create customized content and code on any topic effortlessly with AI assistance.                  </p>
                  <HashLink to="/need-spark#jarvisai" class="mt-3 text-black inline-flex items-center">Learn More
                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-2" viewBox="0 0 24 24">
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </HashLink>
                </div>
              </div>
            </div>
            <div class="p-4 md:w-1/3">
              <div class="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
                <div class="flex items-center mb-3">
                  <div class="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-black text-white flex-shrink-0">
                    <svg class="svg-inline--fa fa-dropbox size-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="dropbox" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 528 512" data-fa-i2svg=""><path fill="currentColor" d="M264.4 116.3l-132 84.3 132 84.3-132 84.3L0 284.1l132.3-84.3L0 116.3 132.3 32l132.1 84.3zM131.6 395.7l132-84.3 132 84.3-132 84.3-132-84.3zm132.8-111.6l132-84.3-132-83.6L395.7 32 528 116.3l-132.3 84.3L528 284.8l-132.3 84.3-131.3-85z"></path></svg>
                  </div>
                  <h2 class="text-gray-900 text-lg title-font font-medium">Backup and Restore</h2>
                </div>
                <div class="flex-grow">
                  <p class="leading-relaxed text-base">Easily delete, back up, and recover your code with Trash Backup and Restore.</p>
                  <HashLink to="/need-spark#spacetrash" class="mt-3 text-black inline-flex items-center">Learn More
                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-2" viewBox="0 0 24 24">
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </HashLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="text-gray-300 bg-black">
        <div class="container px-5 py-24 mx-auto">
          <div class="flex flex-col text-center items-center justify-center w-full mb-12">
            <h1 className="px-8 py-3 mb-5 bg-white  rounded-full text-sm font-bold text-main">Join With Us </h1>
            <h1 class="sm:text-4xl text-2xl lg:font-semibold font-bold title-font mb-4 text-white break-words">Try it now for an efficient and Collabrative experience!</h1>
            <p class="lg:w-2/3 mx-auto leading-relaxed lg:text-xl">Unlock The future of Learning is seamless and connected.</p>
            {user ? <Link to='/dashboard/home' class="flex mt-10 justify-center  items-center bg-white ps-5 pe-3 py-3 rounded-md ">
              <span class="text-main font-semibold">Explore More</span>
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-1 text-black" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </Link> : <Link to='/auth' class="flex mt-10 justify-center  items-center bg-white ps-5 pe-3 py-3 rounded-md ">
              <span class="text-main font-semibold">Get Started Now</span>
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-1 text-black" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </Link>}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Home;
