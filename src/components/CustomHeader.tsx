import React from 'react'

function CustomHeader({title , subTitle}:{title:string , subTitle?:string}) {
  return (
    <div
    data-aos="fade-up"
    className="max-w-6xl mx-auto px-6 lg:px-12 text-center mb-12"
  >
    <h2 className="text-4xl sm:text-5xl font-bold text-primary mb-4">
      {title}
    </h2>
    <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
     {subTitle}
    </p>
    <div className="mt-6 h-1.5 w-24 bg-primary rounded-full mx-auto animate-pulse"></div>
  </div>
  )
}

export default CustomHeader
