import Link from "next/link";
import { FaLinkedin, FaGithub } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#416d66] to-[#497D74] shadow-lg text-white py-6">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Roadmap Creator. Todos los derechos
          reservados.
        </p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <Link
            href="https://github.com/deividpa"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="w-6 h-6 hover:text-gray-300 transition" />
          </Link>
          <Link
            href="https://www.linkedin.com/in/david-perez-aguirre/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="w-6 h-6 hover:text-gray-300 transition" />
          </Link>
        </div>
      </div>
    </footer>
  );
}