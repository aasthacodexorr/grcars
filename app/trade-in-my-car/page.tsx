"use client";

import { ReactNode, useState } from "react";
import { ChevronDown, Check, X, CarFront, Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
// Layout
import { Header, Footer } from "@/components/layout";

// Assets
import sell from "@/assets/cars/sell-image1.jpg";
import happyfam from "@/assets/pages/HappyFamily.webp";
import { useAppConfig } from "../providers";
import { getConstants } from "@/constants";
import Link from "next/link";

interface Step {
  icon: ReactNode;  
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 56 56"
        fill="none"
        aria-hidden="true"
        className="w-12 h-12"
      >
        <path
          d="M23.2347 21.236C22.7854 22.0138 23.0943 22.5694 23.2347 22.7083C23.562 23.032 24.4538 23.7119 26.0073 23.9226V25.0012C26.0073 25.5528 26.4545 26 27.0061 26C27.5577 26 28.0048 25.5528 28.0048 25.0012V23.8897C29.8884 23.5042 31 22.0229 31 20.5416C31 18.386 29.2686 17.5526 27.8181 16.8543C27.8044 16.8478 27.7908 16.8412 27.7772 16.8346C27.7182 16.8062 27.6597 16.778 27.6018 16.75C26.4223 16.1805 25.7623 15.75 25.7623 15.1944C25.7623 14.7083 26.0853 14.2778 26.7874 14.2778C27.6861 14.2778 28.6831 14.9166 29.0622 15.1805C29.3992 15.375 30.0171 14.9722 30.326 14.5555C30.6349 14.1389 30.7613 13.3611 30.5647 13.25C30.1655 12.9648 29.2407 12.3504 28.0048 12.1047V10.9987C28.0048 10.4472 27.5577 10 27.0061 10C26.4545 10 26.0073 10.4472 26.0073 10.9987V12.0818C24.0527 12.4359 23.0662 13.8829 23.0662 15.3194C23.0662 17.3194 24.7091 18.2083 26.324 19C27.4474 19.5277 28.0652 19.9861 28.0652 20.6805C28.0652 21.2638 27.5737 21.6805 26.8997 21.6805C25.8795 21.6805 25.0437 21.12 24.5584 20.7946L24.5126 20.7638C24.344 20.6388 23.6841 20.4583 23.2347 21.236Z"
          fill="#228BE6"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M29.0237 3.92541L27 2.87305L24.9764 3.92541L22.7382 3.4858L21.093 5.06566L18.8217 5.27443L17.6882 7.2538L15.5677 8.09402L15.0378 10.3125L13.2399 11.7161L13.3565 13.9941L12.0269 15.8474L12.7805 18.0002L12.0269 20.153L13.3565 22.0063L13.2399 24.2842L15.0378 25.6878L15.5677 27.9063L17.6882 28.7466L18.8217 30.7259L21.093 30.9347L22.7382 32.5146L24.9764 32.075L27 33.1273L29.0237 32.075L31.2618 32.5146L32.907 30.9347L35.1784 30.7259L36.3118 28.7466L38.4323 27.9063L38.9622 25.6878L40.7601 24.2842L40.6435 22.0063L41.9732 20.153L41.2195 18.0002L41.9732 15.8474L40.6435 13.9941L40.7601 11.7161L38.9622 10.3125L38.4323 8.09402L36.3118 7.2538L35.1784 5.27443L32.907 5.06566L31.2618 3.4858L29.0237 3.92541ZM25.2779 6.02285L27 5.12732L28.7221 6.02285L30.6267 5.64876L32.0267 6.99319L33.9596 7.17084L34.9242 8.85524L36.7287 9.57025L37.1796 11.4582L38.7096 12.6526L38.6104 14.5911L39.7419 16.1682L39.1005 18.0002L39.7419 19.8322L38.6104 21.4093L38.7096 23.3478L37.1796 24.5422L36.7287 26.4301L34.9242 27.1451L33.9596 28.8295L32.0267 29.0072L30.6267 30.3516L28.7221 29.9775L27 30.873L25.2779 29.9775L23.3733 30.3516L21.9733 29.0072L20.0404 28.8295L19.0759 27.1451L17.2714 26.4301L16.8204 24.5422L15.2904 23.3478L15.3897 21.4093L14.2582 19.8322L14.8995 18.0002L14.2582 16.1682L15.3897 14.5911L15.2904 12.6526L16.8204 11.4582L17.2714 9.57025L19.0759 8.85524L20.0404 7.17084L21.9733 6.99319L23.3733 5.64876L25.2779 6.02285Z"
          fill="#228BE6"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4 36C4 35.4477 4.44772 35 5 35H17C17.5523 35 18 35.4477 18 36V38H19.1301L22.6301 35H32.379C33.0616 35 33.6003 35.6259 33.4553 36.3224C33.3566 36.7967 33.1872 37.3853 32.7626 38H34.7212L42.0099 33.5933L42.0383 33.5786C42.6547 33.2577 43.6481 32.9388 44.7103 33.0101C45.8238 33.0849 47.0099 33.5961 47.8092 34.9108C48.1007 35.3901 47.9838 36.0124 47.5391 36.3535L37.9894 43.6794L23.6799 49H18V51C18 51.5523 17.5523 52 17 52H5C4.44772 52 4 51.5523 4 51C4 50.4477 4.44772 50 5 50H16V37H5C4.44772 37 4 36.5523 4 36ZM23.3699 37L19.8699 40H18V47H23.3201L37.0106 41.9096L45.5647 35.3474C45.2595 35.1229 44.921 35.0287 44.5763 35.0056C43.9751 34.9652 43.3616 35.1506 42.9876 35.3394L35.2788 40H26C25.4477 40 25 39.5523 25 39C25 38.4477 25.4477 38 26 38H29.7477C30.3999 37.635 30.7813 37.2917 31.0151 37H23.3699Z"
          fill="#228BE6"
        />
      </svg>
    ),
    title: 'Describe Your Vehicle',
    description: "Share essential details about your car, and we'll present you with an immediate, firm offer.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 56 56"
        fill="none"
        aria-hidden="true"
        className="w-12 h-12"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M43 4C38.0082 4 34 7.95116 34 12.7782C34 13.3305 33.5523 13.7782 33 13.7782C32.4477 13.7782 32 13.3305 32 12.7782C32 6.80454 36.9461 2 43 2C43.9461 2 44.8658 2.11725 45.7441 2.3383C46.2796 2.47309 46.6046 3.01654 46.4698 3.55212C46.335 4.0877 45.7915 4.41261 45.2559 4.27782C44.5361 4.09666 43.7804 4 43 4ZM50.7576 5.61064C51.0556 5.60984 51.3383 5.74194 51.5289 5.97095C53.0717 7.82472 54 10.1954 54 12.7782C54 17.4868 50.9231 21.4718 46.66 22.9451C46.138 23.1255 45.5686 22.8486 45.3882 22.3267C45.2078 21.8047 45.4847 21.2353 46.0067 21.0549C49.5116 19.8435 52 16.5846 52 12.7782C52 11.1204 51.5295 9.56992 50.7093 8.24597L43.7721 16.6732C43.5941 16.8894 43.3336 17.021 43.0539 17.0361C42.7743 17.0512 42.5011 16.9484 42.3009 16.7526L38.9675 13.4932C38.5727 13.1071 38.5656 12.4739 38.9517 12.0791C39.3378 11.6842 39.9709 11.6771 40.3658 12.0632L42.9203 14.561L49.9882 5.97508C50.1776 5.74505 50.4597 5.61144 50.7576 5.61064ZM28.7071 11.2929C29.0976 11.6834 29.0976 12.3166 28.7071 12.7071L25.4142 16H32.375C32.6173 16 32.8514 16.088 33.0338 16.2477L41.276 23.4648L50.3922 26.9995C50.4007 27.0028 50.409 27.0062 50.4174 27.0097C50.4214 27.0113 50.4253 27.013 50.4293 27.0148C52.591 27.9542 54 30.0594 54 32.3994L54 36.5556C54 38.4789 52.4117 40 50.5 40H46.917C46.441 42.8377 43.973 45 41 45C37.6863 45 35 42.3137 35 39C35 35.6863 37.6863 33 41 33C43.973 33 46.441 35.1623 46.917 38H50.5C51.3497 38 52 37.3322 52 36.5556L52 32.3994C52 30.8815 51.089 29.4901 49.6495 28.8566L40.3884 25.2657C40.2796 25.2235 40.179 25.1626 40.0912 25.0857L31.9991 18H25.4142L28.7071 21.2929C29.0976 21.6834 29.0976 22.3166 28.7071 22.7071C28.3166 23.0976 27.6834 23.0976 27.2929 22.7071L22.2929 17.7071C21.9024 17.3166 21.9024 16.6834 22.2929 16.2929L27.2929 11.2929C27.6834 10.9024 28.3166 10.9024 28.7071 11.2929ZM44.9894 38.7068C44.8393 36.6346 43.1105 35 41 35C38.7909 35 37 36.7909 37 39C37 41.2091 38.7909 43 41 43C43.1105 43 44.8393 41.3654 44.9894 39.2932C44.961 39.2005 44.9458 39.102 44.9458 39C44.9458 38.898 44.961 38.7995 44.9894 38.7068ZM17.4572 18C13.2679 17.9994 8.61868 21.0947 7.16675 25.5354C6.78097 26.7153 5.90287 27.5292 5.26324 28.122C5.18665 28.193 5.11347 28.2609 5.04497 28.3258C4.32758 29.0055 4 29.4392 4 30.055V38H7.08296C7.55904 35.1623 10.027 33 13 33C15.9742 33 18.4429 35.164 18.9176 38.0033C18.9448 38.0011 18.9723 38 19 38H28.5547L25.2084 34.7134C24.8144 34.3265 24.8086 33.6933 25.1956 33.2993C25.5826 32.9053 26.2158 32.8996 26.6098 33.2866L31.7007 38.2866C31.8922 38.4746 32 38.7317 32 39C32 39.2683 31.8922 39.5254 31.7007 39.7134L26.6098 44.7134C26.2158 45.1004 25.5826 45.0947 25.1956 44.7007C24.8086 44.3067 24.8144 43.6735 25.2084 43.2866L28.5547 40H19C18.9723 40 18.9448 39.9989 18.9176 39.9967C18.4429 42.836 15.9742 45 13 45C10.027 45 7.55904 42.8377 7.08296 40H3C2.44772 40 2 39.5523 2 39V30.055C2 28.5174 2.94595 27.5594 3.66939 26.8739C3.74161 26.8055 3.81187 26.7394 3.8801 26.6751C4.56793 26.0277 5.04996 25.574 5.26578 24.9139C6.99575 19.6228 12.4329 15.9992 17.4575 16L18.0001 16.0001C18.5524 16.0002 19 16.448 18.9999 17.0002C18.9998 17.5525 18.5521 18.0002 17.9998 18.0001L17.4572 18ZM13 35C10.7909 35 9 36.7909 9 39C9 41.2091 10.7909 43 13 43C15.2091 43 17 41.2091 17 39C17 36.7909 15.2091 35 13 35Z"
          fill="#228BE6"
        />
      </svg>
    ),
    title: 'Submit Your Documents',
    description: 'Provide proof of ownership and any other necessary documents.',
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 56 56"
        fill="none"
        aria-hidden="true"
        className="w-12 h-12"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.18799 22.4325C6.42878 22.4325 9.05597 19.8054 9.05597 16.5646H11.056C11.056 20.9099 7.53335 24.4325 3.18799 24.4325V22.4325Z"
          fill="#228BE6"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.20929 36.9833C9.20929 33.7425 6.5821 31.1153 3.34131 31.1153V29.1153C7.68667 29.1153 11.2093 32.638 11.2093 36.9833H9.20929Z"
          fill="#228BE6"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M43.9254 24.8146C40.6846 24.8146 38.0574 27.4417 38.0574 30.6825H36.0574C36.0574 26.3372 39.58 22.8146 43.9254 22.8146V24.8146Z"
          fill="#228BE6"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M37.9041 10.5646C37.9041 13.8054 40.5312 16.4325 43.772 16.4325V18.4325C39.4267 18.4325 35.9041 14.9099 35.9041 10.5646H37.9041Z"
          fill="#228BE6"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M18.8657 18.8009C19.2045 19.2371 19.1254 19.8653 18.6892 20.204C17.6575 21.0051 16.7896 22.8203 16.7896 25.2706C16.7896 27.5351 17.6766 28.8359 18.7434 29.607C19.191 29.9306 19.2916 30.5557 18.968 31.0033C18.6445 31.4509 18.0193 31.5514 17.5717 31.2279C15.9709 30.0707 14.7896 28.1598 14.7896 25.2706C14.7896 22.4378 15.7832 19.9283 17.4626 18.6243C17.8988 18.2856 18.527 18.3646 18.8657 18.8009Z"
          fill="#228BE6"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M28.2679 28.3655C27.9292 27.9293 28.0082 27.3011 28.4444 26.9623C29.4761 26.1613 30.3441 24.346 30.3441 21.8957C30.3441 19.6312 29.457 18.3305 28.3902 17.5593C27.9426 17.2358 27.842 16.6107 28.1656 16.1631C28.4891 15.7155 29.1143 15.6149 29.5619 15.9385C31.1627 17.0957 32.3441 19.0066 32.3441 21.8957C32.3441 24.7286 31.3504 27.2381 29.671 28.5421C29.2348 28.8808 28.6066 28.8017 28.2679 28.3655Z"
          fill="#228BE6"
        />
        <path
          d="M20.1907 27.3256C20.0766 27.2127 19.8256 26.7613 20.1907 26.1294C20.5558 25.4975 21.092 25.6442 21.2289 25.7457C21.6168 26.0053 22.3128 26.4905 23.1685 26.4905C23.7161 26.4905 24.1155 26.152 24.1155 25.678C24.1155 25.1138 23.6135 24.7414 22.7007 24.3126C21.3887 23.6693 20.0538 22.9471 20.0538 21.3221C20.0538 19.9793 21.1148 18.6251 23.2141 18.6251C24.6403 18.6251 25.7356 19.3473 26.1463 19.6407C26.306 19.731 26.2034 20.3629 25.9524 20.7015C25.7014 21.04 25.1993 21.3673 24.9255 21.2093C24.6175 20.9949 23.8074 20.4758 23.0772 20.4758C22.5068 20.4758 22.2444 20.8256 22.2444 21.2206C22.2444 21.672 22.7806 22.0218 23.739 22.4845C24.9483 23.0713 26.5 23.7258 26.5 25.5652C26.5 26.9645 25.2792 28.3638 23.2712 28.3638C21.4913 28.375 20.5101 27.6415 20.1907 27.3256Z"
          fill="#228BE6"
        />
        <path
          d="M22.4436 17.8116C22.4436 17.3634 22.8069 17.0001 23.2551 17.0001C23.7032 17.0001 24.0666 17.3634 24.0666 17.8116V19.4386C24.0666 19.8868 23.7032 20.2501 23.2551 20.2501C22.8069 20.2501 22.4436 19.8868 22.4436 19.4386V17.8116Z"
          fill="#228BE6"
        />
        <path
          d="M22.4436 27.5616C22.4436 27.1134 22.8069 26.7501 23.2551 26.7501C23.7032 26.7501 24.0666 27.1134 24.0666 27.5616V29.1886C24.0666 29.6368 23.7032 30.0001 23.2551 30.0001C22.8069 30.0001 22.4436 29.6368 22.4436 29.1886V27.5616Z"
          fill="#228BE6"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M30.9875 30.5039C34.6123 29.6931 39.4142 29.2751 42 29.0947V11.0026C40.4581 11.0244 37.8474 11.1983 34.0191 11.8866C31.9822 12.2528 29.5553 12.9466 26.607 13.7894L26.4109 13.8454C23.4126 14.7024 19.9605 15.6821 16.0974 16.5181C11.7816 17.452 7.41485 17.8373 5 17.9906V35.9945C6.59668 35.9618 9.30101 35.7719 13.2189 35.0626C17.3026 34.3234 29.4728 30.9206 30.6961 30.5773L31.2365 32.5029C30.0697 32.8304 17.7778 36.2699 13.5751 37.0307C8.45939 37.9567 5.30042 38.03 3.88205 37.9927C3.37643 37.9794 3 37.5617 3 37.056V17.0614C3 16.5195 3.42805 16.0744 3.96925 16.0467C5.99407 15.943 10.8833 15.6001 15.6743 14.5633C19.5803 13.7181 23.0654 12.7217 26.1293 11.8458C29.0152 11.0208 31.5273 10.3026 33.6651 9.91819C38.7122 9.01074 41.7661 8.96238 43.1381 9.01416C43.6352 9.03293 44 9.4456 44 9.94308V30.0222C44 30.5563 43.5824 30.997 43.0494 31.0299C40.8646 31.1648 35.3705 31.5729 31.424 32.4557C31.3577 32.4705 31.3019 32.4846 31.2365 32.5029L30.6961 30.5773C30.7964 30.5492 30.8869 30.5264 30.9875 30.5039Z"
          fill="#228BE6"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M46.402 14.0001C46.642 14 46.8664 14.0022 47.0674 14.0056C48.1632 14.0242 49 14.9246 49 15.9847V34.3446C49 35.4131 48.1639 36.2849 47.1104 36.3507C44.9995 36.4825 39.9002 36.8689 36.2613 37.6847C36.2123 37.6957 36.1731 37.7056 36.1248 37.7192C35.0124 38.0323 23.289 41.3235 19.2379 42.059C14.3614 42.9445 11.3007 43.0286 9.85812 42.9939C8.76589 42.9676 8 42.0624 8 41.0589V39.9104C8 39.3581 8.44772 38.9104 9 38.9104C9.55228 38.9104 10 39.3581 10 39.9104V40.9965C11.3406 41.0219 14.2386 40.9341 18.8806 40.0912C22.8125 39.3773 34.4139 36.123 35.5829 35.794C35.6658 35.7707 35.7398 35.752 35.8238 35.7331C39.6353 34.8787 44.8796 34.486 46.9858 34.3546C46.9893 34.3544 46.9909 34.3537 46.992 34.3532C46.9937 34.3524 46.9957 34.351 46.9975 34.3491C46.9993 34.3472 47 34.3458 47 34.3456C47 34.3456 47 34.3455 47 34.3456C47 34.3459 47 34.3458 47 34.3446V16.0048C46.818 16.0019 46.6169 16 46.4031 16.0001C45.8508 16.0004 45.4028 15.553 45.4025 15.0007C45.4022 14.4484 45.8497 14.0004 46.402 14.0001Z"
          fill="#228BE6"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M51.402 19.0001C51.642 19 51.8664 19.0022 52.0674 19.0056C53.1632 19.0242 54 19.9246 54 20.9847V39.3446C54 40.4131 53.1639 41.2849 52.1104 41.3507C49.9995 41.4824 44.9002 41.8689 41.2613 42.6847C41.2123 42.6957 41.1731 42.7056 41.1248 42.7192C40.0124 43.0323 28.289 46.3235 24.2379 47.059C19.3614 47.9445 16.3007 48.0286 14.8581 47.9939C13.7659 47.9676 13 47.0624 13 46.0589V44.9104C13 44.3581 13.4477 43.9104 14 43.9104C14.5523 43.9104 15 44.3581 15 44.9104V45.9965C16.3406 46.0219 19.2386 45.9341 23.8806 45.0912C27.8125 44.3773 39.4139 41.123 40.5829 40.794C40.6658 40.7707 40.7398 40.752 40.8238 40.7331C44.6353 39.8787 49.8796 39.486 51.9858 39.3546C51.9893 39.3544 51.9909 39.3537 51.992 39.3532C51.9937 39.3524 51.9957 39.351 51.9975 39.3491C51.9993 39.3472 52 39.3458 52 39.3456C52 39.3456 52 39.3455 52 39.3456C52 39.3459 52 39.3458 52 39.3446V21.0048C51.818 21.0019 51.6169 21 51.4031 21.0001C50.8508 21.0004 50.4028 20.553 50.4025 20.0007C50.4022 19.4484 50.8497 19.0004 51.402 19.0001Z"
          fill="#228BE6"
        />
      </svg>
    ),
    title: 'Schedule a Drop-Off',
    description: 'Bring your car to our facility at a time that suits you.',
  },
];

const comparisonData = [
  {
    title: "Other Dealerships",
    highlight: false,
    items: [
      { text: "Payments may take up to 20 days.", negative: true },
      { text: "Expect haggling.", negative: true },
      { text: "Lengthy inspection processes.", negative: true },
      { text: "Requires extensive preparation.", negative: true },
      { text: "Potential delays.", negative: true },
    ],
  },
  {
    title: "Gedi Route Cars",
    highlight: true,
    items: [
      { text: "Immediate payment.", negative: false },
      { text: "No haggling—our offers are firm.", negative: false },
      { text: "We can purchase your car today.", negative: false },
      { text: "No need to clean your car.", negative: false },
    ],
  },
  {
    title: "Private Buyers",
    highlight: false,
    items: [
      { text: "Uncertain payment methods.", negative: true },
      { text: "Negotiations are common.", negative: true },
      { text: "Risk of low-blows.", negative: true },
      { text: "Must do vehicle preparation.", negative: true },
      { text: "Possible waiting periods.", negative: true },
    ],
  },
];

const faqs = [
  {
    q: "How is my vehicle’s trade-in price determined?",
    a: "The estimated trade-in value for your vehicle is based on several key factors, including the vehicle’s make, model, year, mileage, overall condition, and current market demand. Our team conducts a transparent appraisal of the trade in cars, using current market trends to ensure you receive a fair deal.",
  },
  {
    q: "What documentation do I need to bring when I trade in my car?",
    a: "You’ll typically need your vehicle registration, proof of ownership, valid identification, and any available service or maintenance records. If the vehicle is financed, you may also need your loan or lien information.",
  },
  {
    q: "What happens to the trade-in vehicle once I hand it over?",
    a: "Once you hand over your vehicle, we complete the necessary paperwork and ownership transfer process. Depending on its condition and market demand, the vehicle may be prepared for resale, reconditioned, or handled through our wholesale network.",
  },
  {
    q: "Do you charge any appraisal fee, or is the trade-in valuation free?",
    a: "Our trade-in appraisal and valuation are free. There is no obligation to accept the offer, so you can review the estimated value before deciding whether to proceed with the trade-in.",
  },
  {
    q: "Will my trade-in appraisal affect my credit score?",
    a: "No. A standard vehicle trade-in appraisal does not affect your credit score because it does not require a credit check. A credit inquiry may only be required separately if you apply for vehicle financing.",
  },
  {
    q: "Can I bring multiple vehicles for appraisal or trade-in?",
    a: "Yes, you can bring multiple vehicles for appraisal or trade-in. Each vehicle will be evaluated individually based on its condition, mileage, specifications, and current market value.",
  },
  {
    q: "Are trade-ins worth it for cars?",
    a: "Trade-ins can be a convenient way to sell your current vehicle while purchasing another one. They can save you the time and effort involved in finding a private buyer and handling the selling process yourself.",
  },
  {
    q: "Is it better to trade in or sell privately?",
    a: "Both options have advantages. Selling privately may result in a higher selling price, but it can take more time and effort. Trading in your vehicle is generally more convenient and allows you to handle the sale and purchase of another vehicle in one transaction.",
  },
  {
    q: "Can I trade my car for another car?",
    a: "Yes. You can trade in your current vehicle toward the purchase of another vehicle. The approved trade-in value can be applied toward your next vehicle, helping reduce the amount you need to pay or finance.",
  },
  {
    q: "What is my trade-in worth?",
    a: "Your trade-in value depends on factors such as the vehicle’s make, model, year, mileage, condition, features, accident history, and current market demand. The best way to determine its value is through a professional appraisal based on current market conditions.",
  },
  {
    q: "Is trading in my used car a good way to get a fair resell value of my car?",
    a: "Trading in your used car can be a convenient way to receive a competitive market-based value without dealing with private-sale listings, negotiations, and buyer appointments. Our appraisal considers your vehicle’s condition and current market demand to determine a fair trade-in offer.",
  },
];

const TradeIn = () => {
  const appConfig = useAppConfig();
  const { SITE_CONFIG } = getConstants(appConfig);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const toggleFaq = (idx:any) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };


  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans">
      <Header />

      {/* 1. Hero Section */}
      <section className="relative bg-black text-white min-h-[500px] flex items-center lg:mt-10 px-6 lg:px-20 py-16 overflow-hidden mt-24">
        <div className="absolute inset-0 z-0 opacity-40">
          <Image
            src={sell}
            alt="Hero vehicle background"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8 items-center">
          <div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight uppercase leading-tight text-white mb-4">
              Sell Your Car The <br /> Smart Way
            </h1>
            <p className="text-sm md:text-base text-white font-bold max-w-2xl leading-relaxed">
              Want to know what your trade-in is worth? Our trade-in value estimator helps you get the best deal in Ontario. We make it easy to drive off in your next vehicle.
            </p>
          </div>

          <div className="justify-self-center lg:justify-start w-full max-w-[320px]">
            <div className="bg-white text-slate-900 rounded-lg p-8 shadow-2xl min-h-80 text-center border border-gray-100">
              <div className="flex justify-center mb-4">
                <div className="flex items-center">
                  {["C", "A", "R", "F", "A", "X"].map((letter, index) => (
                    <span
                      key={index}
                      className="bg-black text-white font-extrabold text-[15px] leading-none w-[20px] h-[20px] flex items-center justify-center mr-[2px]"
                    >
                      {letter}
                    </span>
                  ))}

                  <span className="text-red-900 text-[20px] font-bold ml-[2px] leading-none">
                    🍁
                  </span>
                </div>
              </div>
              <h3 className="text-3xl font-bold mb-6 text-slate-800 leading-snug">
                Find out what your trade-in is worth.
              </h3>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full bg-[#1877F2] hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-full text-base transition-colors shadow"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CARFAX / Trade-in Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Dark Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-xl bg-white rounded-xl shadow-2xl overflow-hidden z-10 min-h-[500px] flex flex-col"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 z-20 text-gray-500 hover:text-gray-800 p-1 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Iframe or Embedded Form Container */}
              <div className="w-full h-full flex-1">
                <iframe
                  src={SITE_CONFIG?.urls?.tradeFormByVin}
                  title="Trade-in Estimator Widget"
                  className="w-full h-full min-h-[500px] border-none"
                  allow="geolocation"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. Sub-Hero Announcement Bar */}
      <section className="bg-black text-white text-center py-12 px-4 lg:px-72">
        <p className="text-base md:text-4xl tracking-wide">
          Firm trade-in offer in minutes and cash in your pocket—no haggling, no waiting.
        </p>
      </section>

      {/* 3. How to Trade In Section */}
      <section className="max-w-7xl mx-auto px-3 py-28 bg-white font-sans">
      {/* Title */}
      <div className="mb-10 text-left">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
          How to Trade In a Car?
        </h2>
        <p className="text-base my-1 text-gray-500">Trade in or sell your vehicle to GrCars in just a few easy steps.</p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {steps.map((step, idx) => {
          return (
            <Link 
              href={"/inventory"}
              key={idx}
              className="flex items-start gap-4 group cursor-pointer"
            >
              {/* Left Icon Container */}
              <div className="shrink-0 text-blue-600 transition-transform duration-200 group-hover:scale-105">
               {step?.icon}
              </div>

              {/* Text Content */}
              <div>
                <h3 className="text-base md:text-xl font-bold text-slate-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-xs md:text-base text-gray-500 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>

      {/* 4. Why Choose Us / Comparison Section */}
      <section className="bg-[#F0F4FA] py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold text-center text-slate-900 mb-12">
            Why Choose Gedi Route Cars for Used Car Trade-In?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {comparisonData.map((col, idx) => (
              <div
                key={idx}
                className={`bg-white rounded-xl p-8 shadow-sm flex flex-col`}
              >
                <Link href={"/inventory"} className="text-center hover:text-brand-green cursor-pointer text-lg lg:text-2xl text-slate-900 mb-8 border-b border-gray-100 pb-4">
                  {col.title}
                </Link>
                <ul className="space-y-4 text-xs md:text-sm text-gray-600 flex-1">
                  {col.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start gap-3">
                      {item.negative ? (
                        <span className="bg-red-800 text-white rounded-full p-1 mt-0.5 flex-shrink-0">
                          <X className="w-3.5 h-3.5 stroke-[3] " />
                        </span>
                      ) : (
                        <span className="bg-green-500 text-white rounded-full p-1 mt-0.5 flex-shrink-0">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </span>
                      )}
                      <span className="text-black text-lg">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Benefits with Image Section */}
      {/* <section className="max-w-6xl mx-auto px-6 lg:px-0 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-0 items-center">
          <div className="px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">
              Trade-In Your Car and Save
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl text-slate-900 mb-1">
                  Save Money
                </h3>
                <p className="text-base text-black leading-relaxed">
                  Apply your current vehicle's trade-in value toward your next purchase, reducing the applicable sales tax.
                </p>
              </div>
              <div>
                <h3 className="text-2xl text-slate-900 mb-1">
                  Save Time
                </h3>
                <p className="text-base text-black leading-relaxed">
                  We'll deliver your new car while collecting your old one—all in a single appointment.
                </p>
              </div>
              <div>
                <h3 className="text-2xl text-slate-900 mb-1">
                  Save Stress
                </h3>
                <p className="text-base text-black leading-relaxed">
                  Explore our extensive selection of high-quality cars.
                </p>
              </div>
            </div>
          </div>

          <div className="relative h-[320px] md:h-[380px] w-full rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={saveImg}
              alt="Trade in car save time"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section> */}

      {/* 6. FAQ Accordion Section */}
      <section className="bg-white py-16 px-6 md:py-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        {/* Left Column: Heading, Subtitle & CTA */}
        <div className="lg:col-span-5 flex flex-col items-start justify-start py-6">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] tracking-tight mb-4">
            Frequently asked questions
          </h2>
          <p className="text-slate-600 text-base md:text-lg mb-8 max-w-md leading-relaxed">
            Have questions about selling or trading your car? We’ve got you covered.
          </p>
         
        </div>

        {/* Right Column: Accordion List */}
        <div className="lg:col-span-7">
          <div className="">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;

              return (
                <div key={idx} className="border-b border-slate-200">
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full cursor-pointer flex items-center justify-between py-6 text-left group transition-colors duration-200"
                  >
                    <span className="text-base md:text-lg font-bold text-[#0F172A] pr-4">
                      {faq.q}
                    </span>
                    <div className="flex-shrink-0 text-slate-900">
                      {isOpen ? (
                        <Minus className="w-5 h-5 stroke-[2]" />
                      ) : (
                        <Plus className="w-5 h-5 stroke-[2]" />
                      )}
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="pb-6 text-sm md:text-base text-slate-600 leading-relaxed pr-6">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>


    <section className="max-w-[1300px] mx-auto py-12">
      <div className="bg-[#0b3b60] rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left Content Side */}
        <div className="p-8 sm:p-12 lg:p-14 flex flex-col justify-center items-start text-white">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 leading-tight">
            Trade in and save on your purchase
          </h2>
          
          <p className="text-sm sm:text-base text-gray-200 mb-8 max-w-md font-light leading-relaxed">
            Save more when you trade in the car you have for the car you want. It's easy and all online.
          </p>

          <Link
            href="/get-started"
            className="inline-block px-7 py-3 rounded-full border border-white text-white font-medium hover:bg-white hover:text-[#0b3b60] transition-colors duration-200 text-sm"
          >
            Get Started
          </Link>
        </div>

        {/* Right Image Side */}
        <div className="relative min-h-[300px] md:min-h-full">
          <img
            src={happyfam?.src}
            alt="Family gathered at dining table with laptop"
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>
    </section>

      <Footer />
    </div>
  );
};

export default TradeIn;