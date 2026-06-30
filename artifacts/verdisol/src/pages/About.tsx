import Layout from "@/components/Layout";

export default function About() {
  return (
    <Layout>
      <section className="min-h-[80vh] flex items-center justify-center bg-white">
        <div className="text-center px-4">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#1F5D3A]/10 text-[#1F5D3A] text-sm font-medium mb-6">
            About Us
          </span>
          <h1 className="text-4xl font-bold text-gray-900">About VerdiSol Agro</h1>
          <p className="mt-4 text-gray-500 max-w-md mx-auto">
            Page content coming soon.
          </p>
        </div>
      </section>
    </Layout>
  );
}
