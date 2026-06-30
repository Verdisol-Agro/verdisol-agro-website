import Layout from "@/components/Layout";

export default function Home() {
  return (
    <Layout>
      <section className="min-h-[80vh] flex items-center justify-center bg-[#F5F0E8]">
        <div className="text-center px-4">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#1F5D3A]/10 text-[#1F5D3A] text-sm font-medium mb-6 tracking-wide">
            Agricultural Experts
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight max-w-3xl mx-auto">
            Welcome to{" "}
            <span className="text-[#1F5D3A]">VerdiSol Agro</span>
          </h1>
          <p className="mt-6 text-lg text-gray-500 max-w-xl mx-auto">
            Homepage content coming soon.
          </p>
        </div>
      </section>
    </Layout>
  );
}
