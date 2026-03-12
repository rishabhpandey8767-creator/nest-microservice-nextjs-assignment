'use client'

import dynamic from 'next/dynamic'
import data from '../data/form.json'

const DynamicForm = dynamic(
  () => import('../components/DynamicForm'),
  { ssr: false }
)

export default function Home() {

  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: "20px" }}>
        Signup Form
      </h1>

      <DynamicForm fields={data.data} />
    </div>
  )
}