import React from 'react'
import SelectFile from './select-file'
import UploadFile from './upload-file'

export default function Page() {
  return (
    <div className=' p-6 flex flex-col gap-4'>
      <SelectFile />
      <UploadFile />
    </div>
  )
}
