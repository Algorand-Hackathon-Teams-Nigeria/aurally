import classes from '../styles/landing.module.css'

const SvgOne = ({ num }: { num: number }) => {
  return (
    <div
      data-num={num}
      className={`relative h-max font-bold w-14 sm:w-16 lg:w-20 xl:w-28 text-lg sm:text-xl lg:text-2xl xl:text-3xl ${classes.svgList}`}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 119 119" fill="none">
        <path
          d="M80.7947 23.3008C82.1482 21.0361 81.4177 18.0785 79.0267 16.9633C73.541 14.4049 67.5958 12.9307 61.5195 12.6399C53.8483 12.2728 46.2049 13.8033 39.2665 17.0957C32.328 20.3882 26.3086 25.341 21.7415 31.5154C17.1744 37.6899 14.2005 44.8954 13.0833 52.4937C11.9661 60.092 12.74 67.8485 15.3365 75.0763C17.933 82.304 22.2719 88.7799 27.969 93.9302C33.666 99.0806 40.5454 102.746 47.9976 104.603C53.9004 106.074 60.0183 106.373 66.0083 105.502C68.6191 105.122 70.17 102.5 69.5257 99.9417C68.8814 97.3833 66.2843 95.8644 63.6644 96.1753C59.2108 96.7038 54.6846 96.4229 50.3072 95.3323C44.3796 93.8555 38.9077 90.9396 34.3761 86.843C29.8446 82.7463 26.3933 77.5953 24.328 71.8462C22.2627 66.0971 21.6471 59.9274 22.5357 53.8835C23.4244 47.8397 25.7899 42.1083 29.4227 37.197C33.0554 32.2858 37.8434 28.3462 43.3623 25.7273C48.8813 23.1084 54.961 21.8911 61.0628 22.1831C65.5689 22.3987 69.9843 23.4325 74.0974 25.2206C76.5169 26.2725 79.4412 25.5654 80.7947 23.3008Z"
          fill="url(#paint0_linear_920_3562)"
        />
        <path
          d="M42.1914 87.1819C42.0281 87.4116 42.0818 87.7306 42.3141 87.8902C46.5383 90.7927 51.396 92.6473 56.4848 93.297C61.7425 93.9682 67.0846 93.3324 72.0378 91.4459C76.9911 89.5594 81.4026 86.4804 84.8817 82.4817C88.3608 78.483 90.8 73.688 91.9833 68.5215C93.1666 63.3549 93.0575 57.9763 91.6656 52.862C90.2737 47.7477 87.6419 43.0556 84.0035 39.2013C80.3651 35.347 75.8323 32.4496 70.8066 30.7655C65.9423 29.1356 60.7616 28.6911 55.6952 29.4657C55.4166 29.5083 55.2295 29.7721 55.2765 30.0501C55.3235 30.328 55.5868 30.5147 55.8655 30.4723C60.7663 29.7256 65.7771 30.1568 70.4823 31.7334C75.3488 33.3641 79.7381 36.1698 83.2613 39.902C86.7845 43.6342 89.3328 48.1777 90.6807 53.13C92.0285 58.0824 92.1342 63.2907 90.9883 68.2936C89.8425 73.2965 87.4805 77.9397 84.1116 81.8117C80.7427 85.6838 76.4709 88.6652 71.6745 90.492C66.8781 92.3187 61.7053 92.9344 56.6141 92.2844C51.6918 91.656 46.9928 89.8633 42.9055 87.0581C42.6731 86.8986 42.3547 86.9521 42.1914 87.1819Z"
          fill="url(#paint1_linear_920_3562)"
        />
        <defs>
          <linearGradient id="paint0_linear_920_3562" x1="74.3799" y1="15.0925" x2="44.1948" y2="103.482" gradientUnits="userSpaceOnUse">
            <stop stopColor="#8A2BE2" stopOpacity="0" />
            <stop offset="0.505208" stopColor="#8A2BE2" />
            <stop offset="1" stopColor="#FF5722" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="paint1_linear_920_3562" x1="86.8382" y1="79.9965" x2="34.2944" y2="42.6554" gradientUnits="userSpaceOnUse">
            <stop stopColor="#8A2BE2" />
            <stop offset="1" stopColor="#FF5722" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

export default SvgOne