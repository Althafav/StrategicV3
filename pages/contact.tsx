// components/ContactUsSection.tsx
import { BusinessNature, CountriesData } from "@/constants/ConstData";
import { motion } from "framer-motion";

export default function ContactUsSection() {
  const heading = "Looking to organize an event? Get in touch with us.";

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-slate-50 to-slate-100 py-16 lg:py-24">
      {/* Decorative radial highlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
      />

      <div className="container mx-auto max-w-5xl px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12 text-center text-2xl font-semibold tracking-tight text-slate-800 lg:text-3xl"
        >
          {heading}
        </motion.h2>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mx-auto rounded-2xl bg-white p-8 shadow-lg lg:p-12"
        >
          <form
            method="POST"
            action="https://strategic31677.activehosted.com/proc.php"
            id="_form_257_"
            className="grid grid-cols-1 gap-6 md:grid-cols-2"
            noValidate
            data-styles-version="5"
          >
            {/* ――― Hidden ActiveCampaign fields ――― */}
            <input type="hidden" name="u" value="257" />
            <input type="hidden" name="f" value="257" />
            <input type="hidden" name="s" />
            <input type="hidden" name="c" value="0" />
            <input type="hidden" name="m" value="0" />
            <input type="hidden" name="act" value="sub" />
            <input type="hidden" name="v" value="2" />
            <input
              type="hidden"
              name="or"
              value="ac9208d24b8cb47127ede40c2022cc44"
            />
            <input
              type="hidden"
              name="field[38]"
              value="Strategic - Contact Us"
            />

            {/* ――― Name ――― */}
            <div>
              <input
                id="firstname"
                name="firstname"
                type="text"
                placeholder="First Name / الاسم الأول"
                required
                className="h-12 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div>
              <input
                id="lastname"
                name="lastname"
                type="text"
                placeholder="Last Name / الاسم الأخير"
                required
                className="h-12 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {/* ――― Contact ――― */}
            <div>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Email Address / عنوان البريد الإلكتروني"
                required
                className="h-12 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="Phone Number / رقم الهاتف"
                required
                className="h-12 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {/* ――― Selects ――― */}
            <div>
              <select
                name="field[3]"
                id="field[3]"
                required
                className="h-12 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-600 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                <option value="">Country / الدولة</option>
                {CountriesData.map((c, idx) => (
                  <option key={`country-${idx}`} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <select
                name="field[4]"
                id="field[4]"
                required
                className="h-12 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-600 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                <option value="">Business Nature / طبيعة عملك</option>
                {BusinessNature.map((b, idx) => (
                  <option key={`nature-${idx}`} value={b.value}>
                    {b.label}
                  </option>
                ))}
              </select>
            </div>

            {/* ――― Message (spans full width) ――― */}
            <div className="md:col-span-2">
              <textarea
                id="field[6]"
                name="field[6]"
                rows={4}
                required
                placeholder="Your Message / رسالتك"
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {/* ――― reCAPTCHA & submit ――― */}
            <div className="md:col-span-2 flex flex-col items-center gap-6">
              <div
                className="g-recaptcha"
                data-sitekey="6LcwIw8TAAAAACP1ysM08EhCgzd6q5JAOUR1a0Go"
              />
              <button
                id="_form_257_submit"
                type="submit"
                className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-10 text-sm font-medium text-white shadow-md transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
              >
                Send
              </button>
            </div>
          </form>

          {/* ――― Success message (hidden until AC swaps display) ――― */}
          <div
            className="_form-thank-you mt-6 text-center text-green-600"
            style={{ display: "none" }}
          >
            Thank you for submitting the form
          </div>
        </motion.div>
      </div>
    </section>
  );
}
