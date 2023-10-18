import React from 'react'
import { Link } from 'react-router-dom'

const AllVideos = () => {
    const technologies = [
        {
          type: "CMS",
          subcategories: [
            {
              name: "Squarespace",
              description:
                "Squarespace provides Software-as-a-Service (SaaS) for website building and hosting, and allows users to use pre-built website templates.",
              website: "http://www.squarespace.com",
              icon: "https://www.wappalyzer.com/images/icons/Squarespace.png",
              used_by: 550865
            }
          ]
        },
        {
          type: "Ecommerce",
          subcategories: [
            {
              name: "Squarespace Commerce",
              description:
                "Squarespace Commerce is an ecommerce platform designed to facilitate the creation of websites and online stores, with domain registration and web hosting included.",
              website: "https://www.squarespace.com/ecommerce-website",
              icon: "https://www.wappalyzer.com/images/icons/Squarespace.png",
              used_by: 135587
            }
          ]
        },
        {
          type: "Reverse proxies",
          subcategories: [
            {
              name: "Nginx",
              description:
                "Nginx is a web server that can also be used as a reverse proxy, load balancer, mail proxy and HTTP cache.",
              website: "http://nginx.org/en",
              icon: "https://www.wappalyzer.com/images/icons/Nginx.svg",
              used_by: 544934
            }
          ]
        },
        {
          type: "Web servers",
          subcategories: [
            {
              name: "Nginx",
              description:
                "Nginx is a web server that can also be used as a reverse proxy, load balancer, mail proxy and HTTP cache.",
              website: "http://nginx.org/en",
              icon: "https://www.wappalyzer.com/images/icons/Nginx.svg",
              used_by: 544934
            },
            {
              name: "OpenResty",
              description:
                "OpenResty is a web platform based on nginx which can run Lua scripts using its LuaJIT engine.",
              website: "http://openresty.org",
              icon: "https://www.wappalyzer.com/images/icons/OpenResty.png",
              used_by: 189561
            }
          ]
        },
        {
          type: "Analytics",
          subcategories: [
            {
              name: "Google Analytics",
              description:
                "Google Analytics is a free web analytics service that tracks and reports website traffic.",
              website: "http://google.com/analytics",
              icon:
                "https://www.wappalyzer.com/images/icons/Google%20Analytics.svg",
              used_by: 1096566
            }
          ]
        },
        {
          type: "JavaScript libraries",
          subcategories: [
            {
              name: "Moment.js",
              description:
                "Moment.js is a free and open-source JavaScript library that removes the need to use the native JavaScript Date object directly.",
              website: "https://momentjs.com",
              icon: "https://www.wappalyzer.com/images/icons/Moment.js.svg",
              used_by: 628495
            },
            {
              name: "jQuery",
              description:
                "jQuery is a JavaScript library which is a free, open-source software designed to simplify HTML DOM tree traversal and manipulation, as well as event handling, CSS animation, and Ajax.",
              website: "https://jquery.com",
              icon: "https://www.wappalyzer.com/images/icons/jQuery.svg",
              used_by: 3223885
            }
          ]
        },
        {
          type: "Font scripts",
          subcategories: [
            {
              name: "Typekit",
              description:
                "Typekit is an online service which offers a subscription library of fonts.",
              website: "http://typekit.com",
              icon: "https://www.wappalyzer.com/images/icons/Typekit.png",
              used_by: 27074
            }
          ]
        },
        {
          type: "Security",
          subcategories: [
            {
              name: "reCAPTCHA",
              description: "",
              website: "https://www.google.com/recaptcha/",
              icon: "https://www.wappalyzer.com/images/icons/reCAPTCHA.svg",
              used_by: 3346238
            }
          ]
        }
      ];
    return (
        <div>
            <Link to={'/newvideo'}>
                <button type="button" class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Add new video</button>
            </Link>

            <div className="p-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {technologies.map((item, index) => {
          return (
            <div className="border p-5 rounded-sm" key={index}>
              
            </div>
          );
        })}
      </div>
    </div>
        </div>
    )
}

export default AllVideos