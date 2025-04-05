import ApiDocs from "./ApiDocs";

export default function page() {
  return (
    <div className=" max-w-6xl mx-auto text-center px-2 py-10">
      <h2>Api Documentation</h2>
      <p className=" text-sm md:text-lg font-medium max-w-[800px] mx-auto text-gray-500">Access our API documentation for seamless integration, detailed guidelines, and examples to maximize your email verification experience.</p>
      <ApiDocs />
    </div>
  )
}
