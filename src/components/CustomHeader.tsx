import React from 'react'

function CustomHeader({title , subTitle}:{title:string , subTitle?:string}) {
  return (
    <div className="relative max-w-6xl mx-auto px-6 lg:px-12 text-center mb-16">
      {/* Decorative background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      {/* Title with linear effect */}
      <div className="relative mb-6">
        <h2 className="text-43xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-2 tracking-tight">
          <span className="relative inline-block">
            {title}
            {/* Underline decoration */}
            <span className="absolute -bottom-2 left-0 right-0 h-1 bg-linear-to-r from-transparent via-primary to-transparent opacity-30"></span>
          </span>
        </h2>
      </div>

      {/* Subtitle with better styling */}
      {subTitle && (
        <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light">
          {subTitle}
        </p>
      )}

      {/* Modern decorative line */}
      <div className="mt-8 flex items-center justify-center gap-4">
        <div className="h-px w-12 bg-linear-to-r from-transparent to-primary/40"></div>
        <div className="w-2 h-2 rounded-full bg-primary/60"></div>
        <div className="h-px w-12 bg-linear-to-l from-transparent to-primary/40"></div>
      </div>
    </div>
  )
}

export default CustomHeader
