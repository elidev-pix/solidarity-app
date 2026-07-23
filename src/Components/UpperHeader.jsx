import React from 'react'

function UpperHeader() {
  return (
    <div className="flex flex-col sm:flex-row h-auto sm:h-10 py-2 sm:py-0 px-4 sm:px-8 items-center justify-center sm:justify-between gap-1 sm:gap-0 bg-[#D6336C] text-[11px] sm:text-xs text-white font-bold text-center">
      <span className="font-jakarta">Nous sommes une organisation à but non lucratif</span>
      <div className="font-jakarta">Email : solidaritygroupbf@yahoo.com</div>
    </div>
  )
}

export default UpperHeader