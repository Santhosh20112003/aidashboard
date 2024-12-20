import React from "react";
import { Link } from "react-router-dom";
import { useUserAuth } from "../../context/UserAuthContext";
import Header from "../../../common/parts/Header";
import Footer from "../../../common/parts/Footer";

function Contact() {
  const { user } = useUserAuth();

  return (
    <div className="">
      <Header />
      <section id="contact" class="text-gray-600 body-font relative">
        <div class="container px-10 md:px-20 py-20 mx-auto flex sm:flex-nowrap flex-wrap">
          <div class="lg:w-2/3 md:w-1/2 bg-gray-300 rounded-lg overflow-hidden sm:mr-10 p-10  items-end justify-start relative hidden md:flex">
            <iframe
              width="100%"
              height="100%"
              class="absolute focus:outline-none inset-0"
              frameborder="0"
              title="map"
              marginheight="0"
              marginwidth="0"
              scrolling="no"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125432.38285197991!2d79.1314494!3d10.7528199!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baab89cea453039%3A0xe113da9b1f632be6!2sThanjavur%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1699945692037!5m2!1sen!2sin"
            ></iframe>

            <div class="bg-white relative flex gap-3 flex-wrap p-6 rounded shadow-md">
              <div class="lg:w-fit px-6">
                <h2 class="title-font font-semibold text-gray-900 tracking-widest text-xs">
                  Website
                </h2>
                <a
                  href="https://www.santechh.online/"
                  class="mt-1 text-gray-500"
                >
                  SanTech
                </a>
              </div>
              <div class="lg:w-fit px-6 ">
                <h2 class="title-font font-semibold text-gray-900 tracking-widest text-xs">
                  EMAIL
                </h2>
                <a
                  href="mailto:santhoshtechnologies22@gmail.com"
                  class="text-gray-500 leading-relaxed break-all"
                >
                  santhoshtechnologies22@gmail.com
                </a>
              </div>
            </div>
          </div>
          <form
            action="https://formsubmit.co/shanmugamsanthosh22@gmail.com"
            method="POST"
            class="lg:w-1/3 md:w-1/2  flex shadow-xl p-5 md:p-0 md:shadow-none rounded-lg flex-col md:ml-auto  w-full md:py-8 mt-8 md:mt-0"
          >
            <h2 class="text-gray-900 text-lg mb-1 font-medium title-font">
              Feedback for us
            </h2>
            <div class="relative mb-4">
              <label for="name" class="leading-7 text-sm text-gray-600">
                Name
              </label>
              <input
                required
                type="text"
                id="name"
                name="name"
                class="w-full bg-white rounded border border-gray-300 focus:border-black focus:ring-2 focus:ring-gray-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div class="relative mb-4">
              <label for="email" class="leading-7 text-sm text-gray-600">
                Email
              </label>
              <input
                required
                type="email"
                id="email"
                name="email"
                class="w-full bg-white rounded border border-gray-300 focus:border-black focus:ring-2 focus:ring-gray-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div class="relative mb-4">
              <label for="message" class="leading-7 text-sm text-gray-600">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                class="w-full bg-white rounded border border-gray-300 focus:border-black focus:ring-2 focus:ring-gray-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
              ></textarea>
            </div>
            <button class="text-white bg-black border-0 py-2 px-6 focus:outline-none hover:bg-black rounded text-lg">
              Share Response
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Contact;
