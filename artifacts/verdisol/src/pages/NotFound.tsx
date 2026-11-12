import { Link } from "react-router-dom";
import Layout from "@/components/Layout";

export default function NotFound() {
  return (
    <Layout>
      <section className="mx-auto max-w-3xl px-6 py-24 text-center">
        <p className="font-semibold text-[#1F5D3A]">404</p>
        <h1 className="mt-4 text-4xl font-bold text-gray-900">Page not found</h1>
        <p className="mt-5 text-lg text-gray-600">
          This page does not exist. Please use the navigation or return home.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex rounded-xl bg-[#1F5D3A] px-6 py-3 font-semibold text-white hover:bg-[#174d2f]"
        >
          Return to Home
        </Link>
      </section>
    </Layout>
  );
}
