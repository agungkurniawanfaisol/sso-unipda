import { Github, Twitter, Linkedin, Mail, Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-white/[0.06] bg-[#08080e]">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600">
                <span className="text-xs font-bold text-white">U</span>
              </div>
              <span className="font-semibold text-lg text-white">UNIPDA</span>
            </div>
            <p className="text-sm text-white/40 max-w-sm leading-relaxed mb-6">
              Faculty of Computer Science — fostering innovation, research, and
              academic excellence in technology education.
            </p>
            <div className="flex items-center gap-3">
              {[Github, Twitter, Linkedin, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-200 text-white/40 hover:text-white group"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {['Applications', 'Lecturers', 'About UNIPDA', 'Contact'].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase().replace(/\s+/g, '')}`} className="text-sm text-white/40 hover:text-indigo-300 transition-colors duration-200">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Programs</h4>
            <ul className="space-y-2.5">
              {['Informatics Engineering', 'Information Systems', 'Computer Science', 'Research'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-white/40 hover:text-indigo-300 transition-colors duration-200">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/[0.06] mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} UNIPDA. All rights reserved.
          </p>
          <p className="text-xs text-white/30 flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-red-400/70" /> by Faculty of Computer Science
          </p>
        </div>
      </div>
    </footer>
  )
}
