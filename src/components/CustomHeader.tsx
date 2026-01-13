'use client'

import React from 'react'
import { useLocale } from 'next-intl'

function CustomHeader({title , subTitle}:{title:string , subTitle?:string}) {
  const locale = useLocale()
  const isRTL = locale === 'ar'
  
  return (
    <div className="relative container mx-auto text-start mb-0">
      {/* Title section */}
      <div className="relative mb-2">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground tracking-tight leading-tight">
          {title}
        </h2>
        {/* Accent line - reversed for Arabic */}
        <div className={`mt-2 h-0.5 w-16 ${isRTL ? 'bg-linear-to-l' : 'bg-linear-to-r'} from-primary to-primary/20 rounded-full`}></div>
      </div>

      {/* Subtitle section */}
      {subTitle && (
        <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed max-w-3xl text-start">
          {subTitle}
        </p>
      )}
    </div>
  )
}

export default CustomHeader
